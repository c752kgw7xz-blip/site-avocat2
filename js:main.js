"js/main.js"
"use strict";

/**
 * Menu mobile:
 * - Toggle via bouton
 * - Met à jour aria-expanded
 * - Ouvre/ferme le <nav> via data-open
 * - Ferme au clic sur un lien
 * - Ferme avec Escape
 * - Ferme si on clique en dehors
 */
(function () {
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#nav-principal");

  if (!toggleBtn || !nav) return;

  const setOpen = (open) => {
    nav.dataset.open = open ? "true" : "false";
    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const isOpen = () => nav.dataset.open === "true";

  // Init: fermé
  setOpen(false);

  toggleBtn.addEventListener("click", () => {
    setOpen(!isOpen());
  });

  // Ferme quand on clique un lien du menu
  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.closest("a")) {
      setOpen(false);
    }
  });

  // Ferme avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggleBtn.focus();
    }
  });

  // Ferme si clic en dehors (uniquement utile en mobile, mais OK partout)
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;

    const target = e.target;
    if (!(target instanceof Node)) return;

    const clickedInsideNav = nav.contains(target);
    const clickedToggle = toggleBtn.contains(target);

    if (!clickedInsideNav && !clickedToggle) {
      setOpen(false);
    }
  });

  // Si on repasse en desktop (resize), on ferme pour éviter un état incohérent
  window.addEventListener("resize", () => {
    setOpen(false);
  });
})();
