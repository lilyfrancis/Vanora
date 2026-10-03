<?php
/**
 * Run once to generate a bcrypt hash for config.php's ADMIN_PASSWORD_HASH.
 * Usage: php generate-password-hash.php "your real password"
 * Delete this file from the server after you've generated your hash —
 * it doesn't need to stay there, and there's no reason to leave a
 * password-hashing tool web-accessible.
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('Run this from the command line, not a browser: php generate-password-hash.php "your password"');
}

$password = $argv[1] ?? null;
if (!$password) {
    fwrite(STDERR, "Usage: php generate-password-hash.php \"your password\"\n");
    exit(1);
}

echo password_hash($password, PASSWORD_BCRYPT) . "\n";
