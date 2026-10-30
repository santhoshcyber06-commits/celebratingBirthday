
const dateBox = document.getElementById("dateBox");
const dateInput = document.getElementById("birthdayDate");
const unlockBtn = document.getElementById("unlockBtn");
const dateError = document.getElementById("dateError");
const birthdayReveal = document.getElementById("birthdayReveal");

window.addEventListener("load", () => {
  setTimeout(() => {
    dateBox.classList.add("show");
  }, 5000);
});

unlockBtn.addEventListener("click", () => {
  const enteredDate = dateInput.value;

  if (!enteredDate) {
    dateError.textContent = "Please enter your birthday date.";
    return;
  }

  const parts = enteredDate.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  if (month !== BIRTHDAY_MONTH || day !== BIRTHDAY_DAY) {
    dateError.textContent = "That's not the secret date. Try again! ✨";
    return;
  }

  dateError.textContent = "";
  dateBox.style.opacity = "0";
  dateBox.style.transform = "scale(0.6)";
  dateBox.style.pointerEvents = "none";

  createParticleBurst();

  setTimeout(() => {
    dateBox.style.display = "none";
    birthdayReveal.classList.add("show");
  }, 3000);
});

function createParticleBurst() {
  const particleLayer = document.getElementById("particles");
  const box = dateBox.getBoundingClientRect();

  const centerX = box.left + box.width / 2;
  const centerY = box.top + box.height / 2;

  for (let i = 0; i < 100; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";

    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 300;

    particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
    particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

    const size = 3 + Math.random() * 7;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particleLayer.appendChild(particle);
    setTimeout(() => particle.remove(), 1700);
  }
}
