
// Open popup
document.querySelector(".btn").addEventListener("click", () => {
  document.getElementById("popup").style.display = "flex";
});

// Close popup
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// Add habit card
document.getElementById("addHabit").addEventListener("click", () => {
  const input = document.getElementById("habitInput").value;

  if (!input) return alert("Enter habit name");

  createHabitCard(input);
  document.getElementById("popup").style.display = "none";
  document.getElementById("habitInput").value = "";
});

// Function to create card
function createHabitCard(name) {
  const container = document.querySelector(".habit-section");

  const card = document.createElement("div");
  card.className = "card";

card.innerHTML = `
  <div class="card-top">
    <div>
      <h2>${name}</h2>
      <p>Streak: <span>0</span> days</p>
    </div>
    <div class="buttons">
      <button>✔</button>
    </div>
  </div>
  <div class="grid"></div>
`;


  const grid = card.querySelector(".grid");

  for (let i = 1; i <= 900; i++) {
    const box = document.createElement("div");
    box.className = "box";
    grid.appendChild(box);
  }

  container.appendChild(card);
}


