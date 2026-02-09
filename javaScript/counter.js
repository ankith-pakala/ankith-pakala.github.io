const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  const target = +counter.dataset.target;
  let current = 0;
  const increment = Math.max(1, Math.floor(target / 120));

  const update = () => {
    current += increment;
    if (current < target) {
      counter.textContent = current;
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  };

  update();
};

/* Run when visible */
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => observer.observe(counter));