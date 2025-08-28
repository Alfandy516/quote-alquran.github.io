// Fungsi salin teks quote dan arabic ke clipboard
function salinQuote() {
    const arabic = document.getElementById('arabic').textContent;
    const quote = document.getElementById('quote').textContent;
    const surah = document.getElementById('surah').textContent;
    const text = `${arabic}\n\n"${quote}"\n\n${surah}`;
    navigator.clipboard.writeText(text).then(() => {
        // Optional: tampilkan notifikasi sukses
        alert('Teks quote berhasil disalin!');
    });
}
// Fungsi generate gambar Instagram 4:5 dan tampilkan di modal popup
function generateImage() {
    const quote = document.getElementById('quote').textContent;
    const arabic = document.getElementById('arabic').textContent;
    const surah = document.getElementById('surah').textContent;
    const canvas = document.getElementById('ig-canvas');
    const ctx = canvas.getContext('2d');
    // Background random
    const bgColors = [
        '#f4f6f8', '#fceabb', '#e0c3fc', '#f9f9f9', '#e0f7fa', '#ffe0e9', '#e0f2fe', '#e0ffe0', '#fffde4', '#f3e7e9',
        '#f7ffea', '#e0eafc', '#f9fbe7', '#e0f2f1', '#f3e5f5', '#e1f5fe', '#fff3e0', '#f1f8e9', '#fbe9e7', '#e8f5e9'
    ];
    const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Card
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#219150';
    ctx.lineWidth = 6;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(60, 80, canvas.width-120, canvas.height-200, 48);
    else ctx.rect(60, 80, canvas.width-120, canvas.height-200);
    ctx.fill();
    ctx.stroke();
    // Centering text vertically
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // --- Center all content vertically in the card ---
    // Prepare font sizes and line heights
    const cardTop = 80;
    const cardHeight = canvas.height - 200;
    const cardBottom = cardTop + cardHeight;
    // Measure wrapped text heights
    ctx.font = 'bold 54px Amiri, serif';
    const arabicLines = getWrappedLines(ctx, arabic, canvas.width-220, 'rtl');
    const arabicHeight = arabicLines.length * 64;
    ctx.font = 'italic 38px Segoe UI, Arial, sans-serif';
    const quoteLines = getWrappedLines(ctx, '"' + quote + '"', canvas.width-220, 'ltr');
    const quoteHeight = quoteLines.length * 48;
    ctx.font = 'bold 32px Segoe UI, Arial, sans-serif';
    const surahHeight = 40;
    // Total content height + spacing
    const spacing = 36;
    const totalContentHeight = arabicHeight + quoteHeight + surahHeight + 2*spacing;
    let y = cardTop + (cardHeight - totalContentHeight)/2 + arabicHeight/2;
    // Draw arabic
    ctx.font = 'bold 54px Amiri, serif';
    ctx.fillStyle = '#1a5d3b';
    wrapText(ctx, arabic, canvas.width/2, y, canvas.width-220, 64, 'rtl', 'middle');
    y += arabicHeight/2 + spacing + quoteHeight/2;
    // Draw quote
    ctx.font = 'italic 38px Segoe UI, Arial, sans-serif';
    ctx.fillStyle = '#222';
    wrapText(ctx, '"' + quote + '"', canvas.width/2, y, canvas.width-220, 48, 'ltr', 'middle');
    y += quoteHeight/2 + spacing + surahHeight/2;
    // Draw surah
    ctx.font = 'bold 32px Segoe UI, Arial, sans-serif';
    ctx.fillStyle = '#219150';
    ctx.fillText(surah, canvas.width/2, y);
    // Footer
    ctx.font = '24px Segoe UI, Arial, sans-serif';
    ctx.fillStyle = '#aaa';
    ctx.fillText('quote-alquran | equran.id & alquran.cloud', canvas.width/2, canvas.height-60);

    // --- Helper for wrapped lines ---
    function getWrappedLines(ctx, text, maxWidth, direction) {
        if (!text) return [];
        const words = direction === 'rtl' ? text.split(' ') : text.split(' ');
        let lines = [];
        let line = '';
        for (let n = 0; n < words.length; n++) {
            let testLine = line ? line + ' ' + words[n] : words[n];
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines.push(line);
                line = words[n];
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        return lines;
    }

    // Tampilkan gambar di modal popup secara otomatis
    const dataUrl = canvas.toDataURL('image/png');
    const modalImg = document.getElementById('modal-img');
    if (modalImg) modalImg.src = dataUrl;
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('active');

    // Tampilkan tombol download di modal
    const link = document.getElementById('download-link');
    link.href = dataUrl;
    link.style.display = 'block';
    link.textContent = 'Download Gambar';
}

// Tampilkan modal popup gambar (jika ingin manual)
function showModal() {
    const overlay = document.getElementById('modal-overlay');
    const modalImg = document.getElementById('modal-img');
    const previewImg = document.getElementById('preview-img');
    if (overlay && modalImg && previewImg) {
        modalImg.src = previewImg.src;
        overlay.classList.add('active');
    }
}

// Tutup modal popup gambar
function closeModal(e) {
    // Hanya tutup jika klik di overlay atau tombol
    if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) overlay.classList.remove('active');
    }
}
async function getQuote() {
    const quoteDiv = document.getElementById('quote');
    const surahDiv = document.getElementById('surah');
    const arabicDiv = document.getElementById('arabic');
    quoteDiv.textContent = 'Memuat...';
    surahDiv.textContent = '';
    arabicDiv.textContent = '';
    // Coba API equran.id lebih dulu, fallback ke alquran.cloud jika gagal
    try {
        const res = await fetch('https://api.equran.id/api/v2/ayat/acak');
        const data = await res.json();
        if (data && data.data) {
            const ayat = data.data;
            quoteDiv.textContent = ayat.teksIndonesia;
            arabicDiv.textContent = ayat.teksArab;
            surahDiv.textContent = `QS. ${ayat.surah.namaLatin} Ayat ${ayat.nomor}`;
            return;
        }
    } catch (e) {}
    // Fallback: API alquran.cloud
    try {
        const surahNum = Math.floor(Math.random() * 114) + 1;
        const ayatRes = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`);
        const ayatData = await ayatRes.json();
        if (ayatData && ayatData.data && ayatData.data.ayahs) {
            const ayahs = ayatData.data.ayahs;
            const ayatIdx = Math.floor(Math.random() * ayahs.length);
            const ayat = ayahs[ayatIdx];
            const transRes = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayat.numberInSurah}/id.indonesian`);
            const transData = await transRes.json();
            quoteDiv.textContent = transData.data.text || 'Tidak ada terjemahan.';
            arabicDiv.textContent = ayat.text;
            surahDiv.textContent = `QS. ${ayatData.data.englishName} Ayat ${ayat.numberInSurah}`;
            return;
        }
    } catch (e) {}
    quoteDiv.textContent = 'Gagal memuat quote. Silakan coba lagi.';
}

// Fungsi wrapText untuk membungkus teks panjang di canvas
function wrapText(ctx, text, x, y, maxWidth, lineHeight, direction = 'ltr', baseline = 'alphabetic') {
    if (!text) return;
    ctx.save();
    if (direction === 'rtl') ctx.direction = 'rtl';
    else ctx.direction = 'ltr';
    ctx.textBaseline = baseline;
    const words = text.split(' ');
    let line = '';
    let testLine = '';
    let lines = [];
    for (let n = 0; n < words.length; n++) {
        testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    // Hitung offset agar blok teks benar-benar di tengah jika multiline
    let totalHeight = lines.length * lineHeight;
    let startY = y - totalHeight/2 + lineHeight/2;
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i].trim(), x, startY + i * lineHeight);
    }
    ctx.restore();
}
