// Landing page setup
let landingComplete = false;

// Get DOM elements
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const cursor = document.querySelector('.cursor');
const landingPage = document.getElementById('landingPage');
const landingText = document.getElementById('landingText');
const landingPrompt = document.getElementById('landingPrompt');
const mainContainer = document.getElementById('mainContainer');
const thoughtProcess = document.getElementById('thoughtProcess');
const infoText = document.getElementById('infoText');
const portalBackground = document.getElementById('portalBackground');
const networkCanvas = document.getElementById('networkCanvas');
const codeStream = document.getElementById('codeStream');
const dataFlow = document.getElementById('dataFlow');
const searchContainer = document.querySelector('.search-container');
const beginSearchBtn = document.getElementById('beginSearchBtn');
const processingStatus = document.getElementById('processingStatus');
const processingFill = document.getElementById('processingFill');
const processingText = document.getElementById('processingText');
const resultsSection = document.getElementById('resultsSection');
const resultsTitle = document.getElementById('resultsTitle');
const resultsSubtitle = document.getElementById('resultsSubtitle');
const duckGallery = document.getElementById('duckGallery');
const searchAgainBtn = document.getElementById('searchAgain');

let portalActive = false;
let querySubmitted = false;

// Landing page text animation
const landingMessages = [
    "Wake up, Internet...",
    "Initializing the Web...",
];
let messageIndex = 0;
let landingIndex = 0;

function typeLandingText() {
    const currentMessage = landingMessages[messageIndex];
    
    if (landingIndex < currentMessage.length) {
        landingText.textContent += currentMessage[landingIndex];
        landingIndex++;
        setTimeout(typeLandingText, 100);
    } else {
        if (messageIndex < landingMessages.length - 1) {
            messageIndex++;
            landingIndex = 0;
            setTimeout(() => {
                landingText.textContent = '';
                typeLandingText();
            }, 800);
        } else {
            setTimeout(showPrompt, 1000);
        }
    }
}

function showPrompt() {
    landingPrompt.classList.add('show');
    document.addEventListener('keydown', handleLandingKeyPress, { once: true });
}

function handleLandingKeyPress(e) {
    transitionToMain();
}

function transitionToMain() {
    landingPage.classList.add('fade-out');
    
    setTimeout(() => {
        landingPage.style.display = 'none';
        mainContainer.classList.remove('hidden');
        mainContainer.classList.add('show');
        searchInput.focus();
        updateCursorPosition();
        landingComplete = true;
    }, 1000);
}

// Start landing animation
window.addEventListener('load', function() {
    setTimeout(typeLandingText, 500);
});

// Create Horizontal Streaming Characters
function createHorizontalStream() {
    const horizontalStream = document.getElementById('horizontalStream');
    const numLines = 8;
    
    const chars = 
        'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ' +
        '0123456789' +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ' +
        'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ' +
        '∀∂∃∅∆∇∈∉∋∏∑−∗∙√∝∞∟∠∧∨∩∪∫∴∵≈≠≡≤≥' +
        '▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓' +
        '←↑→↓↔↕↖↗↘↙';
    
    for (let i = 0; i < numLines; i++) {
        const streamLine = document.createElement('div');
        streamLine.className = 'stream-line';
        streamLine.style.top = `${10 + (i * 12)}%`;
        
        let charString = '';
        const numChars = 80 + Math.floor(Math.random() * 40);
        for (let j = 0; j < numChars; j++) {
            charString += chars[Math.floor(Math.random() * chars.length)] + ' ';
        }
        
        streamLine.textContent = charString;
        
        const baseDuration = 25;
        const variation = Math.random() * 5 - 2.5;
        streamLine.style.animationDuration = `${baseDuration + variation}s`;
        
        horizontalStream.appendChild(streamLine);
        
        setInterval(() => {
            let newString = '';
            const numChars = 80 + Math.floor(Math.random() * 40);
            for (let j = 0; j < numChars; j++) {
                newString += chars[Math.floor(Math.random() * chars.length)] + ' ';
            }
            streamLine.textContent = newString;
        }, 8000 + Math.random() * 4000);
    }
}

