(function () {
  var config = window.SITE_CONFIG || {};

  function bindConfig() {
    var nodes = document.querySelectorAll("[data-config]");
    Array.prototype.forEach.call(nodes, function (el) {
      var key = el.getAttribute("data-config");
      var value = config[key];
      if (value === undefined || value === null || value === "") {
        var hide = el.getAttribute("data-empty") === "hide";
        if (hide) {
          var target = el.closest("[data-empty-parent]") || el;
          target.style.display = "none";
        }
        return;
      }
      el.textContent = value;
    });

    var hrefNodes = document.querySelectorAll("[data-config-href]");
    Array.prototype.forEach.call(hrefNodes, function (el) {
      var key = el.getAttribute("data-config-href");
      if (config[key]) {
        el.setAttribute("href", config[key]);
      }
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    if (config.instagramUrl) {
      var ig = document.querySelectorAll("[data-instagram]");
      Array.prototype.forEach.call(ig, function (el) {
        el.setAttribute("href", config.instagramUrl);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      });
    }

    var yearNodes = document.querySelectorAll("[data-year]");
    Array.prototype.forEach.call(yearNodes, function (el) {
      el.textContent = config.year || String(new Date().getFullYear());
    });

    var canonical = document.getElementById("canonical-url");
    if (canonical) {
      var origin = config.domain || window.location.origin + window.location.pathname;
      canonical.setAttribute("href", origin);
    }

    var ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", config.domain || window.location.href);
    }
  }

  function setupNav() {
    var nav = document.getElementById("site-nav");
    var menuBtn = document.getElementById("menu-btn");
    var panel = document.getElementById("mobile-panel");
    if (!nav) return;

    var onScroll = function () {
      if (window.scrollY > 24) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (menuBtn && panel) {
      var closeMenu = function () {
        menuBtn.classList.remove("is-open");
        panel.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        panel.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      };

      menuBtn.addEventListener("click", function () {
        var open = menuBtn.classList.toggle("is-open");
        panel.classList.toggle("is-open", open);
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        panel.setAttribute("aria-hidden", open ? "false" : "true");
        document.body.style.overflow = open ? "hidden" : "";
      });

      Array.prototype.forEach.call(panel.querySelectorAll("a"), function (link) {
        link.addEventListener("click", closeMenu);
      });
    }
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-in");
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-in");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    Array.prototype.forEach.call(items, function (el) {
      observer.observe(el);
    });
  }

  function setupPortraitParallax() {
    var img = document.querySelector("[data-parallax]");
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    window.addEventListener(
      "scroll",
      function () {
        var rect = img.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        var offset = (rect.top / window.innerHeight) * -18;
        img.style.transform = "translateY(" + offset + "px) scale(1.04)";
      },
      { passive: true }
    );
  }

  function setupServiceAccordion() {
    var items = document.querySelectorAll(".service-item");
    Array.prototype.forEach.call(items, function (item) {
      var summary = item.querySelector(".service-summary");
      if (!summary) return;

      summary.addEventListener("click", function (event) {
        event.preventDefault();
        var willOpen = !item.classList.contains("is-open");

        if (willOpen) {
          item.setAttribute("open", "");
          item.classList.remove("is-open");
          window.requestAnimationFrame(function () {
            item.classList.add("is-open");
          });
        } else {
          item.classList.remove("is-open");
          window.setTimeout(function () {
            if (!item.classList.contains("is-open")) {
              item.removeAttribute("open");
            }
          }, 420);
        }
      });
    });
  }

  bindConfig();
  setupNav();
  setupReveal();
  setupPortraitParallax();
  setupServiceAccordion();
})();
