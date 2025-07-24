document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loading-overlay').classList.add('hidden');
    }, 1500);

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    hamburger.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    mobileOverlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Close mobile nav when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('header').classList.add('scrolled');
        } else {
            document.querySelector('header').classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu Data
    const menuItems = [
        {
            id: 1,
            name: "Butter Chicken",
            description: "Tender chicken in a rich, creamy tomato-based curry sauce.",
            price: 190,
            category: "mains",
            image: "assets/images/butter-chicken.jpg"
        },
        {
            id: 2,
            name: "Chicken Biryani",
            description: "Fragrant basmati rice cooked with tender chicken and aromatic spices.",
            price: 200,
            category: "mains",
            image: "assets/images/biryani.jpg"
        },
        {
            id: 3,
            name: "Tandoori Chicken",
            description: "Chicken marinated in yogurt and spices, cooked in a tandoor.",
            price: 160,
            category: "mains",
            image: "assets/images/tandoori-chicken.jpg"
        },
        {
            id: 4,
            name: "Pizza",
            description: "A symphony of flavors in every bite, perfection in every direction.",
            price: 150,
            category: "starters",
            image: "assets/images/pizza.jpg"
        },
        {
            id: 5,
            name: "Momos",
            description: "Handcrafted momos, a taste of authentic flavor.",
            price: 100,
            category: "starters",
            image: "assets/images/momos.jpg"
        },
        {
            id: 6,
            name: "Gulab Jamun",
            description: "Soft milk-solid dumplings soaked in sweet syrup.",
            price: 80,
            category: "desserts",
            image: "assets/images/gulab-jamun.jpg"
        },
        {
            id: 7,
            name: "Rasmalai",
            description: "Soft cheese patties soaked in sweetened, thickened milk.",
            price: 90,
            category: "desserts",
            image: "assets/images/rasmalai.jpg"
        },
        {
            id: 8,
            name: "Mango Lassi",
            description: "Refreshing yogurt drink with mango pulp.",
            price: 70,
            category: "drinks",
            image: "assets/images/mango-lassi.jpg"
        },
        {
            id: 9,
            name: "Masala Chai",
            description: "Spiced tea with milk and aromatic spices.",
            price: 40,
            category: "drinks",
            image: "assets/images/masala-chai.jpg"
        },
        {
            id: 10,
            name: "Dal Makhani",
            description: "Creamy black lentils cooked with butter and spices.",
            price: 120,
            category: "mains",
            image: "assets/images/dal-makhani.jpg"
        },
        {
            id: 11,
            name: "Palak Paneer",
            description: "Soft cottage cheese in a creamy spinach gravy.",
            price: 140,
            category: "mains",
            image: "assets/images/palak-paneer.jpg"
        },
        {
            id: 12,
            name: "Chicken Tikka Masala",
            description: "Grilled chicken chunks in spiced curry sauce.",
            price: 180,
            category: "mains",
            image: "assets/images/chicken-tikka-masala.jpg"
        }
    ];

    // Initialize menu
    const menuGrid = document.getElementById('menu-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderMenu(category = 'all') {
        menuGrid.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);
        
        if (filteredItems.length === 0) {
            menuGrid.innerHTML = '<p class="no-items">No items found in this category</p>';
            return;
        }
        
        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">Rs ${item.price}/-</span>
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(menuItem);
        });
        
        // Add event listeners to new add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Filter menu items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter menu items
            const category = this.dataset.category;
            renderMenu(category);
        });
    });

    // Initial render
    renderMenu();

    // Shopping Cart Functionality
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalAmountElement = document.querySelector('.total-amount');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Toggle cart sidebar
    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        document.body.classList.add('no-scroll');
    });

    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartSidebar.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
            cartSidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Add to cart function
    function addToCart(e) {
        const itemId = parseInt(e.target.dataset.id);
        const itemToAdd = menuItems.find(item => item.id === itemId);
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...itemToAdd,
                quantity: 1
            });
        }
        
        updateCart();
        showAddToCartFeedback(e.target);
    }

    // Show feedback when adding to cart
    function showAddToCartFeedback(button) {
        button.textContent = 'Added!';
        button.style.backgroundColor = '#4caf50';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
        }, 1500);
    }

    // Update cart UI
    function updateCart() {
        // Save to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
        });
        
        // Update cart items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <p>Your cart is empty</p>
                    <a href="#menu" class="btn btn-primary">Browse Menu</a>
                </div>
            `;
            totalAmountElement.textContent = 'Rs 0/-';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">Rs ${item.price}/-</p>
                    <div class="cart-item-actions">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update total amount
        totalAmountElement.textContent = `Rs ${totalAmount}/-`;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }

    // Cart item quantity functions
    function decreaseQuantity(e) {
        const itemId = parseInt(e.target.dataset.id);
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        updateCart();
    }

    function increaseQuantity(e) {
        const itemId = parseInt(e.target.dataset.id);
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        cart[itemIndex].quantity += 1;
        updateCart();
    }

    function removeItem(e) {
        const itemId = parseInt(e.target.closest('button').dataset.id);
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        cart.splice(itemIndex, 1);
        updateCart();
    }

    // Initialize cart
    updateCart();

    // Book table form
    const bookingForm = document.getElementById('booking-form');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(bookingForm);
        const bookingData = Object.fromEntries(formData.entries());
        
        // Here you would typically send this data to a server
        console.log('Booking data:', bookingData);
        
        // Show success message
        alert('Your table has been booked successfully! We look forward to serving you.');
        bookingForm.reset();
    });

    // Image gallery modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImage.src = imgSrc;
            imageModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });
    
    closeModal.addEventListener('click', function() {
        imageModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Set minimum date for booking (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
});