document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      renderStudentList(data.students);
    });
});

function renderStudentList(students) {
  const container = document.getElementById("student-list");
  container.innerHTML = "";
  students.forEach(student => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${student.name}</h3>
      <p><strong>ID:</strong> ${student.id}</p>
      <p><strong>Grade:</strong> ${student.grade}</p>
    `;
    container.appendChild(card);
  });
}

function searchResults() {
  const studentID = document.getElementById("search-input").value.trim();
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const student = data.students.find(
        s => s.id.toLowerCase() === studentID.toLowerCase()
      );
      const resultDiv = document.getElementById("result-output");
      if (student) {
        resultDiv.innerHTML = `
          <h3>Results for ${student.name}</h3>
          <p><strong>Grade:</strong> ${student.grade}</p>
          <ul>
            ${student.results
              .map(r => `<li>${r.subject}: <strong>${r.score}</strong></li>`)
              .join("")}
          </ul>
        `;
      } else {
        resultDiv.innerHTML =
          "<p class='error'>Student not found. Please check the ID and try again.</p>";
      }
    });
}
