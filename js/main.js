/* =========================================================
   OSS — Shared site scripts
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- SIDEBAR — inject on every page ----
  const sidebarHTML = `
  <aside class="site-sidebar" id="siteSidebar" aria-label="Site navigation">
    <div class="sidebar-logo-wrap">
      <a href="/index.html"><img src="/assets/logo.jpg" alt="Overwatch Strategic Solutions"></a>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        <div class="sidebar-section-label">Main</div>
        <a href="/index.html" class="sidebar-link">Home</a>
        <a href="/services.html" class="sidebar-link">Services</a>
        <a href="/packages.html" class="sidebar-link">Packages</a>
        <a href="/why-oss.html" class="sidebar-link">Why OSS</a>
        <a href="/contact.html" class="sidebar-link">Contact</a>
        <a href="/audit.html" class="sidebar-link">Free Audit</a>
      </div>
      <hr class="sidebar-divider">
      <div class="sidebar-section">
        <div class="sidebar-section-label">Trades</div>
        <a href="/industry-fnb.html" class="sidebar-link">F&amp;B</a>
        <a href="/industry-workshop.html" class="sidebar-link">Workshops</a>
        <a href="/industry-warehouse.html" class="sidebar-link">Warehouses</a>
      </div>
      <hr class="sidebar-divider">
      <div class="sidebar-section">
        <div class="sidebar-section-label">Resources</div>
        <a href="/blog/index.html" class="sidebar-link">Blog &amp; Guides</a>
        <a href="/cost-calculator.html" class="sidebar-link">Cost Calculator</a>
        <a href="/faq.html" class="sidebar-link">FAQ</a>
        <a href="/referral.html" class="sidebar-link">Referral</a>
      </div>
      <hr class="sidebar-divider">
      <div class="sidebar-section">
        <div class="sidebar-section-label">Blog Articles</div>
        <a href="/blog/mom-compliance-checklist.html" class="sidebar-link">MOM Compliance Checklist</a>
        <a href="/blog/stop-work-order-cost.html" class="sidebar-link">Stop-Work Order Cost</a>
        <a href="/blog/bizsafe-level-3-guide.html" class="sidebar-link">bizSAFE Level 3 Guide</a>
        <a href="/blog/do-you-need-a-wsho-singapore.html" class="sidebar-link">Do You Need a WSHO?</a>
        <a href="/blog/director-liability-wsh-ruling-2025.html" class="sidebar-link">Director Liability Ruling</a>
        <a href="/blog/wsho-vs-wshc-singapore.html" class="sidebar-link">WSHO vs WSHC</a>
      </div>
      <hr class="sidebar-divider">
      <div class="sidebar-section">
        <div class="sidebar-section-label">Legal</div>
        <a href="/privacy-policy.html" class="sidebar-link">Privacy Policy</a>
        <a href="/terms.html" class="sidebar-link">Terms</a>
      </div>
    </nav>
  </aside>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Open navigation">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5h14M3 10h14M3 15h14"/></svg>
  </button>`;

  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

  // Mark active link
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-link').forEach(link => {
    try {
      const lp = new URL(link.href, window.location.origin).pathname;
      if (lp === path || (path === '/' && lp === '/index.html') || (path.endsWith('/') && lp === path + 'index.html')) {
        link.classList.add('active');
      }
    } catch(e) {}
  });

  // Desktop layout
  const applyLayout = () => {
    document.body.classList.toggle('has-sidebar', window.innerWidth >= 1100);
  };
  applyLayout();
  window.addEventListener('resize', applyLayout, { passive: true });

  // Mobile toggle
  const sidebar  = document.getElementById('siteSidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('sidebarToggle');

  toggleBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('active', isOpen);
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  // Convert Trades and Resources nav dropdowns to plain links
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.nav-dropdown-btn');
    if (!btn) return;
    const label = [...btn.childNodes]
      .filter(n => n.nodeType === 3)
      .map(n => n.textContent.trim())
      .join('').trim();
    const destinations = { 'Trades': '/industry-fnb.html', 'Resources': '/blog/index.html' };
    if (destinations[label]) {
      const a = document.createElement('a');
      a.href = destinations[label];
      a.textContent = label;
      a.className = 'nav-plain-link';
      dropdown.replaceWith(a);
    }
  });

  // ---- Scroll reveal animations ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ---- Mobile nav toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

  // ---- Nav shadow on scroll ----
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.style.boxShadow = window.scrollY > 30 ? '0 1px 3px rgba(15,31,53,0.06)' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Contact form ----
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sent! We\'ll reply within 2 business hours.';
      submitBtn.disabled = true;
      submitBtn.style.cssText = 'background:#15803D;color:white;';
      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.cssText = '';
      }, 4500);
    });
  }

  // ---- WhatsApp floating button ----
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/6589534583?text=Hi%20OSS%2C%20I%20would%20like%20to%20find%20out%20more.';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.className = 'whatsapp-float';
  waBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waBtn.innerHTML = '<svg width="28" height="28" viewBox="0 0 32 32" fill="white"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.733 5.473 2.018 7.774L.057 31.314a.75.75 0 00.918.918l7.51-1.957A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.747-1.833l-.484-.29-5.023 1.309 1.337-4.88-.317-.502A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.874c-.397-.199-2.35-1.16-2.714-1.292-.363-.133-.628-.199-.892.199s-1.026 1.292-1.257 1.557c-.232.264-.464.298-.861.1-.397-.2-1.676-.618-3.193-1.97-1.18-1.052-1.977-2.35-2.208-2.748-.232-.397-.025-.612.174-.81.178-.178.397-.464.596-.695.198-.232.264-.397.397-.662.132-.264.066-.497-.033-.695-.1-.2-.892-2.152-1.224-2.946-.322-.773-.65-.668-.892-.68-.231-.012-.496-.015-.761-.015-.264 0-.695.1-1.059.497-.363.397-1.39 1.358-1.39 3.312s1.423 3.843 1.622 4.108c.198.264 2.8 4.277 6.782 5.997.948.41 1.687.654 2.264.837.951.303 1.816.26 2.5.157.763-.114 2.35-.96 2.682-1.888.331-.928.331-1.723.232-1.888-.1-.165-.363-.265-.76-.464z"/></svg>';
  document.body.appendChild(waBtn);

});
