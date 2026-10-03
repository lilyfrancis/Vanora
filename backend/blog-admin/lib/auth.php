<?php
/**
 * Session-based auth for the single admin user defined in config.php.
 * No user table, no roles — this is a one-person content tool.
 */

declare(strict_types=1);

function blog_config(): array
{
    static $config = null;
    if ($config === null) {
        $path = __DIR__ . '/../config.php';
        if (!file_exists($path)) {
            http_response_code(500);
            exit('Not configured. Copy config.sample.php to config.php and fill in real values — see README.md.');
        }
        $config = require $path;
    }
    return $config;
}

function blog_start_session(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_set_cookie_params([
            'httponly' => true,
            'samesite' => 'Lax',
            'secure' => !empty($_SERVER['HTTPS']),
        ]);
        session_start();
    }
}

function blog_is_logged_in(): bool
{
    blog_start_session();
    return !empty($_SESSION['blog_admin_authenticated']);
}

function blog_require_login(): void
{
    if (!blog_is_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function blog_attempt_login(string $username, string $password): bool
{
    blog_start_session();

    // Simple throttle: after 5 failed attempts, require a 30s cool-down.
    $attempts = $_SESSION['blog_login_attempts'] ?? 0;
    $lastAttempt = $_SESSION['blog_login_last_attempt'] ?? 0;
    if ($attempts >= 5 && (time() - $lastAttempt) < 30) {
        return false;
    }

    $config = blog_config();
    $ok = hash_equals($config['ADMIN_USERNAME'], $username)
        && password_verify($password, $config['ADMIN_PASSWORD_HASH']);

    $_SESSION['blog_login_last_attempt'] = time();
    if ($ok) {
        $_SESSION['blog_login_attempts'] = 0;
        $_SESSION['blog_admin_authenticated'] = true;
        session_regenerate_id(true);
        return true;
    }

    $_SESSION['blog_login_attempts'] = $attempts + 1;
    return false;
}

function blog_logout(): void
{
    blog_start_session();
    $_SESSION = [];
    session_destroy();
}

function blog_csrf_token(): string
{
    blog_start_session();
    if (empty($_SESSION['blog_csrf'])) {
        $_SESSION['blog_csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['blog_csrf'];
}

function blog_verify_csrf(): void
{
    blog_start_session();
    $token = $_POST['csrf_token'] ?? '';
    if (!hash_equals($_SESSION['blog_csrf'] ?? '', $token)) {
        http_response_code(403);
        exit('Invalid or expired form submission. Go back and try again.');
    }
}
