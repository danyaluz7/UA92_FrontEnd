 // All Code below is my own code
// Shopping Cart functionality
let cart = [];

// Add to Cart function
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const product = e.target.dataset.product;
        const price = parseFloat(e.target.dataset.price);
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.product === product);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                product: product,
                price: price,
                quantity: 1
            });
        }
        
        updateCartDisplay();
    }
});

// Update Cart Display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Initialize cart display
updateCartDisplay();

// Checkout form handling
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('full-name').value,
        address: document.getElementById('address').value,
        cardNumber: document.getElementById('card-number').value,
        expiryDate: document.getElementById('expiry-date').value,
        cvv: document.getElementById('cvv').value
    };

    // Basic validation
    if (!validateCard(formData.cardNumber)) {
        alert('Please enter a valid card number');
        return;
    }

    // Process checkout (this would be handled by a payment gateway in a real application)
    processCheckout(formData);
});

function validateCard(cardNumber) {
    // Simple Luhn check for card validation
    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        let digit = parseInt(cardNumber[i]);
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

function processCheckout(formData) {
    // In a real application, this would send data to a payment gateway
    // For this demo, we'll just show a success message
    alert('Thank you for your purchase!');
    cart = []; // Clear the cart
    updateCartDisplay();
}
