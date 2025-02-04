// Intersection Observer for fade-in animations
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const fadeOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeInElements.forEach(element => fadeOnScroll.observe(element));

// Animated counter for statistics
const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
};

// Dynamic trading volume counter
const updateTradingVolume = () => {
    const volumeElement = document.querySelector('.trading-volume');
    const currentVolume = parseFloat(volumeElement.dataset.value);
    const newVolume = currentVolume + Math.random() * 1000;
    volumeElement.textContent = `$${newVolume.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    volumeElement.dataset.value = newVolume;
};

setInterval(updateTradingVolume, 3000);

// Countdown timer for special offer
const startCountdown = (duration, display) => {
    let timer = duration,
        minutes, seconds;

    const countdown = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(countdown);
            display.textContent = "Offer ended";
        }
    }, 1000);
};

// Form submission handler
const form = document.querySelector('.trial-form');
if (form) {
    form.addEventListener('submit', async(e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        try {
            const response = await fetch('http://localhost:8080/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Show success message
                form.style.display = 'none';
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message fade-in';
                successMessage.innerHTML = `
                    <h3>🎉 Thank you for signing up!</h3>
                    <p>We'll contact you shortly to get you started.</p>
                `;
                form.parentNode.appendChild(successMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    });
}

// Live signup counter
const updateSignupCount = () => {
    const signupElement = document.querySelector('.signup-count');
    if (!signupElement) return;

    const baseCount = 23;
    const randomIncrease = Math.floor(Math.random() * 3);
    const newCount = baseCount + randomIncrease;

    signupElement.textContent = `${newCount} people signed up in the last hour`;
};

setInterval(updateSignupCount, 30000); // Update every 30 seconds

// Add floating label functionality
document.querySelectorAll('.float-label input').forEach(input => {
    // Set initial state
    if (input.value) {
        input.parentElement.classList.add('has-value');
    }

    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        if (!input.value) {
            input.parentElement.classList.remove('has-value');
        }
    });

    input.addEventListener('input', () => {
        if (input.value) {
            input.parentElement.classList.add('has-value');
        } else {
            input.parentElement.classList.remove('has-value');
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Start countdown timer (15 minutes)
    const timerDisplay = document.querySelector('.offer-timer');
    if (timerDisplay) {
        startCountdown(15 * 60, timerDisplay);
    }

    // Initialize statistics animation
    document.querySelectorAll('.stat-item h3').forEach(stat => {
        const value = parseFloat(stat.textContent.replace(/[^0-9.]/g, ''));
        if (!isNaN(value)) {
            animateValue(stat, 0, value, 2000);
        }
    });
});

// Live profit ticker
const profits = [
    { user: '#4582', amount: 890 },
    { user: '#3291', amount: 1240 },
    { user: '#7823', amount: 650 },
    { user: '#9156', amount: 920 },
    { user: '#2478', amount: 1580 },
];

const updateProfits = () => {
    const tickerContent = document.querySelector('.ticker-content');
    if (!tickerContent) return;

    // Add random profit variations
    profits.forEach(profit => {
        profit.amount += Math.floor(Math.random() * 50) - 20;
    });

    // Update DOM
    tickerContent.innerHTML = profits.map(profit => `
        <div class="ticker-item">
            <span class="profit-dot"></span>
            <span>User ${profit.user}: +$${profit.amount.toLocaleString()}</span>
        </div>
    `).join('');
};

setInterval(updateProfits, 300000); // Update every 5 minutes

// Canadian cities data
const canadianCities = [
    { name: 'Toronto', users: 47 },
    { name: 'Montreal', users: 35 },
    { name: 'Vancouver', users: 29 },
    { name: 'Calgary', users: 23 },
    // Add more cities as needed
];

// Show random signup notifications
const showSignupNotification = () => {
    const city = canadianCities[Math.floor(Math.random() * canadianCities.length)];
    const dot = document.querySelector(`[data-city="${city.name}"]`);
    if (!dot) return;

    const notification = document.createElement('div');
    notification.className = 'signup-indicator';
    notification.textContent = `New trader from ${city.name}!`;

    const dotRect = dot.getBoundingClientRect();
    const mapContainer = document.querySelector('.canada-map');
    const containerRect = mapContainer.getBoundingClientRect();

    notification.style.left = `${dotRect.left - containerRect.left + dotRect.width/2}px`;
    notification.style.top = `${dotRect.top - containerRect.top}px`;

    mapContainer.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
};

setInterval(showSignupNotification, 5000);

// VIP spots counter
let spotsLeft = 47;
const updateSpots = () => {
    const spotsElement = document.querySelector('.spots-left');
    if (!spotsElement) return;

    if (Math.random() < 0.3 && spotsLeft > 1) { // 30% chance to decrease
        spotsLeft--;
        spotsElement.textContent = spotsLeft;

        const filledBar = document.querySelector('.spots-filled');
        if (filledBar) {
            const percentage = ((200 - spotsLeft) / 200) * 100;
            filledBar.style.width = `${percentage}%`;
        }
    }
};

setInterval(updateSpots, 30000); // Update every 30 seconds

// Live trading activity
const cities = ['New York', 'London', 'Tokyo', 'Singapore', 'Los Angeles'];
const showTradeActivity = () => {
    const dot = document.querySelector(`[data-city="${cities[Math.floor(Math.random() * cities.length)]}"]`);
    if (!dot) return;

    const notification = document.createElement('div');
    notification.className = 'activity-notification';
    notification.textContent = `New trader from ${dot.dataset.city}!`;

    const rect = dot.getBoundingClientRect();
    notification.style.left = `${rect.left}px`;
    notification.style.top = `${rect.top - 20}px`;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
};

setInterval(showTradeActivity, 5000);

// Profit calculator with monthly compounding for 365% annual ROI
const investmentSlider = document.getElementById('investmentSlider');
if (investmentSlider) {
    const updateProjection = () => {
        const investment = parseFloat(investmentSlider.value);
        const annualROI = 3.65; // 365% annual return
        const monthlyRate = annualROI / 12; // Monthly rate (30.42% per month)
        const months = 6; // 6 months projection

        // Calculate future value: FV = PV * (1 + r)^t
        const projectedValue = investment * Math.pow((1 + monthlyRate), months);

        document.querySelector('.result-value:not(.projected)').textContent =
            `$${investment.toLocaleString()}`;
        document.querySelector('.result-value.projected').textContent =
            `$${Math.round(projectedValue).toLocaleString()}`;

        // Calculate ROI percentage for 6 months
        const roi = ((projectedValue - investment) / investment) * 100;
        document.querySelector('.roi-percentage').textContent =
            `${Math.round(roi)}% ROI`;
    };

    investmentSlider.addEventListener('input', updateProjection);
    updateProjection(); // Initial calculation
}

// Enhanced quiz functionality
const quizState = {
    currentQuestion: 1,
    answers: {},
    totalQuestions: 4,
    strategies: {
        conservative: {
            name: "Conservative Growth AI",
            description: "A balanced approach focusing on steady growth while maintaining strong risk management.",
            features: [
                "Smart position sizing with max 1% risk per trade",
                "Automated stop-loss management",
                "Focus on major currency pairs",
                "24/7 market monitoring with instant alerts"
            ],
            monthlyReturn: "15-20%",
            riskLevel: "Low-Medium"
        },
        moderate: {
            name: "Balanced Growth AI",
            description: "Optimized for consistent returns while capitalizing on high-probability setups.",
            features: [
                "Dynamic position sizing up to 2% risk",
                "Multi-market opportunity scanning",
                "Advanced trend detection",
                "Real-time market adaptation"
            ],
            monthlyReturn: "20-30%",
            riskLevel: "Medium"
        },
        aggressive: {
            name: "Aggressive Growth AI",
            description: "Maximized for higher returns through advanced algorithmic strategies.",
            features: [
                "Sophisticated momentum trading",
                "Cross-market arbitrage",
                "High-frequency trading capabilities",
                "AI-powered entry/exit optimization"
            ],
            monthlyReturn: "30-45%",
            riskLevel: "Medium-High"
        }
    }
};

function updateQuizProgress() {
    const progress = (quizState.currentQuestion / quizState.totalQuestions) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.querySelector('.current-step').textContent = quizState.currentQuestion;
}

function handleOptionSelection(option) {
    document.querySelectorAll('.option-btn').forEach(btn =>
        btn.classList.remove('selected'));

    option.classList.add('selected');
    quizState.answers[quizState.currentQuestion] = option.dataset.value;
    Cookies.set('quiz_answers', JSON.stringify(quizState.answers));

    setTimeout(() => {
        if (quizState.currentQuestion < quizState.totalQuestions) {
            proceedToNextQuestion();
        } else {
            showQuizResults();
        }
    }, 500);
}

function proceedToNextQuestion() {
    const currentQuestion = document.querySelector(`.quiz-question[data-question="${quizState.currentQuestion}"]`);
    currentQuestion.classList.remove('active');

    quizState.currentQuestion++;

    const nextQuestion = document.querySelector(`.quiz-question[data-question="${quizState.currentQuestion}"]`);
    nextQuestion.classList.add('active');

    updateQuizProgress();
}

function calculateStrategy(answers) {
    // Enhanced strategy calculation logic
    let riskScore = 0;

    // Calculate risk score based on answers
    if (answers[1] === 'beginner') riskScore += 1;
    if (answers[1] === 'intermediate') riskScore += 2;
    if (answers[1] === 'advanced') riskScore += 3;

    if (answers[2] === 'conservative') riskScore += 1;
    if (answers[2] === 'moderate') riskScore += 2;
    if (answers[2] === 'aggressive') riskScore += 3;

    // Determine strategy based on risk score
    if (riskScore <= 3) return quizState.strategies.conservative;
    if (riskScore <= 5) return quizState.strategies.moderate;
    return quizState.strategies.aggressive;
}

// Initialize quiz event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.option-btn').forEach(option => {
        option.addEventListener('click', () => handleOptionSelection(option));
    });
});

// Load quiz progress if exists
document.addEventListener('DOMContentLoaded', () => {
    const savedQuizAnswers = Cookies.get('quiz_answers');
    if (savedQuizAnswers) {
        try {
            quizState.answers = JSON.parse(savedQuizAnswers);
        } catch (e) {
            console.error('Error parsing saved quiz answers:', e);
        }
    }
});

// Live trading feed
const tradePairs = [
    { symbol: 'BTC/USD', icon: '₿' },
    { symbol: 'ETH/USD', icon: 'Ξ' },
    { symbol: 'XRP/USD', icon: '✕' },
    { symbol: 'SOL/USD', icon: '◎' },
    { symbol: 'BNB/USD', icon: 'B' }
];

const addNewTrade = () => {
    const tradesStream = document.querySelector('.trades-stream');
    if (!tradesStream) return;

    const pair = tradePairs[Math.floor(Math.random() * tradePairs.length)];
    const isBuy = Math.random() > 0.5;
    const profit = (Math.random() * 1000 + 100).toFixed(2);
    const time = new Date().toLocaleTimeString();

    const tradeItem = document.createElement('div');
    tradeItem.className = 'trade-item';
    tradeItem.innerHTML = `
        <div class="trade-info">
            <div class="trade-pair">
                <span class="pair-icon">${pair.icon}</span>
                <span>${pair.symbol}</span>
            </div>
            <span class="trade-type ${isBuy ? 'buy' : 'sell'}">${isBuy ? 'BUY' : 'SELL'}</span>
        </div>
        <div class="trade-details">
            <span class="trade-profit positive">+$${profit}</span>
            <span class="trade-time">${time}</span>
        </div>
    `;

    tradesStream.insertBefore(tradeItem, tradesStream.firstChild);

    // Keep only last 10 trades
    if (tradesStream.children.length > 10) {
        tradesStream.removeChild(tradesStream.lastChild);
    }
};

// Add initial trades
for (let i = 0; i < 5; i++) {
    addNewTrade();
}

// Add new trade every few seconds
setInterval(addNewTrade, 3000);

// Update stats periodically
const updateStats = () => {
    const activeTraders = document.querySelector('.stat-value:first-child');
    const volume = document.querySelector('.stat-value:last-child');

    if (activeTraders && volume) {
        const traders = parseInt(activeTraders.textContent) + Math.floor(Math.random() * 5);
        const vol = parseFloat(volume.textContent.replace(/[^0-9.]/g, '')) +
            (Math.random() * 0.1).toFixed(1);

        activeTraders.textContent = traders.toLocaleString();
        volume.textContent = `$${vol.toFixed(1)}M`;
    }
};

setInterval(updateStats, 5000);

// Live market prices with more realistic data and updates
const coins = {
    btc: {
        price: 43521.65,
        change: 2.45,
        volatility: 0.8,
        min: 42000,
        max: 45000
    },
    eth: {
        price: 2245.80,
        change: 3.12,
        volatility: 1.2,
        min: 2100,
        max: 2400
    },
    sol: {
        price: 98.45,
        change: 5.67,
        volatility: 2.5,
        min: 90,
        max: 110
    },
    bnb: {
        price: 312.75,
        change: -0.85,
        volatility: 1.5,
        min: 300,
        max: 330
    }
};

const updatePrices = () => {
    Object.keys(coins).forEach(coin => {
        const priceCard = document.querySelector(`.price-card.${coin}`);
        if (!priceCard) return;

        const coinData = coins[coin];

        // Generate more realistic price movements
        const range = coinData.max - coinData.min;
        const movement = (Math.random() - 0.5) * coinData.volatility;
        const newPrice = Math.max(
            coinData.min,
            Math.min(
                coinData.max,
                coinData.price * (1 + movement / 100)
            )
        );

        // Calculate price change
        const priceChange = ((newPrice - coinData.price) / coinData.price) * 100;
        coinData.change = Math.max(-15, Math.min(15, coinData.change + priceChange));
        coinData.price = newPrice;

        // Update display with animations
        const priceDisplay = priceCard.querySelector('.current-price');
        const changeDisplay = priceCard.querySelector('.price-change');
        const oldPrice = parseFloat(priceDisplay.textContent.replace(/[^0-9.-]/g, ''));

        // Add price movement indicator
        const changeIndicator = priceCard.querySelector('.change-indicator');
        if (newPrice > oldPrice) {
            priceDisplay.classList.add('price-up');
            setTimeout(() => priceDisplay.classList.remove('price-up'), 1000);
        } else if (newPrice < oldPrice) {
            priceDisplay.classList.add('price-down');
            setTimeout(() => priceDisplay.classList.remove('price-down'), 1000);
        }

        // Format price based on value
        const formattedPrice = newPrice >= 1000 ?
            newPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) :
            newPrice.toFixed(3);

        priceDisplay.textContent = `$${formattedPrice}`;
        changeDisplay.textContent = `${coinData.change > 0 ? '+' : ''}${coinData.change.toFixed(2)}%`;
        changeDisplay.className = `price-change ${coinData.change > 0 ? 'positive' : 'negative'}`;

        // Update change indicator
        if (changeIndicator) {
            changeIndicator.textContent = coinData.change > 0 ? '▲' : '▼';
        }

        // Update price change wrapper background
        const changeWrapper = priceCard.querySelector('.price-change-wrapper');
        if (changeWrapper) {
            changeWrapper.style.background = coinData.change > 0 ?
                'rgba(0, 255, 157, 0.1)' :
                'rgba(255, 82, 82, 0.1)';
        }
    });

    // Update market stats
    const volumeDisplay = document.querySelector('.stat-value.volume');
    if (volumeDisplay) {
        const currentVolume = parseFloat(volumeDisplay.textContent.replace(/[^0-9.]/g, ''));
        const newVolume = currentVolume + (Math.random() - 0.5) * 0.1;
        volumeDisplay.textContent = `$${newVolume.toFixed(1)}B`;
    }
};

// Add CSS for price animations
const style = document.createElement('style');
style.textContent = `
    .current-price {
        transition: color 0.3s ease;
    }
    .price-up {
        color: var(--accent-green) !important;
        animation: priceUp 1s ease-out;
    }
    .price-down {
        color: #FF5252 !important;
        animation: priceDown 1s ease-out;
    }
    @keyframes priceUp {
        0% { transform: translateY(0); }
        20% { transform: translateY(-4px); }
        100% { transform: translateY(0); }
    }
    @keyframes priceDown {
        0% { transform: translateY(0); }
        20% { transform: translateY(4px); }
        100% { transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Update prices more frequently for a more dynamic feel
setInterval(updatePrices, 2000);

// Add keyboard shortcut (Ctrl + Alt + A) to show admin panel
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'a') {
        const adminPanel = document.getElementById('adminPanel');
        const userDataDisplay = document.getElementById('userData');

        adminPanel.style.display = 'block';
        const data = getAllUserData();
        userDataDisplay.textContent = JSON.stringify(data, null, 2);
    }
});

