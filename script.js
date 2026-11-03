
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const status = document.getElementById('formStatus');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    status.textContent = 'Sending your message...';
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.textContent = 'Your message has been sent successfully! 💜';
        status.style.color = '#6b9b72';
        contactForm.reset();
      } else {
        status.textContent = 'Something went wrong. Please try again.';
        status.style.color = '#d45b5b';
      }

    } catch (error) {
      status.textContent = 'Unable to send your message. Please check your connection.';
      status.style.color = '#d45b5b';
    }

    submitButton.disabled = false;
    submitButton.innerHTML = 'Send Message <span>↗</span>';
  });
}


// ==========================
// SCROLL REVEAL ANIMATIONS
// ==========================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  function(entries, observer) {

    entries.forEach(function(entry) {

      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(function(element) {
  revealObserver.observe(element);
});
