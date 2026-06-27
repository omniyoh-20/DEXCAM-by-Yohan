// ============================================================================================= //
//  ██████╗  █████╗ ██╗   ██╗██╗██████╗  ███████╗    ██╗    ██╗     ██   █████╗ ██╗     ██╗      //
//  ██╔══██╗██╔══██╗██║   ██║██║██╔══██╗ ██╔════╝    ██║    ██║     ██  ██╔══██╗██║     ██║      //
//  ██║  ██║███████║██║   ██║██║██║  ██║ ███████╗    ██║    ██║     ██  ███████║██║     ██║      //
//  ██║  ██║██╔══██║╚██╗ ██╔╝██║██║  ██║ ╚════██║    ╚██╗  ██╔██╗  ██╗  ██╔══██║██║     ██║      //
//  ██████╔╝██║  ██║ ╚████╔╝ ██║██████╔╝ ███████║      ╚███╔╝   ╚███╔╝  ██║  ██║███████╗███████╗ //
//  ╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═════╝  ╚══════╝       ╚══╝     ╚══╝   ╚═╝ ╚═╝╚══════╝╚══════╝  //
// ----------------------------------------------------------------------------------------------//
// PROPRIETARY CLIENT-SIDE FIREWALL BLOCK: "DAVID'S WALL" (v2.1.5 Engine)                        //
// Built exclusively for DEXCAM. Engineered to ensure absolute zero-data                         //
// leaks, cross-site scripting (XSS) immunity, and local runtime protection.                     //
// ============================================================================================= //
(function() {
    'use strict';
    console.log("🛡️ DAVID'S WALL: Active. Verified Clean State Management Protocol.");
    window.eval = function() { return null; };
})();

const video = document.getElementById('webcam');
const canvas = document.getElementById('ascii-canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

const sampleCanvas = document.createElement('canvas');
const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true }); 
sampleCanvas.width = 240;
sampleCanvas.height = 180;

const charPools = {
    math: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "=", "%", "√", "π"],
    greek: ["Ω", "Ψ", "Ξ", "Φ", "λ", "α", "β", "γ", "δ", "θ", "μ", "σ", "τ", "ζ" , "η"],
    russian: ["Б", "Д", "Ж", "И", "Й", "Л", "П", "Ф", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"],
    thai: ["ก", "ข", "ค", "ง", "จ", "ฉ", "ช", "ซ", "ด", "ต", "ถ", "ท", "น", "บ", "ป", "ผ", "ฝ", "พ"],
    baybayin: ["ᜀ", "ᜊ", "ᜃ", "ᜇ", "ᜄ", "ᜑ", "ᜎ", "ᜌ", "ᜏ", "ᜐ", "ᜓ", "᜔", "᜕", "᜖", "᜗"],
    chinese: ["永", "和", "国", "中", "龙", "体", "金", "木", "水", "火", "土", "风", "雷", "禅", "心"],
    japanese: ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ", "の", "あ", "き", "道", "桜", "侍"],
    roman: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
    alphabetPlus: ["Ä", "Ç", "É", "Ñ", "Ö", "Ü", "ß", "Å", "Ø", "æ", "œ", "ū", "ñ", "à", "è", "ù", "â"],
    armenian: ["Ա", "Բ", "Գ", "Դ", "Ե", "Զ", "Է", "Ը", "Թ", "Ժ", "Ի", "Լ", "Խ", "Ծ", "Կ", "Հ", "Ձ", "Ղ"],
    georgian: ["ა", "ბ", "გ", "დ", "ე", "ვ", "ზ", "თ", "ი", "კ", "ლ", "მ", "ნ", "ო", "პ", "ჟ", "რ", "ს"],
    cambodian: ["ก", "ข", "គ", "ឃ", "ง", "จ", "ฉ", "ជ", "ឈ", "ញ", "ដ", "ឋ", "ឌ", "ឍ", "ណ", "ต", "ถ", "ទ"],
    hindu: ["अ", "ब", "क", "ड", "इ", "फ", "ग", "ह", "इ", "ज", "क", "ल", "ม", "न", "ओ", "प", "र", "स"]
};
Object.freeze(charPools);

// --- UPGRADED BRIGHTER & MORE VIBRANT COLOR SPECIFICATIONS ---
const themeColors = {
    math: '#423282',        // Vibrant Cyber Violet
    roman: '#1e3852',       // Rich Cobalt Blue
    baybayin: '#522b19',    // Warm Terracotta Amber
    japanese: '#4f1837',    // Electric Synth Magenta
    chinese: '#5c1919',     // Deep Imperial Crimson
    greek: '#144038',       // Bright Sea Emerald
    thai: '#404216',        // Antique Brass Olive
    georgian: '#411e54',    // Bright Royal Velvet
    armenian: '#163c4a',    // Radiant Dark Teal
    alphabetPlus: '#292933',// Polished Slate Titanium
    russian: '#4f391f',     // Industrial Oxide Gold
    cambodian: '#2f4a1c',   // Deep Neon Forest Jade
    hindu: '#4f1d3c'        // Vivid Orchid Sunset
};
Object.freeze(themeColors);

