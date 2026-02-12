const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
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

  createHabitCard(input,true);
  document.getElementById("popup").style.display = "none";
  document.getElementById("habitInput").value = "";
});

// Function to create card
function createHabitCard(name,save=false) {
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

  for (let i = 1; i <= 100; i++) {
    const box = document.createElement("div");
    box.className = "box";
    grid.appendChild(box);
  }
  const monthKey = `${name}-${month}-${year}`;
  let habitData = JSON.parse(localStorage.getItem(monthKey)) || {
  lastDay: 0,
  totalDays: 0,
  doneDays: []
  };
  
  // Check if new day
  if (habitData.lastDay !== day) {
      const box = document.createElement("div");
      box.className = "box";
      grid.appendChild(box);
      
   }   
   
      const btn = card.querySelector(".buttons button");
      btn.addEventListener("click", () => { 
         const lastBox = grid.lastElementChild;

          if (!lastBox) return;

          lastBox.classList.toggle("done");

        if (!habitData.doneDays) habitData.doneDays = [];

        if (lastBox.classList.contains("done")) {
          habitData.doneDays.push(day);
        } else {
          habitData.doneDays =
            habitData.doneDays.filter(d => d !== day);
        }

        localStorage.setItem(monthKey, JSON.stringify(habitData));
      });

      if (habitData.doneDays.includes(day)) {
        const lastBox = grid.lastElementChild;
        lastBox.classList.add("done");
      }

      habitData.lastDay = day;
      habitData.totalDays += 1;

    localStorage.setItem(monthKey, JSON.stringify(habitData));
 
 
  container.appendChild(card);
  if(save) saveHabit(name);
  
}
// save habit name
function saveHabit(name) {
  let habits = JSON.parse(localStorage.getItem("habitList")) || [];
  habits.push(name);
  localStorage.setItem("habitList", JSON.stringify(habits));
}
window.addEventListener("DOMContentLoaded", () => {
  const habits = JSON.parse(localStorage.getItem("habitList")) || [];

  habits.forEach(name => {
    createHabitCard(name);
  });

});










