<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/auth.php';

header('Content-Type: application/json');

if (!blog_is_logged_in()) {
    http_response_code(401);
    echo json_encode(['error' => 'Not signed in.']);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}
blog_start_session();
if (!hash_equals($_SESSION['blog_csrf'] ?? '', $_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid form session. Reload the page and try again.']);
    exit;
}

$config = blog_config();
$maxBytes = $config['MAX_IMAGE_BYTES'] ?? (5 * 1024 * 1024);

if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(422);
    echo json_encode(['error' => 'No image received, or the upload failed.']);
    exit;
}

$file = $_FILES['image'];

if ($file['size'] > $maxBytes) {
    http_response_code(422);
    echo json_encode(['error' => 'Image is too large (max ' . round($maxBytes / 1024 / 1024, 1) . 'MB).']);
    exit;
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
if (!isset($allowed[$mime])) {
    http_response_code(422);
    echo json_encode(['error' => 'Unsupported file type. Use JPG, PNG or WebP.']);
    exit;
}
$ext = $allowed[$mime];

$siteRoot = realpath(__DIR__ . '/..');
$uploadDir = $siteRoot . '/assets/blog';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0775, true);
}

$base = pathinfo($file['name'], PATHINFO_FILENAME);
$base = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $base));
$base = trim($base, '-') ?: 'image';
$filename = $base . '-' . substr(bin2hex(random_bytes(4)), 0, 6) . '.' . $ext;

$destination = $uploadDir . '/' . $filename;
if (!move_uploaded_file($file['tmp_name'], $destination)) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not save the uploaded image.']);
    exit;
}

echo json_encode(['url' => 'assets/blog/' . $filename]);
