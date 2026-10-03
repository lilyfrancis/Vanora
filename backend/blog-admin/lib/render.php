<?php
/**
 * Writes generated HTML to the live site. This is the only place that
 * touches files outside the admin folder — keep it narrow and obvious
 * about what it's allowed to write.
 */

declare(strict_types=1);

require_once __DIR__ . '/../templates/post.php';
require_once __DIR__ . '/../templates/listing.php';

function blog_site_root(): string
{
    // admin/ sits directly inside the site's document root.
    return realpath(__DIR__ . '/../..');
}

function blog_posts_dir(): string
{
    $dir = blog_site_root() . '/blog';
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    return $dir;
}

function blog_insights_path(): string
{
    return blog_site_root() . '/insights.html';
}

function blog_post_file_path(string $slug): string
{
    return blog_posts_dir() . '/' . $slug . '.html';
}

/** Write (or overwrite) the static page for a single published post. */
function blog_write_post_file(array $post): void
{
    $html = rtrim(blog_render_post_html($post)) . "\n";
    file_put_contents(blog_post_file_path($post['slug']), $html, LOCK_EX);
}

/** Remove a post's static file (used on unpublish/delete). */
function blog_remove_post_file(string $slug): void
{
    $path = blog_post_file_path($slug);
    if (file_exists($path)) {
        unlink($path);
    }
}

/** Regenerate insights.html from whatever is currently published. */
function blog_regenerate_listing(): void
{
    $html = rtrim(blog_render_listing_html(blog_published_posts())) . "\n";
    file_put_contents(blog_insights_path(), $html, LOCK_EX);
}

/**
 * Full publish pipeline for a post: write/refresh its own page if
 * published, remove it if it isn't (or no longer is), then always
 * regenerate the listing so it reflects current state.
 */
function blog_sync_post_output(array $post, ?string $previousSlug = null): void
{
    if ($previousSlug && $previousSlug !== $post['slug']) {
        blog_remove_post_file($previousSlug);
    }

    if (($post['status'] ?? '') === 'published') {
        blog_write_post_file($post);
    } else {
        blog_remove_post_file($post['slug']);
    }

    blog_regenerate_listing();
}

function blog_remove_post_output(array $post): void
{
    blog_remove_post_file($post['slug']);
    blog_regenerate_listing();
}
