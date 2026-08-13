// Lightweight interactions: menu toggle, reveal on scroll, form handler
(function(){
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  toggle && toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('mobile-open');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
          // close mobile nav
          if(nav.classList.contains('mobile-open')){
            nav.classList.remove('mobile-open');
            toggle && toggle.setAttribute('aria-expanded','false');
          }
        }
      }
    });
  });

  // Intersection observer for reveal animations
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          // unobserve once visible
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    document.querySelectorAll('.reveal, .fade-in, .fade-up').forEach(el=>obs.observe(el));
  } else {
    // fallback: reveal all
    document.querySelectorAll('.reveal, .fade-in, .fade-up').forEach(el=>el.classList.add('is-visible'));
  }

  // Footer year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // form handler (client-only placeholder)
  window.handleSubmit = function(e){
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    // simple UI feedback
    const btn = form.querySelector('button[type="submit"]');
    const prev = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending...';
    setTimeout(()=>{
      btn.disabled = false; btn.textContent = prev;
      alert('Thanks, ' + (name||'friend') + '! Your message was received (demo).');
      form.reset();
    },900);
  }
})();
