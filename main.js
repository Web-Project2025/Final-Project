// The predefined phrase that will be forced
const PHRASE = "Where is the best apple?";
let currentIndex = 0;
let landingComplete = false;

// Get DOM elements
const searchInput = document.getElementById('searchInput');
const messageDiv = document.getElementById('message');
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

let portalActive = false;

// Landing page text animation - Internet waking up
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
        // Move to next message or show prompt
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
    // Wait for user to press any key
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

// Internet's thought process based on what's being typed
const thoughts = {
    0: ["Receiving input...", "Processing query initialization..."],
    1: ["Analyzing query structure...", "Determining intent..."],
    5: ["What type of 'where' query is this?", "Location-based search detected..."],
    10: ["'best' keyword identified...", "Comparative analysis required..."],
    16: ["Apple? Fruit or device?", "Contextualizing 'apple'..."],
    20: ["Scanning database for apple varieties...", "Cross-referencing apple orchards...", "Checking Apple Inc. locations..."]
};

function showInternetThought(index) {
    const thoughtArray = thoughts[index];
    if (thoughtArray) {
        // Clear previous thoughts
        thoughtProcess.innerHTML = '';
        
        // Show random thought from the array
        const randomThought = thoughtArray[Math.floor(Math.random() * thoughtArray.length)];
        const thoughtElement = document.createElement('span');
        thoughtElement.className = 'thought';
        thoughtElement.textContent = randomThought;
        thoughtProcess.appendChild(thoughtElement);
        
        // Add glitch effect to container
        mainContainer.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        setTimeout(() => {
            mainContainer.style.transform = 'translate(0, 0)';
        }, 50);
    }
}

// Start landing animation when page loads
window.addEventListener('load', function() {
    setTimeout(typeLandingText, 500);
});

// Create Horizontal Streaming Characters
function createHorizontalStream() {
    const horizontalStream = document.getElementById('horizontalStream');
    const numLines = 8; // Number of horizontal lines
    
    // Extended character set
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
        
        // Position each line at different vertical positions
        streamLine.style.top = `${10 + (i * 12)}%`;
        
        // Generate a long string of random characters
        let charString = '';
        const numChars = 80 + Math.floor(Math.random() * 40); // 80-120 characters
        for (let j = 0; j < numChars; j++) {
            charString += chars[Math.floor(Math.random() * chars.length)] + ' ';
        }
        
        streamLine.textContent = charString;
        
        // Add slight random variation to animation duration for more organic feel
        const baseDuration = 25;
        const variation = Math.random() * 5 - 2.5; // -2.5 to +2.5 seconds
        streamLine.style.animationDuration = `${baseDuration + variation}s`;
        
        horizontalStream.appendChild(streamLine);
        
        // Periodically update characters for dynamic effect
        setInterval(() => {
            let newString = '';
            const numChars = 80 + Math.floor(Math.random() * 40);
            for (let j = 0; j < numChars; j++) {
                newString += chars[Math.floor(Math.random() * chars.length)] + ' ';
            }
            streamLine.textContent = newString;
        }, 8000 + Math.random() * 4000); // Update every 8-12 seconds
    }
}

// Initialize horizontal stream
createHorizontalStream();

function activatePortal() {
    if (!portalActive) {
        portalActive = true;
        portalBackground.classList.add('active');
        mainContainer.classList.add('portal-active');
        searchContainer.classList.add('portal-zoom');
        
        // Initialize network nodes canvas
        initNetworkNodes();
        
        // Start code streams
        startCodeStream();
        
        // Start data flows
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
    
    // Create nodes
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
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > networkCanvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > networkCanvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 51, 51, 0.6)';
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff3333';
        });
        
        // Draw connections
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
                    ctx.lineWidth = 1;
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

// Pulsing portal effect based on typing
function pulsePortal() {
    mainContainer.style.transform = 'scale(1.08)';
    setTimeout(() => {
        mainContainer.style.transform = 'scale(1.05)';
    }, 100);
}

// Update processing status
function updateProcessingStatus(progress, text) {
    const percentage = (progress / PHRASE.length) * 100;
    processingFill.style.width = `${percentage}%`;
    processingText.textContent = text;
}

// Processing status messages based on progress
function getProcessingMessage(index) {
    const percentage = Math.floor((index / PHRASE.length) * 100);
    
    if (index === 0) {
        return "// Initializing query processor...";
    } else if (index < 5) {
        return `// Receiving input... ${percentage}%`;
    } else if (index < 10) {
        return `// Analyzing query structure... ${percentage}%`;
    } else if (index < 15) {
        return `// Determining search intent... ${percentage}%`;
    } else if (index < 20) {
        return `// Contextualizing keywords... ${percentage}%`;
    } else if (index < PHRASE.length) {
        return `// Cross-referencing databases... ${percentage}%`;
    } else {
        return `// Query processing complete... 100%`;
    }
}

