// JavaScript moved from index.html
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button');
let productCards = Array.from(document.querySelectorAll('section.grid > div'));
const productGrid = document.querySelector('section.grid');
const paginationDiv = document.getElementById('pagination');
const PRODUCTS_PER_PAGE = 10;
let currentPage = 1;

function renderPage(page) {
	// Hide all cards
	productCards.forEach(card => card.style.display = 'none');
	// Show only cards for this page
	const start = (page - 1) * PRODUCTS_PER_PAGE;
	const end = start + PRODUCTS_PER_PAGE;
	productCards.slice(start, end).forEach(card => card.style.display = 'block');
	// Update pagination controls
	renderPagination(page);
}

function renderPagination(page) {
	const totalPages = Math.ceil(productCards.length / PRODUCTS_PER_PAGE);
	paginationDiv.innerHTML = '';
	if (totalPages <= 1) return;
	// Prev button
	const prevBtn = document.createElement('button');
	prevBtn.textContent = 'Prev';
	prevBtn.className = 'px-3 py-1 rounded bg-gray-200 hover:bg-orange-200 disabled:opacity-50';
	prevBtn.disabled = page === 1;
	prevBtn.onclick = () => { if (page > 1) renderPage(page - 1); };
	paginationDiv.appendChild(prevBtn);
	// Page numbers
	for (let i = 1; i <= totalPages; i++) {
		const btn = document.createElement('button');
		btn.textContent = i;
		btn.className = 'px-3 py-1 rounded ' + (i === page ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-orange-100');
		btn.onclick = () => renderPage(i);
		paginationDiv.appendChild(btn);
	}
	// Next button
	const nextBtn = document.createElement('button');
	nextBtn.textContent = 'Next';
	nextBtn.className = 'px-3 py-1 rounded bg-gray-200 hover:bg-orange-200 disabled:opacity-50';
	nextBtn.disabled = page === totalPages;
	nextBtn.onclick = () => { if (page < totalPages) renderPage(page + 1); };
	paginationDiv.appendChild(nextBtn);
}

// Initial render
renderPage(currentPage);

// Create 'Product not found' message once
const notFoundMessage = document.createElement('p');
notFoundMessage.textContent = 'Product not found';
notFoundMessage.className = 'text-orange-500 font-semibold text-2xl text-center mt-10';
notFoundMessage.style.display = 'none';
notFoundMessage.style.gridColumn = '1 / -1';

// Create tooltip element
const tooltip = document.createElement('div');
tooltip.textContent = 'Back to homepage';
tooltip.style.position = 'fixed';
tooltip.style.top = '100px';
tooltip.style.left = '80px';
tooltip.style.backgroundColor = '#F97316'; // orange-500
tooltip.style.color = 'white';
tooltip.style.padding = '5px 10px';
tooltip.style.borderRadius = '9999px'; // fully rounded
tooltip.style.fontSize = '14px';
tooltip.style.display = 'none';
tooltip.style.whiteSpace = 'nowrap';
tooltip.style.zIndex = '1000';

// Create back arrow element
const backArrow = document.createElement('span');
backArrow.textContent = '←';
backArrow.className = 'text-orange-500 cursor-pointer text-3xl';
backArrow.style.display = 'none';
backArrow.style.userSelect = 'none';

// Position arrow
backArrow.style.position = 'fixed';
backArrow.style.left = '40px';
backArrow.style.top = '110px';
backArrow.style.padding = '5px';
backArrow.style.borderRadius = '45%';
backArrow.style.transition = 'background-color 0.3s, color 0.3s';

// Hover effect: show tooltip and style
backArrow.addEventListener('mouseenter', () => {
	backArrow.style.backgroundColor = '#F97316';
	backArrow.style.color = 'white';
	tooltip.style.display = 'block';
});

backArrow.addEventListener('mouseleave', () => {
	backArrow.style.backgroundColor = 'transparent';
	backArrow.style.color = '#F97316';
	tooltip.style.display = 'none';
});

// Back arrow click event - go to homepage
backArrow.addEventListener('click', () => {
	window.location.href = 'index.html';
});

// Append elements
productGrid.appendChild(notFoundMessage);
document.body.appendChild(backArrow);
document.body.appendChild(tooltip); // Tooltip is not in grid

let productNotFound = false;

function performSearch(event) {
	if (event) event.preventDefault();

	const query = searchInput.value.toLowerCase().trim();

	if (query === '') {
		if (productNotFound) {
			notFoundMessage.style.display = 'block';
			backArrow.style.display = 'block';
		} else {
			notFoundMessage.style.display = 'none';
			backArrow.style.display = 'none';
		}
		return;
	}


	let found = false;
	let filtered = [];
	productCards.forEach(card => {
		const title = card.querySelector('p.font-bold.text-xl')?.textContent.toLowerCase() || '';
		const category = card.querySelectorAll('p')[1]?.textContent.toLowerCase() || '';
		const description = card.querySelectorAll('p')[3]?.getAttribute('title')?.toLowerCase() || '';
		const price = card.querySelector('p.font-bold.text-lg')?.textContent.toLowerCase() || '';
		const match =
			title.includes(query) ||
			category.includes(query) ||
			description.includes(query) ||
			price.includes(query);
		if (match) {
			filtered.push(card);
			found = true;
		}
	});
	// Hide all
	productCards.forEach(card => card.style.display = 'none');
	// Show filtered (with pagination)
	if (found) {
		// Overwrite productCards for pagination
		productCards = filtered;
		currentPage = 1;
		renderPage(currentPage);
		notFoundMessage.style.display = 'none';
		backArrow.style.display = 'none';
		productNotFound = false;
	} else {
		notFoundMessage.style.display = 'block';
		backArrow.style.display = 'block';
		productNotFound = true;
		paginationDiv.innerHTML = '';
	}
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', e => {
	if (e.key === 'Enter') performSearch(e);
});

