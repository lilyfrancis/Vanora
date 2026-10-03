<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/db.php';
require_once __DIR__ . '/lib/render.php';

blog_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}

blog_verify_csrf();

$id = $_POST['id'] ?? '';
$post = $id ? blog_find_post($id) : null;

if ($post) {
    blog_delete_post($id);
    blog_remove_post_output($post);
}

header('Location: posts.php?flash=deleted');
exit;