// Add keyboard shortcut (Ctrl + Alt + D) to show basic user data
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
        const adminPanel = document.getElementById('adminPanel');
        const userDataDisplay = document.getElementById('userData');

        adminPanel.style.display = 'block';
        const data = {
            name: Cookies.get('user_name') || 'Not provided',
            email: Cookies.get('user_email') || 'Not provided',
            phone: Cookies.get('user_phone') || 'Not provided',
            date: Cookies.get('signup_date') || 'Not provided'
        };

        userDataDisplay.textContent = JSON.stringify(data, null, 2);
    }
});

function viewUserData(type) {
    const data = getAllUserData();
    switch (type) {
        case 'basic':
            return {
                name: data.name,
                email: data.email,
                phone: data.phone
            };
        case 'technical':
            return {
                ip: data.ip,
                userAgent: data.userAgent,
                screenResolution: data.screenResolution,
                browser: data.userAgent.split(' ')[0]
            };
        case 'behavior':
            return {
                clicks: data.clicks,
                mouseMovements: data.mouseMovements,
                timeSpent: Cookies.get('time_spent'),
                maxScroll: Cookies.get('max_scroll_depth')
            };
        case 'all':
            return data;
        default:
            return data;
    }
}

// Usage in console:
// viewUserData('basic')     // Shows basic user info
// viewUserData('technical') // Shows technical data
// viewUserData('behavior')  // Shows user behavior
// viewUserData('all')      // Shows everything

function getBasicUserData() {
    return {
        name: Cookies.get('user_name'),
        email: Cookies.get('user_email'),
        phone: Cookies.get('user_phone'),
        signupDate: new Date(Cookies.get('signup_date')).toLocaleString()
    };
}

// Usage in console:
// getBasicUserData()