const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeScrollAnimations();
    initializeNavbar();
    initializeCounters();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeCardStack();
});


function initializeNavbar() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}


function initializeMobileMenu() {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });


        navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
}


function initializeSmoothScrolling() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#message').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}


function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('gallery-item')) {
                    animateGalleryItem(entry.target);
                }
                
                if (entry.target.classList.contains('message-card')) {
                    animateMessageCard(entry.target);
                }
            }
        });
    }, observerOptions);
        const elementsToAnimate = document.querySelectorAll('.message-card, .gallery-item, .thanks-content, .section-header');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}


function animateGalleryItem(item) {
    const icon = item.querySelector('.gallery-icon');
    const title = item.querySelector('h3');
    const text = item.querySelector('p');
    
    setTimeout(() => {
        icon.style.transform = 'scale(1.1)';
        icon.style.transition = 'transform 0.3s ease';
    }, 100);
    
    setTimeout(() => {
        icon.style.transform = 'scale(1)';
    }, 300);
    
    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transition = 'opacity 0.4s ease';
    }, 200);
    
    setTimeout(() => {
        text.style.opacity = '1';
        text.style.transition = 'opacity 0.4s ease';
    }, 300);
}


function slideToNextCard(cardStack) {
    if (cardStack.classList.contains('slid')) {
        cardStack.classList.remove('slid');
        
        createConfetti();
        
        setTimeout(() => {
            animateCardSlideIn(cardStack.querySelector('.first-card'));
        }, 400);
    } else {
        cardStack.classList.add('slid');
        
        createConfetti();
        
        setTimeout(() => {
            animateCardSlideIn(cardStack.querySelector('.second-card'));
        }, 400);
    }
}


const slidingAnimations = document.createElement('style');
slidingAnimations.textContent = `
    @keyframes contentSlideIn {
        0% { 
            opacity: 0;
            transform: translateY(30px);
        }
        100% { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes iconBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes slideBounce {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(5px); }
    }
`;
document.head.appendChild(slidingAnimations);

function animateCardSlideIn(card) {
    if (!card) return;
    

    const icon = card.querySelector('.card-icon-main');
    const title = card.querySelector('.card-title');
    const subtitle = card.querySelector('.card-subtitle');
    

    const cardHeader = card.querySelector('.card-header');
    const messageSection = card.querySelector('.message-section');
    const quoteSection = card.querySelector('.quote-section');
    const signatureSection = card.querySelector('.signature-section');
    

    if (icon) {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
    }
    
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
    }
    
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(20px)';
    }
    
    if (cardHeader) {
        cardHeader.style.opacity = '0';
        cardHeader.style.transform = 'translateY(20px)';
    }
    
    if (messageSection) {
        messageSection.style.opacity = '0';
        messageSection.style.transform = 'translateY(20px)';
    }
    
    if (quoteSection) {
        quoteSection.style.opacity = '0';
        quoteSection.style.transform = 'translateY(20px)';
    }
    
    if (signatureSection) {
        signatureSection.style.opacity = '0';
        signatureSection.style.transform = 'translateY(20px)';
    }
    
    setTimeout(() => {
        if (icon) {
            icon.style.transition = 'all 0.6s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }
        if (cardHeader) {
            cardHeader.style.transition = 'all 0.6s ease';
            cardHeader.style.opacity = '1';
            cardHeader.style.transform = 'translateY(0)';
        }
    }, 100);
    
    setTimeout(() => {
        if (title) {
            title.style.transition = 'all 0.6s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    }, 200);
    
    setTimeout(() => {
        if (subtitle) {
            subtitle.style.transition = 'all 0.6s ease';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }
        if (messageSection) {
            messageSection.style.transition = 'all 0.6s ease';
            messageSection.style.opacity = '1';
            messageSection.style.transform = 'translateY(0)';
        }
    }, 300);
    
    setTimeout(() => {
        if (quoteSection) {
            quoteSection.style.transition = 'all 0.6s ease';
            quoteSection.style.opacity = '1';
            quoteSection.style.transform = 'translateY(0)';
        }
    }, 400);
    
    setTimeout(() => {
        if (signatureSection) {
            signatureSection.style.transition = 'all 0.6s ease';
            signatureSection.style.opacity = '1';
            signatureSection.style.transform = 'translateY(0)';
        }
    }, 500);
    setTimeout(() => {
        if (icon) {
            icon.style.animation = 'iconBounce 0.8s ease forwards';
        }
    }, 800);
}

function initializeCardStack() {
    const cardStack = document.querySelector('.card-stack');
    
    if (cardStack) {
        cardStack.addEventListener('mouseenter', function() {
            if (!this.classList.contains('slid')) {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.4)';
            }
        });
        
        cardStack.addEventListener('mouseleave', function() {
            if (!this.classList.contains('slid')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
            }
        });
    }

    setTimeout(() => {
        const firstCard = document.querySelector('.first-card');
        if (firstCard) {
            animateCardSlideIn(firstCard);
        }
    }, 500);
}