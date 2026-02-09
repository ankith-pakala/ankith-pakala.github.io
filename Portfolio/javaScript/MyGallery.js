document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".collections-tab");
  const photos = document.querySelectorAll(".collection-photo");

  function filterGallery(category) {
    photos.forEach(photo => {
      if (photo.classList.contains(category)) {
        photo.classList.add("show");
      } else {
        photo.classList.remove("show");
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;
      filterGallery(filter);
    });
  });

  // default load
  filterGallery("personal");
});
