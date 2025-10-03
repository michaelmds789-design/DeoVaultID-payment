// --- DATA KONSTANTA ---
const AVATAR_URL = 'https://i.supaimg.com/2e874c84-c8ca-4be6-9f89-00adbcebe4f5.png';
const DANA_NUMBER = '087731994269'; 
const DANA_ICON_URL = 'https://i.supaimg.com/20819a22-ee60-49ed-bdf1-58536467f5d4.jpg'; 
const WA_ICON_URL = 'https://i.supaimg.com/a58841b8-fa21-4c3b-b219-1e8bd22080b3.jpg';
const TG_ICON_URL = 'https://i.supaimg.com/00182d53-21f3-4c3d-82cf-5b5b497f30ff.jpg';

const CONTACT_DATA = {
    'Saluran WA': { url: 'https://whatsapp.com/channel/0029VbBVqDO3rZZbiIcmEs0q', icon: WA_ICON_URL },
    'Telegram': { url: 'https://t.me/DeoVaultID', icon: TG_ICON_URL }
};

// --- VARIABEL GLOBAL ---
let currentPage;
let contentArea, themeToggle, moonIcon, sunIcon;
let backgroundMusic, playPauseBtn, playIcon, pauseIcon;
let fileUploadInput; // Variabel baru untuk input file


// --- DEFINISI TEMPLATE ---

const homeTemplate = `
    <div class="flex flex-col items-center mb-10 mt-2">
        <div class="w-24 h-24 rounded-full overflow-hidden mb-4 avatar-img">
            <img id="avatar-img" src="${AVATAR_URL}" alt="Avatar DeoVault ID" class="w-full h-full object-cover" 
                onerror="this.onerror=null; this.src='https://placehold.co/96x96/FFD700/000?text=ID';" />
        </div>
        
        <div class="profile-card p-6 rounded-3xl text-center transition duration-300">
            <h1 class="text-4xl font-extrabold text-white mb-2 transition duration-300">
                DeoVault ID
            </h1>
            <h2 class="text-xl font-semibold text-cyan-400 mb-4 transition duration-300 text-primary-neon">
                Pusat Transaksi & Informasi Resmi
            </h2>
            <p class="text-gray-400 text-sm max-w-xs mx-auto transition duration-300">
                Selamat datang di layanan premium. Pilih menu di bawah untuk memulai.
            </p>
        </div>
    </div>

    <div class="space-y-4">
        <button data-page="payment" class="neon-button w-full py-4 text-white text-lg font-semibold rounded-2xl" onclick="navigate('payment')">
            Payment Menu
        </button>
        <button data-page="contact" class="other-button w-full py-4 text-lg font-semibold rounded-2xl mt-6" onclick="navigate('contact')">
            Other Information
        </button>
    </div>
`;

const paymentTemplate = `
    <div class="content-box p-6 rounded-3xl text-center w-full transition duration-300 mb-6">
        <button class="back-button py-2 px-4 font-semibold rounded-full mb-8 shadow-md" onclick="navigate('home')">
            Kembali
        </button>

        <div class="flex flex-col items-center">
            <h1 class="text-2xl font-bold text-white mb-6 transition duration-300 text-primary-neon">Pilihan Pembayaran</h1>
            
            <h2 class="text-xl font-bold text-red-400 mb-4 transition duration-300 text-secondary-neon">E-Wallet Transfer</h2>
            
            <div class="space-y-4 w-full">
                ${createPaymentCard('DANA', DANA_NUMBER, DANA_ICON_URL)}
            </div>
        </div>
    </div>
`;

const contactTemplate = `
    <div class="content-box p-6 rounded-3xl text-center w-full transition duration-300 mb-6">
        <button class="back-button py-2 px-4 font-semibold rounded-full mb-8 shadow-md" onclick="navigate('home')">
            Kembali
        </button>

        <div class="flex flex-col items-center">
            <h1 class="text-2xl font-bold text-white mb-8 transition duration-300 text-primary-neon">Informasi dan Dukungan</h1>
            
            <div class="grid grid-cols-2 gap-4 w-full">
                ${createContactButton('Saluran WA', CONTACT_DATA['Saluran WA'].icon, CONTACT_DATA['Saluran WA'].url)}
                ${createContactButton('Telegram', CONTACT_DATA['Telegram'].icon, CONTACT_DATA['Telegram'].url)}
            </div>
        </div>
    </div>
`;

// --- FUNGSI UTILITY ---

function createPaymentCard(name, number, iconUrl) {
    const id = name.toLowerCase().replace(' ', '');

    return `
        <div class="payment-card p-4 rounded-3xl flex items-center justify-between transition duration-300">
            <div class="flex items-center">
                <img src="${iconUrl}" alt="${name} Icon" class="w-12 h-12 rounded-xl mr-4 object-cover">
                <div class="flex flex-col justify-center">
                    <p class="text-lg text-white font-semibold transition duration-300 dark-text">${name}</p>
                    <span id="${id}-number" class="text-gray-400 text-base transition duration-300">${number}</span>
                </div>
            </div>
            <button class="copy-button font-semibold transition duration-300" data-target="${id}-number" onclick="copyToClipboard(event)">
                Salin
            </button>
        </div>
    `;
}

