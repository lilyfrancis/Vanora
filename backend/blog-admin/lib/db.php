<?php
/**
 * Flat-file post store. No database — just posts.json behind an
 * .htaccess deny-all, read/written with flock() for safety. A single
 * content person publishing occasionally doesn't need a real database,
 * and this avoids assuming any PHP extension beyond what's always on.
 */

declare(strict_types=1);

function blog_data_path(): string
{
    return __DIR__ . '/../data/posts.json';
}

/** @return array<int, array<string,mixed>> */
function blog_load_posts(): array
{
    $path = blog_data_path();
    if (!file_exists($path)) {
        return [];
    }
    $fh = fopen($path, 'rb');
    if (!$fh) {
        return [];
    }
    flock($fh, LOCK_SH);
    $contents = stream_get_contents($fh);
    flock($fh, LOCK_UN);
    fclose($fh);

    $posts = json_decode($contents ?: '[]', true);
    return is_array($posts) ? $posts : [];
}

/** @param array<int, array<string,mixed>> $posts */
function blog_save_posts(array $posts): void
{
    $path = blog_data_path();
    $dir = dirname($path);
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    $fh = fopen($path, 'cb+');
    if (!$fh) {
        throw new RuntimeException('Could not open posts.json for writing.');
    }
    flock($fh, LOCK_EX);
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode(array_values($posts), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
}

function blog_find_post(string $id): ?array
{
    foreach (blog_load_posts() as $post) {
        if ($post['id'] === $id) {
            return $post;
        }
    }
    return null;
}

function blog_find_by_slug(string $slug, ?string $excludeId = null): ?array
{
    foreach (blog_load_posts() as $post) {
        if ($post['slug'] === $slug && $post['id'] !== $excludeId) {
            return $post;
        }
    }
    return null;
}

/** Insert or update a post by id. Returns the saved post. */
function blog_upsert_post(array $post): array
{
    $posts = blog_load_posts();
    $found = false;
    foreach ($posts as $i => $existing) {
        if ($existing['id'] === $post['id']) {
            $posts[$i] = $post;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $posts[] = $post;
    }
    blog_save_posts($posts);
    return $post;
}

function blog_delete_post(string $id): void
{
    $posts = array_values(array_filter(blog_load_posts(), fn($p) => $p['id'] !== $id));
    blog_save_posts($posts);
}

/** Published posts, newest first. */
function blog_published_posts(): array
{
    $posts = array_values(array_filter(blog_load_posts(), fn($p) => ($p['status'] ?? '') === 'published'));
    usort($posts, fn($a, $b) => strcmp($b['published_at'] ?? '', $a['published_at'] ?? ''));
    return $posts;
}

function blog_new_id(): string
{
    return bin2hex(random_bytes(8));
}

function blog_slugify(string $title): string
{
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug !== '' ? $slug : 'post';
}
