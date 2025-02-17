const localVideo = document.getElementById('localVideo');
const socket = io(); // Verbinding maken met de WebSocket-server
let localStream;
let peerConnection;

// Start de video-oproep
document.getElementById('startCallButton').addEventListener('click', startVideoCall);

function startVideoCall() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localVideo.srcObject = stream;
            localStream = stream;

            // Maak een nieuwe peer connection
            peerConnection = new RTCPeerConnection();

            // Voeg de lokale stream toe aan de peer connection
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

            // Wanneer een ICE kandidaat beschikbaar is, stuur deze naar de andere gebruiker
            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    socket.emit('signal', { candidate: event.candidate });
                }
            };

            // Wanneer een remote stream beschikbaar is, voeg deze toe aan de video-element
            peerConnection.ontrack = event => {
                const remoteVideo = document.createElement('video');
                remoteVideo.srcObject = event.streams[0];
                remoteVideo.autoplay = true;
                document.body.appendChild(remoteVideo);
            };

            // Maak een aanbod en stuur dit naar de andere gebruiker
            peerConnection.createOffer()
                .then(offer => {
                    return peerConnection.setLocalDescription(offer);
                })
                .then(() => {
                    socket.emit('signal', { offer: peerConnection.localDescription });
                });
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
            alert('Toestemming voor de camera is vereist.');
        });
}

// Ontvang signaling berichten
socket.on('signal', data => {
    if (data.offer) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
            .then(() => {
                return peerConnection.createAnswer();
            })
            .then(answer => {
                return peerConnection.setLocalDescription(answer);
            })
            .then(() => {
                socket.emit('signal', { answer: peerConnection.localDescription });
            });
    } else if (data.answer) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    } else if (data.candidate) {
        peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
});
