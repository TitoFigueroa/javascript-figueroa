// Define the products data
const products = [
	{ id: 1, name: 'Product 1', price: 10.00 },
	{ id: 2, name: 'Product 2', price: 20.00 },
	{ id: 3, name: 'Product 3', price: 30.00 },
	{ id: 4, name: 'Product 4', price: 40.00 },
];

// Retrieve the products from local storage, or use the default data if no products are stored
let cart = localStorage.getItem('cart');
if (!cart) {
	cart = [];
	localStorage.setItem('cart', JSON.stringify(cart));
} else {
	cart = JSON.parse(cart);
}

// Display the products
function displayProducts() {
	const productsDiv = document.getElementById('products');
	productsDiv.innerHTML = '';
	products.forEach(product => {
		const productDiv = document.createElement('div');
		productDiv.innerHTML = `
			<h2>${product.name} - $${product.price}</h2>
			<button data-id="${product.id}">Add to cart</button>
		`;
		const button = productDiv.querySelector('button');
		button.addEventListener('click', addToCart);
		productsDiv.appendChild(productDiv);
	});
}

// Add a product to the cart
function addToCart(event) {
	const productId = parseInt(event.target.getAttribute('data-id'));
	const product = products.find(p => p.id === productId);
	if (product) {
		// Check if the product is already in the cart
		const existingProduct = cart.find(p => p.id === productId);
		if (existingProduct) {
			// If it is, increase the quantity
			existingProduct.quantity++;
		} else {
			// Otherwise, add it to the cart with a quantity of 1
			cart.push({ ...product, quantity: 1 });
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		displayCart();
	}
}

// Display the shopping cart
function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    let totalPrice = 0;
    if (cart.length > 0) {
        const cartList = document.createElement('ul');
        cart.forEach(product => {
            const cartItem = document.createElement('li');
            cartItem.innerText = `${product.name} - $${product.price} x ${product.quantity} = $${product.price * product.quantity}`;
            cartList.appendChild(cartItem);
            totalPrice += product.price * product.quantity;
        });
        cartDiv.appendChild(cartList);

        // Add a checkout button and display the total price
        const checkoutButton = document.createElement('button');
        checkoutButton.innerText = `Checkout - Total: $${totalPrice.toFixed(2)}`;
        checkoutButton.addEventListener('click', checkout);
        cartDiv.appendChild(checkoutButton);
    } else {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    }
}

// Checkout the items in the cart
function checkout() {
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    alert(`Total price: $${totalPrice.toFixed(2)}`);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Display the products and cart
displayProducts();
displayCart();
