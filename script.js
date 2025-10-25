// Global variables
let currentUser = null;
let users = JSON.parse(localStorage.getItem('dealdenUsers')) || [];
let services = JSON.parse(localStorage.getItem('dealdenServices')) || [];
let marketplaceItems = JSON.parse(localStorage.getItem('dealdenMarketplace')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        initializeLoginPage();
    } else if (currentPage === 'register.html') {
        initializeRegisterPage();
    } else if (currentPage === 'dashboard.html') {
        initializeDashboard();
    }
});

// Login Page Functions
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const newUserBtn = document.getElementById('newUserBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (newUserBtn) {
        newUserBtn.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate email format
    if (!username.endsWith('@bmu.edu.in')) {
        showError('Please use a valid BMU email address (@bmu.edu.in)');
        return;
    }
    
    // Check if user exists
    const user = users.find(u => u.email === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'dashboard.html';
    } else {
        showError('Invalid username or password');
    }
}

// Register Page Functions
function initializeRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    const backToLoginBtn = document.getElementById('backToLogin');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    // Validate email format
    if (!email.endsWith('@bmu.edu.in')) {
        showError('Please use a valid BMU email address (@bmu.edu.in)');
        return;
    }
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showError('User already exists with this email');
        return;
    }
    
    // Check password confirmation
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        email: email,
        password: password,
        name: email.split('@')[0],
        services: [],
        marketplaceItems: []
    };
    
    users.push(newUser);
    localStorage.setItem('dealdenUsers', JSON.stringify(users));
    
    showSuccess('Account created successfully! Redirecting to login...');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Dashboard Functions
function initializeDashboard() {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
        window.location.href = 'index.html';
        return;
    }
    
    currentUser = JSON.parse(storedUser);
    document.getElementById('userEmail').textContent = currentUser.email;
    
    // Initialize event listeners
    initializeDashboardEventListeners();
    
    // Load initial data
    loadDashboardData();
}

function initializeDashboardEventListeners() {
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });
    
    // Service options
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', (e) => {
            handleServiceAction(e.target.dataset.action);
        });
    });
    
    // Service dropdown
    document.getElementById('serviceDropdown').addEventListener('change', handleServiceSelection);
    
    // Service offer form
    document.getElementById('serviceOfferForm').addEventListener('submit', handleServiceOffer);
    
    // Marketplace options
    document.querySelectorAll('.marketplace-option').forEach(option => {
        option.addEventListener('click', (e) => {
            handleMarketplaceAction(e.target.dataset.action);
        });
    });
    
    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterItems(e.target.dataset.category);
        });
    });
    
    // Sell item form
    document.getElementById('sellItemForm').addEventListener('submit', handleSellItem);
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Reset service selection
    if (tabName === 'services') {
        resetServiceSelection();
    }
}

function handleServiceAction(action) {
    const serviceCategories = document.getElementById('service-categories');
    const offerServiceForm = document.getElementById('offer-service-form');
    const serviceProviders = document.getElementById('service-providers');
    
    // Hide all sections first
    serviceCategories.style.display = 'none';
    offerServiceForm.style.display = 'none';
    serviceProviders.style.display = 'none';
    
    if (action === 'need') {
        serviceCategories.style.display = 'block';
    } else if (action === 'offer') {
        offerServiceForm.style.display = 'block';
    }
}

function handleServiceSelection() {
    const selectedService = document.getElementById('serviceDropdown').value;
    const serviceProviders = document.getElementById('service-providers');
    const providersList = document.getElementById('providersList');
    
    if (selectedService) {
        serviceProviders.style.display = 'block';
        displayServiceProviders(selectedService);
    } else {
        serviceProviders.style.display = 'none';
    }
}

