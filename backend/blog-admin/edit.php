<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/db.php';
require_once __DIR__ . '/lib/markdown.php';
require_once __DIR__ . '/lib/render.php';

blog_require_login();
$config = blog_config();

$id = $_GET['id'] ?? $_POST['id'] ?? null;
$existing = $id ? blog_find_post($id) : null;
$errors = [];

if ($id && !$existing) {
    http_response_code(404);
    exit('Post not found.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    blog_verify_csrf();

    $title = trim($_POST['title'] ?? '');
    $slug = blog_slugify(trim($_POST['slug'] ?? '') ?: $title);
    $excerpt = trim($_POST['excerpt'] ?? '');
    $bodyMarkdown = $_POST['body_markdown'] ?? '';
    $featuredImage = trim($_POST['featured_image'] ?? '');
    $featuredImageAlt = trim($_POST['featured_image_alt'] ?? '');
    $author = trim($_POST['author'] ?? '') ?: $config['DEFAULT_AUTHOR'];
    $status = ($_POST['status'] ?? 'draft') === 'published' ? 'published' : 'draft';

    if ($title === '') {
        $errors[] = 'Title is required.';
    }
    if ($excerpt === '') {
        $errors[] = 'Excerpt is required — it shows on the Insights listing card and as the page description.';
    }
    if (trim($bodyMarkdown) === '') {
        $errors[] = 'The article body is empty.';
    }
    if ($status === 'published' && $featuredImage === '') {
        $errors[] = 'A featured image is required to publish. Upload one, or save as a draft without it.';
    }
    if ($status === 'published' && $featuredImage !== '' && $featuredImageAlt === '') {
        $errors[] = 'Add alt text for the featured image before publishing.';
    }

    $conflict = blog_find_by_slug($slug, $existing['id'] ?? null);
    if ($conflict) {
        $errors[] = "The URL \"/blog/{$slug}.html\" is already used by another post. Change the title or set a different URL slug.";
    }

    if (empty($errors)) {
        $now = gmdate('c');
        $previousSlug = $existing['slug'] ?? null;

        $post = [
            'id' => $existing['id'] ?? blog_new_id(),
            'slug' => $slug,
            'title' => $title,
            'excerpt' => $excerpt,
            'body_markdown' => $bodyMarkdown,
            'body_html' => markdown_to_html($bodyMarkdown),
            'featured_image' => $featuredImage,
            'featured_image_alt' => $featuredImageAlt,
            'author' => $author,
            'status' => $status,
            'created_at' => $existing['created_at'] ?? $now,
            'updated_at' => $now,
            'published_at' => $status === 'published' ? ($existing['published_at'] ?? $now) : null,
        ];

        blog_upsert_post($post);
        blog_sync_post_output($post, $previousSlug);

        header('Location: posts.php?flash=saved');
        exit;
    }

    // Re-render the form with submitted values + errors.
    $existing = array_merge($existing ?? [], [
        'title' => $title, 'slug' => $slug, 'excerpt' => $excerpt,
        'body_markdown' => $bodyMarkdown, 'featured_image' => $featuredImage,
        'featured_image_alt' => $featuredImageAlt, 'author' => $author, 'status' => $status,
    ]);
}

$isNew = !$existing;
$post = $existing ?? [
    'id' => '', 'title' => '', 'slug' => '', 'excerpt' => '', 'body_markdown' => '',
    'featured_image' => '', 'featured_image_alt' => '', 'author' => $config['DEFAULT_AUTHOR'],
    'status' => 'draft',
];
$csrfToken = blog_csrf_token();
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= $isNew ? 'New post' : 'Edit post' ?> | Vanora Insights Admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body">
  <header class="admin-header">
    <h1>Vanora Insights</h1>
    <nav class="admin-header__nav">
      <a href="posts.php">&larr; All posts</a>
      <a href="logout.php">Sign out</a>
    </nav>
  </header>

  <main class="admin-main admin-main--editor">
    <h2><?= $isNew ? 'New post' : 'Edit post' ?></h2>

    <?php if ($errors): ?>
      <ul class="admin-alert admin-alert--error">
        <?php foreach ($errors as $e): ?><li><?= htmlspecialchars($e) ?></li><?php endforeach; ?>
      </ul>
    <?php endif; ?>

    <form method="post" id="postForm" class="editor-form">
      <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrfToken) ?>">
      <input type="hidden" name="id" value="<?= htmlspecialchars($post['id']) ?>">
      <input type="hidden" name="featured_image" id="featuredImageInput" value="<?= htmlspecialchars($post['featured_image']) ?>">

      <div class="editor-grid">
        <div class="editor-main">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" value="<?= htmlspecialchars($post['title']) ?>" required autofocus>

          <label for="slug">URL slug</label>
          <div class="slug-row">
            <span class="slug-row__prefix">/blog/</span>
            <input type="text" id="slug" name="slug" value="<?= htmlspecialchars($post['slug']) ?>" placeholder="auto-generated from title">
            <span class="slug-row__suffix">.html</span>
          </div>

          <label for="excerpt">Excerpt <span class="field-hint">— shows on the Insights card and as the page description (1–2 sentences)</span></label>
          <textarea id="excerpt" name="excerpt" rows="2" required><?= htmlspecialchars($post['excerpt']) ?></textarea>

          <div class="editor-tabs">
            <button type="button" class="editor-tab is-active" data-tab="write">Write</button>
            <button type="button" class="editor-tab" data-tab="preview">Preview</button>
          </div>
          <label for="body_markdown" class="visually-hidden-admin">Article body (Markdown)</label>
          <textarea id="body_markdown" name="body_markdown" rows="22" class="editor-body" data-tab-panel="write" required><?= htmlspecialchars($post['body_markdown']) ?></textarea>
          <div class="editor-preview" data-tab-panel="preview" hidden></div>
          <p class="field-hint">Supports: # / ## / ### headings, **bold**, *italic*, [links](https://…), - bullet lists, &gt; quotes, blank line between paragraphs.</p>
        </div>

        <aside class="editor-sidebar">
          <div class="editor-card">
            <h3>Publish</h3>
            <label for="status">Status</label>
            <select id="status" name="status">
              <option value="draft" <?= $post['status'] === 'draft' ? 'selected' : '' ?>>Draft</option>
              <option value="published" <?= $post['status'] === 'published' ? 'selected' : '' ?>>Published</option>
            </select>
            <label for="author">Author</label>
            <input type="text" id="author" name="author" value="<?= htmlspecialchars($post['author']) ?>">
            <button type="submit" class="btn-admin btn-admin--primary btn-admin--full">Save post</button>
          </div>

          <div class="editor-card">
            <h3>Featured image</h3>
            <div id="imagePreviewWrap" class="image-preview-wrap" <?= $post['featured_image'] ? '' : 'hidden' ?>>
              <img id="imagePreview" src="<?= htmlspecialchars($post['featured_image'] ? '../' . $post['featured_image'] : '') ?>" alt="">
            </div>
            <input type="file" id="imageFile" accept="image/jpeg,image/png,image/webp" aria-describedby="imageHelp">
            <p id="imageHelp" class="field-hint">JPG, PNG or WebP. Required to publish.</p>
            <div id="imageUploadStatus" class="admin-status" role="status"></div>
            <label for="featured_image_alt">Image alt text</label>
            <input type="text" id="featured_image_alt" name="featured_image_alt" value="<?= htmlspecialchars($post['featured_image_alt']) ?>" placeholder="Describe the image for screen readers">
          </div>
        </aside>
      </div>
    </form>
  </main>

  <script src="assets/admin.js" data-csrf="<?= htmlspecialchars($csrfToken) ?>"></script>
</body>
</html>
