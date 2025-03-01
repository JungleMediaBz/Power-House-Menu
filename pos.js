class POSSystem {
    constructor() {
        this.cart = [];
        this.menu = {
            fajitas: {
                name: 'Fajadas To Order',
                price: 10.00
            },
            chickenLeg: {
                name: 'Fry Chicken Leg with Fries',
                price: 8.00
            },
            chickenBreast: {
                name: 'Fry Chicken Breast with Fries',
                price: 10.00
            },
            // Add all menu items here
        };
        this.init();
    }

    init() {
        this.renderCart();
        this.attachEventListeners();
    }

    addToCart(itemId, quantity = 1) {
        const item = this.menu[itemId];
        if (!item) return;

        const cartItem = {
            id: itemId,
            name: item.name,
            price: item.price,
            quantity: quantity
        };

        this.cart.push(cartItem);
        this.renderCart();
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.renderCart();
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    renderCart() {
        const cartContainer = document.querySelector('.cart-items');
        cartContainer.innerHTML = '';

        this.cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="pos.removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        document.querySelector('.total-amount').textContent = 
            `$${this.calculateTotal().toFixed(2)}`;
    }

    processPayment(paymentMethod) {
        // Here you would typically integrate with a payment processor
        console.log(`Processing ${paymentMethod} payment for $${this.calculateTotal()}`);
        
        // Create order record
        const order = {
            items: this.cart,
            total: this.calculateTotal(),
            paymentMethod: paymentMethod,
            timestamp: new Date(),
            orderId: Math.random().toString(36).substr(2, 9)
        };

        // In a real system, you would send this to a backend
        console.log('Order created:', order);

        // Clear cart after successful payment
        this.cart = [];
        this.renderCart();
        alert('Payment processed successfully!');
    }

    attachEventListeners() {
        // Add click listeners to menu items
        document.querySelectorAll('.menu-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.dataset.itemId;
                this.addToCart(itemId);
            });
        });
    }
}

// Initialize POS system
const pos = new POSSystem(); 