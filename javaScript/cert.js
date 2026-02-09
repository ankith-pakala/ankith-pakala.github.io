
  const aboutImage = document.querySelector(".about-image");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const offset = scrollTop * 0.25; // control speed here

    aboutImage.style.transform = `translateY(${offset}px)`;
  });

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const closeBtn = document.querySelector(".cert-close");

  // Open modal
  document.querySelectorAll(".cert-card img").forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  function closeCert() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeCert);

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeCert();
  });

});