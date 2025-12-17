function renderNavbar(pathToRoot) {
    // --- 1. LOGIC DARK MODE ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // --- 2. INJECT CSS GLOBAL ---
    const style = document.createElement('style');
    let cssContent = `
        /* === NAVBAR UTAMA === */
        .navbar-custom {
            background-color: rgba(33, 37, 41, 0.95) !important;
            backdrop-filter: blur(10px);
            border-bottom: 2px solid #00bfa6;
            position: fixed; top: 0; width: 100%; z-index: 9999;
            padding: 12px 0 !important;
        }
        
        .navbar-brand { 
            color: #00bfa6 !important; font-weight: 800 !important; 
            font-size: 1.5rem !important; font-family: 'Poppins', sans-serif !important;
            text-transform: uppercase;
        }
        
        .navbar-nav .nav-link { 
            color: white !important; margin: 0 8px; font-weight: 600 !important; 
            font-size: 0.95rem !important; font-family: 'Poppins', sans-serif !important;
            transition: 0.3s; opacity: 1 !important;
        }
        .nav-link:hover { color: #00bfa6 !important; transform: translateY(-2px); }
        
        .btn-login-nav { 
            border: 2px solid #00bfa6 !important; color: #00bfa6 !important; 
            border-radius: 50px !important; padding: 6px 25px !important; font-weight: 700 !important;
        }
        .btn-login-nav:hover { background: #00bfa6 !important; color: white !important; }
        
        .theme-toggle {
            cursor: pointer; color: white; font-size: 1.2rem; margin-left: 15px; transition: 0.3s;
            background: rgba(255,255,255,0.1); width: 38px; height: 38px;
            display: flex; align-items: center; justify-content: center; border-radius: 50%;
        }
        .theme-toggle:hover { background: rgba(255,255,255,0.2); color: #00bfa6; }

        body { padding-top: 85px !important; transition: background-color 0.3s ease; }

        /* === Z-INDEX FIX === */
        .modal { z-index: 10000 !important; padding-top: 50px !important; }

        /* ================= DARK MODE SETTINGS (GLOBAL) ================= */
        
        /* 1. BACKGROUND UTAMA JADI HITAM */
        body.dark-mode, 
        body.dark-mode main,
        body.dark-mode section,
        body.dark-mode .promo-section,
        body.dark-mode .week-grid { /* Fix Background Grid Workout */
            background-color: #121212 !important;
            color: #e0e0e0 !important;
        }

        /* 2. KOTAK KONTEN JADI ABU GELAP */
        body.dark-mode .card, 
        body.dark-mode .main-card, 
        body.dark-mode .menu-card,
        body.dark-mode .tutorial-card,
        body.dark-mode .article-card,
        body.dark-mode .plan,                  
        body.dark-mode .corporate-membership,  
        body.dark-mode .benefits-trigger-section, 
        body.dark-mode .faq-container details,    
        body.dark-mode .modal-content,
        body.dark-mode .filter-bar,
        body.dark-mode .tab-details-content,
        body.dark-mode .checkout-card,
        body.dark-mode .bg-white,
        body.dark-mode .bg-light, /* Fix Background Terang di Workout */
        body.dark-mode .shadow-sm,
        body.dark-mode .summary-box,
        body.dark-mode .exercise-sidebar, /* Fix Sidebar List Latihan */
        body.dark-mode .day-column,       /* Fix Kolom Hari */
        body.dark-mode .workout-list      /* Fix List Latihan di Hari */
        {
            background-color: #1e1e1e !important;
            border-color: #333 !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
            color: #e0e0e0 !important;
        }

        /* 3. ITEM LATIHAN (LIST MAKER) */
        body.dark-mode .exercise-item,
        body.dark-mode .workout-chip {
            background-color: #2d2d2d !important;
            border-color: #444 !important;
            color: #fff !important;
        }
        body.dark-mode .exercise-item:hover,
        body.dark-mode .exercise-item.active {
            background-color: #1e1e1e !important;
            border-color: #00bfa6 !important;
        }

        /* 4. WARNA TEKS & HEADINGS (DEFAULT JADI PUTIH) */
        body.dark-mode h1, body.dark-mode h2, body.dark-mode h3, 
        body.dark-mode h4, body.dark-mode h5, body.dark-mode h6,
        body.dark-mode .section-title,
        body.dark-mode .card-title,
        body.dark-mode summary,
        body.dark-mode strong,
        body.dark-mode .page-header-title {
            color: #ffffff !important;
        }
        
        body.dark-mode p, 
        body.dark-mode .text-muted, 
        body.dark-mode .original-price,
        body.dark-mode small {
            color: #b0b0b0 !important;
        }

        /* Harga & Aksen */
        body.dark-mode .plan .price,
        body.dark-mode .text-primary,
        body.dark-mode #planPrice { 
            color: #00bfa6 !important; 
        }

        /* 5. INPUT FORM & TOMBOL OPSI */
        body.dark-mode input, 
        body.dark-mode select, 
        body.dark-mode textarea,
        body.dark-mode .form-control, /* Fix Input Bootstrap */
        body.dark-mode .form-select,
        body.dark-mode .category-btn,
        body.dark-mode .btn-option,
        body.dark-mode .payment-option,
        body.dark-mode .option-card {
            background-color: #2d2d2d !important;
            color: white !important;
            border-color: #444 !important;
        }
        
        body.dark-mode .form-control::placeholder {
            color: #888 !important;
        }

        /* 6. TOMBOL AKTIF & TABS */
        body.dark-mode .btn-option.active,
        body.dark-mode .payment-option.active,
        body.dark-mode .category-btn.active,
        body.dark-mode .nav-pills .nav-link.active {
            background-color: #1e1e1e !important;
            border-color: #00bfa6 !important;
            color: #00bfa6 !important;
            box-shadow: 0 0 15px rgba(0, 191, 166, 0.2) !important;
        }
        
        /* Fix Tabs Navigasi di Workout */
        body.dark-mode .nav-tabs .nav-link { color: #b0b0b0 !important; }
        body.dark-mode .nav-tabs .nav-link.active {
            background-color: #1e1e1e !important;
            border-color: #333 #333 #1e1e1e !important;
            color: #00bfa6 !important;
        }

        /* 7. FOOTER */
        body.dark-mode footer {
            background-color: #000000 !important;
            border-top: 1px solid #333;
            color: #888 !important;
        }
    `;

    // === FIX KHUSUS HALAMAN MAPS (SUPAYA TEKS TETAP HITAM) ===
    if (window.location.href.toLowerCase().includes('maps')) { 
        cssContent += `
            /* Paksa Judul & Teks di Maps jadi GELAP lagi */
            body.dark-mode h1, 
            body.dark-mode h2, 
            body.dark-mode h3, 
            body.dark-mode h4,
            body.dark-mode h5,
            body.dark-mode p,
            body.dark-mode i,
            body.dark-mode .fas,
            body.dark-mode strong {
                color: #212529 !important; /* Hitam/Abu Gelap */
            }
            
            /* Kecuali Navbar Icon tetap putih */
            body.dark-mode .navbar-custom i,
            body.dark-mode .btn-login-nav i,
            body.dark-mode .theme-toggle i {
                color: #ffffff !important;
            }
            body.dark-mode .navbar-custom i.text-warning { color: #ffc107 !important; }
            body.dark-mode .theme-toggle .fa-sun { color: #ffd60a !important; }

            /* Footer tetap terang */
            body.dark-mode footer p, 
            body.dark-mode footer small {
                color: #888 !important;
            }
        `;
    }

    // --- 4. PASANG CSS KE HEAD ---
    const styleElement = document.createElement('style');
    styleElement.innerHTML = cssContent;
    document.head.appendChild(styleElement);

    // --- 5. HTML NAVBAR (Link Path Workout Diperbaiki) ---
    const navHTML = `
    <nav class="navbar navbar-expand-lg navbar-custom">
        <div class="container">
            <a class="navbar-brand" href="${pathToRoot}index.html">KUSDA GYM</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon" style="filter: invert(1);"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item"><a class="nav-link" href="${pathToRoot}index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="${pathToRoot}Tips Sehat/tips.html">Tips</a></li>
                    <li class="nav-item"><a class="nav-link" href="${pathToRoot}Tutorial/tutorial.html">Tutorial</a></li>
                    <li class="nav-item"><a class="nav-link" href="${pathToRoot}Menu Sehat/menusehat.html"><i class="fas fa-lock text-warning small"></i> Resep</a></li>
                    <li class="nav-item"><a class="nav-link" href="${pathToRoot}Pembuatan List Workout/listmaker.html"><i class="fas fa-lock text-warning small"></i> Workout</a></li>
                    <li class="nav-item"><a class="nav-link" href="${pathToRoot}Maps/maps.html">Lokasi</a></li>
                    
                    <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                        <a id="navAuthBtn" class="nav-link btn-login-nav d-inline-block" href="${pathToRoot}Login-Register/loginregister.html">Login</a>
                    </li>

                    <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                        <div class="theme-toggle" onclick="toggleTheme()" title="Ganti Mode">
                            <i class="fas fa-moon" id="themeIcon"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `;

    const oldNav = document.querySelector('nav');
    if (oldNav) oldNav.remove();
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    updateAuthButton(pathToRoot);
    initThemeIcon();
}

// --- LOGIKA UPDATE TOMBOL LOGIN ---
function updateAuthButton(path) {
    const activeUser = localStorage.getItem("loggedUser");
    const btn = document.getElementById("navAuthBtn");
    
    if (activeUser && btn) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userData = users.find(u => u.name === activeUser);
        const isMember = userData && userData.isMember;

        btn.innerHTML = `<i class="fas fa-user"></i> ${activeUser.substring(0, 8)}.. ${isMember ? '👑' : ''}`;
        btn.href = "#";
        btn.onclick = (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Keluar?',
                text: "Anda akan logout dari sesi ini.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#00bfa6',
                confirmButtonText: 'Ya, Logout'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("loggedUser");
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("loginTime");
                    window.location.href = path + "index.html";
                }
            });
        };
    }
}

// --- FUNGSI DARK MODE ---
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function initThemeIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const icon = document.getElementById('themeIcon');
    if (icon) {
        if (isDark) {
            icon.className = 'fas fa-sun';
            icon.style.color = '#ffd60a';
        } else {
            icon.className = 'fas fa-moon';
            icon.style.color = 'white';
        }
    }
}