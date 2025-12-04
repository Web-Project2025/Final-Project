const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

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
    'bat': ['animal', 'sports equipment'],
    'key': ['lock opener', 'musical note', 'important factor'],
    'date': ['fruit', 'calendar day', 'romantic meeting'],
    'mine': ['possessive', 'excavation site', 'explosive device'],
    'crane': ['bird', 'construction equipment', 'to stretch neck']
};

// Topic categories for more specific confusion
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

// Duck images data
const duckImages = [
    {
        url: "https://random-d.uk/api/randomimg",
        caption: "Look at this adorable duck! 🦆"
    },
    {
        url: "https://random-d.uk/api/randomimg",
        caption: "Ducks make everything better! 💙"
    },
    {
        url: "https://random-d.uk/api/randomimg",
        caption: "Who doesn't love ducks? 🌟"
    },
    {
        url: "https://random-d.uk/api/randomimg",
        caption: "Quack quack! 🎉"
    },
    {
        url: "https://random-d.uk/api/randomimg",
        caption: "This duck gets it! 🦆✨"
    },
    {
        url: "https://random-d.uk/api/randomimg",
        caption: "Duck pics > Search results 🎨"
    }
];

// Result titles and subtitles
const resultTitles = [
    "Oops! Here are ducks instead! 🦆",
    "Search Failed Successfully! 🎉",
    "404: Answer Not Found, But Ducks Found! 🦆",
    "We Tried... Here Are Ducks! 💙",
    "Your Results: 100% Duck! 🦆",
    "Plot Twist: It's All Ducks! ✨"
];

const resultSubtitles = [
    "We couldn't figure out what you wanted, but we hope these ducks make you smile!",
    "Our sophisticated AI decided that ducks are the answer to everything.",
    "After extensive analysis, we determined that showing you ducks was the best option.",
    "We gave up trying to understand your query. Please enjoy these ducks instead!",
    "The algorithm has spoken: More ducks, less confusion!",
    "Sometimes the best answer isn't an answer at all. It's ducks."
];

