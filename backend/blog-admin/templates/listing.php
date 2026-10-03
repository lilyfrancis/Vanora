<?php
/**
 * Renders the full insights.html content — nav/footer identical to the
 * rest of the site. With zero published posts it reproduces the
 * original "coming soon" copy exactly, so nothing changes until the
 * first post goes live.
 */

declare(strict_types=1);

function blog_render_listing_html(array $publishedPosts): string
{
    $mainContent = empty($publishedPosts)
        ? blog_insights_empty_state()
        : blog_insights_grid($publishedPosts);

    return <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Insights | Vanora Partners</title>
  <meta name="description" content="Practical thinking on revenue growth, AI automation and business transformation from Vanora Partners.">

  <meta property="og:title" content="Insights | Vanora Partners">
  <meta property="og:description" content="Practical thinking on revenue growth, AI automation and business transformation from Vanora Partners.">
  <meta property="og:image" content="assets/og-image-placeholder.svg">
  <meta property="og:type" content="website">

  <link rel="icon" href="assets/logo-icon-vp-navy.png" type="image/png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="styles.css">
</head>
<body id="top">

  <header class="site-header" id="siteHeader">
    <nav class="nav" aria-label="Primary navigation">
      <a class="nav__logo" href="index.html" aria-label="Vanora Partners — home">
        <img class="nav__logo-img nav__logo-img--white" src="assets/logo-full-white.png" alt="Vanora Partners" width="210" height="40">
        <img class="nav__logo-img nav__logo-img--navy" src="assets/logo-full-navy.png" alt="Vanora Partners" width="210" height="40">
      </a>

      <ul class="nav__links">
        <li><a href="index.html">Home</a></li>
        <li class="nav__dropdown">
          <button type="button" class="nav__dropdown-trigger" aria-expanded="false" aria-controls="solutionsDropdown">
            Solutions
            <svg class="nav__dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <ul class="nav__dropdown-menu" id="solutionsDropdown">
            <li><a href="solutions.html#solutions-selector">Find your solution</a></li>
            <li><a href="solutions.html#ai-solutions">Vanora AI</a></li>
            <li><a href="solutions.html#revenue-engine">Revenue Engine</a></li>
          </ul>
        </li>
        <li><a href="industries.html">Industries</a></li>
        <li><a href="solutions.html#approach">How We Work</a></li>
        <li><a href="insights.html">Insights</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="index.html#contact">Contact</a></li>
      </ul>

      <a href="index.html#contact" class="btn btn--primary nav__cta">Book a strategy session</a>

      <button type="button" class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
      </button>
    </nav>
  </header>

  <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
    <img class="mobile-menu__icon" src="assets/logo-icon-vp-white.png" alt="" width="48" height="48">
    <nav class="mobile-menu__links" aria-label="Mobile navigation">
      <a href="index.html">Home</a>
      <a href="solutions.html#solutions-selector">Solutions</a>
      <a href="solutions.html#ai-solutions" class="mobile-menu__sublink">Vanora AI</a>
      <a href="solutions.html#revenue-engine" class="mobile-menu__sublink">Revenue Engine</a>
      <a href="industries.html">Industries</a>
      <a href="solutions.html#approach">How We Work</a>
      <a href="insights.html">Insights</a>
      <a href="about.html">About</a>
      <a href="index.html#contact">Contact</a>
    </nav>
    <a href="index.html#contact" class="btn btn--primary">Book a strategy session</a>
  </div>

  <main>
{$mainContent}
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__col site-footer__col--brand">
        <img class="site-footer__logo" src="assets/logo-full-white.png" alt="Vanora Partners" width="180" height="34">
        <p class="site-footer__desc">Vanora Partners is an AI-powered revenue growth and business transformation company helping organisations generate opportunities, automate operations, improve decision-making and build predictable growth systems.</p>
        <p class="site-footer__tagline">Strategy Beyond Expectations</p>
      </div>

      <div class="site-footer__col">
        <p class="site-footer__col-label">Solutions</p>
        <ul class="site-footer__links">
          <li><a href="solutions.html#ai-solutions">ExecutiveOS AI</a></li>
          <li><a href="solutions.html#ai-solutions">CashFlow Recovery AI</a></li>
          <li><a href="solutions.html#ai-solutions">TenderPilot AI</a></li>
          <li><a href="solutions.html#ai-solutions">ProposalForge AI</a></li>
          <li><a href="solutions.html#ai-solutions">RenewalGuard AI</a></li>
        </ul>
      </div>

      <div class="site-footer__col">
        <p class="site-footer__col-label">Company</p>
        <ul class="site-footer__links">
          <li><a href="about.html">About</a></li>
          <li><a href="solutions.html#approach">How We Work</a></li>
          <li><a href="insights.html">Insights</a></li>
          <li><a href="index.html#contact">Contact</a></li>
          <li><a href="index.html#contact">Book a strategy session</a></li>
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
      <p>&copy; <span id="footerYear">2026</span> Vanora Partners. All rights reserved. &middot; <a href="https://vanorapartners.com/privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a> &middot; <a href="index.html#terms-placeholder">Terms</a></p>
    </div>
  </footer>

  <script src="main.js"></script>
</body>
</html>
HTML;
}

