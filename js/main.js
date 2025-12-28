
/*
 * Menu mobile:
 * - Toggle via bouton
 * - Met à jour aria-expanded
 * - Ouvre/ferme le <nav> via data-open
 * - Ferme au clic sur un lien
 * - Ferme avec Escape
 * - Ferme si on clique en dehors
 */
"use strict";

(() => {
  const btn = document.querySelector(".nav-toggle");
  if (!btn) return;

  const navId = btn.getAttribute("aria-controls");
  const nav = navId ? document.getElementById(navId) : null;
  if (!nav) return;

  const setOpen = (open) => {
    nav.dataset.open = open ? "true" : "false";
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const isOpen = () => nav.dataset.open === "true";

  // Init
  setOpen(false);

  btn.addEventListener("click", () => setOpen(!isOpen()));

  // Click sur un lien => ferme
  nav.addEventListener("click", (e) => {
    const link = e.target.closest?.("a");
    if (link) setOpen(false);
  });

  // Escape => ferme
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      btn.focus();
    }
  });
})();
