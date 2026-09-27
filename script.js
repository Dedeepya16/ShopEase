const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description: "High-quality wireless headphones with clear sound and comfortable design."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        description: "A stylish smart watch for tracking your daily activities."
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 799,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        description: "Comfortable cotton T-shirt suitable for everyday wear."
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 1599,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        description: "Lightweight running shoes designed for comfort and everyday activity."
    },
    {
        id: 5,
        name: "Leather Wallet",
        price: 999,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
        description: "Compact leather wallet with a simple and stylish design."
    },
    {
        id: 6,
        name: "Sunglasses",
        price: 699,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        description: "Stylish sunglasses suitable for everyday outdoor use."
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 1299,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
        description: "Portable Bluetooth speaker with clear and powerful sound."
    },
    {
        id: 8,
        name: "Backpack",
        price: 1199,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        description: "Spacious backpack suitable for college, work, and travel."
    }
];


let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Product elements
const productContainer = document.querySelector(".product-container");
const searchInput = document.querySelector(".filters input");
const categorySelect = document.querySelector(".filters select");


// Cart elements
const cartContainer = document.querySelector(".cart-container");
const totalElement = document.getElementById("total");
const cartCount = document.getElementById("cart-count");


// Modal elements
const productModal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalCartButton = document.getElementById("modal-cart-button");


// Display products
function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {
        productContainer.innerHTML = `
            <p class="no-products">No products found 😕</p>
        `;
        return;
    }

    productList.forEach(function(product) {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <p>${product.category}</p>

            <button onclick="openModal(${product.id})">
                View Details
            </button>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productContainer.appendChild(card);
    });
}


displayProducts(products);


// Search and category filter
function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categorySelect.value;

    const filteredProducts = products.filter(function(product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All Categories" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}


// Add product to cart
function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    displayCart();

    localStorage.setItem("cart", JSON.stringify(cart));
}


// Display cart
function displayCart() {

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(function(product) {

        const cartItem = document.createElement("div");

        cartItem.innerHTML = `
            <p>${product.name}</p>

            <p>₹${product.price}</p>

            <button onclick="decreaseQuantity(${product.id})">
                -
            </button>

            <span>${product.quantity}</span>

            <button onclick="increaseQuantity(${product.id})">
                +
            </button>

            <button onclick="removeFromCart(${product.id})">
                Remove
            </button>
        `;

        cartContainer.appendChild(cartItem);

        total =
            total + (product.price * product.quantity);
    });

    totalElement.textContent = total;


    // Update cart count
    let count = 0;

    cart.forEach(function(product) {

        count = count + product.quantity;

    });

    cartCount.textContent = count;
}


// Increase quantity
function increaseQuantity(productId) {

    const product = cart.find(function(item) {
        return item.id === productId;
    });

    product.quantity++;

    displayCart();

    localStorage.setItem("cart", JSON.stringify(cart));
}


// Decrease quantity
function decreaseQuantity(productId) {

    const product = cart.find(function(item) {
        return item.id === productId;
    });

    if (product.quantity > 1) {

        product.quantity--;
    }

    displayCart();

    localStorage.setItem("cart", JSON.stringify(cart));
}


// Remove product
function removeFromCart(productId) {

    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    displayCart();

    localStorage.setItem("cart", JSON.stringify(cart));
}


// Open product modal
function openModal(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    modalImage.src = product.image;

    modalName.textContent = product.name;

    modalPrice.textContent =
        "₹" + product.price;

    modalCategory.textContent =
        product.category;

    modalDescription.textContent =
        product.description;


    modalCartButton.onclick = function() {

        addToCart(product.id);

        closeModal();
    };


    productModal.style.display = "flex";
}


// Close modal
function closeModal() {

    productModal.style.display = "none";
}


// Search event
searchInput.addEventListener(
    "input",
    filterProducts
);


// Category event
categorySelect.addEventListener(
    "change",
    filterProducts
);


// Checkout
const checkoutForm =
    document.getElementById("checkout-form");

const orderMessage =
    document.getElementById("order-message");


checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (cart.length === 0) {

            orderMessage.textContent =
                "Your cart is empty.";

            return;
        }

        orderMessage.textContent =
            "Order placed successfully! 🎉";


        cart = [];

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        displayCart();

        checkoutForm.reset();
    }
);
productModal.addEventListener("click", function(event) {

    if (event.target === productModal) {
        closeModal();
    }

});

// Display saved cart when page loads
displayCart();