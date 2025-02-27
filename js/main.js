document.addEventListener("DOMContentLoaded", function () {

  const smiley = document.querySelector(".smiley-icon");
  const infoBox = document.querySelector(".info-box");

  if (smiley && infoBox) { // Ensure elements exist before attaching event listeners
    smiley.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent closing when clicking the smiley itself
      infoBox.classList.toggle("visible");
      smiley.innerHTML = infoBox.classList.contains("visible") ? "😃" : "😊";
    });

    // Close the info box when clicking anywhere outside of it
    document.addEventListener("click", function (event) {
      if (!infoBox.contains(event.target) && !smiley.contains(event.target)) {
        infoBox.classList.remove("visible");
        smiley.innerHTML = "😊"; // Reset back to default icon
      }
    });
  } else {
    console.error("Smiley face or info box not found in the document.");
  }
  
  // --- Pricing Section (with Accordion Functionality) ---
  const pricingContainer = document.getElementById("pricingContainer");
  if (pricingContainer) {
    pricingContainer.classList.add(
      "w-full", "md:w-2/5", "lg:w-1/3",
      "border", "border-gray-700", "rounded", "p-6", 
      "bg-[#171717]", "h-full", "overflow-hidden", "flex", "flex-col"
    );    

    
    const pricingHeading = document.createElement("h2");
    pricingHeading.className = "text-2xl font-bold text-amber-600 mb-4";
    pricingHeading.textContent = "Cennik";
    pricingContainer.appendChild(pricingHeading);

    const pricingCardsContainer = document.createElement("div");
    pricingCardsContainer.className = "space-y-4 flex-grow overflow-y-auto h-full";
    pricingContainer.appendChild(pricingCardsContainer);

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
          expandedInfo.className = "expanded-info mt-2 p-2 bg-[#171717] rounded shadow transition-all duration-300 overflow-hidden";
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
      "bg-[#171717]", "h-full", "overflow-hidden", "flex", "flex-col"
    );
    
    const ebooksHeading = document.createElement("h2");
    ebooksHeading.className = "text-2xl font-bold text-amber-600 mb-4";
    ebooksHeading.textContent = "Pobierz Ebook";
    ebooksContainer.appendChild(ebooksHeading);

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
      ebookCard.setAttribute("data-calories", ebook.calories);
      
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
    let imageSrc = galleryImages[currentIndex].src;
    // Replace '_resized' in the filename to load the full‑size image
    let fullSizeSrc = imageSrc.replace('_resized', '');
    lightboxImg.src = fullSizeSrc;
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
      event.preventDefault(); // Prevent the default link behavior
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    });
  
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    });
  
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.classList.remove("modal-open");
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
  
  function filterEbooks() {
    const filterValue = parseInt(ebookInput.value, 10);
    const ebookCards = ebookInner.querySelectorAll(".ebook-card");

    ebookCards.forEach(card => {
      const ebookCalories = parseInt(card.getAttribute("data-calories"), 10);

      if (isNaN(filterValue) || Math.abs(ebookCalories - filterValue) <= 50) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  ebookInput.addEventListener("input", filterEbooks);

  let lastScrollTop = 0;
  const nav = document.querySelector("nav");
  const footer = document.querySelector("footer");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      nav.style.transform = "translateY(-100%)";
      footer.style.transform = "translateY(0)";
    } else {
      nav.style.transform = "translateY(0)";
      footer.style.transform = "translateY(100%)";
    }
    lastScrollTop = scrollTop;
  });

  // Only run this on mobile
  if (window.innerWidth <= 768) {
    const tabPricing = document.getElementById('tabPricing');
    const tabEbooks = document.getElementById('tabEbooks');
    const pricingContainer = document.getElementById('pricingContainer');
    const ebooksContainer = document.getElementById('ebooksContainer');
    
    // Initially show only the pricing section on mobile
    pricingContainer.style.display = 'block';
    ebooksContainer.style.display = 'none';
    tabPricing.classList.add('active-tab');
    tabEbooks.classList.remove('active-tab');
  
    tabPricing.addEventListener('click', () => {
      pricingContainer.style.display = 'block';
      ebooksContainer.style.display = 'none';
      tabPricing.classList.add('active-tab');
      tabEbooks.classList.remove('active-tab');
    });
  
    tabEbooks.addEventListener('click', () => {
      pricingContainer.style.display = 'none';
      ebooksContainer.style.display = 'block';
      tabEbooks.classList.add('active-tab');
      tabPricing.classList.remove('active-tab');
    });
  }  
  
  if (window.innerWidth <= 768) {
    const compareContainers = document.querySelectorAll('.compare-container');
    compareContainers.forEach(container => {
      let activeHalf = null;
      const halves = container.querySelectorAll('.compare-half');
      halves.forEach(half => {
        ['click', 'touchstart'].forEach(eventType => {
          half.addEventListener(eventType, function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (activeHalf === this) {
              // Tapped the same half again: reset to 50/50
              halves.forEach(h => h.style.width = '50%');
              activeHalf = null;
            } else {
              // Expand the tapped half and collapse the other
              halves.forEach(h => h.style.width = (h === this ? '100%' : '0'));
              activeHalf = this;
            }
          });
        });
      });
    });
  } 

  // Obsługa banera cookies
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookies = document.getElementById("acceptCookies");
  const rejectCookies = document.getElementById("rejectCookies");

  // Jeśli wybór już był dokonany, nie pokazujemy banera
  if (localStorage.getItem("cookieConsent")) {
    cookieConsent.style.display = "none";
  } else {
    cookieConsent.style.display = "block";
  }

  acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    cookieConsent.style.display = "none";
  });

  rejectCookies.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "rejected");
    cookieConsent.style.display = "none";
  });
});