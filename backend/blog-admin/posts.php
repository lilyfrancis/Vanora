<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/db.php';

blog_require_login();

$posts = blog_load_posts();
usort($posts, fn($a, $b) => strcmp($b['updated_at'] ?? '', $a['updated_at'] ?? ''));
$flash = $_GET['flash'] ?? null;
$csrfToken = blog_csrf_token();
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Posts | Vanora Insights Admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body">
  <header class="admin-header">
    <h1>Vanora Insights</h1>
    <nav class="admin-header__nav">
      <a href="../insights.html" target="_blank" rel="noopener">View Insights page &rarr;</a>
      <a href="logout.php">Sign out</a>
    </nav>
  </header>

  <main class="admin-main">
    <div class="admin-toolbar">
      <h2>Posts</h2>
      <a href="edit.php" class="btn-admin btn-admin--primary">+ New post</a>
    </div>

    <?php if ($flash === 'saved'): ?>
      <p class="admin-alert admin-alert--success">Post saved.</p>
    <?php elseif ($flash === 'deleted'): ?>
      <p class="admin-alert admin-alert--success">Post deleted.</p>
    <?php endif; ?>

    <?php if (empty($posts)): ?>
      <p class="admin-empty">No posts yet. <a href="edit.php">Write the first one</a>.</p>
    <?php else: ?>
      <table class="admin-table">
        <thead>
          <tr><th>Title</th><th>Status</th><th>Updated</th><th></th></tr>
        </thead>
        <tbody>
          <?php foreach ($posts as $post): ?>
            <tr>
              <td>
                <strong><?= htmlspecialchars($post['title']) ?></strong>
                <div class="admin-table__slug">/blog/<?= htmlspecialchars($post['slug']) ?>.html</div>
              </td>
              <td>
                <span class="status-badge status-badge--<?= htmlspecialchars($post['status']) ?>"><?= htmlspecialchars(ucfirst($post['status'])) ?></span>
              </td>
              <td><?= htmlspecialchars(date('j M Y, g:ia', strtotime($post['updated_at'] ?? 'now'))) ?></td>
              <td class="admin-table__actions">
                <a href="edit.php?id=<?= urlencode($post['id']) ?>">Edit</a>
                <?php if ($post['status'] === 'published'): ?>
                  <a href="../blog/<?= htmlspecialchars($post['slug']) ?>.html" target="_blank" rel="noopener">View</a>
                <?php endif; ?>
                <form method="post" action="delete.php" class="admin-table__delete-form" onsubmit="return confirm('Delete this post? This cannot be undone.');">
                  <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrfToken) ?>">
                  <input type="hidden" name="id" value="<?= htmlspecialchars($post['id']) ?>">
                  <button type="submit" class="admin-table__delete">Delete</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </main>
</body>
</html>
