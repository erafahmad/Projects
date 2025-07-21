// Create a new file footer.js or add this to your existing script
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Quick contact form submission
    const quickContactForm = document.getElementById('quickContactForm');
    
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send this data to a server
            // For this example, we'll just show an alert
            alert(`Thank you for your message! I'll get back to you soon at ${email}.`);
            
            // Reset the form
            this.reset();
            
            // You could also use Fetch API to send the data to a server:
            /*
            fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    message: message
                }),
            })
            .then(response => response.json())
            .then(data => {
                alert('Message sent successfully!');
                this.reset();
            })
            .catch((error) => {
                alert('Error sending message. Please try again later.');
            });
            */
        });
    }
    
    // Smooth scrolling for service links
    document.querySelectorAll('.footer-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});