function blog_insights_empty_state(): string
{
    return <<<HTML
    <div class="page-intro" style="min-height:60vh;display:flex;align-items:center;">
      <div class="page-intro__inner">
        <p class="eyebrow reveal" style="--delay:0ms">
          <span class="eyebrow__diamond" aria-hidden="true">&#9670;</span> Insights
        </p>
        <h1 class="page-intro__heading reveal" style="--delay:80ms">Coming soon.</h1>
        <p class="page-intro__body reveal" style="--delay:160ms">We're building out a library of practical thinking on revenue growth, AI automation and business transformation. Nothing published here yet — check back, or <a href="index.html#contact" style="color:var(--gold-soft);text-decoration:underline;">book a strategy session</a> in the meantime.</p>
      </div>
    </div>
HTML;
}

function blog_insights_grid(array $posts): string
{
    $cards = [];
    $delay = 0;
    foreach ($posts as $post) {
        $title = htmlspecialchars($post['title'], ENT_QUOTES, 'UTF-8');
        $excerpt = htmlspecialchars($post['excerpt'], ENT_QUOTES, 'UTF-8');
        $slug = htmlspecialchars($post['slug'], ENT_QUOTES, 'UTF-8');
        $date = $post['published_at'] ? date('j F Y', strtotime($post['published_at'])) : '';
        $image = $post['featured_image'] ?: '';
        $imageAlt = htmlspecialchars($post['featured_image_alt'] ?: $post['title'], ENT_QUOTES, 'UTF-8');

        $imageTag = $image
            ? '<img src="' . htmlspecialchars($image, ENT_QUOTES) . '" alt="' . $imageAlt . '" width="1536" height="1024" loading="lazy" decoding="async">'
            : '<div class="placeholder post-card__image-placeholder"><span class="placeholder__label">NO FEATURED IMAGE</span></div>';

        $cards[] = <<<CARD
          <article class="post-card reveal" style="--delay:{$delay}ms">
            <a href="blog/{$slug}.html" class="post-card__image-wrap">
              {$imageTag}
            </a>
            <p class="post-card__date">{$date}</p>
            <h3><a href="blog/{$slug}.html">{$title}</a></h3>
            <p class="post-card__excerpt">{$excerpt}</p>
            <a href="blog/{$slug}.html" class="link-arrow">Read more <span aria-hidden="true">&rarr;</span></a>
          </article>
CARD;
        $delay += 80;
    }
    $cardsHtml = implode("\n", $cards);

    return <<<HTML
    <div class="page-intro">
      <div class="page-intro__inner">
        <p class="eyebrow reveal" style="--delay:0ms">
          <span class="eyebrow__diamond" aria-hidden="true">&#9670;</span> Insights
        </p>
        <h1 class="page-intro__heading reveal" style="--delay:80ms">Ideas on revenue, AI and growth.</h1>
        <p class="page-intro__body reveal" style="--delay:160ms">Practical thinking from the Vanora team on building systems that work.</p>
      </div>
    </div>

    <section class="post-grid-section">
      <div class="post-grid-section__inner">
        <div class="post-grid">
{$cardsHtml}
        </div>
      </div>
    </section>
HTML;
}
