// Gestione pagina iniziale
$(document).ready(function() {
    // Controlla se c'è un progresso salvato
    const savedProgress = localStorage.getItem('escapeRoomProgress');
  
    if (savedProgress && parseInt(savedProgress) > 1) {
        $("#continue-btn").show();
    }
    
    // Inizia una nuova partita
    $("#start-btn").click(function() {
        // Resetta il progresso e inizia dalla prima stanza
        localStorage.setItem('escapeRoomProgress', 1);
        localStorage.setItem('escapeRoomStartTime', Date.now());
        window.location.href = './rooms/room1/index.html';
    });
    
    // Continua da dove si era rimasti
    $("#continue-btn").click(function() {
        let roomNumber = localStorage.getItem('escapeRoomProgress');
        window.location.href = '../room' + roomNumber + '/index.html';
    });
});