searchInput.addEventListener('input', function () {
	const query = this.value.trim();

	if (query !== '') {
		notFoundMessage.style.display = 'none';
		backArrow.style.display = 'none';
	} else {
		// Reset productCards and pagination
		productCards = Array.from(document.querySelectorAll('section.grid > div'));
		currentPage = 1;
		renderPage(currentPage);
		if (productNotFound) {
			notFoundMessage.style.display = 'block';
			backArrow.style.display = 'block';
		}
	}
});
document.addEventListener("DOMContentLoaded", () => {
const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	menu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
	if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
		menu.classList.add("hidden");
	}
});
});


const desktopCategoryBtn = document.getElementById("desktop-category-btn");
const desktopCategoryMenu = document.getElementById("desktop-category-menu");

desktopCategoryBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	desktopCategoryMenu.classList.toggle("hidden");
});


const mobileCategoryBtn = document.getElementById("mobile-category-btn");
const mobileCategoryMenu = document.getElementById("mobile-category-menu");


mobileCategoryBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	mobileCategoryMenu.classList.toggle("hidden");
});

// --- Category Filtering Logic ---
function getAllCategories() {
	const cards = Array.from(document.querySelectorAll('section.grid > div'));
	const categories = new Set();
	cards.forEach(card => {
		const cat = card.querySelectorAll('p')[1]?.textContent.trim();
		if (cat) categories.add(cat);
	});
	return Array.from(categories).sort();
}

function populateCategoryMenus() {
	const categories = getAllCategories();
	const desktopMenu = document.getElementById('desktop-category-menu');
	const mobileMenu = document.getElementById('mobile-category-menu');
	if (!desktopMenu || !mobileMenu) return;
	const desktopList = desktopMenu.querySelector('ul');
	const mobileList = mobileMenu.querySelector('ul');
	if (!desktopList || !mobileList) return;
	desktopList.innerHTML = '';
	mobileList.innerHTML = '';
	// Add 'All' option
	const allLiDesktop = document.createElement('li');
	allLiDesktop.innerHTML = '<a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500">All</a>';
	desktopList.appendChild(allLiDesktop);
	const allLiMobile = document.createElement('li');
	allLiMobile.innerHTML = '<a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500">All</a>';
	mobileList.appendChild(allLiMobile);
	categories.forEach(cat => {
		const liDesktop = document.createElement('li');
		liDesktop.innerHTML = `<a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500">${cat}</a>`;
		desktopList.appendChild(liDesktop);
		const liMobile = document.createElement('li');
		liMobile.innerHTML = `<a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500">${cat}</a>`;
		mobileList.appendChild(liMobile);
	});
}

