document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Password toggle functionality
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        
        // Eye icon animation
        gsap.to(togglePassword, {
            scale: 1.3,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    });
    
    // Form submission animation
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const loginBtn = document.querySelector('.login-btn');
        const btnText = document.querySelector('.btn-text');
        const btnIcon = document.querySelector('.login-btn i');
        
        // Loading animation
        gsap.to(btnIcon, {
            x: 5,
            duration: 0.3
        });
        
        gsap.to(loginBtn, {
            scale: 0.98,
            duration: 0.2
        });
        
        // Simulate login process
        setTimeout(() => {
            gsap.to(btnText, {
                x: -10,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    btnText.textContent = "Access Granted";
                    gsap.to(btnText, {
                        x: 0,
                        opacity: 1,
                        duration: 0.3
                    });
                    
                    gsap.to(btnIcon, {
                        x: 0,
                        duration: 0.3
                    });
                    
                    gsap.to(loginBtn, {
                        backgroundColor: "#4CAF50",
                        duration: 0.5
                    });
                    
                    // Pulse effect
                    gsap.to(loginBtn, {
                        scale: 1.02,
                        duration: 0.5,
                        yoyo: true,
                        repeat: 3
                    });
                }
            });
        }, 1000);
    });
});

function initAnimations() {
    // Card entrance animation
    gsap.to('.login-card', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    });
    
    // Particle animations
    gsap.to('.particle-1', {
        opacity: 0.08,
        duration: 2,
        delay: 0.5,
        ease: "sine.inOut"
    });
    
    gsap.to('.particle-2', {
        opacity: 0.06,
        duration: 2,
        delay: 0.7,
        ease: "sine.inOut"
    });
    
    gsap.to('.particle-3', {
        opacity: 0.1,
        duration: 2,
        delay: 0.9,
        ease: "sine.inOut"
    });
    
    gsap.to('.particle-4', {
        opacity: 0.05,
        duration: 2,
        delay: 1.1,
        ease: "sine.inOut"
    });
    
    // Continuous floating animations
    gsap.to('.particle-1', {
        y: "+=20",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to('.particle-2', {
        x: "+=15",
        y: "-=10",
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to('.particle-3', {
        x: "-=20",
        y: "+=15",
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to('.particle-4', {
        x: "+=10",
        y: "-=5",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Header elements animation
    gsap.from('.logo', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3
    });
    
    gsap.from('.card-header h1', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        delay: 0.5
    });
    
    gsap.from('.card-header p', {
        y: -10,
        opacity: 0,
        duration: 0.5,
        delay: 0.7
    });
    
    // Form elements animation
    gsap.from('.form-group', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.9
    });
    
    gsap.from('.form-options', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 1.4
    });
    
    gsap.from('.login-btn', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 1.6
    });
    
    gsap.from('.card-footer', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 1.8
    });
}

// ADMIN DASHBOARD 

document.addEventListener('DOMContentLoaded', () => {
    // Animate background circles
    gsap.to(".circle-1", {
        duration: 20,
        x: 50,
        y: 50,
        rotation: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
    
    gsap.to(".circle-2", {
        duration: 15,
        x: -30,
        y: -30,
        rotation: -5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
    
    gsap.to(".circle-3", {
        duration: 25,
        x: 40,
        y: 40,
        rotation: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
    
    // Stagger animation for book items
    gsap.from(".book-item", {
        duration: 0.8,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "back.out"
    });
    
    // Button hover effects
    document.querySelectorAll('.animated-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
    
    // File input name display
    const fileInput = document.getElementById('book-image');
    const fileName = document.querySelector('.file-name');
    
    if (fileInput && fileName) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                fileName.textContent = e.target.files[0].name;
                gsap.fromTo(fileName, 
                    { x: -10, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.3 }
                );
            } else {
                fileName.textContent = 'No file chosen';
            }
        });
    }
});