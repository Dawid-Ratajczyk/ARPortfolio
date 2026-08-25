(function (global) {
  const CONTACT = {
    phoneTel: "+48509436064",
    phoneDisplay: "509 436 064",
    email: "andrzej_ratajczyk@o2.pl",
    instagramUrl: "https://www.instagram.com/andyrx/",
  };

  let modal = null;
  let resumeFocus = null;

  function T(key, fallback) {
    if (typeof global.portfolioT === "function") return global.portfolioT(key);
    return fallback;
  }

  function onKeydown(e) {
    if (e.key === "Escape") closePurchaseContactModal();
  }

  function syncModalCopy() {
    if (!modal) return;
    const lead = modal.querySelector(".purchase-modal__lead");
    const phone = modal.querySelector("[data-contact='phone']");
    const email = modal.querySelector("[data-contact='email']");
    const instagram = modal.querySelector("[data-contact='instagram']");
    const closeBtn = modal.querySelector(".purchase-modal__close");
    if (lead) {
      lead.textContent = T(
        "purchaseContactLead",
        "W celu zakupu zapraszam do kontaktu przez:"
      );
    }
    if (phone) {
      phone.href = `tel:${CONTACT.phoneTel}`;
      phone.textContent = `${T("purchaseContactPhone", "Telefon")}: ${CONTACT.phoneDisplay}`;
    }
    if (email) {
      email.href = `mailto:${CONTACT.email}`;
      email.textContent = `${T("purchaseContactEmail", "E-mail")}: ${CONTACT.email}`;
    }
    if (instagram) {
      instagram.href = CONTACT.instagramUrl;
      instagram.textContent = T("purchaseContactInstagram", "Instagram");
    }
    if (closeBtn) {
      closeBtn.setAttribute("aria-label", T("purchaseContactClose", "Zamknij"));
    }
    modal.setAttribute(
      "aria-label",
      T("purchaseContactAria", "Informacje o zakupie")
    );
  }

  function ensureModal() {
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "purchase-contact-modal";
    modal.className = "purchase-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    modal.innerHTML =
      '<div class="purchase-modal__backdrop" aria-hidden="true"></div>' +
      '<div class="purchase-modal__panel">' +
      '<button type="button" class="purchase-modal__close" aria-label="Zamknij">' +
      '<span aria-hidden="true">×</span>' +
      "</button>" +
      '<p class="purchase-modal__lead"></p>' +
      '<ul class="purchase-modal__links">' +
      '<li><a data-contact="phone" href="#"></a></li>' +
      '<li><a data-contact="email" href="#"></a></li>' +
      '<li><a data-contact="instagram" href="#" target="_blank" rel="noopener noreferrer"></a></li>' +
      "</ul>" +
      "</div>";

    modal.querySelector(".purchase-modal__backdrop").addEventListener("click", closePurchaseContactModal);
    modal.querySelector(".purchase-modal__close").addEventListener("click", closePurchaseContactModal);
    document.body.appendChild(modal);
    syncModalCopy();
    return modal;
  }

  function openPurchaseContactModal() {
    const el = ensureModal();
    resumeFocus = document.activeElement;
    syncModalCopy();
    el.hidden = false;
    document.body.classList.add("purchase-modal-open");
    document.addEventListener("keydown", onKeydown);
    try {
      el.querySelector(".purchase-modal__close").focus();
    } catch (_) {}
  }

  function closePurchaseContactModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("purchase-modal-open");
    document.removeEventListener("keydown", onKeydown);
    if (resumeFocus && typeof resumeFocus.focus === "function") {
      try {
        resumeFocus.focus();
      } catch (_) {}
    }
    resumeFocus = null;
  }

  function bindPurchaseButtons(root) {
    (root || document).querySelectorAll("[data-purchase-contact]").forEach(function (btn) {
      if (btn.dataset.purchaseBound === "1") return;
      btn.dataset.purchaseBound = "1";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openPurchaseContactModal();
      });
    });
  }

  global.openPurchaseContactModal = openPurchaseContactModal;
  global.closePurchaseContactModal = closePurchaseContactModal;
  global.bindPurchaseButtons = bindPurchaseButtons;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindPurchaseButtons();
    });
  } else {
    bindPurchaseButtons();
  }

  window.addEventListener("portfoliolangchange", syncModalCopy);
})(window);