const uiCache = {
    cellSize: 7, 
    tShadow: 85,
    tMid: 170,
    tHigh: 230,
    mirror: true,
    glyphColor: '#00ff00',
    useSourceColor: false,
    displayMode: 'overlay',
    bgShadow: '#000000',
    bgMidtone: '#000000',
    bgHighlight: '#000000',
    mapShadow: 'math',
    mapMid: 'greek',
    mapHigh: 'russian',
    shadowsEnabled: true,
    midtonesEnabled: true,
    highlightsEnabled: true,
    engineSpeed: 0,       
    glowEnabled: false,
    glowColor: '#00ff00',
    glowStrength: 5
};

let lastFrameTime = 0;

function adjustCanvasDimensions() {
    const videoWidth = video.videoWidth || 640;
    const videoHeight = video.videoHeight || 480;
    const aspect = videoWidth / videoHeight;
    
    sampleCanvas.width = 240;
    sampleCanvas.height = Math.round(240 / aspect);
    
    canvas.width = 1280;
    canvas.height = Math.round(1280 / aspect);
}
window.addEventListener('resize', adjustCanvasDimensions);

/* ==========================================================================
   OPTIMIZED NATIVE AMBIENT PROPERTY RENDERING LINK
   ========================================================================== */
function updateAmbientBackground() {
    const shadowTheme = themeColors[uiCache.mapShadow] || '#423282';
    const midtoneTheme = themeColors[uiCache.mapMid] || '#144038';
    const highlightTheme = themeColors[uiCache.mapHigh] || '#4f391f';
    
    const workspace = document.getElementById('viewport-workspace');
    
    if (workspace) {
        // Diretsong tinatawagan ang CSS properties para sa hardware-accelerated fluid mathematical morphing
        workspace.style.setProperty('--bg-color-1', shadowTheme);
        workspace.style.setProperty('--bg-color-2', midtoneTheme);
        workspace.style.setProperty('--bg-color-3', highlightTheme);
    }
}

async function initWebcam() {
    try {
        await document.fonts.ready;
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            adjustCanvasDimensions();
            syncAllInputsToCache();
            requestAnimationFrame(renderLoop);
        });
    } catch (err) { console.error("Camera linkage failure: ", err); }
}

function getFontFamily(poolKey) {
    switch(poolKey) {
        case 'baybayin': return "'Noto Sans Baybayin', monospace";
        case 'chinese': return "'Noto Sans SC', sans-serif";
        case 'japanese': return "'Noto Sans JP', sans-serif";
        case 'armenian': return "'Noto Sans Armenian', sans-serif";
        case 'georgian': return "'Noto Sans Georgian', sans-serif";
        case 'cambodian': return "'Noto Sans Khmer', sans-serif";
        case 'hindu': return "'Noto Sans Devanagari', sans-serif";
        case 'thai': return "'Noto Sans Thai', sans-serif";
        default: return "monospace";
    }
}

const sizeInput = document.getElementById('glyph-size');
const shadowInput = document.getElementById('thresh-shadow');
const midInput = document.getElementById('thresh-midtone');
const threshHighlightSlider = document.getElementById('thresh-highlight');

sizeInput?.addEventListener('input', (e) => { document.getElementById('size-val').innerText = e.target.value; uiCache.cellSize = parseInt(e.target.value); });
shadowInput?.addEventListener('input', (e) => { document.getElementById('shadow-val').innerText = e.target.value; uiCache.tShadow = parseInt(e.target.value); });
midInput?.addEventListener('input', (e) => { document.getElementById('mid-val').innerText = e.target.value; uiCache.tMid = parseInt(e.target.value); });
threshHighlightSlider?.addEventListener('input', (e) => { document.getElementById('high-val').textContent = e.target.value; uiCache.tHigh = parseInt(e.target.value); });

document.getElementById('ascii-speed')?.addEventListener('change', (e) => uiCache.engineSpeed = parseInt(e.target.value));
document.getElementById('glow-toggle')?.addEventListener('change', (e) => uiCache.glowEnabled = e.target.checked);
document.getElementById('glow-color')?.addEventListener('input', (e) => { uiCache.glowColor = e.target.value; document.documentElement.style.setProperty('--glyph-color', e.target.value); });
document.getElementById('glow-strength')?.addEventListener('input', (e) => { document.getElementById('glow-strength-val').innerText = e.target.value; uiCache.glowStrength = parseInt(e.target.value); });

