        // Configuration and state
        const defaultConfig = {
            store_name: "JINKART",
            store_tagline: "Shop Smart, Live Better!",
            welcome_message: "Welcome to JINKART - Your Ultimate Shopping Paradise!",
            contact_phone: "+91 98765 43210",
            contact_email: "support@jinkart.com",
            background_color: "#f9fafb",
            surface_color: "#ffffff",
            text_color: "#1f2937",
            primary_action_color: "#4834d4",
            secondary_action_color: "#6c5ce7",
            font_family: "Segoe UI",
            font_size: 16
        };

        let currentPage = 'home';
        let currentUser = null;
        let storedData = [];
        let isLoading = false;

        // 40 Amazing Products with Real Images - JINKART Collection
        const sampleProducts = [
            // Electronics (10 products)
            { id: 1, name: "iPhone 15 Pro Max", price: 134900, category: "electronics", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", rating: 4.9, description: "Latest iPhone with titanium design" },
            { id: 2, name: "Samsung Galaxy S24 Ultra", price: 124999, category: "electronics", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", rating: 4.8, description: "Flagship Android smartphone" },
            { id: 3, name: "MacBook Pro M3", price: 199900, category: "electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", rating: 4.9, description: "Professional laptop with M3 chip" },
            { id: 4, name: "Sony WH-1000XM5", price: 29990, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", rating: 4.7, description: "Premium noise-canceling headphones" },
            { id: 5, name: "iPad Pro 12.9", price: 112900, category: "electronics", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", rating: 4.8, description: "Professional tablet for creators" },
            { id: 6, name: "Apple Watch Series 9", price: 41900, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", rating: 4.6, description: "Advanced smartwatch with health features" },
            { id: 7, name: "Dell XPS 13", price: 89990, category: "electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", rating: 4.5, description: "Ultra-portable premium laptop" },
            { id: 8, name: "Canon EOS R5", price: 329999, category: "electronics", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop", rating: 4.9, description: "Professional mirrorless camera" },
            { id: 9, name: "Nintendo Switch OLED", price: 37980, category: "electronics", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", rating: 4.7, description: "Portable gaming console" },
            { id: 10, name: "AirPods Pro 2", price: 24900, category: "electronics", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop", rating: 4.6, description: "Wireless earbuds with ANC" },

            // Fashion & Clothing (10 products)
            { id: 11, name: "Nike Air Jordan 1", price: 12795, category: "clothing", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", rating: 4.8, description: "Iconic basketball sneakers" },
            { id: 12, name: "Levi's 501 Original Jeans", price: 4999, category: "clothing", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", rating: 4.5, description: "Classic straight-fit jeans" },
            { id: 13, name: "Adidas Ultraboost 22", price: 16999, category: "clothing", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", rating: 4.7, description: "Premium running shoes" },
            { id: 14, name: "Ralph Lauren Polo Shirt", price: 8999, category: "clothing", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", rating: 4.4, description: "Classic polo shirt" },
            { id: 15, name: "Zara Leather Jacket", price: 12999, category: "clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", rating: 4.6, description: "Stylish leather jacket" },
            { id: 16, name: "H&M Summer Dress", price: 2999, category: "clothing", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop", rating: 4.3, description: "Trendy summer dress" },
            { id: 17, name: "Converse Chuck Taylor", price: 5999, category: "clothing", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop", rating: 4.5, description: "Classic canvas sneakers" },
            { id: 18, name: "Tommy Hilfiger Hoodie", price: 7999, category: "clothing", image: "https://images.unsplash.com/photo-1556821840-3a9fbc86339e?w=400&h=400&fit=crop", rating: 4.4, description: "Comfortable cotton hoodie" },
            { id: 19, name: "Ray-Ban Aviator", price: 15999, category: "clothing", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", rating: 4.7, description: "Classic aviator sunglasses" },
            { id: 20, name: "Fossil Leather Watch", price: 11999, category: "clothing", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop", rating: 4.5, description: "Elegant leather strap watch" },

            // Home & Garden (10 products)
            { id: 21, name: "Dyson V15 Detect", price: 65900, category: "home", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", rating: 4.8, description: "Advanced cordless vacuum" },
            { id: 22, name: "Nespresso Vertuo", price: 19990, category: "home", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop", rating: 4.6, description: "Premium coffee machine" },
            { id: 23, name: "Philips Air Fryer", price: 12999, category: "home", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", rating: 4.5, description: "Healthy cooking appliance" },
            { id: 24, name: "IKEA Sofa Set", price: 45999, category: "home", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", rating: 4.3, description: "Modern 3-seater sofa" },
            { id: 25, name: "Monstera Deliciosa Plant", price: 2499, category: "home", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop", rating: 4.7, description: "Beautiful indoor plant" },
            { id: 26, name: "Philips Hue Smart Bulbs", price: 8999, category: "home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop", rating: 4.6, description: "Smart LED lighting system" },
            { id: 27, name: "KitchenAid Stand Mixer", price: 42999, category: "home", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", rating: 4.8, description: "Professional stand mixer" },
            { id: 28, name: "Casper Memory Foam Pillow", price: 6999, category: "home", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop", rating: 4.4, description: "Ergonomic memory foam pillow" },
            { id: 29, name: "Seiko Wall Clock", price: 3999, category: "home", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop", rating: 4.2, description: "Modern wall clock" },
            { id: 30, name: "Weber Gas Grill", price: 89999, category: "home", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop", rating: 4.7, description: "Premium outdoor grill" },

            // Books (5 products)
            { id: 31, name: "Atomic Habits", price: 699, category: "books", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop", rating: 4.9, description: "Life-changing habits book" },
            { id: 32, name: "The Psychology of Money", price: 599, category: "books", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", rating: 4.8, description: "Financial wisdom book" },
            { id: 33, name: "Sapiens", price: 799, category: "books", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", rating: 4.7, description: "Human history masterpiece" },
            { id: 34, name: "The Alchemist", price: 399, category: "books", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop", rating: 4.6, description: "Inspirational fiction novel" },
            { id: 35, name: "Rich Dad Poor Dad", price: 499, category: "books", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=400&fit=crop", rating: 4.5, description: "Financial education classic" },

            // Sports (3 products)
            { id: 36, name: "Yonex Badminton Racket", price: 8999, category: "sports", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop", rating: 4.6, description: "Professional badminton racket" },
            { id: 37, name: "Adidas Football", price: 2999, category: "sports", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop", rating: 4.4, description: "Official match football" },
            { id: 38, name: "Decathlon Yoga Mat", price: 1999, category: "sports", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop", rating: 4.3, description: "Premium yoga mat" },

            // Beauty (1 product)
            { id: 39, name: "Lakme Makeup Kit", price: 4999, category: "beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", rating: 4.5, description: "Complete makeup collection" },

            // Toys (1 product)
            { id: 40, name: "LEGO Creator Set", price: 12999, category: "toys", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop", rating: 4.8, description: "Creative building blocks set" }
        ];

        // Data SDK Handler
        const dataHandler = {
            onDataChanged(data) {
                storedData = data;
                updateDashboardCounts();
                renderDashboardContent();
            }
        };

        // Initialize app
        async function initializeApp() {
            const initResult = await window.dataSdk.init(dataHandler);
            if (!initResult.isOk) {
                console.error("Failed to initialize data SDK");
                return;
            }

            // Initialize Element SDK
            if (window.elementSdk) {
                window.elementSdk.init({
                    defaultConfig,
                    onConfigChange: async (config) => {
                        const customFont = config.font_family || defaultConfig.font_family;
                        const baseSize = config.font_size || defaultConfig.font_size;
                        const baseFontStack = 'Tahoma, Geneva, Verdana, sans-serif';

                        // Apply font family
                        document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;

                        // Apply font sizes proportionally
                        document.querySelectorAll('h1').forEach(el => el.style.fontSize = `${baseSize * 1.875}px`);
                        document.querySelectorAll('h2').forEach(el => el.style.fontSize = `${baseSize * 2.25}px`);
                        document.querySelectorAll('h3').forEach(el => el.style.fontSize = `${baseSize * 1.5}px`);
                        document.querySelectorAll('p, button, input, select, textarea').forEach(el => el.style.fontSize = `${baseSize}px`);

                        // Apply colors
                        const bgColor = config.background_color || defaultConfig.background_color;
                        const surfaceColor = config.surface_color || defaultConfig.surface_color;
                        const textColor = config.text_color || defaultConfig.text_color;
                        const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;
                        const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;

                        document.body.style.backgroundColor = bgColor;
                        document.querySelectorAll('.bg-white').forEach(el => el.style.backgroundColor = surfaceColor);
                        document.querySelectorAll('.text-gray-800, .text-gray-700, .text-gray-600').forEach(el => el.style.color = textColor);

                        // Apply text content
                        document.getElementById('store-name').textContent = config.store_name || defaultConfig.store_name;
                        document.getElementById('store-tagline').textContent = config.store_tagline || defaultConfig.store_tagline;
                        document.getElementById('welcome-message').textContent = config.welcome_message || defaultConfig.welcome_message;
                        document.getElementById('contact-phone-display').textContent = config.contact_phone || defaultConfig.contact_phone;
                        document.getElementById('contact-email-display').textContent = config.contact_email || defaultConfig.contact_email;
                    },
                    mapToCapabilities: (config) => ({
                        recolorables: [
                            {
                                get: () => config.background_color || defaultConfig.background_color,
                                set: (value) => {
                                    if (window.elementSdk) {
                                        window.elementSdk.setConfig({ background_color: value });
                                    }
                                }
                            },
                            {
                                get: () => config.surface_color || defaultConfig.surface_color,
                                set: (value) => {
                                    if (window.elementSdk) {
                                        window.elementSdk.setConfig({ surface_color: value });
                                    }
                                }
                            },
                            {
                                get: () => config.text_color || defaultConfig.text_color,
                                set: (value) => {
                                    if (window.elementSdk) {
                                        window.elementSdk.setConfig({ text_color: value });
                                    }
                                }
                            },
                            {
                                get: () => config.primary_action_color || defaultConfig.primary_action_color,
                                set: (value) => {
                                    if (window.elementSdk) {
                                        window.elementSdk.setConfig({ primary_action_color: value });
                                    }
                                }
                            },
                            {
                                get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                                set: (value) => {
                                    if (window.elementSdk) {
                                        window.elementSdk.setConfig({ secondary_action_color: value });
                                    }
                                }
                            }
                        ],
                        borderables: [],
                        fontEditable: {
                            get: () => config.font_family || defaultConfig.font_family,
                            set: (value) => {
                                if (window.elementSdk) {
                                    window.elementSdk.setConfig({ font_family: value });
                                }
                            }
                        },
                        fontSizeable: {
                            get: () => config.font_size || defaultConfig.font_size,
                            set: (value) => {
                                if (window.elementSdk) {
                                    window.elementSdk.setConfig({ font_size: value });
                                }
                            }
                        }
                    }),
                    mapToEditPanelValues: (config) => new Map([
                        ["store_name", config.store_name || defaultConfig.store_name],
                        ["store_tagline", config.store_tagline || defaultConfig.store_tagline],
                        ["welcome_message", config.welcome_message || defaultConfig.welcome_message],
                        ["contact_phone", config.contact_phone || defaultConfig.contact_phone],
                        ["contact_email", config.contact_email || defaultConfig.contact_email]
                    ])
                });
            }

            setupEventListeners();
            renderProducts();
            showPage('home');
        }

        // Setup event listeners
        function setupEventListeners() {
            // Navigation
            document.querySelectorAll('[data-page]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const page = e.target.dataset.page;
                    showPage(page);
                });
            });

            // Mobile menu
            document.getElementById('mobile-menu-btn').addEventListener('click', () => {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
            });

            // Auth modal
            document.getElementById('login-btn').addEventListener('click', () => {
                if (currentUser) {
                    showPage('dashboard');
                } else {
                    showAuthModal();
                }
            });

            document.getElementById('close-modal').addEventListener('click', hideAuthModal);
            document.getElementById('auth-toggle').addEventListener('click', toggleAuthForm);

            // Forms
            document.getElementById('login-form').addEventListener('submit', handleLogin);
            document.getElementById('register-form').addEventListener('submit', handleRegister);
            document.getElementById('contact-form').addEventListener('submit', handleContactForm);

            // Dashboard tabs
            document.querySelectorAll('.dashboard-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const tabName = e.target.dataset.tab;
                    showDashboardTab(tabName);
                });
            });

            // Category filters
            document.querySelectorAll('.category-filter').forEach(filter => {
                filter.addEventListener('click', (e) => {
                    const category = e.target.dataset.category;
                    filterProducts(category);
                });
            });

            // Wishlist and cart buttons
            document.getElementById('wishlist-btn').addEventListener('click', () => {
                if (currentUser) {
                    showPage('dashboard');
                    showDashboardTab('wishlist');
                } else {
                    showNotification('Please login to view your wishlist 💝', 'error');
                }
            });

            document.getElementById('cart-btn').addEventListener('click', () => {
                if (currentUser) {
                    showPage('dashboard');
                    showDashboardTab('orders');
                } else {
                    showNotification('Please login to view your cart 🛒', 'error');
                }
            });

            // Notification close
            document.getElementById('close-notification').addEventListener('click', hideNotification);

            // Real-time validation for forms
            setupRealTimeValidation();
        }

        // Setup real-time validation
        function setupRealTimeValidation() {
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => clearFieldValidation(input));
            });
        }

        // Field validation functions
        function validateField(field) {
            const value = field.value.trim();
            const fieldType = field.type;
            const fieldId = field.id;
            
            clearFieldValidation(field);

            // Name validation
            if (fieldId.includes('name') && fieldType === 'text') {
                if (!value) {
                    showFieldError(field, 'Name is required');
                    return false;
                } else if (value.length < 2) {
                    showFieldError(field, 'Name must be at least 2 characters');
                    return false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    showFieldError(field, 'Name can only contain letters and spaces');
                    return false;
                } else {
                    showFieldSuccess(field, '✅ Valid name');
                    return true;
                }
            }

            // Email validation
            if (fieldType === 'email') {
                if (!value) {
                    showFieldError(field, 'Email is required');
                    return false;
                } else if (!validateEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    return false;
                } else {
                    showFieldSuccess(field, '✅ Valid email');
                    return true;
                }
            }

            // Phone validation
            if (fieldType === 'tel') {
                if (!value) {
                    showFieldError(field, 'Phone number is required');
                    return false;
                } else if (!/^[+]?[\d\s\-()]{10,15}$/.test(value)) {
                    showFieldError(field, 'Please enter a valid phone number');
                    return false;
                } else {
                    showFieldSuccess(field, '✅ Valid phone number');
                    return true;
                }
            }

            // Password validation
            if (fieldType === 'password' && !fieldId.includes('confirm')) {
                if (!value) {
                    showFieldError(field, 'Password is required');
                    return false;
                } else if (value.length < 6) {
                    showFieldError(field, 'Password must be at least 6 characters');
                    return false;
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    showFieldError(field, 'Password must contain uppercase, lowercase, and number');
                    return false;
                } else {
                    showFieldSuccess(field, '✅ Strong password');
                    return true;
                }
            }

            // Confirm password validation
            if (fieldId.includes('confirm-password')) {
                const passwordField = document.getElementById(fieldId.replace('confirm-', ''));
                if (!value) {
                    showFieldError(field, 'Please confirm your password');
                    return false;
                } else if (value !== passwordField.value) {
                    showFieldError(field, 'Passwords do not match');
                    return false;
                } else {
                    showFieldSuccess(field, '✅ Passwords match');
                    return true;
                }
            }

            // Subject validation
            if (fieldId.includes('subject')) {
                if (!value) {
                    showFieldError(field, 'Subject is required');
                    return false;
                } else if (value.length < 3) {
                    showFieldError(field, 'Subject must be at least 3 characters');
                    return false;
                } else {
                    showFieldSuccess(field, '✅ Valid subject');
                    return true;
                }
            }

            // Message validation
            if (field.tagName.toLowerCase() === 'textarea') {
                if (!value) {
                    showFieldError(field, 'Message is required');
                    return false;
                } else if (value.length < 10) {
                    showFieldError(field, 'Message must be at least 10 characters');
                    return false;
                } else {
                    showFieldSuccess(field, '✅ Valid message');
                    return true;
                }
            }

            return true;
        }

        function showFieldError(field, message) {
            field.classList.add('input-error');
            field.classList.remove('input-success');
            
            const errorDiv = field.parentNode.querySelector('.error-message');
            const successDiv = field.parentNode.querySelector('.success-message');
            
            if (errorDiv) {
                errorDiv.textContent = message;
                errorDiv.classList.remove('hidden');
            }
            if (successDiv) {
                successDiv.classList.add('hidden');
            }
        }

        function showFieldSuccess(field, message) {
            field.classList.add('input-success');
            field.classList.remove('input-error');
            
            const errorDiv = field.parentNode.querySelector('.error-message');
            const successDiv = field.parentNode.querySelector('.success-message');
            
            if (successDiv) {
                successDiv.textContent = message;
                successDiv.classList.remove('hidden');
            }
            if (errorDiv) {
                errorDiv.classList.add('hidden');
            }
        }

        function clearFieldValidation(field) {
            field.classList.remove('input-error', 'input-success');
            
            const errorDiv = field.parentNode.querySelector('.error-message');
            const successDiv = field.parentNode.querySelector('.success-message');
            
            if (errorDiv) {
                errorDiv.classList.add('hidden');
            }
            if (successDiv) {
                successDiv.classList.add('hidden');
            }
        }

        function clearFormErrors() {
            document.querySelectorAll('.form-input').forEach(input => {
                clearFieldValidation(input);
            });
        }

        // Page navigation
        function showPage(pageName) {
            currentPage = pageName;
            
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.add('hidden');
            });

            // Show selected page
            const targetPage = document.getElementById(`${pageName}-page`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
            }

            // Update navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.className = 'nav-item bg-gray-300 text-gray-700';
            });

            // Set active nav item colors
            const activeNavItems = document.querySelectorAll(`[data-page="${pageName}"]`);
            activeNavItems.forEach((item, index) => {
                item.classList.remove('bg-gray-300', 'text-gray-700');
                switch(pageName) {
                    case 'home':
                        item.classList.add('bg-gradient-primary', 'text-white');
                        break;
                    case 'products':
                        item.classList.add('bg-gradient-secondary', 'text-white');
                        break;
                    case 'about':
                        item.classList.add('bg-gradient-success', 'text-white');
                        break;
                    case 'contact':
                        item.classList.add('bg-gradient-warning', 'text-white');
                        break;
                }
            });

            // Update login button
            const loginBtn = document.getElementById('login-btn');
            if (currentUser) {
                loginBtn.textContent = '🎯 Dashboard';
            } else {
                loginBtn.textContent = 'Login';
            }
        }

        // Auth modal functions
        function showAuthModal() {
            document.getElementById('auth-modal').classList.remove('hidden');
        }

        function hideAuthModal() {
            document.getElementById('auth-modal').classList.add('hidden');
            clearFormErrors();
        }

        function toggleAuthForm() {
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            const authTitle = document.getElementById('auth-title');
            const authToggle = document.getElementById('auth-toggle');
            const authToggleText = document.getElementById('auth-toggle-text');

            if (loginForm.classList.contains('hidden')) {
                // Show login form
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                authTitle.textContent = 'Login';
                authToggleText.textContent = "Don't have an account?";
                authToggle.textContent = 'Register';
            } else {
                // Show register form
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                authTitle.textContent = 'Register';
                authToggleText.textContent = 'Already have an account?';
                authToggle.textContent = 'Login';
            }
            clearFormErrors();
        }

        // Validation functions
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validateForm(formId) {
            const form = document.getElementById(formId);
            const inputs = form.querySelectorAll('.form-input');
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        // Handle login
        async function handleLogin(e) {
            e.preventDefault();
            
            if (!validateForm('login-form')) {
                return;
            }

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            // Simulate login (in real app, this would be an API call)
            currentUser = { email, name: email.split('@')[0] };
            hideAuthModal();
            showNotification('Welcome to JINKART! 🎉', 'success');
            showPage('dashboard');
        }

        // Handle registration
        async function handleRegister(e) {
            e.preventDefault();
            
            if (!validateForm('register-form')) {
                return;
            }

            if (storedData.length >= 999) {
                showNotification('Maximum limit reached. Please try again later. 😔', 'error');
                return;
            }

            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const phone = document.getElementById('register-phone').value.trim();
            const password = document.getElementById('register-password').value;

            // Save user data
            const userData = {
                id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: 'user',
                name,
                email,
                phone,
                createdAt: new Date().toISOString()
            };

            const result = await window.dataSdk.create(userData);
            if (result.isOk) {
                currentUser = { email, name };
                hideAuthModal();
                showNotification('Welcome to JINKART family! 🎊', 'success');
                showPage('dashboard');
            } else {
                showNotification('Registration failed. Please try again. 😞', 'error');
            }
        }

        // Handle contact form
        async function handleContactForm(e) {
            e.preventDefault();
            
            if (!validateForm('contact-form')) {
                return;
            }

            if (storedData.length >= 999) {
                showNotification('Maximum limit reached. Please try again later. 😔', 'error');
                return;
            }

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            const contactData = {
                id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: 'contact',
                name,
                email,
                subject,
                message,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            const result = await window.dataSdk.create(contactData);
            if (result.isOk) {
                document.getElementById('contact-form').reset();
                clearFormErrors();
                showNotification('Message sent successfully! We\'ll get back to you soon! 📧', 'success');
            } else {
                showNotification('Failed to send message. Please try again. 😞', 'error');
            }
        }

        // Product functions
        function renderProducts() {
            const featuredContainer = document.getElementById('featured-products');
            const productsContainer = document.getElementById('products-grid');

            // Render featured products (first 8)
            featuredContainer.innerHTML = '';
            sampleProducts.slice(0, 8).forEach(product => {
                featuredContainer.appendChild(createProductCard(product));
            });

            // Render all products
            productsContainer.innerHTML = '';
            sampleProducts.forEach(product => {
                productsContainer.appendChild(createProductCard(product));
            });
        }

        function createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="product-fallback" style="display: none;">📦</div>
                    <div class="product-rating">
                        <div class="star-rating">
                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} ${product.rating}
                        </div>
                    </div>
                    <div class="product-category">
                        ${product.category}
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price-row">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <div class="product-rating-small">
                            <span>⭐ ${product.rating}</span>
                        </div>
                    </div>
                    <div class="product-actions">
                        <button class="wishlist-btn" data-product-id="${product.id}">❤️</button>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart 🛒</button>
                    </div>
                </div>
            `;

            // Add event listeners
            card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(product);
            });

            card.querySelector('.wishlist-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                addToWishlist(product);
            });

            return card;
        }

        function filterProducts(category) {
            const productsContainer = document.getElementById('products-grid');
            const filteredProducts = category === 'all' ? sampleProducts : sampleProducts.filter(p => p.category === category);

            productsContainer.innerHTML = '';
            filteredProducts.forEach(product => {
                productsContainer.appendChild(createProductCard(product));
            });

            // Update filter buttons
            document.querySelectorAll('.category-filter').forEach(btn => {
                btn.className = 'category-filter bg-gray-300 text-gray-700';
            });

            const activeBtn = document.querySelector(`[data-category="${category}"]`);
            if (activeBtn) {
                activeBtn.classList.remove('bg-gray-300', 'text-gray-700');
                switch(category) {
                    case 'all':
                        activeBtn.classList.add('bg-gradient-rainbow', 'text-white');
                        break;
                    case 'electronics':
                        activeBtn.classList.add('category-electronics', 'text-white');
                        break;
                    case 'clothing':
                        activeBtn.classList.add('category-clothing', 'text-white');
                        break;
                    case 'home':
                        activeBtn.classList.add('category-home', 'text-white');
                        break;
                    case 'books':
                        activeBtn.classList.add('category-books', 'text-white');
                        break;
                    case 'sports':
                        activeBtn.classList.add('category-sports', 'text-white');
                        break;
                    case 'beauty':
                        activeBtn.classList.add('category-beauty', 'text-white');
                        break;
                    case 'toys':
                        activeBtn.classList.add('category-toys', 'text-white');
                        break;
                }
            }
        }

        // Cart and wishlist functions
        async function addToCart(product) {
            if (!currentUser) {
                showNotification('Please login to add items to cart 🔐', 'error');
                return;
            }

            if (storedData.length >= 999) {
                showNotification('Maximum limit reached. Please remove some items first. 📦', 'error');
                return;
            }

            const orderData = {
                id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: 'order',
                userId: currentUser.email,
                productId: product.id.toString(),
                productName: product.name,
                price: product.price,
                quantity: 1,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            const result = await window.dataSdk.create(orderData);
            if (result.isOk) {
                showNotification(`${product.name} added to cart! 🛒✨`, 'success');
            } else {
                showNotification('Failed to add item to cart 😞', 'error');
            }
        }

        async function addToWishlist(product) {
            if (!currentUser) {
                showNotification('Please login to add items to wishlist 💝', 'error');
                return;
            }

            if (storedData.length >= 999) {
                showNotification('Maximum limit reached. Please remove some items first. 💔', 'error');
                return;
            }

            const wishlistData = {
                id: `wishlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: 'wishlist',
                userId: currentUser.email,
                productId: product.id.toString(),
                productName: product.name,
                price: product.price,
                createdAt: new Date().toISOString()
            };

            const result = await window.dataSdk.create(wishlistData);
            if (result.isOk) {
                showNotification(`${product.name} added to wishlist! ❤️✨`, 'success');
            } else {
                showNotification('Failed to add item to wishlist 💔', 'error');
            }
        }

        // Dashboard functions
        function showDashboardTab(tabName) {
            // Update tab buttons
            document.querySelectorAll('.dashboard-tab').forEach(tab => {
                tab.className = 'dashboard-tab bg-gray-300 text-gray-700';
            });

            const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
            if (activeTab) {
                activeTab.classList.remove('bg-gray-300', 'text-gray-700');
                switch(tabName) {
                    case 'orders':
                        activeTab.classList.add('bg-gradient-primary', 'text-white');
                        break;
                    case 'wishlist':
                        activeTab.classList.add('bg-gradient-secondary', 'text-white');
                        break;
                    case 'reviews':
                        activeTab.classList.add('bg-gradient-success', 'text-white');
                        break;
                    case 'support':
                        activeTab.classList.add('bg-gradient-warning', 'text-white');
                        break;
                    case 'reports':
                        activeTab.classList.add('bg-gradient-rainbow', 'text-white');
                        break;
                }
            }

            // Show/hide content
            document.querySelectorAll('.dashboard-content').forEach(content => {
                content.classList.add('hidden');
            });

            document.getElementById(`${tabName}-tab`).classList.remove('hidden');
        }

        function updateDashboardCounts() {
            if (!currentUser) return;

            const userOrders = storedData.filter(item => item.type === 'order' && item.userId === currentUser.email);
            const userWishlist = storedData.filter(item => item.type === 'wishlist' && item.userId === currentUser.email);
            const userReviews = storedData.filter(item => item.type === 'review' && item.userId === currentUser.email);

            document.getElementById('orders-count').textContent = userOrders.length;
            document.getElementById('wishlist-count').textContent = userWishlist.length;
            document.getElementById('wishlist-display-count').textContent = userWishlist.length;
            document.getElementById('cart-count').textContent = userOrders.filter(o => o.status === 'pending').length;
            document.getElementById('reviews-count').textContent = userReviews.length;
            document.getElementById('total-orders').textContent = userOrders.length;

            const totalSpent = userOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
            document.getElementById('total-spent').textContent = `₹${totalSpent.toLocaleString('en-IN')}`;
        }

        function renderDashboardContent() {
            if (!currentUser) return;

            renderOrders();
            renderWishlist();
            renderReviews();
            renderSupportTickets();
        }

        function renderOrders() {
            const container = document.getElementById('orders-list');
            const noOrders = document.getElementById('no-orders');
            const userOrders = storedData.filter(item => item.type === 'order' && item.userId === currentUser.email);

            if (userOrders.length === 0) {
                container.classList.add('hidden');
                noOrders.classList.remove('hidden');
                return;
            }

            container.classList.remove('hidden');
            noOrders.classList.add('hidden');
            container.innerHTML = '';

            userOrders.forEach(order => {
                const orderElement = document.createElement('div');
                orderElement.className = 'flex justify-between align-center';
                orderElement.style.cssText = 'background: rgba(72, 52, 212, 0.1); border-radius: 16px; padding: 1.5rem; border: 2px solid rgba(139, 92, 246, 0.2); transition: all 0.3s ease;';
                
                orderElement.innerHTML = `
                    <div style="flex: 1;">
                        <h4 style="font-weight: bold; color: var(--gray-800); font-size: 1.125rem; margin-bottom: 0.5rem;">${order.productName}</h4>
                        <p style="color: var(--gray-600); margin-bottom: 0.5rem;">Quantity: ${order.quantity} • Price: ₹${order.price.toLocaleString('en-IN')}</p>
                        <p style="font-size: 0.875rem; color: var(--gray-500);">Order Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div class="flex align-center" style="gap: 1rem;">
                        <span style="padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.875rem; font-weight: bold; ${order.status === 'pending' ? 'background: var(--warning-gradient); color: var(--white);' : 'background: var(--success-gradient); color: var(--white);'}">${order.status.toUpperCase()}</span>
                        <button class="delete-order" data-order-id="${order.__backendId}" style="background: #f56565; color: var(--white); padding: 12px; border-radius: 12px; border: none; cursor: pointer; transition: all 0.3s ease;">🗑️</button>
                    </div>
                `;

                orderElement.querySelector('.delete-order').addEventListener('click', async () => {
                    const result = await window.dataSdk.delete(order);
                    if (result.isOk) {
                        showNotification('Order removed successfully! 🗑️', 'success');
                    }
                });

                container.appendChild(orderElement);
            });
        }

        function renderWishlist() {
            const container = document.getElementById('wishlist-items');
            const noWishlist = document.getElementById('no-wishlist');
            const userWishlist = storedData.filter(item => item.type === 'wishlist' && item.userId === currentUser.email);

            if (userWishlist.length === 0) {
                container.classList.add('hidden');
                noWishlist.classList.remove('hidden');
                return;
            }

            container.classList.remove('hidden');
            noWishlist.classList.add('hidden');
            container.innerHTML = '';

            userWishlist.forEach(item => {
                const product = sampleProducts.find(p => p.id.toString() === item.productId);
                if (!product) return;

                const wishlistElement = document.createElement('div');
                wishlistElement.className = 'bg-white rounded-2xl shadow-xl';
                wishlistElement.style.cssText = 'padding: 1.5rem; border: 2px solid rgba(236, 72, 153, 0.2); transition: all 0.3s ease;';
                
                wishlistElement.innerHTML = `
                    <div style="aspect-ratio: 1; overflow: hidden; border-radius: 12px; margin-bottom: 1rem;">
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="width: 100%; height: 100%; background: var(--rainbow-gradient); display: none; align-items: center; justify-content: center; font-size: 2.5rem; color: var(--white);">📦</div>
                    </div>
                    <h4 style="font-weight: bold; color: var(--gray-800); margin-bottom: 0.5rem; font-size: 1.125rem;">${item.productName}</h4>
                    <p style="font-size: 1.5rem; font-weight: bold; background: var(--primary-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem;">₹${item.price.toLocaleString('en-IN')}</p>
                    <div class="flex" style="gap: 8px;">
                        <button class="move-to-cart" data-product='${JSON.stringify(product)}' style="background: var(--primary-gradient); color: var(--white); padding: 12px 16px; border-radius: 12px; font-size: 0.875rem; font-weight: bold; flex: 1; border: none; cursor: pointer; transition: all 0.3s ease;">Add to Cart 🛒</button>
                        <button class="remove-wishlist" data-item-id="${item.__backendId}" style="background: #f56565; color: var(--white); padding: 12px; border-radius: 12px; border: none; cursor: pointer; transition: all 0.3s ease;">🗑️</button>
                    </div>
                `;

                wishlistElement.querySelector('.move-to-cart').addEventListener('click', async (e) => {
                    const productData = JSON.parse(e.target.dataset.product);
                    await addToCart(productData);
                });

                wishlistElement.querySelector('.remove-wishlist').addEventListener('click', async () => {
                    const result = await window.dataSdk.delete(item);
                    if (result.isOk) {
                        showNotification('Item removed from wishlist! 💔', 'success');
                    }
                });

                container.appendChild(wishlistElement);
            });
        }

        function renderReviews() {
            const container = document.getElementById('reviews-list');
            const noReviews = document.getElementById('no-reviews');
            const userReviews = storedData.filter(item => item.type === 'review' && item.userId === currentUser.email);

            if (userReviews.length === 0) {
                container.classList.add('hidden');
                noReviews.classList.remove('hidden');
                return;
            }

            container.classList.remove('hidden');
            noReviews.classList.add('hidden');
            container.innerHTML = '';

            userReviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.style.cssText = 'background: rgba(16, 185, 129, 0.1); border-radius: 16px; padding: 1.5rem; border: 2px solid rgba(34, 197, 94, 0.2); transition: all 0.3s ease;';
                
                reviewElement.innerHTML = `
                    <div class="flex justify-between align-center" style="margin-bottom: 1rem;">
                        <h4 style="font-weight: bold; color: var(--gray-800); font-size: 1.125rem;">${review.productName}</h4>
                        <div class="star-rating" style="font-size: 1.125rem;">
                            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                        </div>
                    </div>
                    <p style="color: var(--gray-600); margin-bottom: 0.75rem; font-size: 1.125rem; line-height: 1.7;">${review.comment}</p>
                    <p style="font-size: 0.875rem; color: var(--gray-500); font-weight: 600;">Reviewed on ${new Date(review.createdAt).toLocaleDateString()}</p>
                `;

                container.appendChild(reviewElement);
            });
        }

        function renderSupportTickets() {
            const container = document.getElementById('support-tickets');
            const supportTickets = storedData.filter(item => item.type === 'contact');

            container.innerHTML = '';

            if (supportTickets.length === 0) {
                container.innerHTML = '<div class="text-center" style="padding: 2rem 0;"><div style="font-size: 4rem; margin-bottom: 1rem; animation: pulse 2s infinite;">🎫</div><p style="color: var(--gray-500); font-size: 1.25rem; font-weight: 600;">No support tickets found.</p></div>';
                return;
            }

            supportTickets.forEach(ticket => {
                const ticketElement = document.createElement('div');
                ticketElement.style.cssText = 'background: rgba(251, 191, 36, 0.1); border-radius: 16px; padding: 1.5rem; border: 2px solid rgba(245, 158, 11, 0.2); transition: all 0.3s ease;';
                
                ticketElement.innerHTML = `
                    <div class="flex justify-between align-center" style="margin-bottom: 0.75rem;">
                        <h4 style="font-weight: bold; color: var(--gray-800); font-size: 1.125rem;">${ticket.subject}</h4>
                        <span style="padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.875rem; font-weight: bold; ${ticket.status === 'pending' ? 'background: var(--warning-gradient); color: var(--white);' : 'background: var(--success-gradient); color: var(--white);'}">${ticket.status.toUpperCase()}</span>
                    </div>
                    <p style="color: var(--gray-600); margin-bottom: 0.75rem; line-height: 1.7;">${ticket.message}</p>
                    <p style="font-size: 0.875rem; color: var(--gray-500); font-weight: 600;">From: ${ticket.name} (${ticket.email})</p>
                    <p style="font-size: 0.875rem; color: var(--gray-500); font-weight: 600;">Submitted on ${new Date(ticket.createdAt).toLocaleDateString()}</p>
                `;

                container.appendChild(ticketElement);
            });
        }

        // Notification functions
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notification-text');
            
            notificationText.textContent = message;
            
            // Set color based on type
            notification.className = `notification text-white ${
                type === 'success' ? 'bg-gradient-success' : type === 'error' ? 'bg-gradient-primary' : 'bg-gradient-secondary'
            }`;
            
            notification.classList.remove('hidden');
            
            // Auto hide after 4 seconds
            setTimeout(() => {
                hideNotification();
            }, 4000);
        }

        function hideNotification() {
            document.getElementById('notification').classList.add('hidden');
        }

        // Initialize app when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeApp);
    