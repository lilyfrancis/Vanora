<?php
/**
 * Vanora Partners — Revenue Leakage Assessment intake endpoint (Hostinger).
 *
 * Upload this whole backend/revenue-assessment-hostinger/ directory to
 * Hostinger (e.g. as /api/assessment/ inside public_html, keeping the
 * public/lib/data/config.php layout intact — see README.md), then point
 * the frontend's REVENUE_ASSESSMENT_ENDPOINT at this file's real URL.
 *
 * Not deployed by default: config.php does not exist until the site
 * owner copies config.sample.php and fills in real values, so this
 * endpoint refuses to run until that happens rather than pretending to
 * work.
 */

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0'); // never leak stack traces to the client

require __DIR__ . '/../lib/rating.php';

const MAX_FIELD_LENGTH = 2000;
const REQUIRED_CONTACT_FIELDS = ['name', 'email', 'phone', 'company', 'role', 'companySize'];
const CONSENT_COPY = 'I agree to be contacted by Vanora Partners about this assessment and consent to my information being processed in line with the Privacy Policy.';

function json_response(array $body, int $status): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($body);
    exit;
}

function strip_header_injection(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function require_string(array $data, string $key, int $maxLen = MAX_FIELD_LENGTH): string
{
    $value = $data[$key] ?? null;
    if (!is_string($value) || trim($value) === '') {
        throw new InvalidArgumentException("Missing field: {$key}");
    }
    if (mb_strlen($value) > $maxLen) {
        throw new InvalidArgumentException("Field too long: {$key}");
    }
    return trim($value);
}

function optional_string(array $data, string $key, int $maxLen = MAX_FIELD_LENGTH): string
{
    $value = $data[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    return trim(mb_substr($value, 0, $maxLen));
}

// --- Config -----------------------------------------------------------

$configPath = __DIR__ . '/../config.php';
if (!file_exists($configPath)) {
    json_response(['ok' => false, 'error' => 'Server not configured. See backend/revenue-assessment-hostinger/README.md.'], 500);
}
/** @var array $config */
$config = require $configPath;

// --- CORS ---------------------------------------------------------------

$allowedOrigin = $config['ALLOWED_ORIGIN'] ?? '';
header("Access-Control-Allow-Origin: {$allowedOrigin}");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method not allowed.'], 405);
}

// --- Parse + validate -----------------------------------------------------

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload)) {
    json_response(['ok' => false, 'error' => 'Invalid JSON body.'], 400);
}

// Honeypot: real visitors never fill this hidden field.
if (!empty($payload['website'])) {
    json_response(['ok' => false, 'error' => 'Rejected.'], 422);
}

try {
    $contact = [];
    foreach (REQUIRED_CONTACT_FIELDS as $field) {
        $contact[$field] = require_string($payload, $field);
    }

    $email = filter_var($contact['email'], FILTER_VALIDATE_EMAIL);
    if ($email === false) {
        throw new InvalidArgumentException('Invalid email address.');
    }
    $contact['email'] = $email;

    $answers = is_array($payload['answers'] ?? null) ? $payload['answers'] : [];
    $rating = score_assessment($answers); // throws if any of the 6 answers is missing/invalid

    $desiredOutcome = optional_string($payload, 'desiredOutcome');

    if (($payload['consent'] ?? false) !== true) {
        throw new InvalidArgumentException('Consent is required.');
    }

    $utm = [];
    foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as $key) {
        $utm[$key] = optional_string($payload['utm'] ?? [], $key, 200);
    }

    $sourcePage = optional_string($payload, 'sourcePage', 500);
    $clientTimestamp = optional_string($payload, 'timestamp', 60);
    $sendCopyToRespondent = ($payload['sendCopyToRespondent'] ?? false) === true;
} catch (InvalidArgumentException $e) {
    json_response(['ok' => false, 'error' => $e->getMessage()], 422);
}

// --- Build the record -----------------------------------------------------