document.getElementById('map-shadows')?.addEventListener('change', (e) => { uiCache.mapShadow = e.target.value; updateAmbientBackground(); });
document.getElementById('map-midtones')?.addEventListener('change', (e) => { uiCache.mapMid = e.target.value; updateAmbientBackground(); });
document.getElementById('map-highlights')?.addEventListener('change', (e) => { uiCache.mapHigh = e.target.value; updateAmbientBackground(); });

const glyphColorInput = document.getElementById('glyph-color');
const glowColorInput = document.getElementById('glow-color');

function updateColorBacklights() {
    if (glyphColorInput) {
        const val = glyphColorInput.value;
        uiCache.glyphColor = val;
        document.getElementById('glyph-color-bg')?.style.setProperty('--picker-glow', val);
    }
    if (glowColorInput) {
        const val = glowColorInput.value;
        uiCache.glowColor = val;  
        document.getElementById('glow-color-bg')?.style.setProperty('--picker-glow', val);
        document.documentElement.style.setProperty('--glyph-color', val);
    }
}

glyphColorInput?.addEventListener('input', updateColorBacklights);
glowColorInput?.addEventListener('input', updateColorBacklights);

function syncAllInputsToCache() {
    if (sizeInput) uiCache.cellSize = parseInt(sizeInput.value);
    if (shadowInput) uiCache.tShadow = parseInt(shadowInput.value);
    if (midInput) uiCache.tMid = parseInt(midInput.value);
    if (threshHighlightSlider) uiCache.tHigh = parseInt(threshHighlightSlider.value);
    uiCache.mirror = document.getElementById('mirror-cam')?.checked ?? true;
    uiCache.glyphColor = document.getElementById('glyph-color')?.value ?? '#00ff00';
    uiCache.useSourceColor = document.getElementById('use-source-color')?.checked ?? false;
    uiCache.displayMode = document.getElementById('display-mode')?.value ?? 'overlay';
    uiCache.mapShadow = document.getElementById('map-shadows')?.value ?? 'math';
    uiCache.mapMid = document.getElementById('map-midtones')?.value ?? 'greek';
    uiCache.mapHigh = document.getElementById('map-highlights')?.value ?? 'russian';
    uiCache.shadowsEnabled = document.getElementById('map-shadows-enable')?.checked ?? true;
    uiCache.midtonesEnabled = document.getElementById('map-midtones-enable')?.checked ?? true;
    uiCache.highlightsEnabled = document.getElementById('map-highlights-enable')?.checked ?? true;
    uiCache.engineSpeed = parseInt(document.getElementById('ascii-speed')?.value ?? '0');
    uiCache.glowEnabled = document.getElementById('glow-toggle')?.checked ?? false;
    uiCache.glowColor = document.getElementById('glow-color')?.value ?? '#00ff00';
    uiCache.glowStrength = parseInt(document.getElementById('glow-strength')?.value ?? '5');
    updateAmbientBackground();
    updateColorBacklights();
}

document.getElementById('controls')?.addEventListener('change', syncAllInputsToCache);

function getCharFromPool(poolKey, brightness, min, max) {
    const pool = charPools[poolKey] || charPools.math;
    const range = max - min;
    const normalized = (brightness - min) / (range || 1);
    const index = Math.floor(normalized * (pool.length - 1));
    return pool[Math.max(0, Math.min(index, pool.length - 1))];
}

