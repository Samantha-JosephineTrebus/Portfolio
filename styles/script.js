document.addEventListener("DOMContentLoaded", () => {
  // Erschein-Animation für Artikel
  const articles = document.querySelectorAll("article");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },  
    { threshold: 0.01 }
  );
  articles.forEach(article => observer.observe(article));

  // Formular-Validierung
  const form = document.querySelector("form");
  const firstNameInput = document.getElementById("fn");
  const lastNameInput = document.getElementById("ln");
  const feedbackNachname = document.getElementById("feedbackNachname");
  const formMessage = document.getElementById("form-message");
  const checkmark = document.getElementById("checkmark");
  const checkbox = document.getElementById("ergebnisPerMail");

  const namePattern = /^[A-ZÜÄÖ]/;

  // Live-Validierung für Nachname
  lastNameInput.addEventListener("input", () => {
    const value = lastNameInput.value.trim();

    // Klassen zurücksetzen, damit sich der Text während der Eingabe ändert
    feedbackNachname.classList.remove("error", "success");
    checkmark.classList.remove("visible");

    if (value === "") {
      feedbackNachname.textContent = " Der Nachname darf nicht leer sein.";
      feedbackNachname.classList.add("error");
    } else if (value.length < 2) {
      feedbackNachname.textContent = " Der Nachname muss mindestens 2 Buchstaben haben.";
      feedbackNachname.classList.add("error");
    } else if (!namePattern.test(value)) {
      feedbackNachname.textContent = " Der Nachname muss mit einem Großbuchstaben beginnen.";
      feedbackNachname.classList.add("error");
    } else {
      feedbackNachname.textContent = "";
      feedbackNachname.classList.add("success");
      checkmark.classList.add("visible");
    }
  });

  // Validierung beim Abschicken
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const checkboxChecked = checkbox.checked;

    const firstNameValid = firstName !== "";
    const lastNameValid = lastName.length >= 2 && namePattern.test(lastName);

    let errorMessages = [];

    // Klassen zurücksetzen, damit sich der Text während der Eingabe ändert
    formMessage.classList.remove("error", "success");

    if (!firstNameValid) {
      errorMessages.push("Vorname darf nicht leer sein.");
    }

    if (!lastNameValid) {
      errorMessages.push("Nachname ist ungültig. Bitte beachte die Hinweise.");
    }

    if (!checkboxChecked) {
      errorMessages.push("Du musst bestätigen, dass du das Ergebnis per E-Mail erhalten möchtest.");
    }

    if (errorMessages.length === 0) {
      formMessage.textContent = "Formular wurde erfolgreich abgeschickt.";
      formMessage.classList.add("success");
    } else {
      formMessage.textContent = errorMessages.join(" ");
      formMessage.classList.add("error");
    }
  });

    // Beim Klicken des Zurücksetzen-Buttons werden die Nachrichten wieder entfernt
    form.addEventListener("reset", function () {
      feedbackNachname.textContent = "";
      feedbackNachname.classList.remove("error", "success");
  
      checkmark.classList.remove("visible");
  
      formMessage.textContent = "";
      formMessage.classList.remove("error", "success");
    });
  
});
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const header = document.querySelector('header');

    const headerOffset = header.offsetHeight; // Höhe des Headers
    let extraPadding = -170; // Standard-Padding nach Header in px
    
    // Anderes Padding für #home
    if (target.id === 'home') {
      extraPadding = 50; // Extra Padding für das erste article
    }

    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset - extraPadding;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", function() {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
    // Schließe Mobile-Menü nach Link-Klick
    const navLinksElement = document.getElementById("navLinks");
    const menuToggle = document.getElementById("menuToggle");
    if (navLinksElement) {
      navLinksElement.classList.remove("active");
      if (menuToggle) {
        menuToggle.classList.remove("active");
      }
    }
  });
});

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      if (navigation) {
        navigation.classList.toggle("active");
      }
      if (navLinks) {
        navLinks.classList.toggle("active");
      }
    });
  }

  // Schließe Menü wenn man außerhalb klickt
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav") && !e.target.closest(".menu-toggle")) {
      if (navigation) navigation.classList.remove("active");
      if (navLinks) navLinks.classList.remove("active");
      if (menuToggle) menuToggle.classList.remove("active");
    }
  });
});