// Configuration
const WEBHOOK_URL = 'https://n8n-re9macilutpq.kol.sumopod.my.id/webhook/perangaiii';

// DOM Elements
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');
const quickReplies = document.getElementById('quickReplies');
const minimizeBtn = document.getElementById('minimizeChat');

// Session ID untuk tracking conversation
let sessionId = getOrCreateSessionId();

// Generate or get session ID
function getOrCreateSessionId() {
    let sid = sessionStorage.getItem('perangaiii_session_id');
    if (!sid) {
        sid = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('perangaiii_session_id', sid);
    }
    return sid;
}

// Format waktu
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Tambah pesan user ke chat
function addUserMessage(message) {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-wrapper user-message';
    
    messageWrapper.innerHTML = `
        <div class="message-content">
            <div class="message-bubble">
                <p>${escapeHtml(message)}</p>
            </div>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
        <div class="message-avatar">
            <img src="https://ui-avatars.com/api/?name=You&background=4f46e5&color=fff&bold=true" alt="You">
        </div>
    `;
    
    // Remove quick replies after first message
    if (quickReplies && quickReplies.parentNode) {
        quickReplies.remove();
    }
    
    chatMessages.appendChild(messageWrapper);
    scrollToBottom();
}

// Tambah pesan bot ke chat
function addBotMessage(message) {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-wrapper bot-message';
    
    messageWrapper.innerHTML = `
        <div class="message-avatar">
            <img src="https://ui-avatars.com/api/?name=CS&background=667eea&color=fff&bold=true" alt="CS">
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <p>${escapeHtml(message)}</p>
            </div>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageWrapper);
    scrollToBottom();
}

// Show typing indicator
function showTyping() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

// Hide typing indicator
function hideTyping() {
    typingIndicator.style.display = 'none';
}

// Scroll ke bawah
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Escape HTML untuk keamanan
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Kirim pesan ke webhook
async function sendMessageToWebhook(message) {
    try {
        const payload = {
            sessionId: sessionId,
            message: message,
            timestamp: new Date().toISOString(),
            userInfo: {
                userAgent: navigator.userAgent,
                language: navigator.language || 'id',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jakarta'
            }
        };
        
        console.log('Sending to webhook:', payload); // Debug log
        
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data); // Debug log
        return data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

// Handle form submit
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Tampilkan pesan user
    addUserMessage(message);
    messageInput.value = '';
    
    // Show typing indicator
    showTyping();
    
    try {
        // Kirim ke webhook
        const response = await sendMessageToWebhook(message);
        
        // Hide typing indicator
        hideTyping();
        
        // Tampilkan response dari webhook
        if (response) {
            console.log('Response received:', response); // Debug log
            
            // Cek berbagai kemungkinan struktur response
            if (response.success && response.message) {
                // Format dari n8n workflow Anda
                addBotMessage(response.message);
            } else if (response.reply) {
                addBotMessage(response.reply);
            } else if (response.message) {
                addBotMessage(response.message);
            } else if (typeof response === 'string') {
                addBotMessage(response);
            } else {
                addBotMessage('Terima kasih atas pesan Anda. Tim kami akan segera merespons.');
            }
        } else {
            addBotMessage('Terima kasih atas pesan Anda. Tim kami akan segera merespons.');
        }
    } catch (error) {
        hideTyping();
        addBotMessage('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi kami melalui email/WhatsApp.');
        console.error('Error details:', error);
    }
});

// Quick reply buttons
document.querySelectorAll('.quick-reply-btn').forEach(button => {
    button.addEventListener('click', () => {
        const message = button.getAttribute('data-message');
        messageInput.value = message;
        chatForm.dispatchEvent(new Event('submit'));
    });
});

// Minimize chat (optional feature)
if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
        const chatWrapper = document.querySelector('.chat-wrapper');
        chatWrapper.classList.toggle('minimized');
    });
}

// Auto-focus input saat halaman load
window.addEventListener('load', () => {
    messageInput.focus();
});

// Enter key untuk submit
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});