function createContactButton(name, iconUrl, linkUrl) {
    return `
        <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="contact-button w-full flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl transition duration-300 space-y-2">
            <img src="${iconUrl}" alt="${name} Icon" class="contact-icon-img" />
            <span class="text-white text-sm font-medium transition duration-300 dark-text">${name}</span>
        </a>
    `;
}

function navigate(page) {
    currentPage = page;
    contentArea.innerHTML = getTemplate(page); 
    
    // Apply theme styles after content is loaded
    if (document.documentElement.classList.contains('light-mode')) {
        applyLightModeStyles();
    } else {
        applyDarkModeStyles();
    }
}

function getTemplate(page) {
    switch (page) {
        case 'payment':
            return paymentTemplate;
        case 'contact':
            return contactTemplate;
        case 'home':
        default:
            return homeTemplate;
    }
}

function copyToClipboard(e) {
    const button = e.currentTarget;
    const targetId = button.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    const originalText = 'Salin'; 

    if (targetElement) {
        const textToCopy = targetElement.textContent;
        button.disabled = true;

        navigator.clipboard.writeText(textToCopy).then(() => {
            button.textContent = 'Disalin'; 
            button.style.color = '#3b82f6'; // Biru untuk disalin
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.color = ''; 
                button.disabled = false;
            }, 1500);
        }).catch(err => {
            console.error('Gagal menyalin: ', err);
            button.textContent = 'Gagal!';
            button.style.color = '#ef4444'; // Merah untuk gagal
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.color = ''; 
                button.disabled = false;
            }, 1500);
        });
    }
}

// --- LOGIKA DARK/LIGHT MODE ---

function applyLightModeStyles() {
    const darkColor = '#1f2937'; 
    const accentTeal = '#06B6D4'; 
    const mediumGray = '#4b5563';

    // Apply color to dynamic text
    document.querySelectorAll('#content-area h1').forEach(el => el.style.color = darkColor);
    document.querySelectorAll('#content-area h2').forEach(el => el.style.color = accentTeal);
    
    document.querySelectorAll('.contact-button span, .payment-card p.dark-text').forEach(el => el.style.color = darkColor);
    document.querySelectorAll('.profile-card p, [id$="-number"]').forEach(el => el.style.color = mediumGray);
    
    // Apply button specific styles
    document.querySelectorAll('.copy-button').forEach(el => el.style.color = '#6b7280');
}

function applyDarkModeStyles() {
    // Clear all inline styles to return to CSS defaults (Dark Mode)
    document.querySelectorAll('#content-area *').forEach(el => el.style.color = '');
}

function toggleTheme() {
    const isLightMode = document.documentElement.classList.toggle('light-mode');
    
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

    moonIcon.classList.toggle('hidden', isLightMode);
    sunIcon.classList.toggle('hidden', !isLightMode);

    if (isLightMode) {
        applyLightModeStyles();
    } else {
        applyDarkModeStyles();
    }
}

// --- AUDIO PLAYER FUNGSI & UPLOAD BARU ---

function togglePlayPause() {
    if (backgroundMusic.paused) {
        // Cek jika lagu default tidak ada, jangan putar
        if (!backgroundMusic.currentSrc) {
            console.warn("Tidak ada sumber musik yang valid.");
            return;
        }
        backgroundMusic.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        backgroundMusic.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    
    // Hanya proses jika file dipilih dan berjenis audio
    if (file && file.type.startsWith('audio/')) {
        // 1. Hentikan pemutaran yang sedang berjalan
        if (!backgroundMusic.paused) {
            backgroundMusic.pause();
        }
        
        // 2. Buat URL objek untuk file lokal
        const fileURL = URL.createObjectURL(file);
        
        // 3. Set sumber baru ke elemen audio
        backgroundMusic.src = fileURL;
        
        // 4. Setelah sumber dimuat, putar otomatis
        backgroundMusic.load(); // Memuat sumber audio baru
        backgroundMusic.oncanplaythrough = () => {
            backgroundMusic.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            backgroundMusic.oncanplaythrough = null; // Hapus event listener agar tidak terpicu lagi
        };

        alert(`Lagu "${file.name}" berhasil diunggah dan diputar!`);
    } else if (file) {
        alert("Gagal: File yang diunggah harus berupa file audio.");
    }
}


// --- INISIALISASI ---

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi Elemen
    contentArea = document.getElementById('content-area');
    themeToggle = document.getElementById('theme-toggle');
    moonIcon = document.getElementById('moon-icon');
    sunIcon = document.getElementById('sun-icon');
    backgroundMusic = document.getElementById('background-music');
    playPauseBtn = document.getElementById('play-pause-btn');
    playIcon = document.getElementById('play-icon');
    pauseIcon = document.getElementById('pause-icon');
    fileUploadInput = document.getElementById('file-upload-input');

    // Setting volume ke nilai tetap 50%
    backgroundMusic.volume = 0.5;

    // Muat Tema Tersimpan
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
        applyLightModeStyles(); 
    } else {
        document.documentElement.classList.remove('light-mode');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
        applyDarkModeStyles();
    }
    
    // Inisialisasi Aksi
    navigate('home');
    themeToggle.addEventListener('click', toggleTheme);
    playPauseBtn.addEventListener('click', togglePlayPause);
    fileUploadInput.addEventListener('change', handleFileUpload);
});
                                      
