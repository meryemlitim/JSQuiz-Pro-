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

      function openModal(mode, id = null) {
        const modal = document.getElementById("modal");
        const title = document.getElementById("modal-title");

        if (mode === "add") {
          title.textContent = "Add New Question";
          document.getElementById("question-form").reset();
        } else {
          title.textContent = "Edit Question";
          // In a real app, you would load the question data here
        }

        modal.classList.add("active");
      }

      function closeModal() {
        document.getElementById("modal").classList.remove("active");
      }

      function deleteQuestion(id) {
        if (confirm("Are you sure you want to delete this question?")) {
          alert("Question deleted! (In production, this would call the API)");
          // In production: call API to delete question
        }
      }

      function logout() {
        if (confirm("Are you sure you want to logout?")) {
          alert("Logging out...");
          // In production: clear session and redirect to login
          window.location.href = "/login";
        }
      }

      // document.getElementById('question-form').addEventListener('submit', function(e) {
      //     e.preventDefault();
      //     alert('Question saved! (In production, this would call the API)');
      //     closeModal();
      // });

      // Close modal when clicking outside
      document.getElementById("modal").addEventListener("click", function (e) {
        if (e.target === this) {
          closeModal();
        }
      });