function displayServiceProviders(serviceType) {
    const providersList = document.getElementById('providersList');
    const serviceProviders = services.filter(service => service.type === serviceType);
    
    if (serviceProviders.length === 0) {
        providersList.innerHTML = '<p>No service providers available for this service yet.</p>';
        return;
    }
    
    providersList.innerHTML = serviceProviders.map(provider => `
        <div class="provider-card">
            <div class="provider-name">${provider.providerName}</div>
            <div class="provider-description">${provider.description}</div>
            <div class="provider-price">₹${provider.price}</div>
            <div class="provider-experience">Experience: ${provider.experience}</div>
            <button class="btn btn-primary" onclick="contactProvider('${provider.id}')">Contact Provider</button>
        </div>
    `).join('');
}

function handleServiceOffer(e) {
    e.preventDefault();
    
    const serviceName = document.getElementById('serviceName').value;
    const serviceDescription = document.getElementById('serviceDescription').value;
    const servicePrice = document.getElementById('servicePrice').value;
    const serviceExperience = document.getElementById('serviceExperience').value;
    
    const newService = {
        id: Date.now(),
        type: getServiceTypeFromName(serviceName),
        providerName: currentUser.name,
        providerEmail: currentUser.email,
        description: serviceDescription,
        price: parseInt(servicePrice),
        experience: serviceExperience,
        dateAdded: new Date().toISOString()
    };
    
    services.push(newService);
    localStorage.setItem('dealdenServices', JSON.stringify(services));
    
    // Add to user's services
    currentUser.services.push(newService.id);
    updateUserInStorage();
    
    alert('Service added successfully!');
    
    // Reset form
    document.getElementById('serviceOfferForm').reset();
}

function getServiceTypeFromName(serviceName) {
    const name = serviceName.toLowerCase();
    if (name.includes('edit')) return 'editing';
    if (name.includes('photo')) return 'photography';
    if (name.includes('video')) return 'videography';
    if (name.includes('tutor') || name.includes('tuition')) return 'peer-tuition';
    if (name.includes('graphic') || name.includes('design')) return 'graphic-design';
    if (name.includes('content') || name.includes('writing')) return 'content-writing';
    if (name.includes('practical') || name.includes('file')) return 'practical-file';
    if (name.includes('music')) return 'music-lessons';
    if (name.includes('gift')) return 'custom-gifts';
    if (name.includes('tech') || name.includes('help')) return 'tech-help';
    if (name.includes('fitness') || name.includes('training')) return 'fitness-training';
    if (name.includes('volunteer')) return 'volunteering';
    return 'other';
}

function handleMarketplaceAction(action) {
    const buyItems = document.getElementById('buy-items');
    const sellItems = document.getElementById('sell-items');
    
    // Hide all sections first
    buyItems.style.display = 'none';
    sellItems.style.display = 'none';
    
    if (action === 'buy') {
        buyItems.style.display = 'block';
        displayMarketplaceItems();
    } else if (action === 'sell') {
        sellItems.style.display = 'block';
    }
}

