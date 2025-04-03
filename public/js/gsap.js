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

// OTP 

document.addEventListener('DOMContentLoaded', () => {
    // Initial animation for the container
    gsap.to('.otp-container', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
    });

    // Input fields animation on load
    const inputs = document.querySelectorAll('.otp-input');
    gsap.from(inputs, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
        ease: 'back.out(1.7)'
    });

    // Button animation on load
    gsap.from('.verify-btn', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.8,
        ease: 'power2.out'
    });

    // Resend text animation on load
    gsap.from('.resend-text', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: 'power2.out'
    });

    // Input field logic
    inputs.forEach((input, index) => {
        // Focus animation
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        // Blur animation
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        // Auto-focus next input
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                
                // Add a little bounce effect
                gsap.to(input, {
                    scale: 1.1,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            }
        });

        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });

    // Verify button click animation and success message
    const verifyBtn = document.querySelector('.verify-btn');
    const successMessage = document.querySelector('.success-message');
    
    verifyBtn.addEventListener('click', () => {
        // Check if all fields are filled
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value === '') {
                allFilled = false;
                // Shake animation for empty fields
                gsap.to(input, {
                    x: [-5, 5, -5, 5, 0],
                    duration: 0.4,
                    ease: 'power1.inOut'
                });
                input.style.borderColor = '#ff4757';
                
                // Return to normal after 1.5 seconds
                setTimeout(() => {
                    input.style.borderColor = '#ddd';
                }, 1500);
            }
        });

        if (allFilled) {
            // Button press animation
            gsap.to(verifyBtn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    // Show success message
                    gsap.to(successMessage, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        pointerEvents: 'auto'
                    });

                    // Success icon animation
                    gsap.from('.success-icon', {
                        scale: 0,
                        rotation: -180,
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.5)'
                    });

                    // Confetti effect
                    createConfetti();
                }
            });
        }
    });

    // Resend link animation
    const resendLink = document.querySelector('.resend-link');
    resendLink.addEventListener('click', () => {
        // Shake animation
        gsap.to(resendLink, {
            x: [-5, 5, -5, 5, 0],
            duration: 0.4,
            ease: 'power1.inOut'
        });

        // Change text temporarily
        const originalText = resendLink.textContent;
        resendLink.textContent = 'Sent!';
        
        // Reset after 1.5 seconds
        setTimeout(() => {
            resendLink.textContent = originalText;
        }, 1500);
    });

    // Confetti effect function
    function createConfetti() {
        const colors = ['#ff4757', '#ff6348', '#ff7f50', '#ffa502', '#ffd700', '#eccc68', '#7bed9f', '#2ed573', '#1dd1a1', '#17c0eb', '#7158e2', '#a55eea'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(confetti);
            
            // Random position
            const startX = Math.random() * window.innerWidth;
            const startY = -10;
            
            // Random end position
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = window.innerHeight + 10;
            
            // Random rotation
            const rotation = Math.random() * 360;
            
            // Random size
            const size = Math.random() * 8 + 4;
            
            // Set initial position
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Animate confetti
            gsap.to(confetti, {
                x: endX - startX,
                y: endY - startY,
                rotation: rotation,
                duration: Math.random() * 3 + 2,
                ease: 'power1.out',
                onComplete: () => {
                    confetti.remove();
                }
            });
        }
    }
});