<?php
/**
 * Copy this file to config.php (same directory) and fill in real values.
 * config.php is gitignored — never commit real credentials.
 */

return [
    // Generate with: php generate-password-hash.php
    // Never put a plaintext password here.
    'ADMIN_USERNAME' => 'content',
    'ADMIN_PASSWORD_HASH' => '$2y$10$REPLACE_WITH_A_REAL_BCRYPT_HASH',

    // Shown in the admin header and used as the default post author name.
    'SITE_NAME' => 'Vanora Partners',
    'DEFAULT_AUTHOR' => 'Vanora Partners',

    // Max upload size for featured images, in bytes. 5MB default.
    'MAX_IMAGE_BYTES' => 5 * 1024 * 1024,
];
