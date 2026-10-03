<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/markdown.php';

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

$markdown = $_POST['body_markdown'] ?? '';
echo json_encode(['html' => markdown_to_html($markdown)]);