createHorizontalStream();

function activatePortal() {
    if (!portalActive) {
        portalActive = true;
        portalBackground.classList.add('active');
        mainContainer.classList.add('portal-active');
        searchContainer.classList.add('portal-zoom');
        
        initNetworkNodes();
        startCodeStream();
        startDataFlow();
    }
}

function deactivatePortal() {
    portalActive = false;
    portalBackground.classList.remove('active');
    mainContainer.classList.remove('portal-active');
    searchContainer.classList.remove('portal-zoom');
}

// Network Nodes Canvas
function initNetworkNodes() {
    const ctx = networkCanvas.getContext('2d');
    networkCanvas.width = networkCanvas.offsetWidth;
    networkCanvas.height = networkCanvas.offsetHeight;
    
    const nodes = [];
    const nodeCount = 20;
    
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * networkCanvas.width,
            y: Math.random() * networkCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 3
        });
    }
    
    function animateNodes() {
        if (!portalActive) return;
        
        ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
        
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > networkCanvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > networkCanvas.height) node.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 51, 51, 0.6)';
            ctx.fill();
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff3333';
        });
        
        ctx.shadowBlur = 0;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(255, 51, 51, ${0.3 * (1 - distance / 150)})`;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateNodes);
    }
    
    animateNodes();
}

// Code Stream Effect
const codeSamples = [
    'function query(input) { return process(input); }',
    'const network = await connect(nodes);',
    'if (data.type === "apple") { search.fruit(); }',
    'let result = database.find({ keyword: "best" });',
    'async function analyze() { return await AI.process(); }',
    'const context = parseQuery(userInput);',
    'network.nodes.forEach(n => n.activate());',
    'return { status: "processing", data: query };'
];

function startCodeStream() {
    setInterval(() => {
        if (!portalActive) return;
        
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        codeLine.textContent = codeSamples[Math.floor(Math.random() * codeSamples.length)];
        codeLine.style.top = `${Math.random() * 80 + 10}%`;
        
        codeStream.appendChild(codeLine);
        
        setTimeout(() => {
            codeLine.remove();
        }, 3000);
    }, 800);
}

// Data Flow Effect
function startDataFlow() {
    setInterval(() => {
        if (!portalActive) return;
        
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.left = `${Math.random() * 100}%`;
        stream.style.animationDelay = `${Math.random() * 0.5}s`;
        
        dataFlow.appendChild(stream);
        
        setTimeout(() => {
            stream.remove();
        }, 2000);
    }, 300);
}

function pulsePortal() {
    mainContainer.style.transform = 'scale(1.08)';
    setTimeout(() => {
        mainContainer.style.transform = 'scale(1.05)';
    }, 100);
}

function updateCursorPosition() {
    const text = searchInput.value;
    const textWidth = getTextWidth(text, searchInput);
    const cursorLeft = textWidth + 10;
    cursor.style.left = `${cursorLeft}px`;
}

function getTextWidth(text, element) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const style = window.getComputedStyle(element);
    context.font = `${style.fontSize} ${style.fontFamily}`;
    
    const metrics = context.measureText(text);
    const baseWidth = metrics.width;
    
    const letterSpacing = 2;
    const totalWidth = baseWidth + (text.length > 0 ? (text.length - 1) * letterSpacing : 0);
    
    return totalWidth;
}

// Handle typing
searchInput.addEventListener('input', function(e) {
    if (!portalActive && searchInput.value.length > 0) {
        activatePortal();
    }
    
    updateCursorPosition();
    
    if (searchInput.value.length > 0 && !querySubmitted) {
        beginSearchBtn.classList.remove('hidden');
        processingText.textContent = `// Input received: ${searchInput.value.length} characters...`;
        processingFill.style.width = `${Math.min((searchInput.value.length / 30) * 100, 100)}%`;
        
        // Show dynamic thoughts based on input
        const inputLength = searchInput.value.length;
        if (inputLength > 0 && inputLength < 5) {
            thoughtProcess.innerHTML = '<span class="thought">Detecting input...</span>';
        } else if (inputLength >= 5 && inputLength < 10) {
            thoughtProcess.innerHTML = '<span class="thought">Analyzing query structure...</span>';
        } else if (inputLength >= 10) {
            thoughtProcess.innerHTML = '<span class="thought">Preparing to send query to backend...</span>';
        }
    }
    
    if (searchInput.value.length === 0) {
        beginSearchBtn.classList.add('hidden');
        thoughtProcess.innerHTML = '';
        processingText.textContent = '// Awaiting query input...';
        processingFill.style.width = '0%';
    }
});

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (searchInput.value.trim().length > 0) {
            handleSearch();
        }
    }
});

