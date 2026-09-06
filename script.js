/* ==========================================
   PENGATURAN METODE PEMBAYARAN DEODAMICH
   ========================================== */
const METHODS = [
    {
        name: "GoPay",
        holder: "Deodamich Official",
        number: "087864255946",
        color: "#00AED6",
        logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2300AED6'/><circle cx='50' cy='50' r='20' fill='%23ffffff'/></svg>",
        qr: "",
        note: "Buka aplikasi Gojek, lakukan transfer sesuai dengan nomor di atas."
    },
    {
        name: "DANA",
        holder: "Deodamich Official",
        number: "087864255946",
        color: "#118EEA",
        logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23118EEA'/><text x='50%' y='62%' font-size='28' font-weight='bold' fill='white' text-anchor='middle' font-family='sans-serif'>DANA</text></svg>",
        qr: "",
        note: "Gunakan fitur Kirim di aplikasi DANA menuju nomor yang tertera."
    },
    {
        name: "QRIS",
        holder: "Deodamich Official",
        number: "",
        color: "#E4002B",
        logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23E4002B'/><text x='50%' y='62%' font-size='24' font-weight='bold' fill='white' text-anchor='middle' font-family='sans-serif'>QRIS</text></svg>",
        qr: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=DEODAMICH_QRIS_DEMO",
        note: "Pindai QR ini menggunakan m-Banking atau aplikasi e-Wallet pilihan Anda."
    }
];
/* ========================================== */

const ICON_COPY = `<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const ICON_CHECK = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;

const listContainer = document.getElementById('methods-list');
const overlay = document.getElementById('overlay');
const sheet = document.getElementById('sheet');
const btnClose = document.getElementById('btn-close');
const btnAction = document.getElementById('btn-action');
const btnIcon = document.getElementById('btn-icon');
const btnText = document.getElementById('btn-text');
const toast = document.getElementById('toast');

function render() {
    if (!listContainer) return;
    listContainer.innerHTML = '';
    METHODS.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'card';
        el.onclick = () => openSheet(index);
        
        const label = item.number ? 'Bayar Via No. HP' : 'Scan Kode QR';
        
        el.innerHTML = `
            <div class="card-left">
                <div class="icon-box">
                    <img src="${item.logo}" alt="${item.name}">
                </div>
                <div>
                    <div class="card-title">${item.name}</div>
                    <div class="card-subtitle">${label}</div>
                </div>
            </div>
            <div class="action-tag" style="--brand-color: ${item.color}">Pilih</div>
        `;
        listContainer.appendChild(el);
    });
}

function openSheet(index) {
    const data = METHODS[index];
    
    sheet.style.setProperty('--brand-color', data.color);
    document.getElementById('sheet-logo').src = data.logo;
    document.getElementById('sheet-title').textContent = data.name;
    document.getElementById('sheet-holder').textContent = data.holder;
    document.getElementById('sheet-note').textContent = data.note;

    const numDisplay = document.getElementById('sheet-number');
    const qrDisplay = document.getElementById('sheet-qr-box');
    const qrImg = document.getElementById('sheet-qr-img');

    btnAction.className = 'btn-primary';

    if (data.number) {
        numDisplay.style.display = 'block';
        qrDisplay.style.display = 'none';
        numDisplay.textContent = data.number;

        btnIcon.innerHTML = ICON_COPY;
        btnText.textContent = 'Salin Nomor';
        btnAction.onclick = () => copyText(data.number);
    } else if (data.qr) {
        numDisplay.style.display = 'none';
        qrDisplay.style.display = 'block';
        qrImg.src = data.qr;

        btnIcon.innerHTML = ICON_DOWNLOAD;
        btnText.textContent = 'Simpan QR';
        btnAction.onclick = () => downloadImage(data.qr, `${data.name}_QR.png`);
    }

    overlay.classList.add('active');
    sheet.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSheet() {
    overlay.classList.remove('active');
    sheet.classList.remove('active');
    document.body.style.overflow = '';
}

function copyText(val) {
    const clean = val.replace(/[-\s]/g, '');
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(clean).then(onCopySuccess);
    } else {
        const ta = document.createElement('textarea');
        ta.value = clean;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        onCopySuccess();
    }
}

function onCopySuccess() {
    btnAction.classList.add('copied');
    btnIcon.innerHTML = ICON_CHECK;
    btnText.textContent = 'Tersalin!';
    showToast('Nomor berhasil disalin ke clipboard');

    setTimeout(() => {
        btnAction.classList.remove('copied');
        btnIcon.innerHTML = ICON_COPY;
        btnText.textContent = 'Salin Nomor';
    }, 2000);
}

function downloadImage(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Mengunduh QR...');
}

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

btnClose.onclick = closeSheet;
overlay.onclick = closeSheet;
document.onkeydown = (e) => { if (e.key === 'Escape') closeSheet(); };

render();