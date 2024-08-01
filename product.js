$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        $.getJSON('products.json', function(data) {
            const allProducts = [].concat(...Object.values(data));
            const product = allProducts.find(p => p.id == productId);

            if (product) {
                // Update product details
                $('.product-title').text(product.name);
                $('.product-price').html(`$${product.price}`);
                $('.product-description').text(product.description || 'No description available.');

                // Update carousel images
                const imagesHtml = product.image.map((img, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img}" class="d-block w-100" alt="${product.name}">
                    </div>
                `).join('');
                $('#productCarousel .carousel-inner').html(imagesHtml);

                // Update color options
                if (product.colors && product.colors.length) {
                    const colorOptions = product.colors.map(color => `
                        <input type="radio" id="color${color}" name="color" value="${color}" class="form-check-input d-none">
                        <label for="color${color}" class="form-check-label">
                            <span class="color-circle" style="background-color: ${color.toLowerCase()};"></span>
                        </label>
                    `).join('');
                    $('#colorSelector').html(colorOptions);

                    // Add click event to update the selected state
                    $('#colorSelector .form-check-label').click(function() {
                        $('#colorSelector .color-circle').removeClass('selected');
                        $(this).find('.color-circle').addClass('selected');
                    });
                } else {
                    $('#colorSelector').html('<p>No color options available</p>');
                }

                // Add to Cart functionality
                $('.btn-primary').click(function() {
                    const selectedColor = $('input[name="color"]:checked').val();
                    if (!selectedColor) {
                        alert('Please select a color.');
                        return;
                    }

                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const cartItem = {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        color: selectedColor,
                        quantity: 1
                    };

                    // Check if item already exists in cart and update quantity if it does
                    const existingItemIndex = cart.findIndex(item => item.id == product.id && item.color == selectedColor);
                    if (existingItemIndex > -1) {
                        cart[existingItemIndex].quantity += 1;
                    } else {
                        cart.push(cartItem);
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Update cart counter and render items immediately
                    updateCartCounter();
                    renderCartItems();
                    alert('Item added to cart successfully!');
                });

            } else {
                $('#product').html('<p class="text-center">Product not found</p>');
            }
        }).fail(function() {
            $('#product').html('<p class="text-center">Error loading product data</p>');
        });
    } else {
        $('#product').html('<p class="text-center">No product ID provided</p>');
    }

    // Function to update the cart counter
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCounter = $('#cart-counter');
        if (cart.length > 0) {
            cartCounter.text(cart.reduce((acc, item) => acc + item.quantity, 0));
            cartCounter.show();
        } else {
            cartCounter.hide();
        }
    }

    // Function to render cart items
    function renderCartItems() {
        const cartItemsContainer = $('#cart-items');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.empty(); // Clear existing items

        if (cart.length > 0) {
            cart.forEach(item => {
                const itemElement = `
                    <div class="cart-item">
                        <span class="item-name">${item.name}</span>
                        <span class="item-color">Color: ${item.color}</span>
                        <span class="item-quantity">Quantity: ${item.quantity}</span>
                        <span class="item-price">Price: $${item.price * item.quantity}</span>
                    </div>
                `;
                cartItemsContainer.append(itemElement);
            });
        } else {
            cartItemsContainer.html('<p>Your cart is empty.</p>');
        }
    }

    // Initialize cart counter and items on page load
    updateCartCounter();
    renderCartItems();
});
