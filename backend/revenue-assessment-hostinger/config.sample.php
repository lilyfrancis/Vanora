<?php
/**
 * Copy this file to config.php (same directory) and fill in real values.
 * config.php is gitignored — never commit real credentials.
 */

return [
    // Inbox that receives assessment leads. Confirm against whatever the
    // footer already publishes — don't invent a new address.
    'NOTIFY_EMAIL' => 'hello@vanorapartners.com',

    // Sending address. On Hostinger this should be a real mailbox created
    // in hPanel for the domain (e.g. assessment@vanorapartners.com) so
    // mail() has a legitimate envelope-from and doesn't get flagged as spam.
    'FROM_EMAIL' => 'assessment@vanorapartners.com',

    // Exact site origin allowed to POST here (CORS). Set to the real
    // production domain once the site is live; include the GitHub Pages
    // preview origin too if that's still in use during staging.
    'ALLOWED_ORIGIN' => 'https://vanorapartners.com',

    // Absolute filesystem path to store the JSONL submissions log, outside
    // the public webroot if at all possible on your Hostinger plan (e.g.
    // one directory above public_html). Falls back to ../data/submissions.log
    // (protected by the .htaccess in that folder) if left null.
    'STORAGE_PATH' => null,
];