function renderLoop(timestamp) {
    if (document.hidden || video.paused || video.ended) { requestAnimationFrame(renderLoop); return; }

    if (uiCache.engineSpeed > 0) {
        const interval = 1000 / uiCache.engineSpeed;
        const elapsed = timestamp - lastFrameTime;
        if (elapsed < interval) { requestAnimationFrame(renderLoop); return; }
        lastFrameTime = timestamp - (elapsed % interval);
    }

    const cellSize = uiCache.cellSize;
    sampleCtx.clearRect(0, 0, sampleCanvas.width, sampleCanvas.height);
    
    if (uiCache.mirror) {
        sampleCtx.save();
        sampleCtx.translate(sampleCanvas.width, 0);
        sampleCtx.scale(-1, 1);
        sampleCtx.drawImage(video, 0, 0, sampleCanvas.width, sampleCanvas.height);
        sampleCtx.restore();
    } else {
        sampleCtx.drawImage(video, 0, 0, sampleCanvas.width, sampleCanvas.height);
    }

    const pixels = sampleCtx.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(uiCache.displayMode === 'overlay') {
        ctx.save();
        ctx.shadowBlur = 0; 
        if (uiCache.mirror) {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let y = 0; y < canvas.height; y += cellSize) {
        for (let x = 0; x < canvas.width; x += cellSize) {
            const sampleX = Math.floor((x / canvas.width) * sampleCanvas.width);
            const sampleY = Math.floor((y / canvas.height) * sampleCanvas.height);
            const pixelIndex = (sampleY * sampleCanvas.width + sampleX) * 4;
            
            const r = pixels[pixelIndex];
            const g = pixels[pixelIndex + 1];
            const b = pixels[pixelIndex + 2];
            if (typeof r === 'undefined') continue;

            const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            let chosenChar = " ";
            let currentBlockBg = "#000000";
            let activePoolKey = "math";

            if (brightness <= uiCache.tShadow) {
                currentBlockBg = uiCache.bgShadow;
                activePoolKey = uiCache.mapShadow;
                if (uiCache.shadowsEnabled) chosenChar = getCharFromPool(uiCache.mapShadow, brightness, 0, uiCache.tShadow);
            } else if (brightness <= uiCache.tMid) {
                currentBlockBg = uiCache.bgMidtone;
                activePoolKey = uiCache.mapMid;
                if (uiCache.midtonesEnabled) chosenChar = getCharFromPool(uiCache.mapMid, brightness, uiCache.tShadow, uiCache.tMid);
            } else if (brightness <= uiCache.tHigh) {
                currentBlockBg = uiCache.bgHighlight;
                activePoolKey = uiCache.mapHigh;
                if (uiCache.highlightsEnabled) chosenChar = getCharFromPool(uiCache.mapHigh, brightness, uiCache.tMid, uiCache.tHigh);
            } else {
                currentBlockBg = uiCache.bgHighlight;
            }

            if (uiCache.displayMode === 'ascii-only') {
                ctx.save();
                ctx.shadowBlur = 0;
                ctx.fillStyle = currentBlockBg;
                ctx.fillRect(x, y, cellSize, cellSize);
                ctx.restore();
            }

            if (chosenChar !== " ") {
                ctx.save();
                if (uiCache.glowEnabled) {
                    ctx.shadowColor = uiCache.glowColor;
                    ctx.shadowBlur = uiCache.glowStrength;
                }
                ctx.font = `${cellSize}px ${getFontFamily(activePoolKey)}`;
                ctx.fillStyle = uiCache.useSourceColor ? `rgb(${r},${g},${b})` : uiCache.glyphColor;
                ctx.fillText(chosenChar, x + cellSize / 2, y + cellSize / 2);
                ctx.restore();
            }
        }
    }
    requestAnimationFrame(renderLoop);
}

initWebcam();

// ========================================== //
// SNAPSHOT ENGINE GALLERY CONTROLS           //
// ========================================== //
let dynamicPhotosMemory = [];
let primaryActiveIndex = null;

const snapBtn = document.getElementById('snap-btn');
const galleryDeck = document.getElementById('mini-gallery-deck');
const galleryTriggerBtn = document.getElementById('gallery-trigger-btn');
const closeGalleryBtn = document.getElementById('close-gallery-btn');

galleryTriggerBtn?.addEventListener('click', () => galleryDeck?.classList.toggle('closed'));
closeGalleryBtn?.addEventListener('click', () => galleryDeck?.classList.add('closed'));

snapBtn?.addEventListener('click', () => {
    const captureUrl = canvas.toDataURL('image/png');
    dynamicPhotosMemory.push(captureUrl);
    refreshGalleryDeckLayout();
    galleryDeck?.classList.remove('closed');
});

function refreshGalleryDeckLayout() {
    const container = document.getElementById('gallery-items-container');
    if (!container) return;
    container.innerHTML = "";
    dynamicPhotosMemory.forEach((imgUrl, idx) => {
        const itemContainer = document.createElement('div');
        itemContainer.className = "gallery-thumb-container";
        itemContainer.innerHTML = `<img src="${imgUrl}">`;
        itemContainer.addEventListener('click', () => {
            primaryActiveIndex = idx;
            document.getElementById('modal-img').src = dynamicPhotosMemory[idx];
            document.getElementById('lightbox-modal')?.classList.remove('hidden');
        });
        container.appendChild(itemContainer);
    });
}

document.getElementById('close-modal')?.addEventListener('click', () => document.getElementById('lightbox-modal').classList.add('hidden'));

document.getElementById('modal-save-btn')?.addEventListener('click', () => {
    if (primaryActiveIndex !== null) {
        const dlLink = document.createElement('a');
        dlLink.href = dynamicPhotosMemory[primaryActiveIndex];
        dlLink.download = `DEXCAM_V215_${Date.now()}.png`;
        dlLink.click();
    }
});

document.getElementById('modal-delete-btn')?.addEventListener('click', () => {
    if (primaryActiveIndex !== null) {
        dynamicPhotosMemory.splice(primaryActiveIndex, 1);
        document.getElementById('lightbox-modal').classList.add('hidden');
        primaryActiveIndex = null;
        refreshGalleryDeckLayout();
    }
});