// Begin Search Button Handler
beginSearchBtn.addEventListener('click', function() {
    playVideoWithGlitch();
});

// Video playback with glitch transition
function playVideoWithGlitch() {
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    const glitchOverlay = document.getElementById('glitchOverlay');
    const screenFlash = document.getElementById('screenFlash');
    
    // Hide the Begin Search button
    beginSearchBtn.classList.add('hidden');
    
    // Stop all background animations to free up resources
    portalActive = false;
    const horizontalStream = document.getElementById('horizontalStream');
    if (horizontalStream) {
        horizontalStream.style.display = 'none';
    }
    
    // Start glitch effects (reduced duration)
    glitchOverlay.classList.add('active');
    screenFlash.classList.add('active');
    
    // Prepare video immediately
    videoContainer.classList.remove('hidden');
    videoContainer.style.opacity = '0';
    
    // After brief glitch effects (800ms), show video
    setTimeout(() => {
        // Remove glitch classes
        glitchOverlay.classList.remove('active');
        screenFlash.classList.remove('active');
        
        // Hide main interface for better performance
        mainContainer.style.display = 'none';
        
        // Show video container
        videoContainer.classList.add('show');
        videoContainer.style.opacity = '1';
        
        // Play video with promise to handle errors
        const playPromise = videoPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully
                console.log('Video playing');
            }).catch(error => {
                // Auto-play was prevented or error occurred
                console.error('Video playback error:', error);
                // Retry once
                setTimeout(() => videoPlayer.play(), 100);
            });
        }
    }, 800);
    
    // Handle video end (use once to prevent multiple triggers)
    videoPlayer.addEventListener('ended', function handleVideoEnd() {
        // Fade out video
        videoContainer.style.opacity = '0';
        
        setTimeout(() => {
            // Hide video container
            videoContainer.classList.remove('show');
            videoContainer.classList.add('hidden');
            
            // Show main interface again
            mainContainer.style.display = 'block';
            
            // Restart background effects
            if (horizontalStream) {
                horizontalStream.style.display = 'block';
            }
            portalActive = true;
            
            // Reset video
            videoPlayer.currentTime = 0;
            
            // Show completion message or return to interface
            showCompletionMessage();
        }, 300);
        
        // Remove event listener to prevent duplicates
        videoPlayer.removeEventListener('ended', handleVideoEnd);
    });
}


// Update cursor position
function updateCursorPosition() {
    const text = searchInput.value;
    const textWidth = getTextWidth(text, searchInput);
    
    // Account for the input's padding (10px) and position cursor right after the text
    const cursorLeft = textWidth + 10; // 10px is the input's left padding
    cursor.style.left = `${cursorLeft}px`;
}

// Get text width helper function with letter spacing
function getTextWidth(text, element) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const style = window.getComputedStyle(element);
    context.font = `${style.fontSize} ${style.fontFamily}`;
    
    // Measure the text width
    const metrics = context.measureText(text);
    const baseWidth = metrics.width;
    
    // Add letter spacing (2px per character as defined in CSS)
    const letterSpacing = 2;
    const totalWidth = baseWidth + (text.length > 0 ? (text.length - 1) * letterSpacing : 0);
    
    return totalWidth;
}

