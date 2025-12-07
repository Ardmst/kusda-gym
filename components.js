function renderNavbar(pathToRoot) {
    // 1. INJECT CSS GLOBAL (Sentralisasi Style di sini)
    const style = document.createElement('style');
    style.innerHTML = `
        /* NAVBAR STYLE GLOBAL */
        .navbar {
            background-color: rgba(33, 37, 41, 0.95) !important;
            backdrop-filter: blur(10px);
            border-bottom: 2px solid #00bfa6;
        }
        .navbar-brand { 
            font-weight: 700; font-size: 1.5rem; letter-spacing: 1px; color: #00bfa6 !important; 
        }
        
        /* Style Link (Diambil dari referensi Menu Sehat) */
        .navbar-nav .nav-link {
            transition: all 0.3s ease;
            padding: 10px 15px;
            color: #ffffff !important;
            font-weight: 700;
        }
        .navbar-nav .nav-link:hover, .navbar-nav .nav-link.active {
            color: #00bfa6 !important; /* var(--primary-teal) */
            transform: translateY(-2px);
        }

        /* TOMBOL LOGIN DEFAULT */
        #navLoginBtn {
            border: 2px solid #00bfa6;
            color: #00bfa6 !important;
            background: transparent;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex; align-items: center; justify-content: center; gap: 5px;
        }
        #navLoginBtn:hover {
            background: #00bfa6 !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);

    // 2. DETEKSI HALAMAN AKTIF
    const path = window.location.pathname;
    const page = path.split("/").pop();
    // Logic active state sederhana
    const activeHome = (page === "index.html" || page === "") ? "active" : "";
    const activeWorkout = (page.includes("listmaker.html")) ? "active" : "";
    const activeLokasi = (page.includes("maps.html")) ? "active" : "";

    // 3. RENDER HTML NAVBAR
    const navHTML = `
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="${pathToRoot}index.html">
                <i class="fas fa-dumbbell me-2"></i>KUSDA GYM
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center gap-3 small text-uppercase">
                    <li class="nav-item">
                        <a class="nav-link ${activeHome}" href="${pathToRoot}index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${activeWorkout}" href="${pathToRoot}Pembuatan List Workout/listmaker.html">Workout Plan</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${activeLokasi}" href="${pathToRoot}Maps/maps.html">Lokasi</a>
                    </li>
                    <li class="nav-item ms-lg-3">
                        <a id="navLoginBtn" href="${pathToRoot}Login-Register/loginregister.html" class="btn btn-sm rounded-pill px-4 py-2 fw-bold">
                            Login / Join
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `;

    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 4. LOGIKA LOGIN & MEMBER (Global Logic)
    const user = localStorage.getItem("loggedUser");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = users.find(u => u.name === user);
    const loginBtn = document.getElementById('navLoginBtn');

    if (user && loginBtn) {
        let badge = "";
        if (userData && userData.isMember) {
            badge = `<span class="badge bg-warning text-dark ms-2" style="font-size:0.65rem; vertical-align:text-top;">MEMBER</span>`;
        }
        // Tampilan saat sudah login
        loginBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${user} ${badge}`;
        // Pastikan style override saat login juga konsisten
        loginBtn.style.borderColor = "#00bfa6";
        
        loginBtn.onclick = function(e) {
            e.preventDefault();
            if(confirm(`Halo ${user}, yakin ingin logout?`)) {
                localStorage.removeItem("loggedUser");
                window.location.reload(); 
            }
        };
    }
}