function showNoCategoryFound() {
	// Hide all cards
	Array.from(document.querySelectorAll('section.grid > div')).forEach(card => card.style.display = 'none');
	// Show message and back arrow
	let msg = document.getElementById('no-category-msg');
	if (!msg) {
		msg = document.createElement('div');
		msg.id = 'no-category-msg';
		msg.className = 'flex flex-col items-center justify-center mt-10';
		msg.innerHTML = `<span class="text-orange-500 font-bold text-2xl mb-2">No category found</span><span id="back-arrow" class="text-orange-500 cursor-pointer text-4xl">&#8592;</span>`;
		document.querySelector('section.grid').appendChild(msg);
		document.getElementById('back-arrow').onclick = () => { window.location.href = 'index.html'; };
	}
	msg.style.display = 'flex';
}

function hideNoCategoryFound() {
	const msg = document.getElementById('no-category-msg');
	if (msg) msg.style.display = 'none';
}

function filterByCategory(category) {
	// Reset productCards to all cards
	productCards = Array.from(document.querySelectorAll('section.grid > div'));
	hideNoCategoryFound();
	if (category === 'All') {
		currentPage = 1;
		renderPage(currentPage);
		return;
	}
	const filtered = productCards.filter(card => {
		const cat = card.querySelectorAll('p')[1]?.textContent.trim().toLowerCase();
		return cat && cat === category.toLowerCase();
	});
	productCards.forEach(card => card.style.display = 'none');
	if (filtered.length === 0) {
		showNoCategoryFound();
		paginationDiv.innerHTML = '';
		return;
	}
	productCards = filtered;
	currentPage = 1;
	renderPage(currentPage);
}

function setupCategoryMenuListeners() {
	// Desktop
	document.querySelectorAll('#desktop-category-menu a').forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault();
			filterByCategory(link.textContent.trim());
			document.getElementById('desktop-category-menu').classList.add('hidden');
		});
	});
	// Mobile
	document.querySelectorAll('#mobile-category-menu a').forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault();
			filterByCategory(link.textContent.trim());
			document.getElementById('mobile-category-menu').classList.add('hidden');
			document.getElementById('menu').classList.add('hidden');
		});
	});
}

// Populate and set up listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
	populateCategoryMenus();
	setupCategoryMenuListeners();
});


// Product Detail Modal Logic
// --- Shopping Cart Logic ---
let checkoutTimeout;

// Checkout logic
function handleCheckout() {
	if (cart.length === 0) return;
	cart = [];
	updateCartCount();
	updateCartModal();
	const cartItemsDiv = document.getElementById('cart-items');
	cartItemsDiv.innerHTML = '<p class="text-green-600 text-center font-bold py-4">Thank you for your purchase!</p>';
	// Optionally close cart after a delay
	clearTimeout(checkoutTimeout);
	checkoutTimeout = setTimeout(() => {
		const cartModal = document.getElementById('cart-modal');
		cartModal.classList.add('hidden');
		cartModal.classList.remove('flex');
	}, 1800);
}
let cart = [];

function updateCartCount() {
	const count = cart.reduce((sum, item) => sum + item.qty, 0);
	const badge = document.getElementById('cart-count');
	const badgeDesktop = document.getElementById('cart-count-desktop');
	if (badge) {
		badge.textContent = count;
		badge.style.display = count > 0 ? 'inline' : 'none';
	}
	if (badgeDesktop) {
		badgeDesktop.textContent = count;
		badgeDesktop.style.display = count > 0 ? 'inline' : 'none';
	}
}

