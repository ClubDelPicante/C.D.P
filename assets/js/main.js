/**
* Template Name: Yummy
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


window.addEventListener('scroll', function() {
  const navbar = document.querySelector('#header');
  if (window.scrollY > 50) {
      navbar.classList.add('visible');
  } else {
      navbar.classList.remove('visible');
  }
});




// 🔥 Efecto de Humo Picante - Subiendo desde la parte inferior
const canvas = document.getElementById("spicySmokeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 3; // Solo cubre la parte inferior

let particles = [];

class SmokeParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            "rgba(255, 255, 254, 0.6)",   // Rojo intenso (picante)
            "rgba(241, 241, 241, 0.5)",  // Naranja fuerte
            "rgba(255, 215, 0, 0.4)"   // Amarillo leve
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y -= this.speedY;
        this.opacity -= 0.005;

        if (this.opacity <= 0) {
            this.reset();
        }
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.color = this.getRandomColor();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Función para generar nuevas partículas de humo
function createSmoke() {
    if (particles.length < 100) { // Controla la cantidad de partículas activas
        for (let i = 0; i < 3; i++) {
            particles.push(new SmokeParticle());
        }
    }
}

// Función para animar el humo picante
function animateSmoke() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });

    createSmoke();
    requestAnimationFrame(animateSmoke);
}

// Ajustar tamaño del canvas al redimensionar
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 3;
});

// Iniciar animación
animateSmoke();


document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío normal del formulario

  const formData = new FormData(this);
  const responseMessage = document.getElementById("responseMessage");

  fetch("https://formspree.io/federicorosciani2003@hotmail.com", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
  })
  .then(response => {
      if (response.ok) {
          responseMessage.textContent = "✅ ¡Mensaje enviado correctamente!";
          responseMessage.style.color = "green";
          this.reset();
      } else {
          throw new Error("Error al enviar el mensaje");
      }
  })
  .catch(error => {
      responseMessage.textContent = "❌ Hubo un problema. Inténtalo de nuevo.";
      responseMessage.style.color = "red";
  });
});