function displayMarketplaceItems(category = 'all') {
    const itemsList = document.getElementById('itemsList');
    let filteredItems = marketplaceItems;
    
    if (category !== 'all') {
        filteredItems = marketplaceItems.filter(item => item.category === category);
    }
    
    if (filteredItems.length === 0) {
        itemsList.innerHTML = '<p>No items available in this category yet.</p>';
        return;
    }
    
    itemsList.innerHTML = filteredItems.map(item => `
        <div class="item-card">
            ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" class="item-image" onerror="this.style.display='none'">` : ''}
            <div class="item-name">${item.name}</div>
            <div class="item-description">${item.description}</div>
            <div class="item-price">₹${item.price}</div>
            <div class="item-category">${item.category}</div>
            <button class="btn btn-primary" onclick="contactSeller('${item.id}')">Contact Seller</button>
        </div>
    `).join('');
}

function filterItems(category) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Display filtered items
    displayMarketplaceItems(category);
}

function handleSellItem(e) {
    e.preventDefault();
    
    const itemName = document.getElementById('itemName').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemImage = document.getElementById('itemImage').value;
    
    const newItem = {
        id: Date.now(),
        name: itemName,
        category: itemCategory,
        description: itemDescription,
        price: parseInt(itemPrice),
        imageUrl: itemImage,
        sellerName: currentUser.name,
        sellerEmail: currentUser.email,
        dateAdded: new Date().toISOString()
    };
    
    marketplaceItems.push(newItem);
    localStorage.setItem('dealdenMarketplace', JSON.stringify(marketplaceItems));
    
    // Add to user's marketplace items
    currentUser.marketplaceItems.push(newItem.id);
    updateUserInStorage();
    
    alert('Item listed successfully!');
    
    // Reset form
    document.getElementById('sellItemForm').reset();
}

function contactProvider(serviceId) {
    const service = services.find(s => s.id == serviceId);
    if (service) {
        alert(`Contact ${service.providerName} at ${service.providerEmail} for this service.`);
    }
}

function contactSeller(itemId) {
    const item = marketplaceItems.find(i => i.id == itemId);
    if (item) {
        alert(`Contact ${item.sellerName} at ${item.sellerEmail} for this item.`);
    }
}

function resetServiceSelection() {
    document.getElementById('service-categories').style.display = 'none';
    document.getElementById('service-providers').style.display = 'none';
    document.getElementById('offer-service-form').style.display = 'none';
    document.getElementById('serviceDropdown').value = '';
}

function loadDashboardData() {
    // Load any initial data if needed
    displayMarketplaceItems();
}

function updateUserInStorage() {
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('dealdenUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Utility functions
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function showSuccess(message) {
    const successElement = document.getElementById('successMessage');
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    }
}

// Add some sample data for demonstration
function addSampleData() {
    if (services.length === 0) {
        const sampleServices = [
            {
                id: 1,
                type: 'editing',
                providerName: 'John Doe',
                providerEmail: 'john.doe@bmu.edu.in',
                description: 'Professional editing services for essays, reports, and academic papers.',
                price: 300,
                experience: '2 years of editing experience, helped 50+ students',
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                type: 'photography',
                providerName: 'Sarah Wilson',
                providerEmail: 'sarah.wilson@bmu.edu.in',
                description: 'Event photography and portrait sessions for university events.',
                price: 2000,
                experience: 'Professional photographer with 3 years experience',
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                type: 'peer-tuition',
                providerName: 'Mike Johnson',
                providerEmail: 'mike.johnson@bmu.edu.in',
                description: 'Mathematics and Physics tutoring for engineering students.',
                price: 500,
                experience: 'Top 10% of class, 2 years tutoring experience',
                dateAdded: new Date().toISOString()
            }
        ];
        
        services = sampleServices;
        localStorage.setItem('dealdenServices', JSON.stringify(services));
    }
    
    if (marketplaceItems.length === 0) {
        const sampleItems = [
            {
                id: 1,
                name: 'Calculus Textbook',
                category: 'books',
                description: 'Advanced Calculus textbook, excellent condition, barely used.',
                price: 800,
                imageUrl: 'https://via.placeholder.com/250x150?text=Calculus+Book',
                sellerName: 'Alex Kumar',
                sellerEmail: 'alex.kumar@bmu.edu.in',
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Gaming Laptop',
                category: 'electronics',
                description: 'Dell Gaming Laptop, 8GB RAM, 512GB SSD, perfect for coding and gaming.',
                price: 45000,
                imageUrl: 'https://via.placeholder.com/250x150?text=Gaming+Laptop',
                sellerName: 'Priya Singh',
                sellerEmail: 'priya.singh@bmu.edu.in',
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Smart Watch',
                category: 'watches',
                description: 'Apple Watch Series 6, 44mm, with all accessories.',
                price: 25000,
                imageUrl: 'https://via.placeholder.com/250x150?text=Smart+Watch',
                sellerName: 'Rahul Verma',
                sellerEmail: 'rahul.verma@bmu.edu.in',
                dateAdded: new Date().toISOString()
            }
        ];
        
        marketplaceItems = sampleItems;
        localStorage.setItem('dealdenMarketplace', JSON.stringify(marketplaceItems));
    }
}

// Initialize sample data on first load
if (localStorage.getItem('dealdenServices') === null || localStorage.getItem('dealdenMarketplace') === null) {
    addSampleData();
}
