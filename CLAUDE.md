# CLAUDE.md — Project Context for Claude Code

This file gives Claude Code full context about this project so every session starts informed.

---

## Project Overview

**Site:** Personal portfolio / resume website for Ananth Sridev
**URL:** https://ananth.easi7.in
**GitHub:** https://github.com/ananthsridev12/ananth.git
**Stack:** Jekyll static site generator + plain HTML/CSS/JS
**Deployment:** cPanel — copies `_site/` directory directly. The `_site/` folder MUST be committed and pushed with every change.

---

## Critical Workflow Rules

1. **Always run `jekyll build` before committing** — the `_site/` folder must be up to date.
2. **Always push to remote after every commit** — no need to ask, just push.
3. **No approval needed** — make edits, build, commit, and push autonomously.
4. **Never ask for permission** before making edits.

```bash
# Standard deploy sequence (run from project root D:\Projects\ananth.easi7.in)
jekyll build
git add -A
git commit -m "..."
git push
```

> Note: `bundle exec jekyll build` fails — use plain `jekyll build` from the project root.

---

## File Architecture

### Jekyll Pages (use `layout: page` → `_layouts/page.html` → `_layouts/default.html`)
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, stats bar, services grid, results, process, blog preview, CTA |
| `about.html` | About page — work timeline, stats, contact card |
| `services.html` | Services page — service cards + "How an Engagement Works" steps |
| `portfolio.html` | Portfolio — filterable project cards |
| `case-studies.html` | Case studies — portfolio-card style with filter buttons |
| `blog.html` | Blog listing — all 11 posts in grid, newsletter form |
| `contact.html` | Contact page — detail cards + contact form (FormSubmit.co) |
| `resume.html` | Resume page |
| `privacy-policy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `thank-you.html` | Form redirect destination |

### Standalone HTML (NOT Jekyll layout — have their own nav/footer hardcoded)
| File | Notes |
|------|-------|
| `tech-stack.html` | Standalone. Has own `<style>` block for responsive grids. Cannot use `site.data.site.*` Liquid. |

### Layouts & Includes
| Path | Purpose |
|------|---------|
| `_layouts/default.html` | Base layout — includes head, header, footer |
| `_layouts/page.html` | Wraps content in default layout |
| `_layouts/post.html` | Blog post layout — article + sidebar |
| `_includes/head.html` | `<head>` tag content |
| `_includes/header.html` | Nav bar |
| `_includes/footer.html` | Footer — uses `site.data.site.*` for all values |

### Config & Data
| Path | Purpose |
|------|---------|
| `_config.yml` | Jekyll config — url, baseurl, permalink format |
| `_data/site.yml` | **Single source of truth** for stats, contact info, social links, form settings |
| `_posts/` | 11 blog posts (HTML files with front matter) |
| `assets/css/styles.css` | Global stylesheet |
| `assets/js/main.js` | JS — nav toggle, portfolio filters |
| `assets/js/config.js` | JS config |

---

## _data/site.yml — The Config File

This is the **only file that needs editing** to update stats, contact details, or social links across the entire site:

```yaml
years_experience: "6+"
projects_delivered: "150+"
avg_traffic_growth: "3x"
avg_cpl_reduction: "40%"
conversion_improvement: "25%"

email: "m.ananthsridev@gmail.com"
phone: "+91 9790777702"
location: "Chennai, India"

linkedin: "https://www.linkedin.com/in/ananthsridev/"
twitter: "https://twitter.com/ananthsridev"
facebook: "https://www.facebook.com/ananthsridev"
instagram: "https://www.instagram.com/ananthsridev"

