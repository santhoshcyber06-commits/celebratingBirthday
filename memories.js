
const memoryCards = document.querySelectorAll(".memory-card");
const photoViewer = document.getElementById("photoViewer");
const expandedPhoto = document.getElementById("expandedPhoto");
const closePhoto = document.getElementById("closePhoto");

memoryCards.forEach(card => {
  card.addEventListener("click", () => {
    expandedPhoto.src = card.dataset.photo;
    photoViewer.classList.add("open");
  });
});

closePhoto.addEventListener("click", () => {
  photoViewer.classList.remove("open");
});

photoViewer.addEventListener("click", event => {
  if (event.target === photoViewer) {
    photoViewer.classList.remove("open");
  }
});

document.getElementById("toLetterBtn").addEventListener("click", () => {
  showPage("page3");
});
