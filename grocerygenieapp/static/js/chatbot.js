document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-btn');
    const chatbox = document.querySelector('.chatbox');

    sendButton.addEventListener('click', sendMessage);

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText !== '') {
            appendMessage('outgoing', messageText);
            // Simulate receiving a response after some delay
            setTimeout(function () {
                receiveMessage('Echo: ' + messageText);
            }, 500);
            chatInput.value = '';
        }
    }

    function receiveMessage(message) {
        appendMessage('incoming', message);
    }

    function appendMessage(type, message) {
        const li = document.createElement('li');
        li.classList.add('chat', type);
        const span = document.createElement('span');
        span.classList.add('material-icons-outlined');
        span.textContent = 'smart_toy';
        const p = document.createElement('p');
        p.textContent = message;
        li.appendChild(span);
        li.appendChild(p);
        chatbox.appendChild(li);
        // Scroll to the bottom of the chatbox
        chatbox.scrollTop = chatbox.scrollHeight;
    }
});
