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

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", function() {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const header = document.querySelector('header');

    const headerOffset = header.offsetHeight; // Höhe des Headers
    const extraPadding = 20; // zusätzliches Padding nach Header in px

    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset - extraPadding;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});
