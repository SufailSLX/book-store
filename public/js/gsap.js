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