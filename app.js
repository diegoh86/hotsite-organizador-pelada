// ==========================================================================
// ARCHETYPES DATA FOR FIFA CARDS SHOWCASE
// ==========================================================================
const ARCHETYPES = {
    artilheiro: {
        name: "DECO ARTILHEIRO",
        ovr: 88,
        pos: "ATA",
        stats: [90, 95, 75, 84, 30, 70],
        cardTheme: "gold",
        cardBg: "linear-gradient(135deg, #e3c46b 0%, #a98330 50%, #dfb74a 100%)",
        shadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(227, 196, 107, 0.15)",
        avatarColor: "#ffd700",
        avatarImg: "player_artilheiro.jpg"
    },
    xerife: {
        name: "ZÉ XERIFE",
        ovr: 84,
        pos: "ZAG",
        stats: [65, 45, 68, 60, 92, 95],
        cardTheme: "gold",
        cardBg: "linear-gradient(135deg, #e3c46b 0%, #a98330 50%, #dfb74a 100%)",
        shadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(227, 196, 107, 0.15)",
        avatarColor: "#ffffff",
        avatarImg: "player_xerife.jpg"
    },
    garcon: {
        name: "MAESTRA PELEGRINI",
        ovr: 86,
        pos: "MEI",
        stats: [78, 72, 94, 88, 50, 68],
        cardTheme: "gold",
        cardBg: "linear-gradient(135deg, #e3c46b 0%, #a98330 50%, #dfb74a 100%)",
        shadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(227, 196, 107, 0.15)",
        avatarColor: "#10b981",
        avatarImg: "player_garcom.jpg"
    },
    perna: {
        name: "PERNA DE PAU",
        ovr: 48,
        pos: "ALA",
        stats: [40, 30, 35, 28, 32, 45],
        cardTheme: "bronze",
        cardBg: "linear-gradient(135deg, #a87955 0%, #6b4427 50%, #9c6c4a 100%)",
        shadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 121, 85, 0.15)",
        avatarColor: "#ff7f50",
        avatarImg: "player_perna.jpg"
    }
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initArchetypeSelector();
    initThreeDEffect();
    initEnvironmentUrls();
});

// ==========================================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in");
    
    // Add the class initially to trigger transitions smoothly
    fadeElements.forEach(el => el.classList.add("fade-in"));

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Animate sections as well
    const sections = document.querySelectorAll("section");
    sections.forEach(sec => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(30px)";
        sec.style.transition = "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)";
        
        const secObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        secObserver.observe(sec);
    });
}

// ==========================================================================
// ARCHETYPE CARD SELECTOR LÓGICA
// ==========================================================================
function initArchetypeSelector() {
    const buttons = document.querySelectorAll(".btn-arch");
    const card = document.getElementById("fifa-card");
    const cardOvr = document.getElementById("card-ovr");
    const cardPos = document.getElementById("card-pos");
    const cardName = document.getElementById("card-name");
    const avatar = document.getElementById("card-avatar");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active from other buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const archKey = button.getAttribute("data-arch");
            const data = ARCHETYPES[archKey];
            
            if (data) {
                // Animate card content transition
                card.style.opacity = "0.5";
                card.style.transform = "scale(0.95) rotateY(15deg)";
                
                setTimeout(() => {
                    // Update content
                    cardOvr.textContent = data.ovr;
                    cardPos.textContent = data.pos;
                    cardName.textContent = data.name;
                    
                    // Update Stats
                    for (let i = 1; i <= 6; i++) {
                        const statEl = document.getElementById(`stat-${i}`);
                        if (statEl) {
                            statEl.textContent = data.stats[i-1];
                        }
                    }
                    
                    // Update Card Theme style
                    card.style.background = data.cardBg;
                    card.style.boxShadow = data.shadow;
                    
                    // Update player photo
                    avatar.src = data.avatarImg;
                    
                    // Add accent gold rating color based on tier
                    if (data.cardTheme === "bronze") {
                        cardOvr.style.color = "#a87955";
                        cardName.style.color = "#a87955";
                    } else {
                        cardOvr.style.color = "var(--accent-gold)";
                        cardName.style.color = "var(--accent-gold)";
                    }
                    
                    // Reset card animations
                    card.style.opacity = "1";
                    card.style.transform = "scale(1) rotateY(0deg)";
                }, 200);
            }
        });
    });
}

// ==========================================================================
// 3D TILT EFFECT ON MOUSEMOVE FOR THE FIFA CARD
// ==========================================================================
function initThreeDEffect() {
    const cardDisplay = document.querySelector(".cards-display");
    const cardWrapper = document.querySelector(".fifa-card-wrapper");
    const card = document.getElementById("fifa-card");
    
    if (!cardDisplay || !cardWrapper || !card) return;

    cardDisplay.addEventListener("mousemove", (e) => {
        const rect = cardDisplay.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within element
        const y = e.clientY - rect.top;  // y position within element
        
        // Calculate percentages
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt (-15deg to 15deg)
        const rotateX = ((centerY - y) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        cardWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    cardDisplay.addEventListener("mouseleave", () => {
        cardWrapper.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
}

// ==========================================================================
// ENVIRONMENT DEPENDENT REDIRECTS (Local Dev vs Production)
// ==========================================================================
function initEnvironmentUrls() {
    const ctaLinks = document.querySelectorAll('#nav-cta, #hero-cta, #footer-cta, .footer-links a:first-child');
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const appUrl = isProduction ? 'https://app.organizadordepelada.com.br/' : 'http://localhost:5173';

    ctaLinks.forEach(link => {
        link.href = appUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
}
