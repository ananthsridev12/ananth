(function () {
  'use strict';

  // ── dataLayer helper ──────────────────────────────────────────────────────
  window.dataLayer = window.dataLayer || [];
  function gtmPush(obj) {
    window.dataLayer.push(obj);
  }

  // ── Expose globally so inline scripts (e.g. chat intro) can call it ───────
  window.gtmPush = gtmPush;

  document.addEventListener('DOMContentLoaded', function () {

    var currentPage = window.location.pathname;

    // ── 1. CTA Button Clicks ────────────────────────────────────────────────
    document.querySelectorAll('.cta-button, .cta-btn, .form-submit, .intro-option-btn').forEach(function (el) {
      el.addEventListener('click', function () {
        gtmPush({
          event:          'cta_click',
          event_category: 'CTA',
          event_label:    el.textContent.trim().replace(/\s+/g, ' '),
          event_location: currentPage,
          event_destination: el.getAttribute('href') || ''
        });
      });
    });

    // ── 2. Navigation Clicks ────────────────────────────────────────────────
    document.querySelectorAll('#navMenu .nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        gtmPush({
          event:            'navigation_click',
          event_category:   'Navigation',
          event_label:      link.textContent.trim(),
          event_destination: link.getAttribute('href') || ''
        });
      });
    });

    // ── 3. Logo Click ───────────────────────────────────────────────────────
    var logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('click', function () {
        gtmPush({
          event:          'navigation_click',
          event_category: 'Navigation',
          event_label:    'Logo - Home',
          event_destination: '/'
        });
      });
    }

    // ── 4. External Link Clicks ─────────────────────────────────────────────
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var isExternal = /^https?:\/\//.test(href) && href.indexOf(window.location.hostname) === -1;
      if (isExternal) {
        link.addEventListener('click', function () {
          gtmPush({
            event:          'external_link_click',
            event_category: 'External Link',
            event_label:    link.textContent.trim().replace(/\s+/g, ' ') || href,
            event_destination: href
          });
        });
      }
    });

    // ── 5. Email / Phone Clicks ─────────────────────────────────────────────
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        gtmPush({
          event:          'contact_click',
          event_category: 'Contact',
          event_label:    'Email - ' + (link.getAttribute('href').replace('mailto:', '')),
          event_location: currentPage
        });
      });
    });

    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        gtmPush({
          event:          'contact_click',
          event_category: 'Contact',
          event_label:    'Phone - ' + (link.getAttribute('href').replace('tel:', '')),
          event_location: currentPage
        });
      });
    });

    // ── 6. Social Media Clicks ──────────────────────────────────────────────
    document.querySelectorAll('.contact-social-btn, .footer-social a').forEach(function (link) {
      link.addEventListener('click', function () {
        gtmPush({
          event:          'social_click',
          event_category: 'Social Media',
          event_label:    link.textContent.trim().replace(/\s+/g, ' ') || link.getAttribute('href'),
          event_destination: link.getAttribute('href') || ''
        });
      });
    });

    // ── 7. Contact Form Submission ──────────────────────────────────────────
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function () {
        var service = contactForm.querySelector('[name="service"]');
        gtmPush({
          event:          'form_submit',
          event_category: 'Form',
          event_label:    'Contact Form',
          form_service:   service ? service.value : ''
        });
      });
    }

    // ── 8. Newsletter Form Submission ───────────────────────────────────────
    var newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function () {
        gtmPush({
          event:          'form_submit',
          event_category: 'Form',
          event_label:    'Newsletter Signup'
        });
      });
    }

    // ── 9. Portfolio Filter Clicks ──────────────────────────────────────────
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        gtmPush({
          event:          'portfolio_filter',
          event_category: 'Portfolio',
          event_label:    btn.textContent.trim(),
          filter_value:   btn.getAttribute('data-filter') || ''
        });
      });
    });

    // ── 10. Blog Post Clicks ────────────────────────────────────────────────
    document.querySelectorAll('.blog-card a, .read-more').forEach(function (link) {
      link.addEventListener('click', function () {
        var card  = link.closest('.blog-card');
        var title = card ? (card.querySelector('h3') || card.querySelector('h2') || {}).textContent : '';
        gtmPush({
          event:          'blog_click',
          event_category: 'Blog',
          event_label:    (title || link.textContent).trim().replace(/\s+/g, ' '),
          event_destination: link.getAttribute('href') || ''
        });
      });
    });

    // ── 11. Case Study / Portfolio Card Clicks ──────────────────────────────
    document.querySelectorAll('.portfolio-card a, .case-study-card a').forEach(function (link) {
      link.addEventListener('click', function () {
        var card  = link.closest('.portfolio-card, .case-study-card');
        var title = card ? (card.querySelector('h3') || card.querySelector('h2') || {}).textContent : '';
        gtmPush({
          event:          'portfolio_click',
          event_category: 'Portfolio',
          event_label:    (title || link.textContent).trim().replace(/\s+/g, ' '),
          event_destination: link.getAttribute('href') || ''
        });
      });
    });

    // ── 12. Resume / File Download ──────────────────────────────────────────
    document.querySelectorAll('a[href*="resume"], a[href*=".pdf"], a[href*="Resume"]').forEach(function (link) {
      link.addEventListener('click', function () {
        gtmPush({
          event:          'file_download',
          event_category: 'Download',
          event_label:    link.textContent.trim().replace(/\s+/g, ' ') || link.getAttribute('href'),
          file_url:       link.getAttribute('href') || ''
        });
      });
    });

    // ── 13. Scroll Depth ────────────────────────────────────────────────────
    var scrollMarks    = { 25: false, 50: false, 75: false, 90: false };
    var ticking        = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var pct = ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
          [25, 50, 75, 90].forEach(function (mark) {
            if (!scrollMarks[mark] && pct >= mark) {
              scrollMarks[mark] = true;
              gtmPush({
                event:          'scroll_depth',
                event_category: 'Engagement',
                event_label:    mark + '%',
                scroll_depth:   mark,
                page_path:      currentPage
              });
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // ── 14. Time on Page (30s, 60s, 120s) ──────────────────────────────────
    [30, 60, 120].forEach(function (seconds) {
      setTimeout(function () {
        gtmPush({
          event:          'time_on_page',
          event_category: 'Engagement',
          event_label:    seconds + 's',
          seconds_spent:  seconds,
          page_path:      currentPage
        });
      }, seconds * 1000);
    });

  }); // end DOMContentLoaded

})();
