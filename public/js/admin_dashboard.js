// show sections in the admin dashboard  :
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((s) => s.classList.remove("active"));

  // Show selected section
  document.getElementById(sectionId).classList.add("active");

  // Update navigation
  const links = document.querySelectorAll(".nav-link");
  links.forEach((l) => l.classList.remove("active"));
  event.target.classList.add("active");

  // Update page title
  const titles = {
    dashboard: "Dashboard",
    questions: "Manage Questions",
    users: "Manage Users",
    scores: "All Scores",
  };
  document.getElementById("page-title").textContent = titles[sectionId];
}
// show add question & add category & edit question modals :
function openModal(button, mode) {
  if (mode === "add") {
    console.log("💀💀💀💀");
    document.getElementById("modal-question").classList.add("active");
    document.getElementById("question-form").reset();
  } else if (mode === "addCategory") {
    document.getElementById("modal-category").classList.add("active");
    document.getElementById("category-form").reset();
  } else if (mode === "edit") {
    document.getElementById("edit-question-form").reset();
    // get data from button
    const questionId = button.getAttribute("data-id");
    const questionText = button.getAttribute("data-question");
    const category = button.getAttribute("data-category");

    const answersString = button.getAttribute("data-answers");
    let answers = [];

    if (answersString && answersString.trim() !== "") {
      answers = answersString.split("|").map((a) => {
        const [answerId, text, isCorrect] = a.split(":");
        return {
          id: answerId,
          text: text,
          isCorrect: isCorrect === "1",
        };
      });
    }
  const container = document.querySelector(".edit-option-item");

container.innerHTML = answers
  .map(
    (ans, index) => `
      <div class="answer-block">
        <input
          type="hidden"
          name="answerId[]"
          value="${ans.id}"
        />
        <input
          type="text"
          name="answerText[]"
          value="${ans.text}"
          placeholder="${ans.text}"
          required
        />
        <input
          type="checkbox"
          name="status[]"
          value="${index}"
          title="Correct answer"
          ${ans.isCorrect ? "checked" : ""}
        />
      </div>
    `
  )
  .join("");

    console.log("🔪🔪🔪🔪", answers);

    // fill hidden input
    document.getElementById("edit-question-id").value = questionId;
    document.getElementById("edit-question-text").value = questionText;
    document.getElementById("edit-question-category").textContent = category;

    document.getElementById("modal-edit-question").classList.add("active");
  }
}

// close modal
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// Delete a question by ID after user confirmation, then reload the page to reflect changes :
async function deleteQuestion(id) {
  console.log(id);
  if (confirm("Are you sure you want to delete this question?")) {
    try {
      const res = await fetch(`/admin-dashboard/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Question deleted ✅");
        location.reload(); // reload the page to see changes
      } else {
        alert("❌ Failed to delete question");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error while deleting question");
    }
  }
}

// Confirm deletion and redirect to delete URL if confirmed :
function confirmDelete(id) {
  if (confirm("Are you sure you want to delete this question?")) {
    window.location.href = `/admin-dashboard/delete/${id}`;
  }
}
// Confirm logout and redirect to login page if confirmed :
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    alert("Logging out...");
    window.location.href = "/login";
  }
}