// Handle form submission
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleSearch();
});

// Begin Search Button
beginSearchBtn.addEventListener('click', function() {
    handleSearch();
});

// Handle search submission
async function handleSearch() {
    if (querySubmitted) return;
    
    const query = searchInput.value.trim();
    if (!query) return;
    
    querySubmitted = true;
    beginSearchBtn.classList.add('hidden');
    searchInput.disabled = true;
    
    try {
        // STAGE 1: INSTANT CHECK (Quick analysis)
        const instantCheckResponse = await fetch('/api/instant-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        
        if (!instantCheckResponse.ok) {
            throw new Error('Instant check API failed');
        }
        
        const instantCheckData = await instantCheckResponse.json();
        console.log('Instant check:', instantCheckData.analysis);
        
        // Display instant check messages (quick)
        await displayInstantCheckMessages(instantCheckData.instantMessages);
        
        // Add a pause after instant check completes
        await sleep(2000);
        
        // STAGE 2: DEEP CHECK (15 seconds with video and visual effects)
        const deepCheckResponse = await fetch('/api/deep-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        }).catch(err => {
            console.error('Deep check fetch error:', err);
            throw err;
        });
        
        if (!deepCheckResponse.ok) {
            throw new Error('Deep check API failed');
        }
        
        const deepCheckData = await deepCheckResponse.json();
        console.log('Deep check:', deepCheckData.analysis);
        
        // Play video with glitch and display deep check messages with visual effects
        try {
            await performDeepCheckWithVideo(deepCheckData.deepMessages);
        } catch (err) {
            console.error('Deep check video error:', err);
            throw err;
        }
        
        // Get results from backend
        const resultsResponse = await fetch('/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        
        if (!resultsResponse.ok) {
            throw new Error('Results API failed');
        }
        
        const resultsData = await resultsResponse.json();
        console.log('Backend message:', resultsData.message);
        
        // Show duck results
        showResults(resultsData);
        
    } catch (error) {
        console.error('Error:', error);
        thoughtProcess.innerHTML = '<span class="thought">Connection error! Showing backup results...</span>';
        
        setTimeout(() => {
            showResults({
                title: "Network Error! But Ducks to the Rescue! 🦆",
                subtitle: "The server had a moment, but we've got backup content!",
                ducks: [
                    { url: "https://random-d.uk/api/randomimg", caption: "Emergency duck #1! 🦆" },
                    { url: "https://random-d.uk/api/randomimg", caption: "Emergency duck #2! 🦆" },
                    { url: "https://random-d.uk/api/randomimg", caption: "Emergency duck #3! 🦆" }
                ]
            });
        }, 2000);
    }
}

// Display instant check messages (quick analysis)
async function displayInstantCheckMessages(messages) {
    for (let i = 0; i < messages.length; i++) {
        console.log(`Displaying message ${i + 1}/${messages.length}: ${messages[i]}`);
        thoughtProcess.innerHTML = `<span class="thought">${messages[i]}</span>`;
        
        // Update processing bar
        const progress = ((i + 1) / messages.length) * 20; // Only use 20% of bar
        processingFill.style.width = `${progress}%`;
        processingText.textContent = messages[i];
        
        // Quick pulse effect
        pulsePortal();
        
        // 3 seconds between each message for readability
        console.log('Waiting 3 seconds...');
        await sleep(3000);
        console.log('Wait complete');
    }
    console.log('All instant check messages displayed');
}

// Display thinking messages from backend (legacy function, kept for compatibility)
async function displayThinkingMessages(messages) {
    for (let i = 0; i < messages.length; i++) {
        thoughtProcess.innerHTML = `<span class="thought">${messages[i]}</span>`;
        
        // Update processing bar
        const progress = ((i + 1) / messages.length) * 100;
        processingFill.style.width = `${progress}%`;
        processingText.textContent = messages[i];
        
        // Pulse effect
        pulsePortal();
        
        // Variable delays
        let delay;
        if (i === 0) {
            delay = 600;
        } else if (i < 3) {
            delay = 900;
        } else if (i < 6) {
            delay = 1100;
        } else if (i < messages.length - 2) {
            delay = 1300;
        } else {
            delay = 1500;
        }
        
        await sleep(delay);
    }
}

// Deep check with video and visual effects (15 seconds)
async function performDeepCheckWithVideo(deepMessages) {
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    const glitchOverlay = document.getElementById('glitchOverlay');
    const screenFlash = document.getElementById('screenFlash');
    const horizontalStream = document.getElementById('horizontalStream');
    
    // Randomly select between the two videos
    const randomVideo = Math.random() < 0.5 ? 'Random Image1.mp4' : 'Random Image2.mp4';
    const videoSource = videoPlayer.querySelector('source');
    videoSource.src = `assets/${randomVideo}`;
    videoPlayer.load(); // Reload the video with the new source
    
    return new Promise((resolve) => {
        // Hide horizontal stream and deactivate portal
        portalActive = false;
        if (horizontalStream) {
            horizontalStream.style.display = 'none';
        }
        
        // Trigger glitch effect
        glitchOverlay.classList.add('active');
        screenFlash.classList.add('active');
        
        videoContainer.classList.remove('hidden');
        videoContainer.style.opacity = '0';
        
        setTimeout(() => {
            glitchOverlay.classList.remove('active');
            screenFlash.classList.remove('active');
            
            mainContainer.style.display = 'none';
            
            videoContainer.classList.add('show');
            videoContainer.style.opacity = '1';
            
            // Start video playback
            const playPromise = videoPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Video playback error:', error);
                    setTimeout(() => videoPlayer.play(), 100);
                });
            }
            
            // Show deep thinking text and images overlaid on video
            displayDeepCheckOverlay(deepMessages, videoContainer);
            
        }, 800);
        
        // Video plays for 15 seconds, then ends
        setTimeout(() => {
            videoContainer.style.opacity = '0';
            
            setTimeout(() => {
                videoContainer.classList.remove('show');
                videoContainer.classList.add('hidden');
                mainContainer.style.display = 'block';
                
                if (horizontalStream) {
                    horizontalStream.style.display = 'block';
                }
                
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
                resolve();
            }, 300);
        }, 15000); // 15 seconds total
    });
}

