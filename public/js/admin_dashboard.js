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

function openModal(mode) {
  if (mode === "add") {
    document.getElementById("modal-question").classList.add("active");
    document.getElementById("question-form").reset();
  } else if (mode === "addCategory") {
    document.getElementById("modal-category").classList.add("active");
    document.getElementById("category-form").reset();
  } else if (mode === "edit") {
    document.getElementById("modal-question").classList.add("active");
    // load question data here
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}


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

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    alert("Logging out...");
    // In production: clear session and redirect to login
    window.location.href = "/login";
  }
}



function confirmDelete(id) {
  if (confirm("Are you sure you want to delete this question?")) {
 
    window.location.href = `/admin-dashboard/delete/${id}`;
  }
}
