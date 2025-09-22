document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio-Seite geladen!");
  
  // Optional: kleines Beispiel für Interaktion
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Danke für deine Nachricht!");
      form.reset();
    });
  }
});
