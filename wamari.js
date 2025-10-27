document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountSpan = document.getElementById('cart-count');
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    // Update cart count on load
    cartCountSpan.textContent = cartCount;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);

            cartCount++;
            cartTotal += productPrice;

            localStorage.setItem('cartCount', cartCount);
            localStorage.setItem('cartTotal', cartTotal);
            cartCountSpan.textContent = cartCount;

            // Announce change for screen readers and provide inline feedback
            const announcer = document.getElementById('cart-announcer');
            if (announcer) {
                announcer.textContent = `${productName} added to cart. Total items: ${cartCount}. Subtotal: $${cartTotal.toFixed(2)}`;
            }
        });
    });


    // Contact form validation
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            const fb = document.getElementById('contact-feedback');
            if (fb) fb.textContent = 'Please fill in all required fields.';
            event.preventDefault(); // Prevent form submission
        } else if (!isValidEmail(email)) {
            const fb = document.getElementById('contact-feedback');
            if (fb) fb.textContent = 'Please enter a valid email address.';
            event.preventDefault();
        } else {
            const fb = document.getElementById('contact-feedback');
            if (fb) fb.textContent = 'Form submitted successfully! We will get back to you soon.';
        }
    });

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
