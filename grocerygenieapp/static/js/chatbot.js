document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-btn');
    const chatbox = document.querySelector('.chatbox');
    const typingIndicator = document.getElementById('typing-indicator');
    let isTyping = false;

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('input', toggleTypingIndicator);
    chatInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    const clearChatButton = document.getElementById('clear-chat-btn');
    clearChatButton.addEventListener('click', function () {
        chatbox.innerHTML = ''; // Clear chatbox
    });

    const chatIconInput = document.getElementById('chat-icon-input');
    const changeIconButton = document.getElementById('change-icon-btn');
    changeIconButton.addEventListener('click', function () {
        const newIcon = chatIconInput.value.trim();
        if (newIcon !== '') {
            document.querySelectorAll('.material-icons-outlined').forEach(icon => {
                icon.textContent = newIcon;
            });
        }
    });

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText !== '') {
            const userName = document.getElementById('user-name-input').value.trim();
            const userNameDisplay = userName ? `${userName}: ` : ''; // Include user name if provided
            appendMessage('outgoing', userNameDisplay + messageText);
            simulateResponse(messageText);
            chatInput.value = '';
            toggleTypingIndicator(); // Hide typing indicator after sending message
        }
    }

    function simulateResponse(messageText) {
        setTimeout(function () {
            const response = generateResponse(messageText);
            appendMessage('incoming', response);
        }, 500);
    }

    function generateResponse(messageText) {
        const responses = [
            'I am a chatbot! How can I assist you?',
            'That\'s interesting! Tell me more.',
            'I\'m not sure I understand. Can you rephrase that?',
            'Sorry, I didn\'t get that. Could you please repeat?',
            'Let me think about that for a moment...'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function appendMessage(type, message) {
        const li = document.createElement('li');
        li.classList.add('chat', type);
        const span = document.createElement('span');
        span.classList.add('material-icons-outlined');
        span.textContent = 'smart_toy';
        const p = document.createElement('p');
        p.textContent = message;
        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime();
        li.appendChild(span);
        li.appendChild(p);
        li.appendChild(timestamp);
        chatbox.appendChild(li);
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to bottom
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function toggleTypingIndicator() {
        if (chatInput.value.trim() && !isTyping) {
            isTyping = true;
            typingIndicator.style.display = 'block';
        } else if (!chatInput.value.trim() && isTyping) {
            isTyping = false;
            typingIndicator.style.display = 'none';
        }
    }
});
