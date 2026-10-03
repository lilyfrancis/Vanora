<?php
/**
 * Renders the full static HTML page for one published post. Output is
 * written straight to /blog/<slug>.html by lib/render.php — this keeps
 * the public site 100% static; PHP only runs inside the admin.
 */

declare(strict_types=1);

function blog_render_post_html(array $post): string
{
    $title = htmlspecialchars($post['title'], ENT_QUOTES, 'UTF-8');
    $excerpt = htmlspecialchars($post['excerpt'], ENT_QUOTES, 'UTF-8');
    $author = htmlspecialchars($post['author'] ?: 'Vanora Partners', ENT_QUOTES, 'UTF-8');
    $bodyHtml = $post['body_html']; // already safe — produced by markdown_to_html()'s escaping
    $publishedDate = $post['published_at'] ? date('j F Y', strtotime($post['published_at'])) : '';
    $image = $post['featured_image'] ?: '';
    $imageAlt = htmlspecialchars($post['featured_image_alt'] ?: $post['title'], ENT_QUOTES, 'UTF-8');
    $ogImage = $image ?: 'assets/og-image-placeholder.svg';

    $imageBlock = $image
        ? '<div class="article__image-frame"><img src="../' . htmlspecialchars($image, ENT_QUOTES) . '" alt="' . $imageAlt . '" width="1600" height="900" loading="eager"></div>'
        : '';

    return <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{$title} | Vanora Partners Insights</title>
  <meta name="description" content="{$excerpt}">

  <meta property="og:title" content="{$title}">
  <meta property="og:description" content="{$excerpt}">
  <meta property="og:image" content="../{$ogImage}">
  <meta property="og:type" content="article">

  <link rel="icon" href="../assets/logo-icon-vp-navy.png" type="image/png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../styles.css">
</head>
<body id="top">

  <header class="site-header" id="siteHeader">
    <nav class="nav" aria-label="Primary navigation">
      <a class="nav__logo" href="../index.html" aria-label="Vanora Partners — home">
        <img class="nav__logo-img nav__logo-img--white" src="../assets/logo-full-white.png" alt="Vanora Partners" width="210" height="40">
        <img class="nav__logo-img nav__logo-img--navy" src="../assets/logo-full-navy.png" alt="Vanora Partners" width="210" height="40">
      </a>

      <ul class="nav__links">
        <li><a href="../index.html">Home</a></li>
        <li class="nav__dropdown">
          <button type="button" class="nav__dropdown-trigger" aria-expanded="false" aria-controls="solutionsDropdown">
            Solutions
            <svg class="nav__dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <ul class="nav__dropdown-menu" id="solutionsDropdown">
            <li><a href="../solutions.html#solutions-selector">Find your solution</a></li>
            <li><a href="../solutions.html#ai-solutions">Vanora AI</a></li>
            <li><a href="../solutions.html#revenue-engine">Revenue Engine</a></li>
          </ul>
        </li>
        <li><a href="../industries.html">Industries</a></li>
        <li><a href="../solutions.html#approach">How We Work</a></li>
        <li><a href="../insights.html">Insights</a></li>
        <li><a href="../about.html">About</a></li>
        <li><a href="../index.html#contact">Contact</a></li>
      </ul>

      <a href="../index.html#contact" class="btn btn--primary nav__cta">Book a strategy session</a>

      <button type="button" class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
      </button>
    </nav>
  </header>

  <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
    <img class="mobile-menu__icon" src="../assets/logo-icon-vp-white.png" alt="" width="48" height="48">
    <nav class="mobile-menu__links" aria-label="Mobile navigation">
      <a href="../index.html">Home</a>
      <a href="../solutions.html#solutions-selector">Solutions</a>
      <a href="../solutions.html#ai-solutions" class="mobile-menu__sublink">Vanora AI</a>
      <a href="../solutions.html#revenue-engine" class="mobile-menu__sublink">Revenue Engine</a>
      <a href="../industries.html">Industries</a>
      <a href="../solutions.html#approach">How We Work</a>
      <a href="../insights.html">Insights</a>
      <a href="../about.html">About</a>
      <a href="../index.html#contact">Contact</a>
    </nav>
    <a href="../index.html#contact" class="btn btn--primary">Book a strategy session</a>
  </div>

  <main>
    <div class="page-intro article-header">
      <div class="page-intro__inner">
        <p class="eyebrow reveal" style="--delay:0ms">
          <span class="eyebrow__diamond" aria-hidden="true">&#9670;</span> Insights
        </p>
        <h1 class="page-intro__heading reveal" style="--delay:80ms">{$title}</h1>
        <p class="article-header__meta reveal" style="--delay:160ms">{$author} &middot; {$publishedDate}</p>
      </div>
    </div>

    <article class="article">
      <div class="article__inner">
        {$imageBlock}
        <div class="article__body reveal" style="--delay:0ms">
          {$bodyHtml}
        </div>
        <a href="../insights.html" class="link-arrow article__back">&larr; Back to Insights</a>
      </div>
    </article>

    <section class="article-cta on-dark">
      <div class="article-cta__inner">
        <p class="article-cta__text">Ready to put this into practice?</p>
        <a href="../index.html#contact" class="btn btn--primary">Book a strategy session</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__col site-footer__col--brand">
        <img class="site-footer__logo" src="../assets/logo-full-white.png" alt="Vanora Partners" width="180" height="34">
        <p class="site-footer__desc">Vanora Partners is an AI-powered revenue growth and business transformation company helping organisations generate opportunities, automate operations, improve decision-making and build predictable growth systems.</p>
        <p class="site-footer__tagline">Strategy Beyond Expectations</p>
      </div>

      <div class="site-footer__col">
        <p class="site-footer__col-label">Solutions</p>
        <ul class="site-footer__links">
          <li><a href="../solutions.html#ai-solutions">ExecutiveOS AI</a></li>
          <li><a href="../solutions.html#ai-solutions">CashFlow Recovery AI</a></li>
          <li><a href="../solutions.html#ai-solutions">TenderPilot AI</a></li>
          <li><a href="../solutions.html#ai-solutions">ProposalForge AI</a></li>
          <li><a href="../solutions.html#ai-solutions">RenewalGuard AI</a></li>
        </ul>
      </div>

      <div class="site-footer__col">
        <p class="site-footer__col-label">Company</p>
        <ul class="site-footer__links">
          <li><a href="../about.html">About</a></li>
          <li><a href="../solutions.html#approach">How We Work</a></li>
          <li><a href="../insights.html">Insights</a></li>
          <li><a href="../index.html#contact">Contact</a></li>
          <li><a href="../index.html#contact">Book a strategy session</a></li>
        </ul>
      </div>

      <div class="site-footer__col">
        <p class="site-footer__col-label">Contact</p>
        <a href="mailto:hello@vanorapartners.com" class="site-footer__email">hello@vanorapartners.com</a>
        <div class="site-footer__socials">
          <span class="site-footer__social-placeholder">[LinkedIn — supply URL]</span>
          <span class="site-footer__social-placeholder">[X — supply URL]</span>
        </div>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p>&copy; <span id="footerYear">2026</span> Vanora Partners. All rights reserved. &middot; <a href="https://vanorapartners.com/privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a> &middot; <a href="../index.html#terms-placeholder">Terms</a></p>
    </div>
  </footer>

  <script src="../main.js"></script>
</body>
</html>
HTML;
}
