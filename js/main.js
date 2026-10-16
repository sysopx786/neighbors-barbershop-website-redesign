/* Neighbors Barbershop — one script for every page. Content works without it. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { return null; }
    return null;
  }

  /* ---------- Theme ---------- */
  function applyTheme(theme, animate) {
    if (animate && !reduceMotion) {
      doc.classList.add("theme-anim");
      window.setTimeout(function () { doc.classList.remove("theme-anim"); }, 300);
    }
    doc.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#FFFFFF" : "#000000");
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      var toLight = theme === "dark";
      btn.setAttribute("aria-label", toLight ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    });
  }
  applyTheme(doc.getAttribute("data-theme") === "light" ? "light" : "dark", false);
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = doc.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next, true);
      store("nb-theme", next);
    });
  });

  /* ---------- Header shrink ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    var onScroll = function () {
      var small = window.scrollY > 40;
      header.classList.toggle("is-small", small);
      document.body.classList.toggle("has-small-header", small);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();
  }

  /* ---------- Focus trap helper ---------- */
  function focusables(root) {
    return Array.prototype.filter.call(
      root.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null || el === document.activeElement; }
    );
  }
  function trap(e, nodes) {
    if (e.key !== "Tab" || !nodes.length) return;
    var first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("menu-open", open);
      if (open) {
        var first = menu.querySelector("a");
        if (first) first.focus();
      }
    };
    menuBtn.addEventListener("click", function () { setMenu(menu.hidden); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (menu.hidden) return;
      if (e.key === "Escape") { setMenu(false); menuBtn.focus(); return; }
      var nodes = [menuBtn].concat(focusables(menu));
      var toggle = header ? header.querySelector(".theme-toggle") : null;
      if (toggle) nodes.unshift(toggle);
      trap(e, nodes);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1100 && !menu.hidden) setMenu(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length) {
    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      group.querySelectorAll("[data-reveal]").forEach(function (el, i) {
        el.style.setProperty("--d", Math.min(i, 8) * 60 + "ms");
      });
    });
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Open / closed status (America/New_York) ---------- */
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var OPEN_DAYS = [2, 3, 4, 5, 6]; // Tue–Sat
  var OPEN_MIN = 9 * 60, CLOSE_MIN = 18 * 60;
  function nyNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
      }).formatToParts(new Date());
      var get = function (t) { for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value; return ""; };
      var day = DAYS.indexOf(get("weekday"));
      var mins = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
      return day < 0 ? null : { day: day, mins: mins };
    } catch (e) { return null; }
  }
  var now = nyNow();
  if (now) {
    var isOpenDay = OPEN_DAYS.indexOf(now.day) > -1;
    var open = isOpenDay && now.mins >= OPEN_MIN && now.mins < CLOSE_MIN;
    var text;
    if (open) {
      text = "Open now — closes 6 PM";
    } else if (isOpenDay && now.mins < OPEN_MIN) {
      text = "Closed — opens today 9 AM";
    } else {
      var d = now.day;
      do { d = (d + 1) % 7; } while (OPEN_DAYS.indexOf(d) === -1);
      text = "Closed — opens " + (d === (now.day + 1) % 7 ? "tomorrow" : DAYS[d]) + " 9 AM";
    }
    document.querySelectorAll("[data-status]").forEach(function (el) {
      el.textContent = text;
      el.classList.toggle("is-open", open);
    });
    document.querySelectorAll(".hours [data-day]").forEach(function (row) {
      var days = row.getAttribute("data-day").split(",").map(Number);
      if (days.indexOf(now.day) > -1) row.classList.add("is-today");
    });
  }

  /* ---------- Map loader (Google Map keeps its own colors) ---------- */
  document.querySelectorAll("[data-map]").forEach(function (wrap) {
    var link = wrap.querySelector(".map-placeholder");
    if (!link) return;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var frame = document.createElement("iframe");
      frame.src = wrap.getAttribute("data-map");
      frame.title = wrap.getAttribute("data-map-title") || "Map";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.setAttribute("allowfullscreen", "");
      wrap.innerHTML = "";
      wrap.appendChild(frame);
      frame.focus();
    });
  });

  /* ---------- Simple filter helper ---------- */
  function normalize(s) { return (s || "").toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim(); }

  /* ---------- Reviews filter ---------- */
  var reviewInput = document.getElementById("review-search");
  var reviewGrid = document.getElementById("reviews-grid");
  if (reviewInput && reviewGrid) {
    var reviewCards = Array.prototype.slice.call(reviewGrid.querySelectorAll(".review"));
    var reviewEmpty = document.getElementById("no-results");
    var reviewStatus = document.getElementById("review-status");
    var filterReviews = function () {
      var q = normalize(reviewInput.value);
      var shown = 0;
      reviewCards.forEach(function (card) {
        var hit = !q || normalize(card.textContent).indexOf(q) > -1;
        card.hidden = !hit;
        if (hit) shown++;
      });
      if (reviewEmpty) reviewEmpty.hidden = shown !== 0;
      if (reviewStatus) reviewStatus.textContent = q ? shown + (shown === 1 ? " review" : " reviews") + " shown" : "";
    };
    reviewInput.addEventListener("input", filterReviews);
    reviewInput.addEventListener("search", filterReviews);
  }

  /* ---------- FAQ filter ---------- */
  var faqInput = document.getElementById("faq-search");
  if (faqInput) {
    var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-list details"));
    var faqGroups = Array.prototype.slice.call(document.querySelectorAll(".faq-group"));
    var faqEmpty = document.getElementById("faq-no-results");
    var faqStatus = document.getElementById("faq-status");
    var faqClear = document.getElementById("faq-clear-btn");
    var total = faqItems.length;
    var index = faqItems.map(function (d) { return normalize(d.textContent); });
    var timer;
    var runFaq = function () {
      var q = normalize(faqInput.value);
      var shown = 0;
      faqItems.forEach(function (d, i) {
        var hit = !q || index[i].indexOf(q) > -1;
        d.hidden = !hit;
        if (hit) shown++;
      });
      faqGroups.forEach(function (g) {
        g.hidden = !g.querySelector("details:not([hidden])");
      });
      if (faqEmpty) faqEmpty.hidden = shown !== 0;
      if (faqClear) faqClear.hidden = !q;
      if (faqStatus) {
        faqStatus.textContent = q
          ? shown + (shown === 1 ? " question matches" : " questions match") + " “" + faqInput.value.trim() + "”"
          : total + " questions";
      }
    };
    faqInput.addEventListener("input", function () { window.clearTimeout(timer); timer = window.setTimeout(runFaq, 120); });
    faqInput.addEventListener("search", runFaq);
    if (faqClear) faqClear.addEventListener("click", function () { faqInput.value = ""; runFaq(); faqInput.focus(); });
    var faqForm = faqInput.closest("form");
    if (faqForm) faqForm.addEventListener("submit", function (e) { e.preventDefault(); runFaq(); });
  }

  /* ---------- Gallery lightbox ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll(".g-item"));
  var box = document.getElementById("lightbox");
  if (items.length && box) {
    var img = box.querySelector("img");
    var count = box.querySelector(".lightbox-count");
    var caption = box.querySelector(".lightbox-caption");
    var current = 0, opener = null;
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var show = function (i) {
      current = (i + items.length) % items.length;
      var a = items[current];
      var thumb = a.querySelector("img");
      img.src = a.getAttribute("data-full") || a.href;
      img.alt = thumb ? thumb.alt : "";
      if (caption) caption.textContent = thumb ? thumb.alt : "";
      count.textContent = pad(current + 1) + " / " + pad(items.length);
    };
    var close = function () {
      box.hidden = true;
      document.body.classList.remove("menu-open");
      img.removeAttribute("src");
      if (opener) opener.focus();
    };
    items.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        opener = a;
        show(i);
        box.hidden = false;
        document.body.classList.add("menu-open");
        box.querySelector(".lb-close").focus();
      });
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
      else trap(e, focusables(box));
    });
    var startX = null;
    box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ---------- Legal TOC active state ---------- */
  var tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var a = byId[en.target.id];
          if (a) a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) tio.observe(el); });
  }

  /* ---------- Cookie notice ---------- */
  if (store("cookie-notice-dismissed") !== "1") {
    var note = document.createElement("div");
    note.className = "cookie-notice";
    note.setAttribute("role", "region");
    note.setAttribute("aria-label", "Cookie notice");
    note.innerHTML = '<span>This site uses essential functionality and third-party services (Google Fonts/Maps, Square). See our <a href="cookies.html">Cookie Policy</a>.</span><button type="button" class="btn">Got it</button>';
    document.body.appendChild(note);
    note.querySelector("button").addEventListener("click", function () {
      store("cookie-notice-dismissed", "1");
      note.remove();
    });
  }
})();
