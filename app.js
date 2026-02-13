const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
document.getElementById("monthName").textContent=months[month];
const days = new Date(year, month + 1, 0).getDate();
const date=document.querySelector(".date-container")
for(let i=1;i<=days;i++){
    let div=document.createElement("div");
    div.className="dates";
    div.textContent=i;
    date.appendChild(div);
    if(i===day){
      div.classList.add("today")
      setTimeout(() => {
      div.scrollIntoView({
        behavior: "smooth",
        inline: "center"
      });
    }, 100);
    }
}
let habitToDelete = null;
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
const todayIndex=day-1;
// let delbtn;
// Function to create card
function createHabitCard(name,save=false) {
  const container = document.querySelector(".habit-section");

  const card = document.createElement("div");
  card.className = "card";

card.innerHTML = `
  <div class="card-top">
    <div>
      <h2>${name}</h2>
      <p>Streak: <span >0</span> days</p>
    </div>
      
    <div >
      <button class="del-button"><i class="fa-regular fa-trash-can"></i></i></button>
      <button class="buttons">✔</button>
    </div>
  </div>
  <div class="grid"></div>
`;
let delbtn = card.querySelector(".del-button");

delbtn.addEventListener("click", () => {
  habitToDelete = { name, card };

  document.getElementById("del-popup").style.display = "flex";
});

  // hide delete popup
  document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("del-popup").style.display = "none";  
   habitToDelete = null;
});



  const streakSpan = card.querySelector(".card-top span");

  const grid = card.querySelector(".grid");

  for (let i = 1; i <=daysInMonth; i++) {
    const box = document.createElement("div");
    box.className = "box";
    grid.appendChild(box);
  }
  
 const monthKey = `${name}-${month}-${year}`;

 

  let habitData = JSON.parse(localStorage.getItem(monthKey)) || {
    lastDay: 0,
    totalDays: 0,
    doneDays: Array(daysInMonth).fill(0)
  };
    // delete ok button
 
  // calculate streak
const streak = streakCount(habitData.doneDays, todayIndex);
console.log(`"streak:"${streak}`)
streakSpan.textContent = streak;
  

  habitData.doneDays.forEach((val, i) => {
    if (val === 1 && grid.children[i]) {
      grid.children[i].classList.add("done");
    }
  });

   
  const btn = card.querySelector(".buttons");
      btn.addEventListener("click", () => {
      const todayIndex = day - 1;

      habitData.doneDays[todayIndex] =
        habitData.doneDays[todayIndex] === 1 ? 0 : 1;

      grid.children[todayIndex]
          .classList.toggle("done");
    const streak = streakCount(habitData.doneDays, todayIndex);
    streakSpan.textContent = streak;

    localStorage.setItem(monthKey, JSON.stringify(habitData));
  });
  habitData.lastDay = day;
  // habitData.totalDays += 1;

  localStorage.setItem(monthKey, JSON.stringify(habitData));
 
 
  container.appendChild(card);
  if(save) saveHabit(name);

  
  
}
 document.getElementById("ok").addEventListener("click", () => {
  if (!habitToDelete) return;

  removeHabit(habitToDelete.name);
  habitToDelete.card.remove();
  // localStorage.removeItem(monthKey);
  document.getElementById("del-popup").style.display = "none";
  habitToDelete = null;
});
// save habit name

function saveHabit(name) {
  habits = JSON.parse(localStorage.getItem("habitList")) || [];
  habits.push(name);
  localStorage.setItem("habitList", JSON.stringify(habits));
}
window.addEventListener("DOMContentLoaded", () => {
  const habits = JSON.parse(localStorage.getItem("habitList")) || [];

  habits.forEach(name => {
    createHabitCard(name);
  });

});

function streakCount(doneDays,todayIndex){
  let streak=0;
  for(let i=todayIndex;i>=0;i--){
    if(doneDays[i]===1){
      streak++;
    }
    else{
      break;
    }
  }
  
  return streak;  
}

function removeHabit(name) {
  let habits = JSON.parse(localStorage.getItem("habitList")) || [];

  // remove only that habit name
  habits = habits.filter(habit => habit !== name);

  localStorage.setItem("habitList", JSON.stringify(habits));
  const monthKey = `${name}-${month}-${year}`;
  localStorage.removeItem(monthKey);
}