// Display deep check messages and images as overlay on video
async function displayDeepCheckOverlay(deepMessages, videoContainer) {
    // Create overlay container for text and images
    let deepOverlay = document.getElementById('deepCheckOverlay');
    if (!deepOverlay) {
        deepOverlay = document.createElement('div');
        deepOverlay.id = 'deepCheckOverlay';
        deepOverlay.style.position = 'absolute';
        deepOverlay.style.top = '0';
        deepOverlay.style.left = '0';
        deepOverlay.style.width = '100%';
        deepOverlay.style.height = '100%';
        deepOverlay.style.pointerEvents = 'none';
        deepOverlay.style.zIndex = '10';
        deepOverlay.style.overflow = 'hidden';
        videoContainer.appendChild(deepOverlay);
    }
    
    deepOverlay.innerHTML = '';
    
    const totalDuration = 15000; // 15 seconds
    const messageInterval = totalDuration / (deepMessages.length + 5); // Space out messages
    
    // Display messages over time
    for (let i = 0; i < deepMessages.length; i++) {
        await sleep(messageInterval);
        
        // Update processing bar (20% to 100%)
        const progress = 20 + ((i + 1) / deepMessages.length) * 80;
        processingFill.style.width = `${progress}%`;
        processingText.textContent = deepMessages[i];
        
        // Create flying text element
        createFlyingText(deepMessages[i], deepOverlay);
        
        // Randomly add flying images
        if (Math.random() > 0.4) {
            createFlyingImage(deepOverlay);
        }
    }
}

