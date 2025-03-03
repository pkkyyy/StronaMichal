function lazyLoadImages() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const smiley = document.querySelector(".smiley-icon");
  const infoBox = document.querySelector(".info-box");

  if (smiley && infoBox) {
    smiley.addEventListener("click", function (event) {
      event.stopPropagation();
      infoBox.classList.toggle("visible");
      smiley.innerHTML = infoBox.classList.contains("visible") ? "😃" : "😊";
    });

    document.addEventListener("click", function (event) {
      if (!infoBox.contains(event.target) && !smiley.contains(event.target)) {
        infoBox.classList.remove("visible");
        smiley.innerHTML = "😊";
      }
    });
  } else {
    console.error("Smiley face or info box not found in the document.");
  }
  
  // --- Pricing Section ---
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
      { title: "Trening Jednorazowy", price: "darmowy", description: "Jeżeli nie wiesz czy to dla ciebie wychodzę na przeciw i za pierwszy trening nic nie płacisz ", details: "Zawiera rozgrzewkę, trening podstawowy, cardio i stretching." },
      { title: "Pakiet 4 Treningów", price: "440", description: "Optymalny wybór dla regularnych treningów.", details: "4 sesji z indywidualnym planem oraz konsultacją dietetyczną." },
      { title: "Pakiet 8 Treningów", price: "800", description: "Najlepsza oferta dla pełnej metamorfozy.", details: "8 sesji, spersonalizowany plan, konsultacja dietetyczna oraz monitorowanie postępów." },
      { title: "Pakiet 12 Treningów", price: "1080", description: "Kompleksowy pakiet treningów dla pełnej transformacji.", details: "12 sesji, pełna transformacja, plan żywieniowy i ocena postępów." }
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

  // --- Ebooks Section ---
  const ebooksContainer = document.getElementById("ebooksContainer");
  if (ebooksContainer) {
    ebooksContainer.classList.add(
      "w-full", "md:w-3/4", "lg:w-2/3",
      "border", "border-gray-700", "rounded", "p-6", 
      "bg-[#171717]", "h-full", "overflow-hidden", "flex", "flex-col"
    );
    
    const ebooksHeading = document.createElement("h2");
    ebooksHeading.className = "text-2xl font-bold text-amber-600 mb-4";
    ebooksHeading.textContent = "Ebook";
    ebooksContainer.appendChild(ebooksHeading);

    const ebookInner = document.createElement("div");
    ebookInner.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow overflow-y-auto h-full";
    ebooksContainer.appendChild(ebookInner);

    const ebooksData = [
      { 
        title: "Ebook 1: Trening dla początkujących", 
        image: "images/E-book_1700_kcal.jpg", 
        description: "Poznaj podstawy treningu i rozpocznij swoją przygodę z fitnessem.", 
        calories: "1700", 
        link: "https://www.naffy.io/michal-salinski/plan-zywieniowy-1700-kcal-64b" 
      },
      { 
        title: "Ebook 2: Zaawansowane techniki", 
        image: "images/E-book_2000_kcal.jpg", 
        description: "Zaawansowane metody treningowe dla wymagających.", 
        calories: "2000", 
        link: "https://www.naffy.io/michal-salinski/plan-zywieniowy-2000-kcal-DuH" 
      },
      { 
        title: "Ebook 3: Dieta i zdrowy styl życia", 
        image: "images/E-book_2700_kcal.jpg", 
        description: "Poradnik zdrowego odżywiania oraz stylu życia.", 
        calories: "2700", 
        link: "https://www.naffy.io/michal-salinski/plan-zywieniowy-2700-kcal-rWD" 
      },
      { 
        title: "Ebook 4: Cardio Masterclass", 
        image: "images/E-book_2300_kcal.jpg", 
        description: "Intensywne treningi cardio dla wytrzymałości.", 
        calories: "2300", 
        link: "https://www.naffy.io/michal-salinski/plan-zywieniowy-2300-kcal-MZM" 
      },
      { 
        title: "Ebook 5: Siła i masa", 
        image: "images/ebook5.jpg", 
        description: "Jak zbudować masę mięśniową efektywnie.", 
        calories: "280", 
        link: "https://example.com/buy-ebook5" 
      }
    ];

    ebooksData.forEach(ebook => {
      const ebookCard = document.createElement("div");
      ebookCard.className = "ebook-card bg-[#262626] p-4 rounded shadow flex flex-col h-full";
      ebookCard.setAttribute("data-calories", ebook.calories);
      
      ebookCard.innerHTML = `
        <div class="flex flex-col h-full">
          <img data-src="${ebook.image}" alt="${ebook.title}" class="w-full rounded mb-2" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E">
          <h3 class="text-xl font-bold">${ebook.title}</h3>
          <p class="text-sm min-h-[60px]">${ebook.description}</p>
          <div class="mt-auto">
            <p class="text-sm text-amber-600">Kalorie: ${ebook.calories}</p>
            <a href="${ebook.link}" target="_blank" class="mt-2 inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">Kup teraz</a>
          </div>
        </div>
      `;
      
      ebookInner.appendChild(ebookCard);
    });
  }
  
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.getElementById("close-lightbox");
  const prevBtn = document.getElementById("prev-image");
  const nextBtn = document.getElementById("next-image");

  const galleryImages = document.querySelectorAll(".gallery-item img");
  galleryImages.forEach(img => {
    img.setAttribute('data-src', img.src);
    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";
  });

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    let imageSrc = galleryImages[currentIndex].src;
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
      event.preventDefault();
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
    
    if (isNaN(filterValue) || ebookInput.value.trim() === "") {
      ebookCards.forEach(card => {
        card.style.display = "block";
      });
      return;
    }
  
    let acceptableRange;
    
    if (filterValue < 1000) {
      acceptableRange = 100;
    } else if (filterValue < 2000) {
      acceptableRange = 200;
    } else {
      acceptableRange = 300;
    }
  
    ebookCards.forEach(card => {
      const ebookCalories = parseInt(card.getAttribute("data-calories"), 10);
      
      if (Math.abs(ebookCalories - filterValue) <= acceptableRange) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
    
    let anyVisible = false;
    ebookCards.forEach(card => {
      if (card.style.display !== "none") {
        anyVisible = true;
      }
    });
    
    if (!anyVisible) {
      ebookCards.forEach(card => {
        card.style.display = "block";
      });
      
      const notificationEl = document.getElementById("filter-notification");
      if (notificationEl) {
        notificationEl.textContent = "Brak dokładnych dopasowań. Wyświetlanie wszystkich e-booków.";
        notificationEl.style.display = "block";
        
        setTimeout(() => {
          notificationEl.style.display = "none";
        }, 3000);
      }
    }
    lazyLoadImages();
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

  if (window.innerWidth <= 768) {
    const tabPricing = document.getElementById('tabPricing');
    const tabEbooks = document.getElementById('tabEbooks');
    const pricingContainer = document.getElementById('pricingContainer');
    const ebooksContainer = document.getElementById('ebooksContainer');
    
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
              halves.forEach(h => h.style.width = '50%');
              activeHalf = null;
            } else {
              halves.forEach(h => h.style.width = (h === this ? '100%' : '0'));
              activeHalf = this;
            }
          });
        });
      });
    });
  } 

  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookies = document.getElementById("acceptCookies");
  const rejectCookies = document.getElementById("rejectCookies");

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

  lazyLoadImages();
});