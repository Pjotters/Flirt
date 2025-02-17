const personImages = [
    'persoon1.jpg',
    'persoon2.jpg',
    'persoon3.jpg'
];

let messageCount = 0;
let currentChatUser = null; // Houdt de huidige chatgebruiker bij

function showRandomPerson() {
    const randomIndex = Math.floor(Math.random() * personImages.length);
    const personImage = document.getElementById('personImage');
    personImage.src = personImages[randomIndex];
    personImage.style.display = 'block';

    const buttons = document.querySelector('.buttons');
    buttons.style.display = 'block';
}

document.getElementById('acceptButton').addEventListener('click', function() {
    messageCount++;
    currentChatUser = personImages[Math.floor(Math.random() * personImages.length)]; // Bewaar de huidige chatgebruiker
    if (messageCount <= 10) {
        window.location.href = 'chat.html'; // Ga naar de chatpagina
    } else {
        alert('Je kunt nu de belfunctie gebruiken!');
        window.location.href = 'video.html'; // Ga naar de video belfunctie
    }
});

document.getElementById('rejectButton').addEventListener('click', function() {
    messageCount = 0; // Reset het aantal berichten
    showRandomPerson(); // Toon een nieuwe willekeurige persoon
});

// Toon de eerste willekeurige persoon bij het laden van de pagina
window.onload = showRandomPerson; 