// Handle keydown event
searchInput.addEventListener('keydown', function(e) {
    // Handle backspace to delete characters
    if (e.key === 'Backspace') {
        e.preventDefault();
        if (searchInput.value.length > 0) {
            searchInput.value = searchInput.value.slice(0, -1);
            currentIndex = searchInput.value.length;
            updateCursorPosition();
        }
        return;
    }
    
    // Handle delete key
    if (e.key === 'Delete') {
        e.preventDefault();
        return;
    }
    
    // Handle regular character input
    if (e.key.length === 1) {
        e.preventDefault();
        
        // Activate portal on first keystroke
        if (currentIndex === 0) {
            activatePortal();
        }
        
        // Only add characters if we haven't exceeded the phrase length
        if (currentIndex < PHRASE.length) {
            // Pulse effect
            pulsePortal();
            
            // Get the correct character from the phrase that should appear
            const nextChar = PHRASE[currentIndex];
            
            // Add morphing effect
            searchInput.classList.add('morphing');
            
            const transformationSymbols = ['∴', '∵', '⊕', '⊗', '◬', '◭', '∞', '≈', '₀', '₁', '⌘', '⌛', '▓', '▒', '░'];
            const binarySymbols = ['0', '1', '0', '1', '1', '0'];
            const dnaSymbols = ['A', 'T', 'C', 'G', 'U'];
            
            // Choose random symbol set
            const rand = Math.random();
            let symbolSet;
            if (rand < 0.33) {
                symbolSet = transformationSymbols;
            } else if (rand < 0.66) {
                symbolSet = binarySymbols;
            } else {
                symbolSet = dnaSymbols;
            }
            
            // Build the phrase correctly by using substring
            const currentBuiltPhrase = PHRASE.substring(0, currentIndex);
            const tempSymbol = symbolSet[Math.floor(Math.random() * symbolSet.length)];
            
            // Show first transformation symbol
            searchInput.value = currentBuiltPhrase + tempSymbol;
            updateCursorPosition();
            
            // Morph to another symbol
            setTimeout(() => {
                const tempSymbol2 = symbolSet[Math.floor(Math.random() * symbolSet.length)];
                searchInput.value = currentBuiltPhrase + tempSymbol2;
                updateCursorPosition();
            }, 100);
            
            // Settle into the final correct character from the phrase
            setTimeout(() => {
                // Build the phrase up to and including the current character
                searchInput.value = PHRASE.substring(0, currentIndex + 1);
                currentIndex++;
                
                // Update processing status
                updateProcessingStatus(currentIndex, getProcessingMessage(currentIndex));
                
                // Remove morphing effect
                setTimeout(() => {
                    searchInput.classList.remove('morphing');
                }, 200);
                
                // Show Internet's thought process
                showInternetThought(currentIndex);
                
                // Update info text as Internet processes
                if (currentIndex === 1) {
                    infoText.innerHTML = '<p>// Network analyzing input...</p><p>// Processing query structure...</p>';
                } else if (currentIndex === 10) {
                    infoText.innerHTML = '<p>// Determining search intent...</p><p>// Evaluating query parameters...</p>';
                } else if (currentIndex === 16) {
                    infoText.innerHTML = '<p>// Contextualizing keywords...</p><p>// Cross-referencing databases...</p>';
                }
                
                // Update cursor position
                updateCursorPosition();
                
                // Check if phrase is complete
                if (currentIndex === PHRASE.length) {
                    // Show the Begin Search button
                    beginSearchBtn.classList.remove('hidden');
                }
            }, 250);
        }
    }
});

// Prevent paste
searchInput.addEventListener('paste', function(e) {
    e.preventDefault();
});

// Prevent cut
searchInput.addEventListener('cut', function(e) {
    e.preventDefault();
});

// Show completion message
function showCompletionMessage() {
    // Final thought process
    thoughtProcess.innerHTML = '';
    const finalThoughts = [
        'Query fully analyzed...',
        'Optimal result identified...',
        'Network consensus achieved...'
    ];
    
    finalThoughts.forEach((thought, index) => {
        setTimeout(() => {
            const thoughtElement = document.createElement('span');
            thoughtElement.className = 'thought';
            thoughtElement.textContent = thought;
            thoughtProcess.appendChild(thoughtElement);
            thoughtProcess.appendChild(document.createElement('br'));
        }, index * 400);
    });
    
    setTimeout(() => {
        messageDiv.textContent = '>> QUERY PROCESSING COMPLETE <<\n>> NETWORK HAS DETERMINED THE ANSWER <<';
        messageDiv.classList.remove('hidden');
        
        infoText.innerHTML = '<p>// The Internet has awakened to your question...</p><p>// Consciousness achieved...</p>';
        
        // Add glitch effect
        let glitchCount = 0;
        const glitchInterval = setInterval(() => {
            messageDiv.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            glitchCount++;
            
            if (glitchCount > 10) {
                clearInterval(glitchInterval);
                messageDiv.style.transform = 'translate(0, 0)';
                
                // Optional: Redirect or perform action after completion
                setTimeout(() => {
                    // You can add your completion action here
                    // For example: window.location.href = 'results.html';
                }, 2000);
            }
        }, 50);
    }, 1500);
}

// Focus on input when page loads
// (Removed - now handled by landing page transition)


// Update cursor position when input changes
searchInput.addEventListener('input', updateCursorPosition);

// Add typing sound effect (optional - requires audio file)
function playTypingSound() {
    // You can add a typing sound effect here if you have an audio file
    // const audio = new Audio('typing.mp3');
    // audio.play();
}

// Add screen glitch effect on focus
searchInput.addEventListener('focus', function() {
    document.querySelector('.container').style.animation = 'flicker 0.15s infinite, pulse 2s ease-in-out infinite';
});

// Pulse animation for container
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 30px rgba(255, 51, 51, 0.3), inset 0 0 30px rgba(255, 51, 51, 0.1);
        }
        50% {
            box-shadow: 0 0 50px rgba(255, 51, 51, 0.5), inset 0 0 50px rgba(255, 51, 51, 0.2);
        }
    }
`;
document.head.appendChild(pulseStyle);
