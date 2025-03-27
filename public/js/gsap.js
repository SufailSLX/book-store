  // Wait for the DOM to load
  document.addEventListener("DOMContentLoaded", function () {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate the image
    gsap.from(".about-image", {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: {
            trigger: ".about-image",
            start: "top 80%", // Animation starts when the top of the image hits 80% of the viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
        },
    });

    // Animate the text
    gsap.from(".about-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
        },
    });

    // Animate the mission statement
    gsap.from(".mission-statement", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5, // Slight delay for staggered effect
        scrollTrigger: {
            trigger: ".mission-statement",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
        },
    });

    // Animate the fun fact
    gsap.from(".fun-fact", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1, // Slight delay for staggered effect
        scrollTrigger: {
            trigger: ".fun-fact",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
        },
    });
});

// INTRO 

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Animate the intro title
    gsap.to(".intro-title", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
    });

    // Animate the intro subtitle
    gsap.to(".intro-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
    });

    // Animate the CTA button
    gsap.to(".intro-cta", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
    });

    // Animate the intro image
    gsap.to(".intro-img", {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
    });
});

// SEARCH 

 // Wait for the DOM to load
 document.addEventListener("DOMContentLoaded", function () {
    // Animate the search container
    gsap.to(".search-container", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
    });

    // Animate the search bar on focus
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("focus", function () {
        gsap.to("#search-bar", {
            scale: 1.05,
            duration: 0.3,
        });
    });

    searchBar.addEventListener("blur", function () {
        gsap.to("#search-bar", {
            scale: 1,
            duration: 0.3,
        });
    });

    // Animate the search button on hover
    const searchBtn = document.querySelector(".search-btn");
    searchBtn.addEventListener("mouseenter", function () {
        gsap.to(".search-btn", {
            scale: 1.1,
            duration: 0.3,
        });
    });

    searchBtn.addEventListener("mouseleave", function () {
        gsap.to(".search-btn", {
            scale: 1,
            duration: 0.3,
        });
    });
});

// FOOTER 

    // Wait for the DOM to load
    document.addEventListener("DOMContentLoaded", function () {
        // Animate the footer sections with a staggered effect
        gsap.from(".footer-section", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.3, // Stagger the animation for each section
            scrollTrigger: {
                trigger: ".footer",
                start: "top 80%", // Animation starts when the footer enters the viewport
                end: "bottom 20%",
                toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
            },
        });

        // Animate the footer bottom (copyright text)
        gsap.from(".footer-bottom", {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1, // Slight delay after the footer sections animate
            scrollTrigger: {
                trigger: ".footer",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });

        // Add hover animations for social media links
        const socialLinks = document.querySelectorAll(".social-links a");
        socialLinks.forEach((link) => {
            link.addEventListener("mouseenter", () => {
                gsap.to(link, {
                    scale: 1.2,
                    duration: 0.3,
                });
            });

            link.addEventListener("mouseleave", () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.3,
                });
            });
        });
    });


    // NAVBAR 

    // GSAP Animations for Initial Load
gsap.from(".navbar h2", { duration: 1, x: -100, opacity: 0, ease: "power2.out" });
gsap.from(".nav-links", { duration: 1, y: -50, opacity: 0, delay: 0.5, ease: "power2.out" });
gsap.from(".nav-icons", { duration: 1, x: 100, opacity: 0, delay: 1, ease: "power2.out" });

// Mobile Toggle Functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navIcons = document.querySelector(".nav-icons");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navIcons.classList.toggle("active");

    // GSAP Animations for Mobile Menu
    if (navLinks.classList.contains("active")) {
        gsap.from(".nav-links", { duration: 0.5, y: -50, opacity: 0, ease: "power2.out" });
        gsap.from(".nav-icons", { duration: 0.5, y: -50, opacity: 0, delay: 0.2, ease: "power2.out" });
    }
});