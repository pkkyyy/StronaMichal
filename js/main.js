document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.getElementById("close-lightbox");
  const prevBtn = document.getElementById("prev-image");
  const nextBtn = document.getElementById("next-image");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Blokowanie scrollowania

    // Ukryj przyciski jeśli to pierwszy lub ostatni obraz
    prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    nextBtn.style.display = currentIndex === galleryImages.length - 1 ? "none" : "block";
  }

  function closeLightboxFunc() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = ""; // Przywrócenie scrollowania
  }

  function changeImage(direction) {
    if (direction === "next" && currentIndex < galleryImages.length - 1) {
      currentIndex++;
    } else if (direction === "prev" && currentIndex > 0) {
      currentIndex--;
    }
    openLightbox(currentIndex);
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  closeLightbox.addEventListener("click", closeLightboxFunc);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightboxFunc();
  });

  prevBtn.addEventListener("click", () => changeImage("prev"));
  nextBtn.addEventListener("click", () => changeImage("next"));

  // Obsługa klawiatury
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "ArrowLeft") changeImage("prev");
      if (e.key === "ArrowRight") changeImage("next");
      if (e.key === "Escape") closeLightboxFunc();
    }
  });

  // Modal Handling
  const modal = document.getElementById("reservationModal");
  const openModalBtn = document.getElementById("openReservation");
  const closeModalBtn = document.getElementById("modalClose");

  if (openModalBtn && modal && closeModalBtn) {
    openModalBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Disable scrolling
    });

    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scrolling
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  // Expandable Pricing Cards with Single Open Logic
  let openCard = null;
  document.querySelectorAll(".pricing-card").forEach(card => {
    card.addEventListener("click", function () {
      if (openCard && openCard !== this) {
        openCard.querySelector(".expanded-info")?.remove();
      }

      const description = this.getAttribute("data-description");
      const trainingType = this.getAttribute("data-title");
      const price = this.getAttribute("data-price");
      const workoutList = "\n- Rozgrzewka\n- Trening siłowy\n- Cardio\n- Stretching";

      let expandedInfo = this.querySelector(".expanded-info");
      if (!expandedInfo) {
        expandedInfo = document.createElement("div");
        expandedInfo.classList.add(
          "expanded-info",
          "mt-2",
          "p-2",
          "bg-[#424141]",
          "rounded",
          "shadow",
          "transition-all",
          "duration-300"
        );
        expandedInfo.style.maxHeight = "0";
        expandedInfo.style.overflow = "hidden";
        expandedInfo.innerHTML = `
          <p><strong>Typ treningu:</strong> ${trainingType}</p>
          <p><strong>Opis:</strong> ${description}</p>
          <p><strong>Cena:</strong> ${price} PLN</p>
          <p><strong>Lista ćwiczeń:</strong>${workoutList}</p>
        `;
        this.appendChild(expandedInfo);

        setTimeout(() => {
          expandedInfo.style.maxHeight = "200px";
        }, 10);

        openCard = this;
      } else {
        expandedInfo.style.maxHeight = "0";
        setTimeout(() => expandedInfo.remove(), 300);
        openCard = null;
      }
    });
  });

  // Dodaj obsługę pobierania bez maila
  const downloadWithoutEmailBtn = document.getElementById("downloadWithoutEmail");
  if (downloadWithoutEmailBtn) {
    downloadWithoutEmailBtn.addEventListener("click", function () {
      const selectedEbook = document.getElementById("ebookTitle");
      const selectedFile = selectedEbook.options[selectedEbook.selectedIndex].getAttribute("data-file");

      const downloadLink = document.createElement("a");
      downloadLink.href = `./ebooks/${selectedFile}`;
      downloadLink.download = selectedFile;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, 
          behavior: "smooth"
        });
      }
    });
  });

  // Smooth Scroll Effect (without blocking manual scrolling)
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  });
  
  document.querySelectorAll(".copy-icon").forEach(icon => {
    icon.addEventListener("click", function () {
      const textToCopy = this.getAttribute("data-copy");
      const notification = this.nextElementSibling.nextElementSibling; // Pobiera powiadomienie
      
      // Kopiowanie do schowka
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Pokazanie powiadomienia
        notification.classList.remove("opacity-0");
        notification.classList.add("opacity-100");

        // Ukrycie powiadomienia po 2 sekundach
        setTimeout(() => {
          notification.classList.remove("opacity-100");
          notification.classList.add("opacity-0");
        }, 2000);
      }).catch(err => console.error("Błąd kopiowania: ", err));
    });
  });
});
