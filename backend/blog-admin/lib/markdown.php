<?php
/**
 * Minimal Markdown -> HTML converter. Deliberately not a full
 * CommonMark implementation — just the subset a blog post needs
 * (headings, bold/italic, links, images, lists, blockquotes,
 * paragraphs) with zero external dependencies, since this runs on
 * shared hosting with no Composer assumed.
 *
 * Input text is HTML-escaped before any markdown transform is applied,
 * so pasted content can't inject raw HTML/script tags.
 */

declare(strict_types=1);

function markdown_to_html(string $markdown): string
{
    $lines = preg_split('/\r\n|\r|\n/', $markdown);
    $html = [];
    $i = 0;
    $n = count($lines);
    $inList = false;
    $inQuote = false;

    $closeList = function () use (&$html, &$inList) {
        if ($inList) {
            $html[] = '</ul>';
            $inList = false;
        }
    };
    $closeQuote = function () use (&$html, &$inQuote) {
        if ($inQuote) {
            $html[] = '</blockquote>';
            $inQuote = false;
        }
    };

    while ($i < $n) {
        $line = $lines[$i];
        $trimmed = trim($line);

        if ($trimmed === '') {
            $closeList();
            $closeQuote();
            $i++;
            continue;
        }

        // Headings
        if (preg_match('/^(#{1,3})\s+(.*)$/', $trimmed, $m)) {
            $closeList();
            $closeQuote();
            $level = strlen($m[1]);
            $html[] = "<h{$level}>" . markdown_inline($m[2]) . "</h{$level}>";
            $i++;
            continue;
        }

        // Blockquote
        if (preg_match('/^>\s?(.*)$/', $trimmed, $m)) {
            $closeList();
            if (!$inQuote) {
                $html[] = '<blockquote>';
                $inQuote = true;
            }
            $html[] = '<p>' . markdown_inline($m[1]) . '</p>';
            $i++;
            continue;
        }
        $closeQuote();

        // Unordered list item
        if (preg_match('/^[-*]\s+(.*)$/', $trimmed, $m)) {
            if (!$inList) {
                $html[] = '<ul>';
                $inList = true;
            }
            $html[] = '<li>' . markdown_inline($m[1]) . '</li>';
            $i++;
            continue;
        }
        $closeList();

        // Standalone image line
        if (preg_match('/^!\[([^\]]*)\]\(([^)]+)\)$/', $trimmed, $m)) {
            $alt = htmlspecialchars($m[1], ENT_QUOTES);
            $src = htmlspecialchars($m[2], ENT_QUOTES);
            $html[] = "<img src=\"{$src}\" alt=\"{$alt}\" loading=\"lazy\">";
            $i++;
            continue;
        }

        // Paragraph — collect consecutive non-blank, non-special lines
        $buffer = [$trimmed];
        $i++;
        while ($i < $n && trim($lines[$i]) !== '' && !preg_match('/^(#{1,3}\s|[-*]\s|>|!\[)/', trim($lines[$i]))) {
            $buffer[] = trim($lines[$i]);
            $i++;
        }
        $html[] = '<p>' . markdown_inline(implode(' ', $buffer)) . '</p>';
    }

    $closeList();
    $closeQuote();

    return implode("\n", $html);
}

/** Inline formatting within a single block: escape first, then apply markdown. */
function markdown_inline(string $text): string
{
    $escaped = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');

    // Images (inline)
    $escaped = preg_replace_callback('/!\[([^\]]*)\]\(([^)]+)\)/', function ($m) {
        return '<img src="' . $m[2] . '" alt="' . $m[1] . '" loading="lazy">';
    }, $escaped);

    // Links
    $escaped = preg_replace('/\[([^\]]+)\]\(([^)]+)\)/', '<a href="$2">$1</a>', $escaped);

    // Bold
    $escaped = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $escaped);

    // Italic (single asterisk, not already consumed by bold)
    $escaped = preg_replace('/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/', '<em>$1</em>', $escaped);

    return $escaped;
}

/** Plain-text excerpt derived from markdown, for meta descriptions / OG tags. */
function markdown_to_plain_excerpt(string $markdown, int $maxLength = 160): string
{
    $text = preg_replace('/[#>*\-\[\]!()]/', '', $markdown);
    $text = preg_replace('/\s+/', ' ', trim($text));
    if (mb_strlen($text) <= $maxLength) {
        return $text;
    }
    return mb_substr($text, 0, $maxLength - 1) . '…';
}