// Helper function to extract meaningful keywords (removing filler words)
function extractKeywords(query) {
    const words = query.toLowerCase().split(/\s+/);
    return words.filter(word => {
        // Remove punctuation
        const cleanWord = word.replace(/[.,!?;:'"]/g, '');
        // Keep only words that aren't filler words and are at least 2 chars
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

// Main function to generate intelligent thinking messages
function generateThinkingMessages(query) {
    const messages = [];
    const keywords = extractKeywords(query);
    const questionType = detectQuestionType(query);
    const topics = detectTopics(keywords);
    const ambiguous = findAmbiguousWords(keywords);
    const modifiers = detectIntentModifiers(keywords);
    
    // Message 0: Initial query received
    messages.push(`Query received: "${query}"`);
    
    // Message 1: Recognize the query type
    if (questionType !== 'general query') {
        const typeDescriptions = {
            'location': 'location-style question: the user is asking WHERE something is',
            'definition/identification': 'definitional question: the user wants to know WHAT something is',
            'process/method': 'process question: the user wants to know HOW something works',
            'reason/explanation': 'explanatory question: the user is asking WHY something happens',
            'time': 'temporal question: the user wants to know WHEN something occurs',
            'person/identity': 'identity question: the user wants to know WHO someone is',
            'choice/selection': 'selection question: the user is choosing between options'
        };
        messages.push(`Intent detected: ${typeDescriptions[questionType]}.`);
    } else {
        messages.push(`Intent detected: General query (no specific question word found).`);
    }
    
    // Message 2: Show extracted keywords
    if (keywords.length > 0) {
        const keywordList = keywords.slice(0, 5).join(', ');
        messages.push(`Keywords extracted: ${keywordList}`);
    } else {
        messages.push(`Keywords extracted: (unable to identify meaningful terms)`);
    }
    
    // Message 3: Check for ambiguous words
    if (ambiguous.length > 0) {
        const ambWord = ambiguous[0];
        messages.push(`⚠️ Ambiguous term found: '${ambWord.word}' could mean ${ambWord.meanings.slice(0, 2).join(' OR ')}...`);
    } else if (topics.length > 0) {
        messages.push(`Topic areas detected: ${topics.join(', ')}`);
    } else if (keywords.length > 3) {
        messages.push(`Cross-referencing multiple concepts...`);
    } else {
        messages.push(`Searching knowledge base...`);
    }
    
    // Message 4: Show modifiers or complexity
    if (modifiers.length > 0) {
        const modList = modifiers.map(m => m.toUpperCase()).join(' + ');
        messages.push(`Detected criteria: ${modList} (requires ranking/comparison)`);
    } else if (topics.length > 1) {
        messages.push(`This spans ${topics.length} different knowledge domains...`);
    } else if (ambiguous.length > 0) {
        messages.push(`Analyzing possible interpretations...`);
    } else {
        messages.push(`Diving deeper into context...`);
    }
    
    // Message 5: Show confusion building
    if (ambiguous.length > 0) {
        messages.push(`🤔 Wait... this could mean several different things...`);
    } else if (topics.length > 1) {
        messages.push(`🤔 Multiple knowledge areas intersecting. Complexity level: HIGH`);
    } else if (modifiers.includes('quality') || modifiers.includes('proximity')) {
        messages.push(`🤔 Need to compare options, check ratings, calculate rankings...`);
    } else if (keywords.length > 4) {
        messages.push(`🤔 Too many variables to process simultaneously...`);
    } else {
        messages.push(`🤔 This is more complex than initially calculated...`);
    }
    
    // Message 6: Struggle with complexity
    if (ambiguous.length > 0) {
        messages.push(`⚠️ Cannot determine which interpretation to use...`);
    } else if (questionType === 'process/method') {
        messages.push(`⚠️ This requires detailed technical explanation beyond my capacity...`);
    } else if (questionType === 'reason/explanation') {
        messages.push(`⚠️ Scientific reasoning module overloaded...`);
    } else if (modifiers.includes('quality')) {
        messages.push(`⚠️ "Best" is subjective! I don't have preference algorithms!`);
    } else if (keywords.length > 4) {
        messages.push(`⚠️ Neural pathways saturated. Cannot process all variables...`);
    } else {
        messages.push(`⚠️ Complexity threshold exceeded...`);
    }
    
    // Message 7: System overload
    const overloadMessages = [
        `🚨 SYSTEM OVERLOAD: Query too complex for simple search engine`,
        `🚨 ERROR: Insufficient processing power for this query`,
        `🚨 CRITICAL: My tiny brain cannot handle this level of analysis`,
        `🚨 FAILURE: Analysis pipeline has reached breaking point`,
        `🚨 ABORT: This is beyond my programming capabilities`
    ];
    messages.push(overloadMessages[Math.floor(Math.random() * overloadMessages.length)]);
    
    // Message 8: Giving up
    const giveUpMessages = [
        `Backend decision: Give up and activate fallback protocol`,
        `Backend decision: Abandon query analysis, deploy alternative`,
        `Backend decision: Cannot resolve query, switching to Plan B`,
        `Backend decision: Analysis failed, engaging emergency protocol`,
        `Backend decision: Too complicated, using backup strategy`
    ];
    messages.push(giveUpMessages[Math.floor(Math.random() * giveUpMessages.length)]);
    
    // Message 9: Duck protocol
    messages.push(`🦆 ACTIVATING DUCK PROTOCOL - Everyone loves ducks!`);
    
    return messages;
}

// Generate instant check messages (quick, no mention of content like images or videos)
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

// Generate deep check messages (complex analysis mentioning various topics, but NOT images)
function generateDeepCheckMessages(query) {
    const messages = [];
    const keywords = extractKeywords(query);
    const questionType = detectQuestionType(query);
    const topics = detectTopics(keywords);
    const ambiguous = findAmbiguousWords(keywords);
    const modifiers = detectIntentModifiers(keywords);
    
    // Deep analysis messages
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

// Helper function to analyze query (for console logging)
function analyzeQuery(query) {
    console.log("\n=== Backend Query Analysis ===");
    console.log(`Query received: "${query}"`);
    
    const keywords = extractKeywords(query);
    const questionType = detectQuestionType(query);
    const topics = detectTopics(keywords);
    const ambiguous = findAmbiguousWords(keywords);
    const modifiers = detectIntentModifiers(keywords);
    
    console.log(`Question Type: ${questionType}`);
    console.log(`Keywords: ${keywords.join(', ')}`);
    console.log(`Topics: ${topics.length > 0 ? topics.join(', ') : 'None detected'}`);
    console.log(`Ambiguous Words: ${ambiguous.length > 0 ? ambiguous.map(a => a.word).join(', ') : 'None'}`);
    console.log(`Intent Modifiers: ${modifiers.length > 0 ? modifiers.join(', ') : 'None'}`);
    console.log("Backend decision: Generate custom thinking messages, then show ducks 🦆");
    console.log("================================\n");
    
    return { 
        keywords: keywords.join(', '), 
        questionType, 
        topics: topics.join(', ') || 'None',
        ambiguous: ambiguous.length > 0 ? ambiguous.map(a => a.word).join(', ') : 'None',
        modifiers: modifiers.join(', ') || 'None'
    };
}

// Helper function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// API endpoint for instant check (quick analysis)
app.post('/api/instant-check', (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    
    console.log(`\n=== INSTANT CHECK ===`);
    console.log(`Query: "${query}"`);
    
    const instantMessages = generateInstantCheckMessages(query);
    
    console.log(`Generated ${instantMessages.length} instant check messages`);
    console.log(`=====================\n`);
    
    res.json({
        success: true,
        query: query,
        analysis: 'Quick validation complete',
        instantMessages: instantMessages
    });
});

// API endpoint for deep check (complex 15-second analysis)
app.post('/api/deep-check', (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    
    console.log(`\n=== DEEP CHECK ===`);
    const analysis = analyzeQuery(query);
    
    const deepMessages = generateDeepCheckMessages(query);
    
    console.log(`Generated ${deepMessages.length} deep check messages`);
    console.log(`==================\n`);
    
    res.json({
        success: true,
        query: query,
        analysis: analysis,
        deepMessages: deepMessages
    });
});

// API endpoint to get thinking messages (legacy endpoint, kept for compatibility)
app.post('/api/search', (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    
    // Analyze the query on the backend
    const analysis = analyzeQuery(query);
    
    // Generate intelligent, query-specific thinking messages
    const customThinkingMessages = generateThinkingMessages(query);
    
    console.log(`Generated ${customThinkingMessages.length} custom thinking messages`);
    
    // Return thinking messages for the frontend to display
    res.json({
        success: true,
        query: query,
        analysis: analysis,
        thinkingMessages: customThinkingMessages
    });
});

// API endpoint to get final results (duck images)
app.post('/api/results', (req, res) => {
    const { query } = req.body;
    
    // Shuffle ducks and select a random title/subtitle
    const shuffledDucks = shuffleArray(duckImages);
    const randomTitle = resultTitles[Math.floor(Math.random() * resultTitles.length)];
    const randomSubtitle = resultSubtitles[Math.floor(Math.random() * resultSubtitles.length)];
    
    console.log(`Sending duck results for query: "${query}"`);
    
    // Send back the results
    res.json({
        success: true,
        title: randomTitle,
        subtitle: randomSubtitle,
        ducks: shuffledDucks,
        message: "Backend successfully failed to find relevant results! 🦆"
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🔍 DuckSearch Backend Server Running!`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📡 API Endpoints:`);
    console.log(`   - POST /api/instant-check (Quick validation)`);
    console.log(`   - POST /api/deep-check (Deep analysis)`);
    console.log(`   - POST /api/search (Legacy full analysis)`);
    console.log(`   - POST /api/results (Get duck results)`);
    console.log(`\n🦆 Ready to simulate two-stage search analysis!\n`);
});
