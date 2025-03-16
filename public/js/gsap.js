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