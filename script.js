// Global variables untuk menyimpan data ayat saat ini
let currentAyat = null;

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

// Fungsi untuk mendapatkan URL audio Sheikh Mishary Rasyid Al-Afasy
function getAudioUrl(surahNumber, ayahNumber) {
    // Sheikh Mishary Rasyid Al-Afasy
    return [
        `https://www.everyayah.com/data/Alafasy_128kbps/${String(surahNumber).padStart(3, '0')}${String(ayahNumber).padStart(3, '0')}.mp3`,
        `https://everyayah.com/data/Alafasy_128kbps/${String(surahNumber).padStart(3, '0')}${String(ayahNumber).padStart(3, '0')}.mp3`,
        `https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${surahNumber}:${ayahNumber}`,
        `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${surahNumber}:${ayahNumber}.mp3`
    ];
}

// Fungsi untuk update sumber audio
function updateAudioSource() {
    if (!currentAyat) return;
    
    const audioPlayer = document.getElementById('audio-player');
    const audioBtn = document.getElementById('audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    const downloadBtn = document.getElementById('download-audio-btn');
    
    // Stop audio jika sedang playing
    if (!audioPlayer.paused) {
        audioPlayer.pause();
    }
    
    // Update URL audio - ambil URL pertama dari array
    const audioUrls = getAudioUrl(currentAyat.surahNumber, currentAyat.ayahNumber);
    currentAyat.audioUrl = Array.isArray(audioUrls) ? audioUrls[0] : audioUrls;
    
    // Reset tombol
    audioIcon.textContent = '▶️';
    audioBtn.innerHTML = `<span id="audio-icon">▶️</span> Putar Audio (Sheikh Mishary Rasyid Al-Afasy)`;
    audioBtn.disabled = false;
    
    // Tampilkan tombol download
    if (downloadBtn) downloadBtn.style.display = 'inline-block';
    
    console.log(`Audio source updated to Sheikh Mishary Rasyid Al-Afasy`);
}
function toggleAudio() {
    const audioPlayer = document.getElementById('audio-player');
    const audioBtn = document.getElementById('audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    
    if (!currentAyat || !currentAyat.audioUrl) {
        alert('Audio tidak tersedia untuk ayat ini');
        return;
    }
    
    if (audioPlayer.paused) {
        // Play audio
        if (audioPlayer.src !== currentAyat.audioUrl) {
            audioPlayer.src = currentAyat.audioUrl;
        }
        
        audioPlayer.play().then(() => {
            audioIcon.textContent = '⏸️';
            audioBtn.innerHTML = `<span id="audio-icon">⏸️</span> Pause Audio`;
        }).catch(error => {
            console.error('Error playing audio:', error);
            // Coba URL alternatif
            tryAlternativeAudio();
        });
    } else {
        // Pause audio
        audioPlayer.pause();
        audioIcon.textContent = '▶️';
        audioBtn.innerHTML = `<span id="audio-icon">▶️</span> Putar Audio (Sheikh Mishary Rasyid Al-Afasy)`;
    }
}

// Fungsi untuk mencoba URL audio alternatif dengan prioritas Sheikh Mishary Rasyid Al-Afasy
function tryAlternativeAudio() {
    if (!currentAyat) return;
    
    const audioPlayer = document.getElementById('audio-player');
    const audioBtn = document.getElementById('audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    
    // Sumber audio dengan prioritas Sheikh Mishary Rasyid Al-Afasy
    const alternativeUrls = [
        // Sheikh Mishary Rasyid Al-Afasy (prioritas utama)
        `https://www.everyayah.com/data/Alafasy_128kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        `https://everyayah.com/data/Alafasy_128kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        `https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${currentAyat.surahNumber}:${currentAyat.ayahNumber}`,
        `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${currentAyat.surahNumber}:${currentAyat.ayahNumber}.mp3`,
        
        // Fallback ke qari lain
        `https://www.everyayah.com/data/Hani_Rifai_192kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        `https://everyayah.com/data/Hani_Rifai_192kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        `https://cdn.alquran.cloud/media/audio/ayah/ar.hanirifai/${currentAyat.surahNumber}:${currentAyat.ayahNumber}`,
        
        // Other reliable sources as fallback
        `https://www.everyayah.com/data/AbdurRahmaanAs-Sudaees_128kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        `https://www.everyayah.com/data/Abdullah_Al_Juhany_128kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        
        // Versi tanpa www
        `https://everyayah.com/data/Alafasy_128kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        `https://everyayah.com/data/Hani_Rifai_192kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        `https://everyayah.com/data/AbdurRahmaanAs-Sudaees_128kbps/${String(currentAyat.surahNumber).padStart(3, '0')}${String(currentAyat.ayahNumber).padStart(3, '0')}.mp3`,
        
        // alquran.cloud API
        `https://cdn.alquran.cloud/media/audio/ayah/ar.abdurrahmaansudais/${currentAyat.surahNumber}:${currentAyat.ayahNumber}`,
        `https://cdn.alquran.cloud/media/audio/ayah/ar.hanirifai/${currentAyat.surahNumber}:${currentAyat.ayahNumber}`,
    ];
    
    let currentUrlIndex = 0;
    let alertShown = false; // Flag to prevent multiple alerts
    
    audioBtn.innerHTML = `<span id="audio-icon">⏳</span> Mencoba sumber audio...`;
    
    function tryNextUrl() {
        if (currentUrlIndex >= alternativeUrls.length) {
            // Only show alert once
            if (!alertShown) {
                alert('Audio tidak dapat dimuat dari semua sumber. Silakan coba ayat lain atau coba lagi nanti.');
                alertShown = true;
            }
            audioIcon.textContent = '❌';
            audioBtn.innerHTML = `<span id="audio-icon">❌</span> Audio Tidak Tersedia`;
            // Reset setelah 3 detik
            setTimeout(() => {
                audioIcon.textContent = '▶️';
                audioBtn.innerHTML = `<span id="audio-icon">▶️</span> Putar Audio (Sheikh Mishary Rasyid Al-Afasy)`;
                audioBtn.disabled = false;
            }, 3000);
            return;
        }
        
        const currentUrl = alternativeUrls[currentUrlIndex];
        console.log(`Mencoba audio dari: ${currentUrl}`);
        
        audioPlayer.src = currentUrl;
        
        // Set timeout untuk loading yang lebih pendek
        const loadTimeout = setTimeout(() => {
            console.log(`Timeout untuk URL: ${currentUrl}`);
            currentUrlIndex++;
            tryNextUrl();
        }, 5000); // 5 detik timeout untuk memberi lebih banyak waktu
        
        // Event listeners untuk handle load dan error
        const onLoadedData = function() {
            clearTimeout(loadTimeout);
            audioPlayer.removeEventListener('loadeddata', onLoadedData);
            audioPlayer.removeEventListener('error', onError);
        };
        
        const onError = function(e) {
            clearTimeout(loadTimeout);
            audioPlayer.removeEventListener('loadeddata', onLoadedData);
            audioPlayer.removeEventListener('error', onError);
            console.log(`Error pada URL: ${currentUrl}`, e);
            currentUrlIndex++;
            tryNextUrl();
        };
        
        audioPlayer.addEventListener('loadeddata', onLoadedData, { once: true });
        audioPlayer.addEventListener('error', onError, { once: true });
        
        // Load audio source
        audioPlayer.load();
        
        audioPlayer.play().then(() => {
            clearTimeout(loadTimeout);
            audioPlayer.removeEventListener('loadeddata', onLoadedData);
            audioPlayer.removeEventListener('error', onError);
            audioIcon.textContent = '⏸️';
            audioBtn.innerHTML = `<span id="audio-icon">⏸️</span> Pause Audio`;
            console.log(`Audio berhasil dimuat dari sumber ke-${currentUrlIndex + 1}: ${currentUrl}`);
        }).catch((error) => {
            console.log(`Gagal memutar dari sumber ke-${currentUrlIndex + 1}:`, error);
            clearTimeout(loadTimeout);
            audioPlayer.removeEventListener('loadeddata', onLoadedData);
            audioPlayer.removeEventListener('error', onError);
            currentUrlIndex++;
            tryNextUrl();
        });
    }
    
    tryNextUrl();
}

// Fungsi untuk mendownload audio
function downloadAudio() {
    if (!currentAyat || !currentAyat.audioUrl) {
        alert('Audio tidak tersedia untuk ayat ini');
        return;
    }
    
    // Buat element anchor untuk download
    const link = document.createElement('a');
    link.href = currentAyat.audioUrl;
    link.download = `quran-${currentAyat.surahNumber}-${currentAyat.ayahNumber}.mp3`;
    link.style.display = 'none';
    
    // Tambahkan ke DOM, klik, dan hapus
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listeners untuk audio player
function setupAudioEvents() {
    const audioPlayer = document.getElementById('audio-player');
    const audioBtn = document.getElementById('audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    
    audioPlayer.addEventListener('ended', () => {
        audioIcon.textContent = '▶️';
        audioBtn.innerHTML = `<span id="audio-icon">▶️</span> Putar Audio`;
    });
    
    audioPlayer.addEventListener('error', (e) => {
        audioIcon.textContent = '▶️';
        audioBtn.innerHTML = `<span id="audio-icon">▶️</span> Putar Audio`;
        audioBtn.disabled = false;
        console.error('Audio error occurred:', e);
        
        // Jika terjadi error, langsung coba sumber alternatif
        if (currentAyat) {
            console.log('Mencoba sumber audio alternatif...');
            tryAlternativeAudio();
        }
    });
    
    audioPlayer.addEventListener('loadstart', () => {
        audioBtn.disabled = true;
        audioBtn.innerHTML = `<span id="audio-icon">⏳</span> Memuat...`;
    });
    
    audioPlayer.addEventListener('canplay', () => {
        audioBtn.disabled = false;
        if (audioPlayer.paused) {
            audioIcon.textContent = '▶️';
            audioBtn.innerHTML = `<span id="audio-icon">▶️</span> Putar Audio (Sheikh Mishary Rasyid Al-Afasy)`;
        }
        // Tampilkan tombol download saat audio bisa diputar
        const downloadBtn = document.getElementById('download-audio-btn');
        if (downloadBtn) downloadBtn.style.display = 'inline-block';
    });
    
    audioPlayer.addEventListener('playing', () => {
        audioBtn.disabled = false;
        audioIcon.textContent = '⏸️';
        audioBtn.innerHTML = `<span id="audio-icon">⏸️</span> Pause Audio`;
    });
    
    audioPlayer.addEventListener('pause', () => {
        audioIcon.textContent = '▶️';
        audioBtn.innerHTML = `<span id="audio-icon">▶️</span> Putar Audio`;
    });
}

// Fungsi untuk menampilkan/menyembunyikan audio controls
function showAudioControls(show) {
    const audioControls = document.getElementById('audio-controls');
    const downloadBtn = document.getElementById('download-audio-btn');
    if (show) {
        audioControls.classList.add('show');
        if (downloadBtn) downloadBtn.style.display = 'inline-block';
    } else {
        audioControls.classList.remove('show');
        if (downloadBtn) downloadBtn.style.display = 'none';
    }
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
    const audioPlayer = document.getElementById('audio-player');
    
    quoteDiv.textContent = 'Memuat...';
    surahDiv.textContent = '';
    arabicDiv.textContent = '';
    showAudioControls(false);
    
    // Stop dan reset audio jika sedang playing
    if (audioPlayer && !audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    
    // Reset currentAyat
    currentAyat = null;
    
    // Langsung gunakan API alquran.cloud karena lebih reliable
    try {
        console.log('Mencoba API alquran.cloud...');
        const surahNum = Math.floor(Math.random() * 114) + 1;
        const ayatRes = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`);
        console.log('Response status alquran.cloud surah:', ayatRes.status);
        
        // Cek apakah response berhasil
        if (!ayatRes.ok) {
            throw new Error(`HTTP error! status: ${ayatRes.status}`);
        }
        
        const ayatData = await ayatRes.json();
        console.log('Data surah dari alquran.cloud:', ayatData);
        if (ayatData && ayatData.data && ayatData.data.ayahs) {
            const ayahs = ayatData.data.ayahs;
            const ayatIdx = Math.floor(Math.random() * ayahs.length);
            const ayat = ayahs[ayatIdx];
            const transRes = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayat.numberInSurah}/id.indonesian`);
            console.log('Response status alquran.cloud terjemahan:', transRes.status);
            
            // Cek apakah response terjemahan berhasil
            if (!transRes.ok) {
                throw new Error(`HTTP error! status: ${transRes.status}`);
            }
            
            const transData = await transRes.json();
            console.log('Data terjemahan dari alquran.cloud:', transData);
            quoteDiv.textContent = transData.data.text || 'Tidak ada terjemahan.';
            arabicDiv.textContent = ayat.text;
            surahDiv.textContent = `QS. ${ayatData.data.englishName} Ayat ${ayat.numberInSurah}`;
            
            // Simpan data ayat untuk audio - gunakan Sheikh Mishary Rasyid Al-Afasy
            // Gunakan surahNum (nomor surah dari surah API) dan ayat.numberInSurah (nomor ayat dalam surah)
            const audioUrls = getAudioUrl(surahNum, ayat.numberInSurah);
            
            currentAyat = {
                surahNumber: surahNum, // Gunakan surahNum yang sudah didefinisikan
                ayahNumber: ayat.numberInSurah, // Gunakan numberInSurah dari ayat
                audioUrl: Array.isArray(audioUrls) ? audioUrls[0] : audioUrls
            };
            
            showAudioControls(true);
            return;
        } else {
            throw new Error('Data ayat tidak ditemukan');
        }
    } catch (e) {
        console.error('Error with alquran.cloud API:', e);
        quoteDiv.textContent = 'Gagal memuat quote. Silakan coba lagi. Error: ' + e.message;
        showAudioControls(false);
        return;
    }
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
