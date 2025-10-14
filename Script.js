// Array untuk menyimpan semua item belanja
let daftarBelanja = [];

// Fungsi untuk format angka ke mata uang Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
    }).format(angka);
}

// Fungsi utama untuk menambahkan barang ke daftar
function tambahBarang() {
    // Ambil nilai dari input form
    const namaInput = document.getElementById('nama-barang');
    const hargaInput = document.getElementById('harga-barang');
    const jumlahInput = document.getElementById('jumlah-barang');

    const nama = namaInput.value.trim();
    const harga = parseFloat(hargaInput.value);
    const jumlah = parseInt(jumlahInput.value);

    // Validasi input
    if (nama === "" || isNaN(harga) || isNaN(jumlah) || harga <= 0 || jumlah <= 0) {
        alert("Mohon masukkan nama, harga (angka positif), dan jumlah (minimal 1) yang valid.");
        return;
    }

    // Buat objek barang baru
    const barangBaru = {
        id: Date.now(), // ID unik berdasarkan timestamp
        nama: nama,
        harga: harga,
        jumlah: jumlah,
        subtotal: harga * jumlah
    };

    // Tambahkan ke array
    daftarBelanja.push(barangBaru);

    // Perbarui tampilan dan reset form
    renderDaftarBelanja();
    
    namaInput.value = '';
    hargaInput.value = '';
    jumlahInput.value = '';
    namaInput.focus();
}

// Fungsi untuk menghapus barang
function hapusBarang(idBarang) {
    // Filter array untuk menghapus barang dengan ID yang cocok
    daftarBelanja = daftarBelanja.filter(item => item.id !== idBarang);
    
    // Perbarui tampilan
    renderDaftarBelanja();
}

// Fungsi untuk memperbarui tampilan daftar belanja dan total
function renderDaftarBelanja() {
    const rincianBody = document.getElementById('rincian-belanja');
    const totalKeseluruhanElement = document.getElementById('total-keseluruhan');
    let totalBelanja = 0;

    // Bersihkan isi tabel sebelumnya
    rincianBody.innerHTML = '';

    // Iterasi melalui array daftarBelanja dan buat baris tabel
    daftarBelanja.forEach(item => {
        const row = rincianBody.insertRow();
        
        row.insertCell().textContent = item.nama;
        row.insertCell().textContent = formatRupiah(item.harga);
        row.insertCell().textContent = item.jumlah;
        row.insertCell().textContent = formatRupiah(item.subtotal);
        
        // Tombol Hapus
        const aksiCell = row.insertCell();
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Hapus';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => hapusBarang(item.id);
        aksiCell.appendChild(deleteBtn);

        // Hitung total keseluruhan
        totalBelanja += item.subtotal;
    });

    // Tampilkan total keseluruhan
    totalKeseluruhanElement.textContent = formatRupiah(totalBelanja);
}

// Jalankan fungsi render saat halaman dimuat (untuk inisialisasi)
document.addEventListener('DOMContentLoaded', renderDaftarBelanja);
