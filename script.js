const form = document.getElementById("workout-form");
const tableBody = document.querySelector("#workout-table tbody");
const clearButton = document.getElementById("clear-button");

const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const exercise = document.getElementById("exercise").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const weight = document.getElementById("weight").value;
  const date = document.getElementById("date").value;

  workouts.push({ exercise, sets, reps, weight, date });

  localStorage.setItem("workouts", JSON.stringify(workouts));

  const row = tableBody.insertRow();
  row.innerHTML = `
    <td>${date}</td>
    <td>${exercise}</td>
    <td>${sets}</td>
    <td>${reps}</td>
    <td>${weight}</td>
    <td><button class="undo-button">Undo</button></td>
    `;
});
tableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("undo-button")) {
    const row = event.target.parentNode.parentNode;
    const rowIndex = row.rowIndex;

    tableBody.deleteRow(rowIndex);
    workouts.splice(rowIndex - 1, 1);

    localStorage.setItem("workouts", JSON.stringify(workouts));
  }
});

clearButton.addEventListener("click", () => {
  tableBody.innerHTML = "";
  localStorage.removeItem("workouts");
});
