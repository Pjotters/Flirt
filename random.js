const personImages = [
    'persoon1.jpg',
    'persoon2.jpg',
    'persoon3.jpg'
];

let messageCount = 0;

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
    if (messageCount <= 10) {
        window.location.href = 'chat.html'; // Ga naar de chatpagina
    } else {
        alert('Je kunt nu de belfunctie gebruiken!');
        // Hier kun je de logica voor de belfunctie toevoegen
    }
});

document.getElementById('rejectButton').addEventListener('click', function() {
    messageCount = 0; // Reset het aantal berichten
    showRandomPerson(); // Toon een nieuwe willekeurige persoon
});

// Toon de eerste willekeurige persoon bij het laden van de pagina
window.onload = showRandomPerson; 