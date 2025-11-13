  const cartIcon = document.getElementById('cartIcon');
        const cartModal = document.getElementById('cartModal');
        const closeCart = document.getElementById('closeCart');
        const overlay = document.getElementById('overlay');
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartCount = document.querySelector('.cart-count');
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Toggle cart modal
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('active');
            overlay.classList.add('active');
        });
        
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
            overlay.classList.remove('active');
        });
        
        overlay.addEventListener('click', () => {
            cartModal.classList.remove('active');
            overlay.classList.remove('active');
        });
        
        // Add to cart
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const title = e.target.getAttribute('data-title');
                const price = parseFloat(e.target.getAttribute('data-price'));
                const image = e.target.getAttribute('data-image');
                
                // Check if item already in cart
                const existingItem = cart.find(item => item.id === id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ id, title, price, image, quantity: 1 });
                }
                
                updateCart();
            });
        });
        
        // Update cart display
        function updateCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update count
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            // Update items
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
                cartTotal.textContent = '0.00';
                document.querySelector('.cart-header h3').textContent = `Your Cart (0)`;
                return;
            }
            
            document.querySelector('.cart-header h3').textContent = `Your Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`;
            
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `).join('');
            
            // Calculate total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toFixed(2);
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    cart = cart.filter(item => item.id !== id);
                    updateCart();
                });
            });
        }
        
        // Initialize cart display
        updateCart();
        
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });