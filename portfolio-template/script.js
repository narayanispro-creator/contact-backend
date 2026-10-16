// ---------- Contact form ----------
// CHANGE THIS: replace YOUR-BACKEND-NAME with the name of YOUR backend project on Netlify.

const API_URL = "https://yourname-contact-api.netlify.app/.netlify/functions/contact";

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // stop the page from reloading
  const status = document.getElementById("form-status");

  if (API_URL.includes("YOUR-BACKEND-NAME")) {
    status.textContent = "First put your backend address in script.js (API_URL).";
    return;
  }

  const data = Object.fromEntries(new FormData(e.target));
  status.textContent = "Sending...";
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      status.textContent = "Message sent!";
      e.target.reset();
    } else {
      status.textContent = result.error;
    }
  } catch {
    status.textContent = "Network error. Check API_URL in script.js.";
  }
});