function updateCartModal() {
	const cartItemsDiv = document.getElementById('cart-items');
	const cartTotalSpan = document.getElementById('cart-total');
	cartItemsDiv.innerHTML = '';
	let total = 0;
	if (cart.length === 0) {
		cartItemsDiv.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty.</p>';
	} else {
		cart.forEach(item => {
			const itemDiv = document.createElement('div');
			itemDiv.className = 'flex items-center justify-between mb-2';
			itemDiv.innerHTML = `
				<div class="flex items-center gap-2">
					<img src="${item.img}" alt="${item.title}" class="w-10 h-10 object-contain rounded bg-gray-100" />
					<span class="font-semibold">${item.title}</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-orange-600 font-bold">$${item.price.toFixed(2)}</span>
					<span class="text-xs">x${item.qty}</span>
					<button class="text-red-500 hover:text-red-700 font-bold" onclick="removeFromCart('${item.title.replace(/'/g, '')}')">&times;</button>
				</div>
			`;
			cartItemsDiv.appendChild(itemDiv);
			total += item.price * item.qty;
		});
	}
	cartTotalSpan.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(title) {
	cart = cart.filter(item => item.title !== title);
	updateCartCount();
	updateCartModal();
}
window.removeFromCart = removeFromCart;

function addToCart(product) {
	const existing = cart.find(item => item.title === product.title);
	if (existing) {
		existing.qty += 1;
	} else {
		cart.push({ ...product, qty: 1 });
	}
	updateCartCount();
	updateCartModal();
}

// Add to Cart from modal
document.addEventListener('DOMContentLoaded', () => {
	// Checkout button
	const checkoutBtn = document.getElementById('checkout-btn');
	if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);
	const modalAddToCart = document.getElementById('modal-add-to-cart');
	if (modalAddToCart) {
		modalAddToCart.addEventListener('click', () => {
			const product = {
				img: modalImage.src,
				title: modalTitle.textContent,
				price: parseFloat(modalPrice.textContent.replace(/[^\d.]/g, '')) || 0,
			};
			addToCart(product);
			modal.classList.add('hidden');
			modal.classList.remove('flex');
		});
	}

	// Add to Cart from product cards
	document.querySelectorAll('section.grid > div').forEach(card => {
		const addBtn = card.querySelector('button[aria-label="Add to Cart"]');
		if (addBtn) {
			addBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				const img = card.querySelector('img');
				const title = card.querySelector('p.font-bold');
				const price = card.querySelector('span.font-bold');
				const product = {
					img: img ? img.src : '',
					title: title ? title.textContent : '',
					price: price ? parseFloat(price.textContent.replace(/[^\d.]/g, '')) : 0,
				};
				addToCart(product);
			});
		}
	});

	// Cart modal open/close
	const cartBtn = document.getElementById('cart-btn');
	const cartBtnDesktop = document.getElementById('cart-btn-desktop');
	const cartModal = document.getElementById('cart-modal');
	const closeCart = document.getElementById('close-cart');

	function openCart() {
		cartModal.classList.remove('hidden');
		cartModal.classList.add('flex');
		updateCartModal();
	}
	function closeCartModal() {
		cartModal.classList.add('hidden');
		cartModal.classList.remove('flex');
	}
	if (cartBtn) cartBtn.addEventListener('click', openCart);
	if (cartBtnDesktop) cartBtnDesktop.addEventListener('click', openCart);
	if (closeCart) closeCart.addEventListener('click', closeCartModal);
	cartModal.addEventListener('click', (e) => {
		if (e.target === cartModal) closeCartModal();
	});

	updateCartCount();
});
const modal = document.getElementById('product-modal');
const closeModal = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalRating = document.getElementById('modal-rating');
const modalOldPrice = document.getElementById('modal-old-price');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');

