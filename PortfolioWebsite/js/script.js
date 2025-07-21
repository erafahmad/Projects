// Typing animation
var typed = new Typed('#element', {
    strings: ['Web Developer', 'UI/UX Designer', 'Full Stack Developer', 'React Specialist'],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true,
    showCursor: true,
    cursorChar: '|',
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.innerHTML = menu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Services Section Interaction
document.addEventListener('DOMContentLoaded', function () {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter service cards
            serviceCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-service') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Service card click to open modal
    const serviceCardsAll = document.querySelectorAll('.service-card');
    const modal = document.getElementById('service-modal');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalIcon = document.getElementById('modal-icon');

    serviceCardsAll.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.service-title').textContent;
            const description = card.querySelector('.service-desc').textContent;
            const icon = card.querySelector('.service-icon i').cloneNode(true);

            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Clear modal icon and add new one
            modalIcon.innerHTML = '';
            modalIcon.appendChild(icon);

            modal.style.display = 'flex';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Services link scroll
    const servicesLink = document.getElementById('services-link');
    const servicesSection = document.getElementById('services');

    servicesLink.addEventListener('click', (e) => {
        e.preventDefault();
        servicesSection.scrollIntoView({ behavior: 'smooth' });

        // Highlight services section
        servicesSection.style.animation = 'none';
        setTimeout(() => {
            servicesSection.style.animation = 'highlight 2s ease';
        }, 10);

        // Add CSS animation
        const style = document.createElement('style');
        style.innerHTML = `
                    @keyframes highlight {
                        0% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0); }
                        50% { box-shadow: 0 0 0 20px rgba(138, 43, 226, 0.2); }
                        100% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0); }
                    }
                `;
        document.head.appendChild(style);

        // Remove style after animation
        setTimeout(() => {
            document.head.removeChild(style);
        }, 2000);
    });
});