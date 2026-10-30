
const reminders = [
  "Always believe in yourself.",
  "Never stop learning new things.",
  "Protect your peace and happiness.",
  "Follow your dreams with courage.",
  "Respect yourself and your choices.",
  "Be kind, even when life is difficult.",
  "Never compare your journey with others.",
  "Learn something from every mistake.",
  "Become confident and independent.",
  "Value genuine friends and relationships.",
  "Keep exploring the beautiful world.",
  "Take time to enjoy little moments.",
  "Be brave enough to try new things.",
  "Celebrate every small achievement.",
  "Never lose your curiosity.",
  "Always stay true to yourself.",
  "Create memories that make you smile.",
  "Keep growing into a better person.",
  "Never forget how much you are loved."
];

const reminderGrid = document.getElementById("reminderGrid");
const reminderCount = document.getElementById("reminderCount");
const progressFill = document.getElementById("progressFill");
const reminderFinal = document.getElementById("reminderFinal");

let openedCount = 0;

reminders.forEach((message, index) => {
  const card = document.createElement("div");
  card.className = "reminder-card";

  card.innerHTML = `
    <div class="reminder-inner">
      <div class="reminder-front">
        ✦
        <span>Little Reminder ${index + 1}</span>
      </div>
      <div class="reminder-back">
        ${message}
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    if (card.classList.contains("opened")) return;

    card.classList.add("opened");
    openedCount++;

    reminderCount.textContent = `${openedCount} / 19 opened`;
    progressFill.style.width = `${(openedCount / 19) * 100}%`;

    if (openedCount === 19) {
      setTimeout(() => {
        reminderFinal.classList.add("show");
        reminderFinal.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 800);
    }
  });

  reminderGrid.appendChild(card);
});

document.getElementById("toCakeBtn").addEventListener("click", () => {
  showPage("page5");
});
