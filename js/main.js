document.addEventListener("DOMContentLoaded", function () {
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

  // Ebook Form Logic
  const ebookForm = document.getElementById("ebookForm");
  if (ebookForm) {
    ebookForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Ebook został zamówiony! Sprawdź swoją skrzynkę e-mail.");
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

      alert(`Ebook "${selectedFile}" został pobrany!`);
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

});