$record = [
    'contact' => $contact,
    'answers' => $answers,
    'desiredOutcome' => $desiredOutcome,
    'ratings' => [
        'categoryLabels' => $rating['categoryLabels'],
        'overallLabel' => $rating['overallLabel'],
    ],
    'consent' => [
        'given' => true,
        'copy' => CONSENT_COPY,
    ],
    'sourcePage' => $sourcePage,
    'utm' => $utm,
    'timestampClient' => $clientTimestamp,
    'timestampServer' => gmdate('c'),
];

// --- Persist (append-only JSONL, outside webroot if configured) ----------

$storagePath = $config['STORAGE_PATH'] ?? (__DIR__ . '/../data/submissions.log');
$line = json_encode($record) . "\n";
$fh = @fopen($storagePath, 'ab');
if ($fh) {
    flock($fh, LOCK_EX);
    fwrite($fh, $line);
    flock($fh, LOCK_UN);
    fclose($fh);
} else {
    error_log('Revenue assessment: could not write to storage path ' . $storagePath);
}

// --- Notify the sales inbox ------------------------------------------------

$notifyEmail = $config['NOTIFY_EMAIL'] ?? '';
$fromEmail = $config['FROM_EMAIL'] ?? '';

$rows = '';
foreach ($contact as $label => $value) {
    $rows .= '<tr><td style="padding:6px 12px;font-weight:600;">' . htmlspecialchars($label) . '</td><td style="padding:6px 12px;">' . htmlspecialchars($value) . '</td></tr>';
}
foreach ($rating['categoryLabels'] as $question => $label) {
    $rows .= '<tr><td style="padding:6px 12px;font-weight:600;">' . htmlspecialchars($question) . '</td><td style="padding:6px 12px;">' . htmlspecialchars($label) . '</td></tr>';
}

$html = '<div style="font-family:sans-serif;color:#041B44;">'
    . '<h2 style="font-family:serif;">New Revenue Leakage Assessment</h2>'
    . '<p><strong>Overall rating:</strong> ' . htmlspecialchars($rating['overallLabel']) . '</p>'
    . '<table style="border-collapse:collapse;">' . $rows . '</table>'
    . '<p><strong>Desired outcome:</strong> ' . nl2br(htmlspecialchars($desiredOutcome)) . '</p>'
    . '<p style="color:#5B6473;font-size:0.85rem;">Source: ' . htmlspecialchars($sourcePage) . ' — UTM: ' . htmlspecialchars(json_encode($utm)) . '</p>'
    . '</div>';

$subject = 'Revenue Leakage Assessment — ' . strip_header_injection($contact['company']);
$headers = "MIME-Version: 1.0\r\n"
    . "Content-type: text/html; charset=UTF-8\r\n"
    . 'From: Vanora Partners <' . strip_header_injection($fromEmail) . ">\r\n"
    . 'Reply-To: ' . strip_header_injection($contact['email']) . "\r\n";

$mailSent = @mail(strip_header_injection($notifyEmail), $subject, $html, $headers);
if (!$mailSent) {
    error_log('Revenue assessment: notification email failed to send.');
}

if ($sendCopyToRespondent) {
    $respondentSubject = 'Your Vanora Revenue Growth Assessment';
    $respondentHtml = '<div style="font-family:sans-serif;color:#041B44;">'
        . '<h2 style="font-family:serif;">Your Preliminary Revenue Growth Assessment</h2>'
        . '<p><strong>Overall rating:</strong> ' . htmlspecialchars($rating['overallLabel']) . '</p>'
        . '<table style="border-collapse:collapse;">' . $rows . '</table>'
        . '<p style="color:#5B6473;font-size:0.85rem;">This initial assessment is directional and should be validated against your company\'s actual commercial and operational data.</p>'
        . '</div>';
    @mail(strip_header_injection($contact['email']), $respondentSubject, $respondentHtml, $headers);
}

json_response([
    'ok' => true,
    'overallLabel' => $rating['overallLabel'],
    'categoryLabels' => $rating['categoryLabels'],
], 200);
