// Sistema di navigazione tra stanze
const totalRooms = 7;
let currentRoom ;
let seconds = 0;
let timerInterval;

// Inizializzazione
$(document).ready(function() {
    // Determina la stanza corrente dal percorso
    const pathParts = window.location.pathname.split('/');
    const roomPart = pathParts[pathParts.length - 2]; // room1, room2, etc.
    if (roomPart && roomPart.startsWith('room')) {
        currentRoom = parseInt(roomPart.replace('room', ''));
        console.log("currentRoom"+currentRoom)
    }
    
    // Carica i progressi salvati
    loadProgress();
    
    // Verifica che l'utente abbia accesso a questa stanza
  /*  if (currentRoom > parseInt(localStorage.getItem('escapeRoomProgress'))) {
        alert("Non hai ancora accesso a questa stanza! Completa le stanze precedenti.");
        window.location.href = '../../index.html';
        return;
    }*/
    
    // Inizializza il timer
    startTimer();
    
    // Gestione indizi
    $("#hint-btn").click(showHint);
   
});

// Verifica completamento e passaggio alla stanza successiva
function checkAndProceed() {
    if (typeof checkCompletion === 'function' && checkCompletion()) {
        // Mostra messaggio di successo
        $(".success-message").fadeIn();
              // Salva il progresso alla stanza successiva
        saveProgress(Math.max(currentRoom + 1, localStorage.getItem('escapeRoomProgress')));

        // Naviga alla prossima stanza o alla vittoria
        if (currentRoom < totalRooms) {
            setTimeout(function() {
                window.location.href = '../room' + (currentRoom + 1) + '/index.html';
            }, 3000);
        } else {
            // Calcola e salva le statistiche
            const startTime = localStorage.getItem('escapeRoomStartTime');
            const elapsedTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : seconds;
            localStorage.setItem('escapeRoomCompletionTime', elapsedTime);
            
            // Vai alla pagina di vittoria
            setTimeout(function() {
                window.location.href = '../../victory.html';
            }, 3000);
        }
    }
}

// Funzioni per salvare/caricare progressi
function saveProgress(roomNumber) {
    localStorage.setItem('escapeRoomProgress', roomNumber);
}

function loadProgress() {
    // Se non esiste un progresso, inizializza a 1
   if (!localStorage.getItem('escapeRoomProgress')) {
        localStorage.setItem('escapeRoomProgress', 1);
    }
}

// Sistema timer
function startTimer() {
    // Carica il tempo totale dall'inizio
    const startTime = localStorage.getItem('escapeRoomStartTime');
    if (startTime) {
        seconds = Math.floor((Date.now() - parseInt(startTime)) / 1000);
    }
    
    // Aggiorna il timer ogni secondo
    timerInterval = setInterval(function() {
        seconds++;
        updateTimerDisplay();
    }, 1000);
    
    // Aggiorna il display immediatamente
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    const timeString = 
        (hours > 0 ? (hours < 10 ? '0' : '') + hours + ':' : '') +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    
    $("#timer").text(timeString);
}