newsletter_redirect: "https://ananth.easi7.in/thank-you.html"
```

Reference in Liquid templates as `{{ site.data.site.email }}`, `{{ site.data.site.years_experience }}`, etc.
Social links are wrapped in `{% if site.data.site.linkedin %}` conditionals — leave blank to hide.

**Pages that pull from site.yml:** footer, index.html (stats bar), about.html (stats + contact card), blog.html (newsletter form), contact.html (form + detail cards).

---

## Key CSS Patterns

### Responsive grids
- Inline `style="display:grid; grid-template-columns:repeat(3,1fr)"` cannot be overridden by external CSS.
- Fix: add IDs to the grid divs and use a `<style>` block inside the HTML file with `!important` media queries.
- Example in `index.html`: `#home-stats`, `#home-services`, `#home-results`, `#home-process`, `#home-blog`

### Overflow prevention
```css
html { overflow-x: hidden; max-width: 100vw; }
body { max-width: 100vw; }
/* Grid children need: */
min-width: 0; overflow-wrap: break-word; word-break: break-word;
```

### Mobile breakpoints in styles.css
- `1200px` — footer grid collapses
- `1024px` — portfolio grid 2→1 col
- `900px` — most 3-col grids → 2-col
- `768px` — single column, about cert/edu grid collapses
- `480px` — timeline entries stack vertically, font reductions

---

## Character Encoding Rules

**Always use HTML entities — never paste raw Unicode/emoji into HTML files.**

| Character | Entity |
|-----------|--------|
| → (arrow) | `&rarr;` |
| ← | `&larr;` |
| — (em dash) | `&mdash;` |
| – (en dash) | `&ndash;` |
| ✔ | `&#10004;` |
| 📊 | `&#128202;` |
| 🎯 | `&#127919;` |
| 🔍 | `&#128269;` |
| 💻 | `&#128187;` |
| ⚙️ | `&#9881;&#65039;` |
| 📈 | `&#128200;` |
| ⚡ | `&#9889;` |

Raw emoji/Unicode stored in files served without correct MIME headers will render as garbled `Ã¢Å"â€°` sequences.

---

## Contact Form

Uses **FormSubmit.co** (free, no backend needed).
Form action: `https://formsubmit.co/{{ site.data.site.email }}`
Hidden fields: `_subject`, `_captcha` (false), `_template` (table), `_next` (redirect URL)
First submission requires one-time email verification from FormSubmit.

---

## Blog Posts

11 posts in `_posts/` — all have full content (600–900 words). No prev/next navigation (removed by user request). Post layout is `_layouts/post.html` — shows related posts and all articles in sidebar.

Permalink format: `/blog/:slug.html` (set in `_config.yml`)

---

## What Was Fixed (History)

| Issue | Fix |
|-------|-----|
| Garbled encoding (`Ã¢â‚¬â€`) | Replaced raw Unicode with HTML entities |
| Mobile overflow on homepage | Added `<style>` block with IDs + `!important` media queries |
| About page job responsibilities overflow | `min-width:0; overflow-wrap:break-word` on `.timeline-body` |
| Blog prev/next nav (big block) | Completely removed from `_layouts/post.html` |
| Tech-stack responsive overflow | Moved grid styles to `<style>` block with breakpoints |
| Contact page details invisible | Rewrote with inline styles (`.contact-label`, `.contact-value` had no CSS) |
| Services "How an Engagement Works" broken | Rewrote as plain HTML with `.svc-steps` class |
| Featured post block on blog | Removed |
| `View Project →` garbled | Replaced with `&rarr;` entity |
| Social media icons text missing in footer | Fixed SVG + `<span>` structure |

---

## Resume Source

Ananth's resume in markdown is at: `includes/resumes/Ananth -Resume.md`
Use this as the authoritative source when updating the about page or resume page content.

---

## Owner Info

- **Name:** Ananth Sridev
- **Role:** Digital Marketing Specialist, 6+ years
- **Current employer:** Ark Neo Financial Services (DhanLAP) — since March 2022
- **Location:** Chennai, India
- **Specialties:** GA4, GTM, Google Ads, Meta Ads, LinkedIn Ads, SEO/AEO, CRM automation, SQL, Looker Studio
