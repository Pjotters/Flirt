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

// Firebase configuratie
const firebaseConfig = {
    apiKey: "AIzaSyBCXaYJI9dxwqKD1Qsb_9AOdsnVTPG2uHM",
    authDomain: "pjotters-company.firebaseapp.com",
    databaseURL: "https://pjotters-company-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pjotters-company",
    storageBucket: "pjotters-company.firebasestorage.app",
    messagingSenderId: "64413422793",
    appId: "1:64413422793:web:f3fc9937cbfb5432d6e918",
    measurementId: "G-7G0XR0P4VP"
};

// Initialiseer Firebase
firebase.initializeApp(firebaseConfig);
const messagesRef = firebase.database().ref('messages');

document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message) {
        messagesRef.push().set({
            message: message,
            timestamp: Date.now()
        });
        messageInput.value = '';
    }
}

messagesRef.on('child_added', function(data) {
    const message = data.val().message;
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<div>${message}</div>`;
});