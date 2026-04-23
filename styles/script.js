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

  // Preiskarten-Funktionalität - Zum Kontakt springen
  const priceCards = document.querySelectorAll(".price-card");
  priceCards.forEach(card => {
    card.addEventListener("click", () => {
      const contactSection = document.getElementById("kontakt");
      if (contactSection) {
        const headerOffset = 80; // Höhe des Headers
        const extraPadding = 20;
        const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - extraPadding;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Kontaktformular-Validierung
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const privacy = document.getElementById("privacy");
    const successMessage = document.getElementById("successMessage");

    const namePattern = /^[A-ZÜÄÖ]/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Live-Validierung für Nachname
    lastName.addEventListener("input", () => {
      const value = lastName.value.trim();
      const errorSpan = document.getElementById("lastNameError");
      errorSpan.textContent = "";
      
      if (value === "") {
        errorSpan.textContent = "Der Nachname darf nicht leer sein.";
      } else if (value.length < 2) {
        errorSpan.textContent = "Der Nachname muss mindestens 2 Buchstaben haben.";
      } else if (!namePattern.test(value)) {
        errorSpan.textContent = "Der Nachname muss mit einem Großbuchstaben beginnen.";
      }
    });

    // Formular absenden
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Fehler zurücksetzen
      document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
      successMessage.textContent = "";

      let hasErrors = false;

      // Validierung
      if (firstName.value.trim() === "") {
        document.getElementById("firstNameError").textContent = "Vorname ist erforderlich.";
        hasErrors = true;
      }

      const lastNameValue = lastName.value.trim();
      if (lastNameValue === "") {
        document.getElementById("lastNameError").textContent = "Nachname ist erforderlich.";
        hasErrors = true;
      } else if (lastNameValue.length < 2) {
        document.getElementById("lastNameError").textContent = "Nachname muss mindestens 2 Buchstaben haben.";
        hasErrors = true;
      } else if (!namePattern.test(lastNameValue)) {
        document.getElementById("lastNameError").textContent = "Nachname muss mit einem Großbuchstaben beginnen.";
        hasErrors = true;
      }

      if (email.value.trim() === "") {
        document.getElementById("emailError").textContent = "E-Mail ist erforderlich.";
        hasErrors = true;
      } else if (!emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent = "Bitte gib eine gültige E-Mail-Adresse ein.";
        hasErrors = true;
      }

      if (subject.value.trim() === "") {
        document.getElementById("subjectError").textContent = "Betreff ist erforderlich.";
        hasErrors = true;
      }

      if (message.value.trim() === "") {
        document.getElementById("messageError").textContent = "Nachricht ist erforderlich.";
        hasErrors = true;
      }

      if (!privacy.checked) {
        document.getElementById("privacyError").textContent = "Du musst den Datenschutz akzeptieren.";
        hasErrors = true;
      }

      if (!hasErrors) {
        // Formular-Daten sammeln und an Basin senden
        const formData = new FormData(contactForm);
        
        fetch("https://usebasin.com/f/97c62595a73c", {
          method: "POST",
          body: formData
        })
        .then(response => {
          if (response.ok) {
            successMessage.textContent = "✓ Nachricht erfolgreich abgesendet! Ich antworte dir in Kürze.";
            contactForm.reset();
          } else {
            successMessage.textContent = "✗ Es gab einen Fehler. Bitte versuche es später erneut.";
          }
        })
        .catch(error => {
          successMessage.textContent = "✗ Es gab einen Fehler beim Absenden.";
          console.error("Error:", error);
        });
      }
    });
  }

  // =================== LIGHTBOX FUNKTIONALITÄT ===================
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-nav-btn.prev");
  const lightboxNext = document.querySelector(".lightbox-nav-btn.next");
  const galleryImages = document.querySelectorAll(".gallery-image");

  let currentImageIndex = 0;
  let currentGallery = [];

  // Öffne Lightbox beim Klick auf ein Bild
  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      // Finde die Gallery des geklickten Bildes
      const gallery = image.closest(".gallery-slider");
      const allImagesInGallery = gallery.querySelectorAll(".gallery-image");
      
      currentGallery = Array.from(allImagesInGallery);
      currentImageIndex = Array.from(allImagesInGallery).indexOf(image);
      
      displayLightboxImage();
      lightboxModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function displayLightboxImage() {
    const image = currentGallery[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
  }

  // Navigation in der Lightbox
  lightboxPrev.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    displayLightboxImage();
  });

  lightboxNext.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    displayLightboxImage();
  });

  // Schließe Lightbox
  function closeLightbox() {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  lightboxClose.addEventListener("click", closeLightbox);

  // Schließe Lightbox wenn man auf den Hintergrund klickt
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Schließe Lightbox mit Escape-Taste
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
      closeLightbox();
    }
  });

  // Tastatur-Navigation in der Lightbox
  document.addEventListener("keydown", (e) => {
    if (lightboxModal.classList.contains("active")) {
      if (e.key === "ArrowLeft") {
        lightboxPrev.click();
      } else if (e.key === "ArrowRight") {
        lightboxNext.click();
      }
    }
  });
});
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const header = document.querySelector('header');

    const headerOffset = header.offsetHeight; // Höhe des Headers
    let extraPadding = -115; // Standard-Padding nach Header in px
    
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

// =================== PROJECT GALLERY SLIDER ===================
class GallerySlider {
  constructor(projectElement) {
    this.projectElement = projectElement;
    this.currentIndex = 0;
    this.gallery = projectElement.querySelector('.project-gallery');
    
    if (!this.gallery) return;

    this.track = this.gallery.querySelector('.gallery-track');
    this.images = this.gallery.querySelectorAll('.gallery-image');
    this.prevBtn = this.gallery.querySelector('.gallery-btn.prev');
    this.nextBtn = this.gallery.querySelector('.gallery-btn.next');
    this.dots = this.gallery.querySelectorAll('.dot');

    if (this.images.length === 0) return;

    // Dynamisch die Track-Breite und Bild-Breite setzen
    const imageCount = this.images.length;
    
    this.track.style.width = (imageCount * 100) + '%';
    this.images.forEach(img => {
      img.style.width = '100%';
      img.style.minWidth = '100%';
      img.style.maxWidth = '100%';
      img.style.flexBasis = '100%';
    });

    console.log(`Gallery initialized: ${imageCount} images, each 100%, track ${imageCount * 100}%`);

    this.setupEventListeners();
    this.updateGallery();
  }

  setupEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousImage());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextImage());
    }

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToImage(index));
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (this.projectElement.open) {
        if (e.key === 'ArrowLeft') this.previousImage();
        if (e.key === 'ArrowRight') this.nextImage();
      }
    });
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateGallery();
  }

  previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateGallery();
  }

  goToImage(index) {
    this.currentIndex = index;
    this.updateGallery();
  }

  updateGallery() {
    const imageCount = this.images.length;
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
}

// Initialisiere Galleries für alle Projekte
document.querySelectorAll('.project-card').forEach(card => {
  new GallerySlider(card);
});