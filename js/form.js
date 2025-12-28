const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.style.display = 'block';
    status.textContent = 'Envoi en cours…';

    const action = form.getAttribute('action') || '';
    if (!action || action === '#' || action.includes('your-form-id')) {
      status.textContent = 'Le formulaire est configuré pour utiliser Formspree. Remplacez "your-form-id" dans l\'attribut `action` du formulaire par votre identifiant Formspree (ex: https://formspree.io/f/xxxxxxx).';
      status.style.color = 'var(--muted)';
      return;
    }

    try {
      const data = new FormData(form);
      const res = await fetch(action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: data
      });

      if (res.ok) {
        status.textContent = 'Message envoyé — je vous recontacte sous 48h environ.';
        status.style.color = 'var(--accent)';
        form.reset();
      } else {
        const json = await res.json().catch(() => null);
        status.textContent = (json && json.error) ? json.error : 'Erreur lors de l\'envoi — réessayez plus tard.';
        status.style.color = 'crimson';
      }
    } catch (err) {
      status.textContent = 'Impossible de contacter le serveur d\'envoi. Vérifiez votre configuration.';
      status.style.color = 'crimson';
    }
  });
}
