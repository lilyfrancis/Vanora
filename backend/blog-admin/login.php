<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/auth.php';

blog_start_session();
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    if (blog_attempt_login($username, $password)) {
        header('Location: posts.php');
        exit;
    }
    $error = 'Incorrect username or password.';
}

if (blog_is_logged_in()) {
    header('Location: posts.php');
    exit;
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sign in | Vanora Insights Admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body admin-body--centered">
  <main class="login-card">
    <h1>Vanora Insights</h1>
    <p class="login-card__sub">Sign in to manage blog posts.</p>
    <?php if ($error): ?>
      <p class="admin-alert admin-alert--error"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <form method="post" novalidate>
      <label for="username">Username</label>
      <input type="text" id="username" name="username" autocomplete="username" required autofocus>
      <label for="password">Password</label>
      <input type="password" id="password" name="password" autocomplete="current-password" required>
      <button type="submit" class="btn-admin btn-admin--primary">Sign in</button>
    </form>
  </main>
</body>
</html>