// Create flying text that appears and flies across screen
function createFlyingText(text, container) {
    const textEl = document.createElement('div');
    textEl.textContent = text;
    textEl.style.position = 'absolute';
    textEl.style.color = '#00d4ff';
    textEl.style.fontFamily = 'monospace';
    textEl.style.fontSize = `${32 + Math.random() * 24}px`;
    textEl.style.fontWeight = 'bold';
    textEl.style.textShadow = '0 0 20px rgba(0, 212, 255, 1), 0 0 40px rgba(0, 212, 255, 0.6)';
    textEl.style.whiteSpace = 'nowrap';
    textEl.style.opacity = '1';
    textEl.style.zIndex = '15';
    
    // Random starting position within video bounds
    const startSide = Math.floor(Math.random() * 4);
    if (startSide === 0) { // Top
        textEl.style.left = `${10 + Math.random() * 80}%`;
        textEl.style.top = '5%';
    } else if (startSide === 1) { // Right
        textEl.style.left = '85%';
        textEl.style.top = `${10 + Math.random() * 80}%`;
    } else if (startSide === 2) { // Bottom
        textEl.style.left = `${10 + Math.random() * 80}%`;
        textEl.style.top = '85%';
    } else { // Left
        textEl.style.left = '5%';
        textEl.style.top = `${10 + Math.random() * 80}%`;
    }
    
    container.appendChild(textEl);
    
    // Animate within screen bounds
    const endX = (Math.random() - 0.5) * 300;
    const endY = (Math.random() - 0.5) * 300;
    
    const animation = textEl.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${endX}px, ${endY}px) scale(${0.7 + Math.random() * 0.5})`, opacity: 0 }
    ], {
        duration: 2000 + Math.random() * 2000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => textEl.remove();
}

// Create flying image (code snippets, symbols, data)
function createFlyingImage(container) {
    const imgEl = document.createElement('div');
    
    // Random visual elements
    const symbols = ['{ }', '< >', '[ ]', '( )', '&&', '||', '==', '!=', '=>', '::', '...', '???', '###', '***', '+++', '---'];
    const codeSnippets = ['if()', 'for()', 'while()', 'return', 'async', 'await', 'const', 'let', 'var', 'function', 'class'];
    const dataSymbols = ['█', '▓', '▒', '░', '▀', '▄', '▌', '▐', '■', '□', '▪', '▫', '◆', '◇', '○', '●'];
    
    const allSymbols = [...symbols, ...codeSnippets, ...dataSymbols];
    imgEl.textContent = allSymbols[Math.floor(Math.random() * allSymbols.length)];
    
    imgEl.style.position = 'absolute';
    // Red/pink theme colors
    const redVariations = [
        'rgba(255, 51, 51, 0.8)',
        'rgba(255, 102, 102, 0.8)',
        'rgba(255, 153, 153, 0.7)',
        'rgba(204, 0, 0, 0.8)',
        'rgba(255, 0, 102, 0.7)'
    ];
    imgEl.style.color = redVariations[Math.floor(Math.random() * redVariations.length)];
    imgEl.style.fontFamily = 'monospace';
    imgEl.style.fontSize = `${16 + Math.random() * 24}px`;
    imgEl.style.fontWeight = 'bold';
    imgEl.style.textShadow = '0 0 8px currentColor';
    imgEl.style.zIndex = '12';
    
    // Random starting position within bounds
    imgEl.style.left = `${10 + Math.random() * 80}%`;
    imgEl.style.top = `${10 + Math.random() * 80}%`;
    
    container.appendChild(imgEl);
    
    // Animate within bounds
    const endX = (Math.random() - 0.5) * 400;
    const endY = (Math.random() - 0.5) * 400;
    
    const animation = imgEl.animate([
        { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0.8 },
        { transform: `translate(${endX}px, ${endY}px) rotate(${Math.random() * 360}deg) scale(0.3)`, opacity: 0 }
    ], {
        duration: 1500 + Math.random() * 2500,
        easing: 'ease-in-out'
    });
    
    animation.onfinish = () => imgEl.remove();
}

// Video playback
async function playVideoWithGlitch() {
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    const glitchOverlay = document.getElementById('glitchOverlay');
    const screenFlash = document.getElementById('screenFlash');
    
    return new Promise((resolve) => {
        const horizontalStream = document.getElementById('horizontalStream');
        portalActive = false;
        if (horizontalStream) {
            horizontalStream.style.display = 'none';
        }
        
        glitchOverlay.classList.add('active');
        screenFlash.classList.add('active');
        
        videoContainer.classList.remove('hidden');
        videoContainer.style.opacity = '0';
        
        setTimeout(() => {
            glitchOverlay.classList.remove('active');
            screenFlash.classList.remove('active');
            
            mainContainer.style.display = 'none';
            
            videoContainer.classList.add('show');
            videoContainer.style.opacity = '1';
            
            const playPromise = videoPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Video playback error:', error);
                    setTimeout(() => videoPlayer.play(), 100);
                });
            }
        }, 800);
        
        videoPlayer.addEventListener('ended', function handleVideoEnd() {
            videoContainer.style.opacity = '0';
            
            setTimeout(() => {
                videoContainer.classList.remove('show');
                videoContainer.classList.add('hidden');
                mainContainer.style.display = 'block';
                
                if (horizontalStream) {
                    horizontalStream.style.display = 'block';
                }
                
                videoPlayer.currentTime = 0;
                resolve();
            }, 300);
            
            videoPlayer.removeEventListener('ended', handleVideoEnd);
        });
    });
}

// Show duck results
function showResults(data) {
    mainContainer.classList.add('hidden');
    
    resultsTitle.textContent = data.title;
    resultsSubtitle.textContent = data.subtitle;
    
    duckGallery.innerHTML = '';
    
    data.ducks.forEach((duck, index) => {
        const duckCard = createDuckCard(duck, index);
        duckGallery.appendChild(duckCard);
    });
    
    resultsSection.classList.remove('hidden');
}

function createDuckCard(duck, index) {
    const card = document.createElement('div');
    card.className = 'duck-card';
    
    const img = document.createElement('img');
    img.src = `${duck.url}?random=${Date.now()}-${index}`;
    img.alt = 'A cute duck';
    img.loading = 'lazy';
    
    const caption = document.createElement('p');
    caption.textContent = duck.caption;
    
    card.appendChild(img);
    card.appendChild(caption);
    
    return card;
}

// Search again
searchAgainBtn.addEventListener('click', function() {
    resultsSection.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    mainContainer.classList.remove('portal-active');
    searchContainer.classList.remove('portal-zoom');
    portalBackground.classList.remove('active');
    
    searchInput.value = '';
    searchInput.disabled = false;
    searchInput.focus();
    querySubmitted = false;
    portalActive = false;
    
    thoughtProcess.innerHTML = '';
    processingText.textContent = '// Awaiting query input...';
    processingFill.style.width = '0%';
    
    updateCursorPosition();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
