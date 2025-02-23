document.addEventListener("DOMContentLoaded", function () {
  // --- Pricing Section (with Accordion Functionality) ---
  const pricingContainer = document.getElementById("pricingContainer");
  if (pricingContainer) {
    pricingContainer.classList.add(
      "w-full", "md:w-2/5", "lg:w-1/3",
      "border", "border-gray-700", "rounded", "p-6", 
      "bg-[#1f2937]", "h-full", "overflow-hidden", "flex", "flex-col"
    );    
    const pricingHeading = document.createElement("h2");
    pricingHeading.className = "text-2xl font-bold text-amber-600 mb-4";
    pricingHeading.textContent = "Cennik";
    pricingContainer.appendChild(pricingHeading);

    const pricingCardsContainer = document.createElement("div");
    pricingCardsContainer.className = "space-y-4 flex-grow overflow-y-auto h-full";
    pricingContainer.appendChild(pricingCardsContainer);

    // New pricing data with additional options and extra details
    const pricingCards = [
      { title: "Trening Jednorazowy", price: "100", description: "Idealny na początek lub próbny trening.", details: "Zawiera rozgrzewkę, trening podstawowy, cardio i stretching." },
      { title: "Pakiet 5 Treningów", price: "450", description: "Optymalny wybór dla regularnych treningów.", details: "5 sesji z indywidualnym planem oraz konsultacją dietetyczną." },
      { title: "Pakiet 10 Treningów", price: "850", description: "Najlepsza oferta dla pełnej metamorfozy.", details: "10 sesji, spersonalizowany plan, konsultacja dietetyczna oraz monitorowanie postępów." },
      { title: "Pakiet 15 Treningów", price: "1850", description: "Kompleksowy pakiet treningów dla pełnej transformacji.", details: "15 sesji, pełna transformacja, plan żywieniowy i ocena postępów." },
      { title: "Pakiet Premium", price: "2500", description: "Oferta premium dla wymagających.", details: "Zindywidualizowany plan, konsultacja żywieniowa i wsparcie trenera na każdym etapie." },
      { title: "Pakiet VIP", price: "3500", description: "Oferta VIP dla najbardziej wymagających.", details: "Pełny pakiet premium, stały kontakt, ekskluzywny dostęp do sprzętu oraz dodatkowe konsultacje." },
      { title: "Pakiet 10 Treningów", price: "850", description: "Najlepsza oferta dla pełnej metamorfozy.", details: "10 sesji, spersonalizowany plan, konsultacja dietetyczna oraz monitorowanie postępów." },
      { title: "Pakiet 15 Treningów", price: "1850", description: "Kompleksowy pakiet treningów dla pełnej transformacji.", details: "15 sesji, pełna transformacja, plan żywieniowy i ocena postępów." },
      { title: "Pakiet Premium", price: "2500", description: "Oferta premium dla wymagających.", details: "Zindywidualizowany plan, konsultacja żywieniowa i wsparcie trenera na każdym etapie." }
    ];

    // Create pricing cards and attach data attributes for expansion
    pricingCards.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "bg-[#262626] p-4 rounded shadow pricing-card cursor-pointer";
      cardDiv.setAttribute("data-title", card.title);
      cardDiv.setAttribute("data-price", card.price);
      cardDiv.setAttribute("data-description", card.description);
      cardDiv.setAttribute("data-details", card.details);
      cardDiv.innerHTML = `
        <h3 class="text-xl font-bold">${card.title}</h3>
        <p class="text-lg text-amber-600">${card.price} PLN</p>
      `;
      pricingCardsContainer.appendChild(cardDiv);
    });

    // Accordion behavior for pricing cards
    let openCard = null;
    document.querySelectorAll(".pricing-card").forEach(card => {
      card.addEventListener("click", function () {
        if (openCard && openCard !== this) {
          const prevExpanded = openCard.querySelector(".expanded-info");
          if (prevExpanded) {
            prevExpanded.style.maxHeight = "0";
            setTimeout(() => { prevExpanded.remove(); }, 300);
          }
        }
        let expandedInfo = this.querySelector(".expanded-info");
        if (!expandedInfo) {
          const description = this.getAttribute("data-description");
          const details = this.getAttribute("data-details");
          expandedInfo = document.createElement("div");
          expandedInfo.className = "expanded-info mt-2 p-2 bg-[#424141] rounded shadow transition-all duration-300 overflow-hidden";
          expandedInfo.style.maxHeight = "0";
          expandedInfo.innerHTML = `
            <p><strong>Opis:</strong> ${description}</p>
            <p><strong>Szczegóły:</strong> ${details}</p>
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

  }

  // --- Ebooks Section (Grid Layout with Uniform Images & Button Placement) ---
  const ebooksContainer = document.getElementById("ebooksContainer");
  if (ebooksContainer) {
    ebooksContainer.classList.add(
      "w-full", "md:w-3/4", "lg:w-2/3",
      "border", "border-gray-700", "rounded", "p-6", 
      "bg-[#1f2937]", "h-full", "overflow-hidden", "flex", "flex-col"
    );
    
    const ebooksHeading = document.createElement("h2");
    ebooksHeading.className = "text-2xl font-bold text-amber-600 mb-4";
    ebooksHeading.textContent = "Pobierz Ebook";
    ebooksContainer.appendChild(ebooksHeading);

    // Create grid container for ebook cards (4 per row on md+ screens)
    const ebookInner = document.createElement("div");
    ebookInner.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow overflow-y-auto h-full";
    ebooksContainer.appendChild(ebookInner);

    const ebooksData = [
      { 
        title: "Ebook 1: Trening dla początkujących", 
        image: "images/ebook1.jpg", 
        description: "Poznaj podstawy treningu i rozpocznij swoją przygodę z fitnessem.", 
        calories: "200", 
        link: "https://example.com/buy-ebook1" 
      },
      { 
        title: "Ebook 2: Zaawansowane techniki", 
        image: "images/ebook2.jpg", 
        description: "Zaawansowane metody treningowe dla wymagających.", 
        calories: "300", 
        link: "https://example.com/buy-ebook2" 
      },
      { 
        title: "Ebook 3: Dieta i zdrowy styl życia", 
        image: "images/ebook3.jpg", 
        description: "Poradnik zdrowego odżywiania oraz stylu życia.", 
        calories: "250", 
        link: "https://example.com/buy-ebook3" 
      },
      { 
        title: "Ebook 4: Cardio Masterclass", 
        image: "images/ebook4.jpg", 
        description: "Intensywne treningi cardio dla wytrzymałości.", 
        calories: "220", 
        link: "https://example.com/buy-ebook4" 
      },
      // Additional ebooks trigger scrollbar
      { 
        title: "Ebook 5: Siła i masa", 
        image: "images/ebook5.jpg", 
        description: "Jak zbudować masę mięśniową efektywnie.", 
        calories: "280", 
        link: "https://example.com/buy-ebook5" 
      },
      { 
        title: "Ebook 6: Siła i masa", 
        image: "images/ebook6.jpg", 
        description: "Jak zbudować masę mięśniową efektywnie.", 
        calories: "1280", 
        link: "https://example.com/buy-ebook5" 
      },
      { 
        title: "Ebook 7: Siła i masa", 
        image: "images/ebook7.jpg", 
        description: "Jak zbudować masę mięśniową efektywnie.", 
        calories: "1000", 
        link: "https://example.com/buy-ebook5" 
      },
      { 
        title: "Ebook 8: Siła i masa", 
        image: "images/ebook6.jpg", 
        description: "Jak zbudować masę mięśniową efektywnie.", 
        calories: "1580", 
        link: "https://example.com/buy-ebook5" 
      },
      { 
        title: "Ebook 9: Siła i masa", 
        image: "images/ebook7.jpg", 
        description: "Jak zbudować masę mięśniową efektywnie.", 
        calories: "1500", 
        link: "https://example.com/buy-ebook5" 
      }
      

    ];

    ebooksData.forEach(ebook => {
      const ebookCard = document.createElement("div");
      ebookCard.className = "ebook-card bg-[#262626] p-4 rounded shadow flex flex-col";
      ebookCard.setAttribute("data-calories", ebook.calories); // Add data-calories for filtering
      
      ebookCard.innerHTML = `
        <img src="${ebook.image}" alt="${ebook.title}" class="w-full rounded mb-2">
        <h3 class="text-xl font-bold">${ebook.title}</h3>
        <p class="text-sm flex-grow">${ebook.description}</p>
        <p class="text-sm text-amber-600">Calories: ${ebook.calories}</p>
        <a href="${ebook.link}" target="_blank" class="mt-2 inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">Kup teraz</a>
      `;
      
      ebookInner.appendChild(ebookCard);
    });    

  }

  // --- Existing Code for Lightbox, Modal Handling, Smooth Scrolling, etc. ---
  
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
    document.body.style.overflow = "hidden";

    prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    nextBtn.style.display = currentIndex === galleryImages.length - 1 ? "none" : "block";
  }

  function closeLightboxFunc() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
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

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "ArrowLeft") changeImage("prev");
      if (e.key === "ArrowRight") changeImage("next");
      if (e.key === "Escape") closeLightboxFunc();
    }
  });

  const modal = document.getElementById("reservationModal");
  const openModalBtn = document.getElementById("openReservation");
  const closeModalBtn = document.getElementById("modalClose");

  if (openModalBtn && modal && closeModalBtn) {
    openModalBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

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

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { ticking = false; });
      ticking = true;
    }
  });
  
  document.querySelectorAll(".copy-icon").forEach(icon => {
    icon.addEventListener("click", function () {
      const textToCopy = this.getAttribute("data-copy");
      const notification = this.nextElementSibling.nextElementSibling;
      navigator.clipboard.writeText(textToCopy).then(() => {
        notification.classList.remove("opacity-0");
        notification.classList.add("opacity-100");
        setTimeout(() => {
          notification.classList.remove("opacity-100");
          notification.classList.add("opacity-0");
        }, 2000);
      }).catch(err => console.error("Błąd kopiowania: ", err));
    });
  });

  const ebookInput = document.getElementById("caloriesFilter");
  const ebookInner = document.querySelector("#ebooksContainer div.grid");
  
  // Function to filter ebooks based on input
  function filterEbooks() {
    const filterValue = parseInt(ebookInput.value, 10);
    const ebookCards = ebookInner.querySelectorAll(".ebook-card");

    ebookCards.forEach(card => {
      const ebookCalories = parseInt(card.getAttribute("data-calories"), 10);

      // Show only ebooks within ±50 calories of input
      if (isNaN(filterValue) || Math.abs(ebookCalories - filterValue) <= 50) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Add event listener for real-time filtering
  ebookInput.addEventListener("input", filterEbooks);
});
