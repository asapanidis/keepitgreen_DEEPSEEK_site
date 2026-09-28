/* ============ Mobile nav ============ */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ============ Reveal on scroll ============ */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 70);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

/* ============ Project filters ============ */
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');

    const filter = chip.dataset.filter;
    projects.forEach(p => {
      const show = filter === 'all' || p.dataset.cat === filter;
      p.classList.toggle('is-hidden', !show);
    });
  });
});

/* ============ Footer year ============ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============ Contact form ============ */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form?.addEventListener('submit', async (e) => {
  if (form.action.includes('YOUR_FORM_ID')) {
    e.preventDefault();
    note.textContent = 'Η φόρμα δεν έχει ρυθμιστεί ακόμη — στείλτε email ή τηλεφωνήστε.';
    note.className = 'form-note err';
    return;
  }

  e.preventDefault();
  note.textContent = 'Αποστολή…';
  note.className = 'form-note';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      form.reset();
      note.textContent = '✓ Το αίτημα στάλθηκε. Θα επικοινωνήσουμε σύντομα μαζί σας.';
      note.className = 'form-note ok';
    } else {
      throw new Error('Request failed');
    }
  } catch {
    note.textContent = 'Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε στο +30 693 237 0395.';
    note.className = 'form-note err';
  }
});