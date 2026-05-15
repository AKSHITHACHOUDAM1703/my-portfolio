const contactForm = document.getElementById("contactForm");

function showMessage(message, type) {
  let popup = document.getElementById("popupMessage");

  if (!popup) {
    popup = document.createElement("div");
    popup.id = "popupMessage";
    document.body.appendChild(popup);
  }

  popup.textContent = message;
  popup.className = type === "success" ? "success" : "error";
  popup.style.display = "block";

  clearTimeout(window.popupTimer);
  window.popupTimer = setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email", "error");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage("Message sent successfully!", "success");
        contactForm.reset();
      } else {
        showMessage(data.message || "Error saving message", "error");
      }
    } catch (err) {
      console.log(err);
      showMessage("Server Error", "error");
    }
  });
}
