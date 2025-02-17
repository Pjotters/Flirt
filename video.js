const localVideo = document.getElementById('localVideo');

document.getElementById('startCallButton').addEventListener('click', startVideoCall);

function startVideoCall() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localVideo.srcObject = stream;
            // Hier kun je de logica toevoegen om de stream naar de andere gebruiker te sturen
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
            alert('Toestemming voor de camera is vereist.');
        });
}