document.querySelectorAll('section.grid > div').forEach(card => {
	card.querySelector('a').addEventListener('click', function(e) {
		e.preventDefault();
		// Get product info from card
		const img = card.querySelector('img');
		const title = card.querySelector('p.font-bold');
		const category = card.querySelectorAll('p')[1];
		const rating = card.querySelector('div[aria-label="Product rating"]');
		const oldPrice = card.querySelector('span.line-through');
		const price = card.querySelector('span.font-bold');
		const desc = card.querySelectorAll('p')[3];

		modalImage.src = img ? img.src : '';
		modalImage.alt = img ? img.alt : '';
		modalTitle.textContent = title ? title.textContent : '';
		modalCategory.textContent = category ? category.textContent : '';
		modalRating.innerHTML = rating ? rating.innerHTML : '';
		modalOldPrice.textContent = oldPrice ? oldPrice.textContent : '';
		modalPrice.textContent = price ? price.textContent : '';
		modalDescription.textContent = desc ? desc.getAttribute('title') || desc.textContent : '';


		// --- Reviews Logic ---
		const reviewsSection = document.getElementById('reviews-section');
		const reviewsList = document.getElementById('reviews-list');
		const reviewForm = document.getElementById('review-form');
		const reviewStars = document.getElementById('review-stars');
		const reviewText = document.getElementById('review-text');
		let selectedRating = 0;

		// Helper: get product key for reviews
		function getProductKey() {
			return 'reviews_' + (modalTitle.textContent || '').replace(/\s+/g, '_');
		}

		// Render reviews
		function renderReviews() {
			const key = getProductKey();
			const reviews = JSON.parse(localStorage.getItem(key) || '[]');
			reviewsList.innerHTML = '';
			if (reviews.length === 0) {
				reviewsList.innerHTML = '<p class="text-gray-400 text-sm">No reviews yet.</p>';
				return;
			}
			reviews.forEach(r => {
				const div = document.createElement('div');
				div.className = 'bg-gray-100 rounded p-2';
				div.innerHTML = `<div class="flex items-center gap-2 mb-1">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}<span class="text-xs text-gray-500 ml-2">${r.date}</span></div><div class="text-sm text-gray-800">${r.text}</div>`;
				reviewsList.appendChild(div);
			});
		}

		// Star rating UI
		reviewStars.querySelectorAll('.star').forEach(star => {
			star.addEventListener('mouseenter', function() {
				const val = +this.dataset.star;
				reviewStars.querySelectorAll('.star').forEach((s, i) => {
					s.classList.toggle('text-yellow-400', i < val);
					s.classList.toggle('text-gray-300', i >= val);
				});
			});
			star.addEventListener('mouseleave', function() {
				reviewStars.querySelectorAll('.star').forEach((s, i) => {
					s.classList.toggle('text-yellow-400', i < selectedRating);
					s.classList.toggle('text-gray-300', i >= selectedRating);
				});
			});
			star.addEventListener('click', function() {
				selectedRating = +this.dataset.star;
				reviewStars.querySelectorAll('.star').forEach((s, i) => {
					s.classList.toggle('text-yellow-400', i < selectedRating);
					s.classList.toggle('text-gray-300', i >= selectedRating);
				});
			});
		});

		// Submit review
		reviewForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const text = reviewText.value.trim();
			if (!selectedRating || !text) return;
			const key = getProductKey();
			const reviews = JSON.parse(localStorage.getItem(key) || '[]');
			reviews.unshift({ rating: selectedRating, text, date: new Date().toLocaleDateString() });
			localStorage.setItem(key, JSON.stringify(reviews));
			reviewText.value = '';
			selectedRating = 0;
			reviewStars.querySelectorAll('.star').forEach((s) => {
				s.classList.remove('text-yellow-400');
				s.classList.add('text-gray-300');
			});
			renderReviews();
		});

		// Show reviews for this product
		renderReviews();

		modal.classList.remove('hidden');
		modal.classList.add('flex');
		});
	});

	closeModal.addEventListener('click', () => {
		modal.classList.add('hidden');
		modal.classList.remove('flex');
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.classList.add('hidden');
			modal.classList.remove('flex');
		}
	});

