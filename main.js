// ===== FRONTEND QUERY ANALYSIS (NO BACKEND NEEDED) =====

// Filler words to ignore when extracting keywords
const fillerWords = ['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 
                      'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
                      'would', 'should', 'could', 'may', 'might', 'must', 'can',
                      'of', 'at', 'by', 'for', 'with', 'about', 'as', 'into',
                      'through', 'during', 'before', 'after', 'above', 'below',
                      'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over',
                      'under', 'again', 'further', 'then', 'once'];

// Ambiguous keywords and their possible meanings
const ambiguousWords = {
    'apple': ['fruit', 'Apple Inc. (tech company)', 'records label'],
    'bank': ['financial institution', 'riverbank', 'to tilt or turn'],
    'java': ['coffee', 'programming language', 'Indonesian island'],
    'python': ['snake', 'programming language'],
    'bat': ['flying mammal', 'sports equipment', 'to hit'],
    'park': ['green space', 'to leave a vehicle', 'surname'],
    'spring': ['season', 'coiled metal', 'water source', 'to jump'],
    'fan': ['admirer', 'cooling device', 'to spread out'],
    'left': ['direction', 'past tense of leave', 'political ideology'],
    'right': ['direction', 'correct', 'entitlement', 'political ideology'],
    'bear': ['animal', 'to carry or endure'],
    'plane': ['aircraft', 'flat surface', 'woodworking tool'],
    'mouse': ['rodent', 'computer input device'],
    'turkey': ['bird', 'country'],
    'key': ['lock opener', 'musical note', 'important factor'],
    'date': ['fruit', 'calendar day', 'romantic meeting'],
    'mine': ['possessive', 'excavation site', 'explosive device'],
    'crane': ['bird', 'construction equipment', 'to stretch neck']
};

// Topic categories
const topicKeywords = {
    technology: ['computer', 'software', 'app', 'phone', 'internet', 'code', 'digital', 'ai', 'tech'],
    food: ['eat', 'food', 'cook', 'recipe', 'restaurant', 'pizza', 'burger', 'meal', 'dinner'],
    science: ['physics', 'chemistry', 'biology', 'atom', 'molecule', 'experiment', 'theory'],
    geography: ['country', 'city', 'mountain', 'river', 'ocean', 'continent', 'map'],
    transport: ['car', 'train', 'bus', 'plane', 'tram', 'subway', 'vehicle', 'travel'],
    nature: ['tree', 'plant', 'animal', 'forest', 'sky', 'weather', 'climate'],
    business: ['company', 'market', 'stock', 'economy', 'finance', 'money', 'profit'],
    health: ['doctor', 'medicine', 'hospital', 'disease', 'symptom', 'treatment', 'health']
};

