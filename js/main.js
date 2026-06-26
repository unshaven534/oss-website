/* =========================================================
   OSS — Shared site scripts  (top-nav + preloader edition)
   ========================================================= */

/* ---- PRELOADER ---- */
(function() {
  if (sessionStorage.getItem('oss_loaded')) return;
  const pl = document.createElement('div');
  pl.id = 'oss-preloader';
  pl.innerHTML = `
    <div class="pl-inner">
      <div class="pl-logo">
        <div class="pl-mark">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="pl-wordmark">
          <span class="pl-name">Overwatch</span>
          <span class="pl-sub">Strategic Solutions</span>
        </div>
      </div>
      <div class="pl-bar"><div class="pl-fill"></div></div>
    </div>`;
  document.documentElement.appendChild(pl);

  window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      pl.classList.add('pl-fade');
      setTimeout(function() {
        pl.remove();
        sessionStorage.setItem('oss_loaded', '1');
      }, 500);
    }, 1400);
  });
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ---- TOP BAR + MAIN NAV ---- */
  const navHTML = `
  <div id="oss-topbar" class="oss-topbar">
    <div class="oss-topbar-inner">
      <div class="topbar-left">
        <a href="tel:+6589534583" class="topbar-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.11 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          +65 8953 4583
        </a>
        <span class="topbar-divider"></span>
        <a href="mailto:admin@overwatch.com.sg" class="topbar-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          admin@overwatch.com.sg
        </a>
        <span class="topbar-divider topbar-divider-hide"></span>
        <span class="topbar-item topbar-divider-hide">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Singapore
        </span>
      </div>
      <div class="topbar-right">
        <a href="https://www.linkedin.com/company/overwatch-strategic-solutions" target="_blank" rel="noopener" class="topbar-social" aria-label="LinkedIn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://wa.me/6589534583" target="_blank" rel="noopener" class="topbar-social" aria-label="WhatsApp">
          <svg width="13" height="13" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.733 5.473 2.018 7.774L.057 31.314a.75.75 0 00.918.918l7.51-1.957A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 20.126c-.397-.199-2.35-1.16-2.714-1.292-.363-.133-.628-.199-.892.199s-1.026 1.292-1.257 1.557c-.232.264-.464.298-.861.1-.397-.2-1.676-.618-3.193-1.97-1.18-1.052-1.977-2.35-2.208-2.748-.232-.397-.025-.612.174-.81.178-.178.397-.464.596-.695.198-.232.264-.397.397-.662.132-.264.066-.497-.033-.695-.1-.2-.892-2.152-1.224-2.946-.322-.773-.65-.668-.892-.68-.231-.012-.496-.015-.761-.015-.264 0-.695.1-1.059.497-.363.397-1.39 1.358-1.39 3.312s1.423 3.843 1.622 4.108c.198.264 2.8 4.277 6.782 5.997.948.41 1.687.654 2.264.837.951.303 1.816.26 2.5.157.763-.114 2.35-.96 2.682-1.888.331-.928.331-1.723.232-1.888-.1-.165-.363-.265-.76-.464z"/></svg>
        </a>
      </div>
    </div>
  </div>

  <header id="oss-header" class="oss-header">
    <div class="oss-header-inner">
      <a href="/index.html" class="oss-logo" aria-label="Overwatch Strategic Solutions — home">
        <img src="/assets/logo.jpg" alt="OSS logo" class="oss-logo-img">
        <div class="oss-logo-text">
          <span class="oss-logo-name">Overwatch</span>
          <span class="oss-logo-sub">Strategic Solutions</span>
        </div>
      </a>

      <nav class="oss-nav" id="ossNav" aria-label="Main navigation">
        <div class="oss-nav-item oss-has-dropdown">
          <button class="oss-nav-btn" aria-expanded="false" aria-haspopup="true">
            Solutions
            <svg class="oss-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="oss-dropdown" role="menu">
            <div class="oss-dropdown-col">
              <div class="oss-dropdown-heading">Services</div>
              <a href="/services.html" class="oss-dropdown-item" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div><div class="ddi-label">WSH Retainer</div><div class="ddi-sub">Fractional WSHO support</div></div>
              </a>
              <a href="/services.html#pdpa" class="oss-dropdown-item" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <div><div class="ddi-label">DPO / PDPA</div><div class="ddi-sub">Data protection compliance</div></div>
              </a>
            </div>
            <div class="oss-dropdown-col">
              <div class="oss-dropdown-heading">Packages</div>
              <a href="/packages.html#watch" class="oss-dropdown-item" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                <div><div class="ddi-label">OSS Watch</div><div class="ddi-sub">From S$650/month</div></div>
              </a>
              <a href="/packages.html#guard" class="oss-dropdown-item oss-dropdown-featured" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div><div class="ddi-label">OSS Guard <span class="ddi-badge">Popular</span></div><div class="ddi-sub">From S$1,200/month</div></div>
              </a>
              <a href="/packages.html#overwatch" class="oss-dropdown-item" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <div><div class="ddi-label">OSS Overwatch</div><div class="ddi-sub">From S$2,500/month</div></div>
              </a>
            </div>
            <div class="oss-dropdown-col">
              <div class="oss-dropdown-heading">Industries</div>
              <a href="/industry-fnb.html" class="oss-dropdown-item" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                <div><div class="ddi-label">F&amp;B</div><div class="ddi-sub">Kitchens &amp; restaurants</div></div>
              </a>
              <a href="/industry-workshop.html" class="oss-dropdown-item" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
                <div><div class="ddi-label">Workshop &amp; Fabrication</div><div class="ddi-sub">Machinery &amp; metalwork</div></div>
              </a>
              <a href="/industry-warehouse.html" class="oss-dropdown-item" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                <div><div class="ddi-label">Warehouse &amp; Logistics</div><div class="ddi-sub">Storage &amp; distribution</div></div>
              </a>
              <a href="/industry-marine.html" class="oss-dropdown-item" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 20h20M4 20V10l8-6 8 6v10"/><path d="M12 20v-6"/><path d="M8 20v-4h8v4"/></svg>
                <div><div class="ddi-label">Marine &amp; Vessels</div><div class="ddi-sub">Offshore &amp; vessel ops</div></div>
              </a>
            </div>
          </div>
        </div>

        <div class="oss-nav-item oss-has-dropdown">
          <button class="oss-nav-btn" aria-expanded="false" aria-haspopup="true">
            Resources
            <svg class="oss-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="oss-dropdown oss-dropdown-sm" role="menu">
            <a href="/blog/index.html" class="oss-dropdown-item" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <div><div class="ddi-label">Blog &amp; Guides</div><div class="ddi-sub">MOM compliance articles</div></div>
            </a>
            <a href="/cost-calculator.html" class="oss-dropdown-item" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
              <div><div class="ddi-label">Cost Calculator</div><div class="ddi-sub">Estimate your WSH spend</div></div>
            </a>
            <a href="/faq.html" class="oss-dropdown-item" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div><div class="ddi-label">FAQ</div><div class="ddi-sub">Common WSH questions</div></div>
            </a>
            <a href="/referral.html" class="oss-dropdown-item" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              <div><div class="ddi-label">Referral Programme</div><div class="ddi-sub">Earn for every referral</div></div>
            </a>
          </div>
        </div>

        <div class="oss-nav-item oss-has-dropdown">
          <button class="oss-nav-btn" aria-expanded="false" aria-haspopup="true">
            About Us
            <svg class="oss-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="oss-dropdown oss-dropdown-sm" role="menu">
            <a href="/why-oss.html" class="oss-dropdown-item" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              <div><div class="ddi-label">Why OSS</div><div class="ddi-sub">Credentials &amp; approach</div></div>
            </a>
            <a href="/contact.html" class="oss-dropdown-item" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              <div><div class="ddi-label">Contact</div><div class="ddi-sub">Get in touch with us</div></div>
            </a>
          </div>
        </div>
      </nav>

      <div class="oss-header-ctas">
        <a href="/contact.html" class="oss-btn-ghost">Get in touch</a>
        <a href="/intake.html" class="oss-btn-primary">Discuss your requirements</a>
      </div>

      <button class="oss-hamburger" id="ossHamburger" aria-label="Open navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile nav drawer -->
    <div class="oss-mobile-nav" id="ossMobileNav" aria-hidden="true">
      <div class="mob-section">
        <div class="mob-heading">Solutions</div>
        <a href="/services.html" class="mob-link">WSH Retainer</a>
        <a href="/services.html#pdpa" class="mob-link">DPO / PDPA</a>
        <a href="/packages.html" class="mob-link">All Packages</a>
        <a href="/industry-fnb.html" class="mob-link">F&amp;B</a>
        <a href="/industry-workshop.html" class="mob-link">Workshop &amp; Fabrication</a>
        <a href="/industry-warehouse.html" class="mob-link">Warehouse &amp; Logistics</a>
        <a href="/industry-marine.html" class="mob-link">Marine &amp; Vessels</a>
      </div>
      <div class="mob-section">
        <div class="mob-heading">Resources</div>
        <a href="/blog/index.html" class="mob-link">Blog &amp; Guides</a>
        <a href="/cost-calculator.html" class="mob-link">Cost Calculator</a>
        <a href="/faq.html" class="mob-link">FAQ</a>
        <a href="/referral.html" class="mob-link">Referral Programme</a>
      </div>
      <div class="mob-section">
        <div class="mob-heading">About Us</div>
        <a href="/why-oss.html" class="mob-link">Why OSS</a>
        <a href="/contact.html" class="mob-link">Contact</a>
      </div>
      <div class="mob-ctas">
        <a href="/intake.html" class="oss-btn-primary" style="display:block;text-align:center;">Discuss your requirements</a>
        <a href="/contact.html" class="mob-link" style="text-align:center;margin-top:8px;">Get in touch</a>
      </div>
    </div>
  </header>
  <div class="oss-header-spacer"></div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  /* ---- Active link highlighting ---- */
  const path = window.location.pathname;
  document.querySelectorAll('.oss-dropdown-item, .mob-link').forEach(link => {
    try {
      const lp = new URL(link.href, window.location.origin).pathname;
      if (lp === path || (path === '/' && lp === '/index.html')) {
        link.classList.add('active');
      }
    } catch(e) {}
  });

  /* ---- Dropdown open/close ---- */
  document.querySelectorAll('.oss-has-dropdown').forEach(item => {
    const btn = item.querySelector('.oss-nav-btn');
    const dd  = item.querySelector('.oss-dropdown');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.oss-has-dropdown').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.oss-nav-btn').setAttribute('aria-expanded','false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      }
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.oss-has-dropdown').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.oss-nav-btn').setAttribute('aria-expanded','false');
    });
  });

  /* ---- Mobile hamburger ---- */
  const ham  = document.getElementById('ossHamburger');
  const mNav = document.getElementById('ossMobileNav');
  ham.addEventListener('click', () => {
    const isOpen = ham.classList.toggle('open');
    mNav.classList.toggle('open', isOpen);
    ham.setAttribute('aria-expanded', isOpen);
    mNav.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mNav.querySelectorAll('.mob-link, .oss-btn-primary').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      mNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Header shadow on scroll ---- */
  const header = document.getElementById('oss-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Contact form ---- */
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = "Sent! We'll reply within 2 business hours.";
      btn.disabled = true;
      btn.style.cssText = 'background:#15803D;color:white;';
      setTimeout(() => { contactForm.reset(); btn.textContent = orig; btn.disabled = false; btn.style.cssText = ''; }, 4500);
    });
  }

  /* ---- WhatsApp float ---- */
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/6589534583?text=Hi%20OSS%2C%20I%20would%20like%20to%20find%20out%20more.';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.className = 'whatsapp-float';
  waBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waBtn.innerHTML = '<svg width="28" height="28" viewBox="0 0 32 32" fill="white"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.733 5.473 2.018 7.774L.057 31.314a.75.75 0 00.918.918l7.51-1.957A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 20.126c-.397-.199-2.35-1.16-2.714-1.292-.363-.133-.628-.199-.892.199s-1.026 1.292-1.257 1.557c-.232.264-.464.298-.861.1-.397-.2-1.676-.618-3.193-1.97-1.18-1.052-1.977-2.35-2.208-2.748-.232-.397-.025-.612.174-.81.178-.178.397-.464.596-.695.198-.232.264-.397.397-.662.132-.264.066-.497-.033-.695-.1-.2-.892-2.152-1.224-2.946-.322-.773-.65-.668-.892-.68-.231-.012-.496-.015-.761-.015-.264 0-.695.1-1.059.497-.363.397-1.39 1.358-1.39 3.312s1.423 3.843 1.622 4.108c.198.264 2.8 4.277 6.782 5.997.948.41 1.687.654 2.264.837.951.303 1.816.26 2.5.157.763-.114 2.35-.96 2.682-1.888.331-.928.331-1.723.232-1.888-.1-.165-.363-.265-.76-.464z"/></svg>';
  document.body.appendChild(waBtn);

  /* ---- UEN correction ---- */
  document.querySelectorAll('.footer-uen, .footer-credential, .footer-bottom').forEach(el => {
    if (el.innerHTML && el.innerHTML.includes('201536119G')) {
      el.innerHTML = el.innerHTML.replace(/201536119G/g, '201534119G');
    }
  });
  const uenPath = window.location.pathname;
  const showUEN = uenPath === '/' || uenPath.endsWith('/index.html') || uenPath.endsWith('/terms.html');
  if (!showUEN) {
    document.querySelectorAll('.footer-uen').forEach(el => el.remove());
    document.querySelectorAll('.footer-credential').forEach(el => { if (el.textContent.includes('UEN')) el.remove(); });
  }

});
