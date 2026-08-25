/**
 * Globalny język strony (PL / EN): localStorage + jeden mały przycisk (tekst PL ↔ EN, role="switch").
 */
(function () {
  var KEY = "portfolioLang";

  window.PORTFOLIO_I18N = {
    pl: {
      langGroupAria: "Język strony",
      langSwitchToEn: "Przełącz na angielski",
      langSwitchToPl: "Przełącz na polski",
      metaDescIndex:
        "Andrzej Ratajczyk — linoryt i malarstwo. Wejście do portfolio.",
      titleIndex: "Andrzej Ratajczyk — Linoryt & malarstwo",
      landingNavAria: "Bio i social media",
      navBio: "Bio",
      navContact: "Kontakt",
      ctaGraphics: "Grafika",
      ctaPainting: "Malarstwo",
      altGraphic: "Linoryt",
      altPainting: "Malarstwo",
      metaDescKatalog: "Andrzej Ratajczyk — portfolio: linoryt i malarstwo.",
      titleKatalog: "Andrzej Ratajczyk — Portfolio",
      catalogNavAria: "Nawigacja witryny",
      catalogHome: "Strona główna",
      catalogHomeAria: "Strona główna witryny",
      tabsAria: "Widok portfolio",
      tabGraphics: "Grafika",
      tabPainting: "Malarstwo",
      emptyGrid: "Brak wyników.",
      lightboxClose: "Zamknij",
      lightboxAria: "Powiększenie pracy",
      paintingOutLink: "Strona malarstwa",
      cardFooterLink: "Karta pracy",
      paintingMedium: "Olej na płótnie",
      paintingStatusSold: "Sprzedane",
      paintingStatusAvailable: "Dostępne",
      paintingPriceCurrency: "PLN",
      metaDescKontakt: "Andrzej Ratajczyk — kontakt i social media.",
      titleKontakt: "Andrzej Ratajczyk — Kontakt",
      kontaktNavAria: "Nawigacja",
      kontaktBack: "Powrót do portfolio",
      kontaktCatalog: "Portfolio",
      kontaktBio: "Bio",
      kontaktH1: "Kontakt",
      kontaktLead:
        "Zapytania o prace, wystawy i reprodukcje można kierować przez e-mail (poniżej) oraz profile społecznościowe.",
      kontaktEmailH2: "E-mail",
      kontaktWrite: "Napisz wiadomość",
      kontaktSocialH2: "Social media",
      metaDescBio: "Andrzej Ratajczyk, biografia, wystawy i osiągnięcia.",
      titleBio: "Andrzej Ratajczyk · Biografia",
      bioNavAria: "Nawigacja",
      bioBack: "Powrót do portfolio",
      bioContact: "Kontakt",
      footerBio: "Andrzej Ratajczyk, biografia.",
      metaDescStore: "Andrzej Ratajczyk — druki linorytów. Zamówienia przez kontakt.",
      titleStore: "Andrzej Ratajczyk — Sklep / druki",
      navStore: "Sklep",
      storeCatalogLink: "Portfolio — grafika",
      storeH1: "Grafiki",
      storeBuy: "Kup",
      purchaseContactLead: "W celu zakupu zapraszam do kontaktu przez:",
      purchaseContactPhone: "Telefon",
      purchaseContactEmail: "E-mail",
      purchaseContactInstagram: "Instagram",
      purchaseContactClose: "Zamknij",
      purchaseContactAria: "Informacje o zakupie",
    },
    en: {
      langGroupAria: "Site language",
      langSwitchToEn: "Switch to English",
      langSwitchToPl: "Switch to Polish",
      metaDescIndex: "Andrzej Ratajczyk — linocut and painting. Portfolio entry.",
      titleIndex: "Andrzej Ratajczyk — Linocut & painting",
      landingNavAria: "Bio and social media",
      navBio: "Bio",
      navContact: "Contact",
      ctaGraphics: "Graphics",
      ctaPainting: "Painting",
      altGraphic: "Linocut",
      altPainting: "Painting",
      metaDescKatalog: "Andrzej Ratajczyk — portfolio: linocut and painting.",
      titleKatalog: "Andrzej Ratajczyk — Portfolio",
      catalogNavAria: "Site navigation",
      catalogHome: "Home",
      catalogHomeAria: "Site home page",
      tabsAria: "Portfolio view",
      tabGraphics: "Graphics",
      tabPainting: "Painting",
      emptyGrid: "No results.",
      lightboxClose: "Close",
      lightboxAria: "Enlarged artwork",
      paintingOutLink: "Painting gallery page",
      cardFooterLink: "Work page",
      paintingMedium: "Oil on canvas",
      paintingStatusSold: "Sold",
      paintingStatusAvailable: "Available",
      paintingPriceCurrency: "PLN",
      metaDescKontakt: "Andrzej Ratajczyk — contact and social media.",
      titleKontakt: "Andrzej Ratajczyk — Contact",
      kontaktNavAria: "Navigation",
      kontaktBack: "Back to portfolio",
      kontaktCatalog: "Portfolio",
      kontaktBio: "Bio",
      kontaktH1: "Contact",
      kontaktLead:
        "Questions about works, exhibitions and reproductions: e-mail (below) or social profiles.",
      kontaktEmailH2: "E-mail",
      kontaktWrite: "Write a message",
      kontaktSocialH2: "Social media",
      metaDescBio: "Andrzej Ratajczyk, biography, exhibitions and achievements.",
      titleBio: "Andrzej Ratajczyk · Biography",
      bioNavAria: "Navigation",
      bioBack: "Back to portfolio",
      bioContact: "Contact",
      footerBio: "Andrzej Ratajczyk, biography.",
      metaDescStore: "Andrzej Ratajczyk — linocut prints. Orders via contact.",
      titleStore: "Andrzej Ratajczyk — Shop / prints",
      navStore: "Shop",
      storeCatalogLink: "Portfolio — graphics",
      storeH1: "Prints",
      storeBuy: "Buy",
      purchaseContactLead: "To purchase, please contact me via:",
      purchaseContactPhone: "Phone",
      purchaseContactEmail: "E-mail",
      purchaseContactInstagram: "Instagram",
      purchaseContactClose: "Close",
      purchaseContactAria: "Purchase information",
    },
  };

  function get() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "en" ? "en" : "pl";
    } catch (_) {
      return "pl";
    }
  }

  function set(lang) {
    var l = lang === "en" ? "en" : "pl";
    try {
      localStorage.setItem(KEY, l);
    } catch (_) {}
    if (document.documentElement) document.documentElement.lang = l;
    syncAll();
    try {
      window.dispatchEvent(new CustomEvent("portfoliolangchange", { detail: l }));
    } catch (_) {}
  }

  window.portfolioT = function (key) {
    var lang = get();
    var d = window.PORTFOLIO_I18N;
    if (!d || !d[lang]) return key;
    if (d[lang][key] != null) return d[lang][key];
    if (d.pl && d.pl[key] != null) return d.pl[key];
    return key;
  };

  function injectChromeOnce() {
    if (document.getElementById("site-lang-switch")) return;
    if (!document.body) return;

    var css =
      "#site-lang-switch.site-lang{position:fixed;top:clamp(0.32rem,0.9vw,0.5rem);right:clamp(0.65rem,2.5vw,1.25rem);z-index:50;display:flex;align-items:center}" +
      ".lang-switch{box-sizing:border-box;margin:0;padding:0 0.45rem;min-width:2.15rem;height:1.95rem;border:none;border-radius:999px;background:rgba(0,0,0,0.32);box-shadow:inset 0 0 0 1px rgba(255,255,255,0.08);font-family:'Space Grotesk',system-ui,sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.1em;color:#fafafa;cursor:pointer;-webkit-tap-highlight-color:transparent;line-height:1}" +
      ".lang-switch:hover{background:rgba(255,255,255,0.06)}" +
      ".lang-switch:focus-visible{outline:2px solid rgba(255,255,255,0.55);outline-offset:2px}";

    var st = document.createElement("style");
    st.setAttribute("data-portfolio-lang", "");
    st.textContent = css;
    document.head.appendChild(st);

    var wrap = document.createElement("div");
    wrap.id = "site-lang-switch";
    wrap.className = "site-lang";
    wrap.innerHTML =
      '<button type="button" id="lang-switch-btn" class="lang-switch" role="switch" aria-checked="false">PL</button>';
    document.body.appendChild(wrap);

    var sw = document.getElementById("lang-switch-btn");
    if (sw) {
      sw.addEventListener("click", function () {
        set(get() === "en" ? "pl" : "en");
      });
    }
  }

  function syncLangButtons() {
    var cur = get();
    var btn = document.getElementById("lang-switch-btn");
    if (!btn) return;
    var enOn = cur === "en";
    btn.setAttribute("aria-checked", enOn ? "true" : "false");
    btn.textContent = enOn ? "EN" : "PL";
    btn.setAttribute("aria-label", enOn ? window.portfolioT("langSwitchToPl") : window.portfolioT("langSwitchToEn"));
  }

  function syncLangBlocks() {
    var cur = get();
    document.querySelectorAll("[data-lang-block]").forEach(function (el) {
      var b = el.getAttribute("data-lang-block");
      el.hidden = b !== cur;
    });
  }

  function applyDataI18n() {
    var cur = get();
    var t = window.PORTFOLIO_I18N && window.PORTFOLIO_I18N[cur];
    if (!t) return;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key && t[key] != null) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (key && t[key] != null) el.innerHTML = t[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (key && t[key] != null) el.setAttribute("placeholder", t[key]);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr");
      if (!spec) return;
      var parts = spec.split(":");
      var attr = parts[0];
      var key = parts.slice(1).join(":");
      if (attr && key && t[key] != null) el.setAttribute(attr, t[key]);
    });

    var page = document.body && document.body.getAttribute("data-page");
    if (page) {
      var titleMap = {
        index: "titleIndex",
        katalog: "titleKatalog",
        kontakt: "titleKontakt",
        bio: "titleBio",
        store: "titleStore",
      };
      var metaMap = {
        index: "metaDescIndex",
        katalog: "metaDescKatalog",
        kontakt: "metaDescKontakt",
        bio: "metaDescBio",
        store: "metaDescStore",
      };
      var tk = titleMap[page];
      var mk = metaMap[page];
      if (tk && t[tk]) document.title = t[tk];
      var meta = document.querySelector('meta[name="description"]');
      if (meta && mk && t[mk]) meta.setAttribute("content", t[mk]);
    }
  }

  function syncBioBodies() {
    var pl = document.getElementById("bio-content-pl");
    var en = document.getElementById("bio-content-en");
    if (!pl || !en) return;
    var cur = get();
    pl.hidden = cur !== "pl";
    en.hidden = cur !== "en";
  }

  function syncAll() {
    injectChromeOnce();
    syncLangButtons();
    syncLangBlocks();
    applyDataI18n();
    syncBioBodies();
    if (typeof window.__portfolioOnLangChange === "function") {
      try {
        window.__portfolioOnLangChange();
      } catch (e) {}
    }
  }

  function onStorage(e) {
    if (e.key === KEY) syncAll();
  }

  function init() {
    if (window.__portfolioLangInited) return;
    window.__portfolioLangInited = true;
    injectChromeOnce();
    if (document.documentElement) document.documentElement.lang = get();
    syncAll();
    window.addEventListener("storage", onStorage);
  }

  window.portfolioLang = { get: get, set: set, sync: syncAll, KEY: KEY };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
