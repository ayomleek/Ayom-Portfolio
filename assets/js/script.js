document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       NAVBAR SCROLL EFFECT
    =============================== */
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "10px 0";
            navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
        } else {
            navbar.style.padding = "15px 0";
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }
    });


    /* ===============================
       MOBILE SLIDE MENU )
    =============================== */
    const menuOpen = document.querySelector("#menu-open-button");
    const menuClose = document.querySelector("#menu-close-button");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (menuOpen && menuClose) {

        menuOpen.addEventListener("click", () => {
            document.body.classList.add("open-mobile-menu");
        });

        menuClose.addEventListener("click", () => {
            document.body.classList.remove("open-mobile-menu");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                document.body.classList.remove("open-mobile-menu");
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                document.body.classList.remove("open-mobile-menu");
            }
        });
    }


   /* ===============================
   TYPING EFFECT
=============================== */
const typingText = document.querySelector(".typing-text-inner");

if (typingText) {

    const words = [
        "Coding",
        "Web Development", 
        "Reading Books",
        "Problem Solving"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            // Typing forward
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 1500); // Pause at the end
            }

        } else {
            // Deleting backward
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Move to next word
            }
        }

        setTimeout(typeEffect, isDeleting ? 50 : 120);
    }

    // Start the typing effect
    typeEffect();
}


    /* ===============================
       SMOOTH SCROLL
    =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });


    /* ===============================
       FOOTER YEAR
    =============================== */
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

});