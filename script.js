document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('loginPage');
    const mainContent = document.getElementById('mainContent');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const uploadForm = document.getElementById('uploadForm');
    const productGrid = document.getElementById('productGrid');
    const userDisplay = document.getElementById('userDisplay');

    // 1. LOGIKA LOGIN Sederhana
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        
        // Simpan "session" di LocalStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user);

        showMainPage(user);
    });

    // 2. LOGIKA LOGOUT
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        location.reload(); // Refresh ke halaman login
    });

    function showMainPage(name) {
        loginPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        userDisplay.innerText = name;
    }

    // Cek Session saat refresh
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showMainPage(localStorage.getItem('username'));
    }

    // 3. LOGIKA PENJUAL (UPLOAD PRODUK)
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('prodName').value;
        const cat = document.getElementById('prodCategory').value;
        const price = document.getElementById('prodPrice').value;
        const fileInput = document.getElementById('prodImage');

        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const imgUrl = event.target.result;
                
                // Tambah produk baru ke sisi Pembeli
                const newCard = document.createElement('div');
                newCard.className = 'card p-4 animate-in';
                newCard.innerHTML = `
                    <div class="h-40 bg-gray-100 mb-4 rounded overflow-hidden">
                        <img src="${imgUrl}" class="w-full h-full object-cover">
                    </div>
                    <h3 class="font-bold">${name}</h3>
                    <p class="text-xs text-gray-500">${cat}</p>
                    <p class="price">Rp ${parseInt(price).toLocaleString('id-ID')}</p>
                    <button class="buy-btn">Beli via QRIS</button>
                `;
                
                productGrid.prepend(newCard);
                alert('Produk Anda sudah live di katalog pembeli!');
                uploadForm.reset();
            };
            
            reader.readAsDataURL(fileInput.files[0]);
        }
    });
});