// Helper function to extract meaningful keywords
function extractKeywords(query) {
    const words = query.toLowerCase().split(/\s+/);
    return words.filter(word => {
        const cleanWord = word.replace(/[.,!?;:'"]/g, '');
        return cleanWord.length >= 2 && !fillerWords.includes(cleanWord);
    });
}

// Helper function to detect question type
function detectQuestionType(query) {
    const lowerQuery = query.toLowerCase().trim();
    const firstWord = lowerQuery.split(/\s+/)[0];
    
    const questionTypes = {
        'where': 'location',
        'what': 'definition/identification',
        'how': 'process/method',
        'why': 'reason/explanation',
        'when': 'time',
        'who': 'person/identity',
        'which': 'choice/selection',
        'whose': 'ownership',
        'whom': 'person (object)'
    };
    
    return questionTypes[firstWord] || 'general query';
}

// Helper function to detect topics from keywords
function detectTopics(keywords) {
    const detectedTopics = [];
    
    for (const [topic, topicWords] of Object.entries(topicKeywords)) {
        if (keywords.some(kw => topicWords.includes(kw))) {
            detectedTopics.push(topic);
        }
    }
    
    return detectedTopics;
}

// Helper function to find ambiguous words
function findAmbiguousWords(keywords) {
    return keywords
        .filter(kw => ambiguousWords[kw])
        .map(kw => ({ word: kw, meanings: ambiguousWords[kw] }));
}

// Helper function to detect intent modifiers
function detectIntentModifiers(keywords) {
    const modifiers = {
        quality: ['best', 'worst', 'top', 'good', 'bad', 'better', 'great', 'excellent'],
        quantity: ['most', 'least', 'many', 'few', 'all', 'some'],
        proximity: ['near', 'close', 'nearby', 'closest', 'far'],
        cost: ['cheap', 'expensive', 'affordable', 'price', 'cost', 'free'],
        time: ['fast', 'quick', 'slow', 'today', 'now', 'soon', 'latest']
    };
    
    const detected = [];
    for (const [type, words] of Object.entries(modifiers)) {
        if (keywords.some(kw => words.includes(kw))) {
            detected.push(type);
        }
    }
    
    return detected;
}

// Generate instant check messages (quick validation)
function generateInstantCheckMessages(query) {
    const messages = [];
    const keywords = extractKeywords(query);
    const questionType = detectQuestionType(query);
    
    messages.push(`⚡ Query received: "${query}"`);
    
    if (questionType !== 'general query') {
        messages.push(`⚡ Detected ${questionType} question - analyzing intent...`);
    } else {
        messages.push(`⚡ Processing general query - extracting context...`);
    }
    
    if (keywords.length > 0) {
        messages.push(`⚡ Keywords identified: ${keywords.slice(0, 3).join(', ')}`);
    } else {
        messages.push(`⚡ Parsing query structure...`);
    }
    
    messages.push(`⚡ Initial validation complete - escalating to deep analysis...`);
    
    return messages;
}

// Generate deep check messages (complex analysis)
function generateDeepCheckMessages(query) {
    const messages = [];
    const keywords = extractKeywords(query);
    const questionType = detectQuestionType(query);
    const topics = detectTopics(keywords);
    const ambiguous = findAmbiguousWords(keywords);
    const modifiers = detectIntentModifiers(keywords);
    
    messages.push(`🔍 Deep analysis: Connecting to knowledge databases...`);
    
    if (keywords.length > 0) {
        messages.push(`🔍 Analyzing keywords: ${keywords.slice(0, 3).join(', ')}...`);
    } else {
        messages.push(`🔍 Extracting semantic meaning...`);
    }
    
    if (questionType !== 'general query') {
        messages.push(`🔍 Query type: ${questionType} - Searching relevant sources...`);
    } else {
        messages.push(`🔍 Cross-referencing multiple knowledge domains...`);
    }
    
    if (topics.length > 0) {
        messages.push(`🔍 Topics identified: ${topics.join(', ')} - Retrieving data...`);
    } else {
        messages.push(`🔍 Scanning broad knowledge base...`);
    }
    
    if (ambiguous.length > 0) {
        const ambWord = ambiguous[0];
        messages.push(`⚠️ Ambiguity detected: "${ambWord.word}" has ${ambWord.meanings.length} interpretations...`);
    } else {
        messages.push(`🔍 Checking contextual relevance...`);
    }
    
    messages.push(`🧠 Neural network processing... Complexity: HIGH`);
    messages.push(`🧠 Weighing multiple data sources...`);
    
    if (modifiers.length > 0) {
        messages.push(`⚠️ Subjective criteria detected: ${modifiers.join(', ')} - No objective ranking available`);
    } else {
        messages.push(`⚠️ Query scope exceeds available knowledge base...`);
    }
    
    messages.push(`❌ Deep analysis inconclusive...`);
    messages.push(`❌ Unable to provide accurate answer...`);
    messages.push(`🤖 System decision: Provide alternative satisfying content`);
    messages.push(`🦆 Deploying universal satisfaction protocol...`);
    
    return messages;
}

// Generate duck results
function generateDuckResults(query) {
    const titles = [
        "Oops! Here are ducks instead! 🦆",
        "Search Failed Successfully! 🎉",
        "404: Answer Not Found, But Ducks Found! 🦆",
        "We Tried... Here Are Ducks! 💙",
        "Your Results: 100% Duck! 🦆",
        "Plot Twist: It's All Ducks! ✨"
    ];
    
    const subtitles = [
        "We couldn't figure out what you wanted, but we hope these ducks make you smile!",
        "Our sophisticated AI decided that ducks are the answer to everything.",
        "After extensive analysis, we determined that showing you ducks was the best option.",
        "We gave up trying to understand your query. Please enjoy these ducks instead!",
        "The algorithm has spoken: More ducks, less confusion!",
        "Sometimes the best answer isn't an answer at all. It's ducks."
    ];
    
    const captions = [
        "Look at this adorable duck! 🦆",
        "Ducks make everything better! 💙",
        "Who doesn't love ducks? 🌟",
        "Quack quack! 🎉",
        "This duck gets it! 🦆✨",
        "Duck pics > Search results 🎨"
    ];
    
    // Generate 6 random duck images
    const ducks = [];
    for (let i = 0; i < 6; i++) {
        ducks.push({
            url: `https://random-d.uk/api/${70 + i}.jpg`, // Use sequential duck IDs
            caption: captions[i % captions.length]
        });
    }
    
    return {
        title: titles[Math.floor(Math.random() * titles.length)],
        subtitle: subtitles[Math.floor(Math.random() * subtitles.length)],
        ducks: ducks
    };
}

// ===== END FRONTEND QUERY ANALYSIS =====

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
        // STAGE 1: INSTANT CHECK (Quick analysis) - ALL FRONTEND
        console.log('Starting instant check...');
        const instantMessages = generateInstantCheckMessages(query);
        
        // Display instant check messages (quick)
        await displayInstantCheckMessages(instantMessages);
        
        // Add a pause after instant check completes
        await sleep(2000);
        
        // STAGE 2: DEEP CHECK (15 seconds with animation and visual effects) - ALL FRONTEND
        console.log('Starting deep check with animation...');
        const deepMessages = generateDeepCheckMessages(query);
        
        // Play canvas animation with glitch and display deep check messages with visual effects
        try {
            await performDeepCheckWithAnimation(deepMessages, query);
        } catch (err) {
            console.error('Deep check animation error:', err);
            throw err;
        }
        
        // STAGE 3: Generate and show duck results - ALL FRONTEND
        console.log('Generating duck results...');
        const resultsData = generateDuckResults(query);
        
        // Show duck results
        showResults(resultsData);
        
    } catch (error) {
        console.error('Error:', error);
        thoughtProcess.innerHTML = '<span class="thought">Something went wrong! Showing backup ducks...</span>';
        
        setTimeout(() => {
            showResults({
                title: "Error! But Ducks to the Rescue! 🦆",
                subtitle: "Something went wrong, but we've got backup content!",
                ducks: [
                    { url: "https://random-d.uk/api/70.jpg", caption: "Emergency duck #1! 🦆" },
                    { url: "https://random-d.uk/api/71.jpg", caption: "Emergency duck #2! 🦆" },
                    { url: "https://random-d.uk/api/72.jpg", caption: "Emergency duck #3! 🦆" }
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

// Deep Check Canvas Animation Class - 3D Tunnel/Wormhole
class DeepCheckAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.animationFrame = null;
        this.startTime = Date.now();
        
        // Tunnel parameters (reduced for performance)
        this.numSlices = 50;
        this.baseRadius = 150;
        this.perspectiveScale = 0.003;
        this.spinSpeed = 0.5;
        this.twistAmount = 0.02;
        this.travelSpeed = 0.8;
        this.zLoop = 300;
        
        // Strand parameters (reduced for performance)
        this.numFilaments = 2;
        this.noiseFreq = 8;
        this.noiseAmp = 0.15;
        this.segmentsPerRing = 12;
        
        // Fog and glow
        this.fogDepth = 500;
        this.thickNear = 3;
        this.thinFar = 0.5;
        
        // Camera shake/drift
        this.drift = 15;
        
        // Mouse tracking for interactive center
        this.mouseX = null;
        this.mouseY = null;
        this.targetCX = this.canvas.width / 2;
        this.targetCY = this.canvas.height / 2;
        this.smoothing = 0.03; // How fast center follows mouse (0-1, lower = more delay)
        
        // Particles with depth (reduced for performance)
        this.particles = [];
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                angle: Math.random() * Math.PI * 2,
                radius: 50 + Math.random() * 200,
                z: Math.random() * this.zLoop,
                speed: 0.3 + Math.random() * 0.5,
                size: 2 + Math.random() * 3,
                offset: Math.random() * Math.PI * 2
            });
        }
        
        // Data streams with 3D (reduced for performance)
        this.dataStreams = [];
        for (let i = 0; i < 4; i++) {
            this.dataStreams.push({
                angle: Math.random() * Math.PI * 2,
                radius: 100 + Math.random() * 150,
                z: Math.random() * this.zLoop,
                speed: 1 + Math.random() * 2,
                text: this.generateRandomData(),
                offset: Math.random() * Math.PI * 2
            });
        }
        
        // Noise table for performance
        this.noiseTable = this.generateNoiseTable(256);
        
        // Flying images based on query
        this.flyingImages = [];
        this.imageQueue = [];
        this.lastImageSpawn = 0;
        this.imageSpawnInterval = 2500; // Spawn new image every 2.5 seconds (slower)
        
        // Flying contextual text
        this.flyingTexts = [];
        this.textQueue = [];
        this.lastTextSpawn = 0;
        this.textSpawnInterval = 1800; // Spawn text more frequently than images
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Track mouse movement
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Reset to center when mouse leaves
        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = null;
            this.mouseY = null;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cx = this.canvas.width / 2;
        this.cy = this.canvas.height / 2;
    }
    
    generateNoiseTable(size) {
        const table = [];
        for (let i = 0; i < size; i++) {
            table[i] = Math.random() * 2 - 1;
        }
        return table;
    }
    
    noise(x, y) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);
        
        const a = this.noiseTable[X] + Y;
        const b = this.noiseTable[(X + 1) & 255] + Y;
        
        const fade = t => t * t * (3 - 2 * t);
        const u = fade(xf);
        const v = fade(yf);
        
        return this.noiseTable[a & 255] * (1 - u) * (1 - v) +
               this.noiseTable[b & 255] * u * (1 - v) +
               this.noiseTable[(a + 1) & 255] * (1 - u) * v +
               this.noiseTable[(b + 1) & 255] * u * v;
    }
    
    generateRandomData() {
        const chars = '01ABCDEFXYZｱｲｳｴｵ∀∂∃∅∆∇∈∉∋';
        let result = '';
        for (let i = 0; i < 15; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Load images based on query keywords
    loadQueryImages(query) {
        const keywords = extractKeywords(query);
        let searchTerm = keywords.slice(0, 3).join(' ') || 'abstract art';
        
        // Generate 12 image URLs using Picsum (CORS-friendly alternative)
        this.imageQueue = [];
        const baseIds = [1, 10, 20, 28, 30, 40, 48, 50, 60, 70, 80, 100];
        
        for (let i = 0; i < 12; i++) {
            // Use Picsum Photos - completely open, no CORS issues
            const randomId = baseIds[i];
            const imageUrl = `https://picsum.photos/400/400?random=${randomId}`;
            this.imageQueue.push(imageUrl);
        }
        
        console.log(`Loading ${this.imageQueue.length} images for query: "${query}"`);
        
        // Generate contextual thinking text based on the query
        this.generateContextualTexts(query, keywords);
    }
    
    // Generate contextual texts that show understanding of the query
    generateContextualTexts(query, keywords) {
        const questionType = detectQuestionType(query);
        const topics = detectTopics(keywords);
        const ambiguous = findAmbiguousWords(keywords);
        
        this.textQueue = [];
        
        // Add query-specific thinking messages
        this.textQueue.push(`Processing: "${query}"`);
        this.textQueue.push(`Analyzing query structure...`);
        
        if (keywords.length > 0) {
            this.textQueue.push(`Key terms: ${keywords.slice(0, 3).join(', ')}`);
            this.textQueue.push(`Searching for: ${keywords[0]}`);
        }
        
        if (questionType !== 'general query') {
            this.textQueue.push(`Question type: ${questionType}`);
            this.textQueue.push(`Understanding your ${questionType} intent...`);
        }
        
        if (topics.length > 0) {
            this.textQueue.push(`Domain: ${topics[0]}`);
            this.textQueue.push(`Cross-referencing ${topics[0]} database...`);
        }
        
        if (ambiguous.length > 0) {
            this.textQueue.push(`Analyzing ambiguity: "${ambiguous[0].word}"`);
            this.textQueue.push(`Multiple meanings detected...`);
        }
        
        // Add thinking process messages
        this.textQueue.push(`Connecting concepts...`);
        this.textQueue.push(`Evaluating relevance...`);
        this.textQueue.push(`Checking knowledge base...`);
        this.textQueue.push(`Calculating confidence scores...`);
        this.textQueue.push(`Query complexity: HIGH`);
        this.textQueue.push(`Analyzing context depth...`);
        this.textQueue.push(`Processing semantic meaning...`);
        this.textQueue.push(`Insufficient data to answer...`);
        this.textQueue.push(`Alternative response loading...`);
        
        console.log(`Generated ${this.textQueue.length} contextual text messages`);
    }
    
    // Spawn flying images during animation
    spawnFlyingImage(time) {
        if (this.imageQueue.length === 0) return;
        
        const currentTime = Date.now();
        if (currentTime - this.lastImageSpawn < this.imageSpawnInterval) return;
        
        const imageUrl = this.imageQueue.shift();
        const img = new Image();
        // No need for crossOrigin with Picsum
        
        img.onload = () => {
            this.flyingImages.push({
                img: img,
                angle: Math.random() * Math.PI * 2,
                radius: 80 + Math.random() * 120,
                z: this.zLoop * 0.8, // Start far back
                speed: 0.5 + Math.random() * 0.5, // Much slower speed
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02, // Slower rotation
                size: 80 + Math.random() * 60, // Bigger size
                opacity: 0,
                fadeIn: true
            });
            console.log('Image loaded and added to animation');
        };
        
        img.onerror = () => {
            console.error('Failed to load image:', imageUrl);
        };
        
        img.src = imageUrl;
        this.lastImageSpawn = currentTime;
    }
    
    // Spawn flying contextual text during animation
    spawnFlyingText(time) {
        if (this.textQueue.length === 0) return;
        
        const currentTime = Date.now();
        if (currentTime - this.lastTextSpawn < this.textSpawnInterval) return;
        
        const text = this.textQueue.shift();
        
        this.flyingTexts.push({
            text: text,
            angle: Math.random() * Math.PI * 2,
            radius: 100 + Math.random() * 100,
            z: this.zLoop * 0.9, // Start far back
            speed: 0.8 + Math.random() * 0.4,
            size: 18 + Math.random() * 10,
            opacity: 0,
            fadeIn: true,
            color: `rgba(255, ${50 + Math.floor(Math.random() * 100)}, ${50 + Math.floor(Math.random() * 100)}, 1)`
        });
        
        this.lastTextSpawn = currentTime;
        console.log(`Spawned text: "${text}"`);
    }
    
    drawFlyingTexts3D(time) {
        // Spawn new texts periodically
        this.spawnFlyingText(time);
        
        // Draw and update existing texts
        for (let i = this.flyingTexts.length - 1; i >= 0; i--) {
            const textObj = this.flyingTexts[i];
            
            // Move text toward camera
            textObj.z -= textObj.speed * 0.6;
            textObj.angle += 0.002; // Very slow spiral
            
            // Fade in when spawned
            if (textObj.fadeIn && textObj.opacity < 1) {
                textObj.opacity += 0.04;
                if (textObj.opacity >= 1) textObj.fadeIn = false;
            }
            
            // Remove if too close
            if (textObj.z < 10) {
                this.flyingTexts.splice(i, 1);
                continue;
            }
            
            const proj = this.project3D(textObj.angle, textObj.radius, textObj.z, time);
            const zNorm = textObj.z / this.zLoop;
            const alpha = Math.max(0, Math.min(1, (1 - zNorm) * textObj.opacity));
            
            if (alpha < 0.05) continue;
            
            const fontSize = textObj.size * proj.scale * 1.5;
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha * 0.9;
            this.ctx.font = `bold ${fontSize}px monospace`;
            this.ctx.fillStyle = textObj.color.replace('1)', `${alpha})`);
            this.ctx.shadowColor = 'rgba(255, 51, 51, 0.8)';
            this.ctx.shadowBlur = 15;
            
            // Center the text
            const metrics = this.ctx.measureText(textObj.text);
            this.ctx.fillText(textObj.text, proj.x - metrics.width / 2, proj.y);
            
            this.ctx.restore();
        }
    }
    
    drawFlyingImages3D(time) {
        // Spawn new images periodically
        this.spawnFlyingImage(time);
        
        console.log(`Flying images count: ${this.flyingImages.length}`);
        
        // Draw and update existing images
        for (let i = this.flyingImages.length - 1; i >= 0; i--) {
            const imageObj = this.flyingImages[i];
            
            // Move image toward camera (slower)
            imageObj.z -= imageObj.speed * 0.5;
            imageObj.angle += 0.003; // Much slower spiral motion
            imageObj.rotation += imageObj.rotationSpeed;
            
            // Fade in when spawned
            if (imageObj.fadeIn && imageObj.opacity < 1) {
                imageObj.opacity += 0.05; // Faster fade in
                if (imageObj.opacity >= 1) imageObj.fadeIn = false;
            }
            
            // Remove if too close or fade out
            if (imageObj.z < 5) {
                console.log('Removing image that got too close');
                this.flyingImages.splice(i, 1);
                continue;
            }
            
            const proj = this.project3D(imageObj.angle, imageObj.radius, imageObj.z, time);
            const zNorm = imageObj.z / this.zLoop;
            const alpha = Math.max(0, Math.min(1, (1 - zNorm) * imageObj.opacity));
            
            if (alpha < 0.05) continue;
            
            // Make images bigger and more visible
            const size = imageObj.size * proj.scale * 2;
            
            console.log(`Drawing image at (${proj.x}, ${proj.y}), size: ${size}, alpha: ${alpha}, z: ${imageObj.z}`);
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha * 0.9; // Make more opaque
            this.ctx.translate(proj.x, proj.y);
            this.ctx.rotate(imageObj.rotation);
            
            // Draw image with red glow
            this.ctx.shadowColor = 'rgba(255, 51, 51, 0.8)';
            this.ctx.shadowBlur = 30 * proj.scale;
            this.ctx.drawImage(imageObj.img, -size / 2, -size / 2, size, size);
            
            this.ctx.restore();
        }
    }
    
    getColorByDepth(z, zNormalized) {
        // Near: bright red/orange, Far: deep crimson/burgundy
        const r = 255;
        const g = Math.floor(80 - (80 - 20) * zNormalized);
        const b = Math.floor(60 - (60 - 30) * zNormalized);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    drawTunnel(time) {
        // Update target position based on mouse
        if (this.mouseX !== null && this.mouseY !== null) {
            this.targetCX = this.mouseX;
            this.targetCY = this.mouseY;
        } else {
            // Return to center when no mouse
            this.targetCX = this.canvas.width / 2;
            this.targetCY = this.canvas.height / 2;
        }
        
        // Smoothly interpolate current position to target
        this.cx += (this.targetCX - this.cx) * this.smoothing;
        this.cy += (this.targetCY - this.cy) * this.smoothing;
        
        // Add subtle drift on top of mouse position
        const cx = this.cx + Math.sin(time * 0.3) * (this.drift * 0.3);
        const cy = this.cy + Math.cos(time * 0.25) * (this.drift * 0.3);
        
        // Use additive blending for tunnel layers
        this.ctx.globalCompositeOperation = 'lighter';
        
        // Draw slices from far to near
        for (let i = this.numSlices - 1; i >= 0; i--) {
            let z = (i / this.numSlices) * this.zLoop;
            z = (z + time * this.travelSpeed * 10) % this.zLoop;
            
            if (z < 1) z = 1; // Avoid division by zero
            
            const zNormalized = z / this.zLoop;
            const perspective = 1 / (z * this.perspectiveScale + 0.1);
            const radius = this.baseRadius * perspective;
            
            // Rotation increases with depth (spiral)
            const rotation = time * this.spinSpeed + z * this.twistAmount;
            
            // Fog/depth fade
            const alpha = Math.max(0, Math.min(1, 1 - z / this.fogDepth));
            const lineWidth = this.thickNear + (this.thinFar - this.thickNear) * zNormalized;
            
            if (alpha < 0.01) continue;
            
            const color = this.getColorByDepth(z, zNormalized);
            
            // Draw multiple filaments per ring
            for (let f = 0; f < this.numFilaments; f++) {
                const filamentOffset = (f / this.numFilaments) * Math.PI * 2;
                
                this.ctx.beginPath();
                this.ctx.strokeStyle = color.replace('rgb', 'rgba').replace(')', `, ${alpha * 0.6})`);
                this.ctx.lineWidth = lineWidth;
                
                for (let seg = 0; seg <= this.segmentsPerRing; seg++) {
                    const angle = (seg / this.segmentsPerRing) * Math.PI * 2 + rotation + filamentOffset;
                    
                    // Add noise distortion
                    const noiseValue = this.noise(
                        angle * this.noiseFreq + time * 0.5,
                        z * 0.1 + f * 0.5
                    );
                    const rDistort = radius * (1 + noiseValue * this.noiseAmp);
                    
                    const x = cx + Math.cos(angle) * rDistort;
                    const y = cy + Math.sin(angle) * rDistort;
                    
                    if (seg === 0) {
                        this.ctx.moveTo(x, y);
                    } else {
                        this.ctx.lineTo(x, y);
                    }
                }
                
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
        
        // Reset composite operation
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    drawVignette() {
        const gradient = this.ctx.createRadialGradient(
            this.cx, this.cy, 0,
            this.cx, this.cy, Math.max(this.canvas.width, this.canvas.height) * 0.7
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    project3D(angle, radius, z, time) {
        // Use the same smooth center position as the tunnel
        const cx = this.cx + Math.sin(time * 0.3) * (this.drift * 0.3);
        const cy = this.cy + Math.cos(time * 0.25) * (this.drift * 0.3);
        
        const perspective = 1 / (z * this.perspectiveScale + 0.1);
        const r = radius * perspective;
        
        // Add spiral flow
        const flowAngle = angle + z * 0.01 + time * 0.3;
        
        return {
            x: cx + Math.cos(flowAngle) * r,
            y: cy + Math.sin(flowAngle) * r,
            scale: perspective,
            z: z
        };
    }
    
    drawParticles3D(time) {
        this.particles.forEach(particle => {
            // Move particle through tunnel
            particle.z -= this.travelSpeed * 2;
            if (particle.z < 0) particle.z += this.zLoop;
            
            // Spiral inward slightly
            particle.angle += 0.005;
            particle.radius = Math.max(30, particle.radius - 0.1);
            
            const proj = this.project3D(particle.angle, particle.radius, particle.z, time);
            const zNorm = particle.z / this.zLoop;
            const alpha = Math.max(0, 1 - zNorm);
            
            if (alpha < 0.05) return;
            
            const size = particle.size * proj.scale * 2;
            
            // Pink-red particles for contrast
            this.ctx.fillStyle = `rgba(255, 100, 120, ${alpha * 0.8})`;
            this.ctx.beginPath();
            this.ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Glow with slight variation
            this.ctx.fillStyle = `rgba(255, 80, 100, ${alpha * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(proj.x, proj.y, size * 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawDataStreams3D(time) {
        this.dataStreams.forEach(stream => {
            // Move through tunnel
            stream.z -= this.travelSpeed * 1.5;
            if (stream.z < 0) {
                stream.z += this.zLoop;
                stream.text = this.generateRandomData();
            }
            
            // Spiral inward
            stream.angle += 0.008;
            
            const proj = this.project3D(stream.angle, stream.radius, stream.z, time);
            const zNorm = stream.z / this.zLoop;
            const alpha = Math.max(0, 1 - zNorm);
            
            if (alpha < 0.05) return;
            
            const fontSize = 10 + proj.scale * 5;
            this.ctx.font = `${fontSize}px monospace`;
            // Bright scarlet for data streams
            this.ctx.fillStyle = `rgba(255, 36, 36, ${alpha * 0.7})`;
            this.ctx.fillText(stream.text, proj.x - 30, proj.y);
            
            // Trailing effect with darker red
            for (let i = 1; i < 3; i++) {
                const trailZ = stream.z + i * 10;
                if (trailZ < this.zLoop) {
                    const trailProj = this.project3D(stream.angle, stream.radius, trailZ, time);
                    const trailAlpha = alpha * (1 - i * 0.3);
                    this.ctx.fillStyle = `rgba(200, 20, 20, ${trailAlpha * 0.5})`;
                    this.ctx.fillText(stream.text, trailProj.x - 30, trailProj.y);
                }
            }
        });
    }
    
    animate() {
        if (!this.running) return;
        
        const time = (Date.now() - this.startTime) * 0.001;
        
        // Fade instead of full clear for trails
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw layers in order
        this.drawTunnel(time);
        this.drawParticles3D(time);
        this.drawDataStreams3D(time);
        this.drawFlyingTexts3D(time); // Add flying contextual texts
        this.drawFlyingImages3D(time); // Add flying images
        this.drawVignette();
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    start(query) {
        this.running = true;
        this.startTime = Date.now();
        this.lastImageSpawn = Date.now();
        this.lastTextSpawn = Date.now();
        
        // Load images based on search query
        if (query) {
            this.loadQueryImages(query);
        }
        
        this.animate();
    }
    
    stop() {
        this.running = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Deep check with canvas animation and visual effects (15 seconds)
async function performDeepCheckWithAnimation(deepMessages, query) {
    const deepCheckContainer = document.getElementById('deepCheckContainer');
    const canvas = document.getElementById('deepCheckCanvas');
    const glitchOverlay = document.getElementById('glitchOverlay');
    const screenFlash = document.getElementById('screenFlash');
    const horizontalStream = document.getElementById('horizontalStream');
    
    return new Promise((resolve) => {
        // Hide horizontal stream and deactivate portal
        portalActive = false;
        if (horizontalStream) {
            horizontalStream.style.display = 'none';
        }
        
        // Trigger glitch effect
        glitchOverlay.classList.add('active');
        screenFlash.classList.add('active');
        
        deepCheckContainer.classList.remove('hidden');
        deepCheckContainer.style.opacity = '0';
        
        setTimeout(() => {
            glitchOverlay.classList.remove('active');
            screenFlash.classList.remove('active');
            
            mainContainer.style.display = 'none';
            
            deepCheckContainer.classList.add('show');
            deepCheckContainer.style.opacity = '1';
            
            // Start canvas animation with query for image loading
            const animation = new DeepCheckAnimation(canvas);
            animation.start(query);
            
            // Remove overlay text - just show animation
            // displayDeepCheckOverlay(deepMessages, deepCheckContainer);
            
        }, 800);
        
        // Animation plays for 30 seconds, then ends
        setTimeout(() => {
            deepCheckContainer.style.opacity = '0';
            
            setTimeout(() => {
                deepCheckContainer.classList.remove('show');
                deepCheckContainer.classList.add('hidden');
                mainContainer.style.display = 'block';
                
                if (horizontalStream) {
                    horizontalStream.style.display = 'block';
                }
                
                resolve();
            }, 300);
        }, 30000); // 30 seconds total
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
