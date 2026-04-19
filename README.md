# Overwatch Strategic Solutions — Website Deployment Guide

## File structure

```
/
├── index.html              Homepage
├── services.html           Services detail page
├── packages.html           Packages, comparison table, FAQ
├── why-oss.html            About / Why OSS / Our story
├── contact.html            Contact form + WhatsApp + office details
├── css/
│   └── styles.css          Shared stylesheet (all pages use this)
├── js/
│   └── main.js             Shared scripts (nav, reveals, form handler)
├── assets/
│   └── logo.jpg            OSS logo
└── blog/
    ├── index.html                      Blog listing page
    ├── mom-compliance-checklist.html   Article 1
    ├── stop-work-order-cost.html       Article 2
    └── bizsafe-level-3-guide.html      Article 3
```

---

## Step 1: Set up the contact form (Formspree)

The contact form on `contact.html` is wired to Formspree — a free service that receives form submissions and emails them to you, no backend required.

1. Go to **https://formspree.io** and create a free account using `admin@overwatch.com.sg`
2. Create a new form — call it "OSS Contact"
3. Copy the form endpoint URL (looks like `https://formspree.io/f/abcdefgh`)
4. Open `contact.html` and find this line:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Replace `YOUR_FORM_ID` with your actual Formspree form ID (the part after `/f/`)
6. Save the file

Free Formspree allows 50 submissions/month. Upgrade to S$15/month for unlimited.

---

## Step 2: Deploy to Netlify (recommended — free)

Netlify is the fastest, most reliable way to deploy a static HTML website to a custom domain. It's free for this use case.

### Option A: Drag-and-drop (no technical knowledge required)

1. Go to **https://app.netlify.com** and sign up (use Google or GitHub)
2. On the dashboard, click **"Add new site" → "Deploy manually"**
3. Select your entire website folder (the one containing `index.html`, `services.html`, `blog/`, etc.)
4. Drag and drop the folder onto the Netlify deploy area
5. Netlify will give you a temporary URL like `https://random-name.netlify.app` — your site is live

### Option B: GitHub (recommended for ongoing updates)

1. Create a free account at **https://github.com**
2. Create a new repository called `oss-website`
3. Upload all your site files to the repository
4. In Netlify: **"Add new site" → "Import an existing project" → GitHub**
5. Select your repository — Netlify will auto-deploy

**Advantage:** Every time you update a file in GitHub, the site rebuilds automatically in ~30 seconds.

---

## Step 3: Connect your domain (overwatch.com.sg)

You've registered `overwatch.com.sg`. To point it to Netlify:

### Find your domain registrar

Your domain registrar is wherever you purchased `overwatch.com.sg`. This is likely:
- **SGNIC** (sgnic.sg)
- **Vodien**
- **Exabytes**
- **GoDaddy Singapore**

Log in and go to DNS settings / Domain Management.

### Add DNS records

In Netlify, go to **Site Settings → Domain Management → Add Custom Domain** and enter `overwatch.com.sg`. Netlify will show you the DNS records to add.

Typically, you'll add:
```
Type: A         Name: @         Value: 75.2.60.5
Type: CNAME     Name: www       Value: [your-site].netlify.app
```

Add both records in your domain registrar's DNS settings.

### Wait for propagation

DNS changes take 15 minutes to 48 hours to propagate globally. Usually under 2 hours for .sg domains.

### Enable HTTPS (free, automatic)

Once your domain is connected, go to **Netlify → Site Settings → Domain Management → HTTPS** and click **"Verify DNS configuration"** then **"Provision certificate"**. This gives you a free SSL certificate (the padlock in the browser).

---

## Step 4: Add a favicon

A favicon is the small icon that appears in browser tabs. To add one:

1. Create a 32×32 pixel version of the OSS logo (your designer or a tool like https://favicon.io can do this)
2. Save it as `favicon.ico` in the root folder (same level as `index.html`)
3. Add this line inside the `<head>` of every HTML file:
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico">
   ```

---

## Step 5: Set up Google Analytics (optional but recommended)

Track visitor numbers, most-viewed pages, and how people find your site.

1. Go to **https://analytics.google.com** and create a free account
2. Create a new property for `overwatch.com.sg`
3. Copy the measurement ID (looks like `G-XXXXXXXXXX`)
4. Add this code before the `</head>` tag in every HTML page:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your actual measurement ID.

---

## Step 6: Submit to Google Search Console

Get your site indexed on Google so potential clients can find it.

1. Go to **https://search.google.com/search-console**
2. Add your property: `https://overwatch.com.sg`
3. Verify ownership using the HTML file method (Google will give you a small file to upload to your site root)
4. Submit your sitemap — or simply submit your main URLs manually

---

## Updating the site after launch

### Updating text / copy

Open the relevant `.html` file in any text editor (Notepad on Windows, TextEdit on Mac, or VS Code which is free). Find the text you want to change, edit it, save the file, then re-upload to Netlify using the drag-and-drop method or push to GitHub.

### Adding a new blog post

1. Copy `blog/bizsafe-level-3-guide.html` as a template
2. Rename it (e.g. `blog/new-article-title.html`)
3. Update the `<title>`, `<meta name="description">`, the `.eyebrow`, `h1`, article body content
4. Add a new card linking to it in `blog/index.html` and optionally on the homepage blog teaser

### Updating prices

Search for `S$480`, `S$1,280`, or `S$2,880` across all HTML files. Update each instance. Prices appear on: `index.html`, `packages.html`.

---

## Quick reference: important file locations

| What you want to change | Which file |
|---|---|
| Homepage hero copy | `index.html` — find `<section class="hero">` |
| Package pricing | `index.html` + `packages.html` — search `package-price-amount` |
| Contact details | All footers + `contact.html` |
| About / story | `why-oss.html` — find `<div class="story-body">` |
| Blog articles | `/blog/` folder |
| Colours and fonts | `css/styles.css` — `:root` variables at the top |

---

## Technical notes

- No JavaScript frameworks required — pure HTML/CSS/JS
- All fonts loaded from Google Fonts (requires internet connection to render correctly)
- Contact form uses Formspree — requires Formspree account setup (Step 1)
- Mobile responsive down to 320px viewport width
- Tested on Chrome, Safari, Firefox, Edge
- Page load: under 800KB total including fonts (no images other than logo)

---

*Website built for Overwatch Strategic Solutions, Singapore. UEN: 201536119G*
