function login() {
    // Hier zou je inloglogica implementeren
    document.getElementById('login').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}

function showRandomPhoto() {
    const photos = [
        'foto1.jpg',
        'foto2.jpg',
        'foto3.jpg'
    ];
    const randomIndex = Math.floor(Math.random() * photos.length);
    document.getElementById('randomPhoto').src = photos[randomIndex];
    document.getElementById('photoContainer').style.display = 'block';
}

function startChat() {
    alert('Chatfunctie nog niet geïmplementeerd.');
}

function startVideoCall() {
    alert('Video belfunctie nog niet geïmplementeerd.');
}

const messagesRef = firebase.database().ref('messages');

document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message) {
        const user = firebase.auth().currentUser; // Haal de huidige gebruiker op
        if (user) {
            messagesRef.push().set({
                uid: user.uid, // Voeg de gebruikers-ID toe aan het bericht
                message: message,
                timestamp: Date.now()
            });
            messageInput.value = ''; // Leeg het invoerveld
        } else {
            alert('Je moet ingelogd zijn om een bericht te verzenden.');
        }
    }
}

messagesRef.on('child_added', function(data) {
    const messageData = data.val();
    displayMessage(messageData);
});

function displayMessage(messageData) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${messageData.uid}: ${messageData.message}`; // Toon de gebruikers-ID en het bericht
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll naar beneden
}