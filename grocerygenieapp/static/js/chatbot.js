document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-btn');
    const chatbox = document.querySelector('.chatbox');

    sendButton.addEventListener('click', function () {
        const messageText = chatInput.value.trim();
        if (messageText !== '') {
            appendMessage('outgoing', messageText);
            // Here you can add logic to handle user input and provide responses
            // For simplicity, let's just echo back the user's message
            setTimeout(function () {
                appendMessage('incoming', 'Echo: ' + messageText);
            }, 500);
            chatInput.value = '';
        }
    });

    function appendMessage(type, message) {
        const li = document.createElement('li');
        li.classList.add('Chat', type);
        const span = document.createElement('span');
        span.classList.add('material-symbols-outlined');
        span.textContent = 'smart_toy';
        const p = document.createElement('p');
        p.textContent = message;
        li.appendChild(span);
        li.appendChild(p);
        chatbox.appendChild(li);
    }
});
