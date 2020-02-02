const form = document.querySelector('.contact-form');

if (form) {
  const confirmMsg = 'Thank you for your submission';
  const confirmEl = document.createElement('p');
  confirmEl.innerText = confirmMsg;
  confirmEl.style.cssText = 'transition: all 0.5s; opacity: 0; visibility: 0; background-color: hsl(72, 91%, 56%); padding: 1rem; border-radius: 20px; margin-bottom: 1rem;';
  
  (form.parentNode).insertBefore(confirmEl, form.nextSibling);
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.reset();

    confirmEl.style.opacity = 1;
    confirmEl.style.visibility = 1;
  
    setTimeout(() => {
      confirmEl.style.opacity = 0;
      confirmEl.style.visibility = 0;
    }, 5000);
  });
}
