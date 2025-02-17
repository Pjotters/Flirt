const startCallButton = document.getElementById('startCallButton');
const localVideo = document.getElementById('localVideo');

startCallButton.addEventListener('click', startVideoCall);

function startVideoCall() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            localVideo.srcObject = stream;
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
            alert('Toestemming voor de camera is vereist.');
        });
}
