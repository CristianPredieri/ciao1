// Variabili per tenere traccia dello stato degli enigmi
let puzzle1Solved = false;
let puzzle2Solved = false;
let puzzle3Solved = false;
let hintsUsed = 0;

// Inizializzazione della stanza
$(document).ready(function() {
    console.log("Stanza X caricata!");
    
    // Aggiorna il contatore degli indizi
    updateHintsCounter();
    
    // Inizializza gli enigmi
    initPuzzle1();
    initPuzzle2();
    initPuzzle3();
    
    // Controlla se tutti gli enigmi sono risolti (ad esempio, se si torna a una stanza già completata)
    checkAllPuzzles();
});

// Verifica se tutti gli enigmi sono stati risolti
function checkCompletion() {
    return puzzle1Solved && puzzle2Solved && puzzle3Solved;
}

// Aggiorna l'interfaccia in base allo stato attuale degli enigmi
function checkAllPuzzles() {
    if (puzzle1Solved) {
        showPuzzleSuccess(1, "Enigma 1 completato!");
    }
    
    if (puzzle2Solved) {
        showPuzzleSuccess(2, "Enigma 2 completato!");
    }
    
    if (puzzle3Solved) {
        showPuzzleSuccess(3, "Enigma 3 completato!");
    }
    
    // Verifica se tutti gli enigmi sono risolti
    if (checkCompletion()) {
        checkAndProceed(); // Definita in common.js
    }
}

// Sistema di indizi
function showHint() {
    if (hintsUsed >= 3) {
        // Hai già usato tutti gli indizi disponibili
        alert("Hai già utilizzato tutti gli indizi disponibili per questa stanza!");
        return;
    }
    
    hintsUsed++;
    updateHintsCounter();
    
    // Mostra l'indizio appropriato in base agli enigmi non risolti
    if (!puzzle1Solved) {
        showPuzzle1Hint();
    } else if (!puzzle2Solved) {
        showPuzzle2Hint();
    } else if (!puzzle3Solved) {
        showPuzzle3Hint();
    }
}

function updateHintsCounter() {
    $("#hints-counter").text(hintsUsed + "/3");
  
}

// Funzioni per mostrare feedback di successo/errore
function showPuzzleSuccess(puzzleNum, message) {
    $("#puzzle" + puzzleNum + "-feedback")
        .removeClass("puzzle-error")
        .addClass("puzzle-success")
        .text(message)
        .show();
}

function showPuzzleError(puzzleNum, message) {
    $("#puzzle" + puzzleNum + "-feedback")
        .removeClass("puzzle-success")
        .addClass("puzzle-error")
        .text(message)
        .show();
    
    // Nascondi il messaggio dopo 3 secondi
    setTimeout(function() {
        $("#puzzle" + puzzleNum + "-feedback").fadeOut();
    }, 3000);
}

/* 
 * IMPLEMENTAZIONE ENIGMA 1
 * ========================
 */
function initPuzzle1() {
    // Implementazione specifica dell'enigma 1
    // Esempio:
    $("#puzzle1 .puzzle-interactive").html(`
        <p>Questo è un esempio di implementazione per l'enigma 1.</p>
        <input type="text" id="puzzle1-input" placeholder="Inserisci la risposta">
        <button id="puzzle1-submit">Verifica</button>
    `);
    
    // Aggiungi il gestore dell'evento click
    $("#puzzle1-submit").click(function() {
        const answer = $("#puzzle1-input").val().trim().toLowerCase();
        
        // Verifica la risposta (sostituire con la logica appropriata)
        if (answer === "risposta1") {
            puzzle1Solved = true;
            showPuzzleSuccess(1, "Corretto! Hai risolto l'enigma 1.");
            checkAllPuzzles();
        } else {
            showPuzzleError(1, "Risposta errata. Riprova!");
        }
    });
}

function showPuzzle1Hint() {
    let hintText = "";
    
    // Indizi progressivi
    if (hintsUsed === 1) {
        hintText = "Questo è il primo indizio per l'enigma 1. È un suggerimento vago.";
    } else if (hintsUsed === 2) {
        hintText = "Questo è il secondo indizio per l'enigma 1. È un po' più specifico.";
    } else {
        hintText = "Questo è il terzo indizio per l'enigma 1. È molto diretto: la risposta è 'risposta1'.";
    }
    
    // Mostra l'indizio
    $("#hint-display").text(hintText).fadeIn();
    
    // Nascondi l'indizio dopo 10 secondi
    setTimeout(function() {
        $("#hint-display").fadeOut();
    }, 10000);
}

/* 
 * IMPLEMENTAZIONE ENIGMA 2
 * ========================
 */
function initPuzzle2() {
    // Esempio di implementazione per un puzzle di tipo drag-and-drop
    $("#puzzle2 .puzzle-interactive").html(`
        <div class="drag-drop-container">
            <div class="drag-items">
                <div class="drag-item" data-value="item1" draggable="true">Elemento 1</div>
                <div class="drag-item" data-value="item2" draggable="true">Elemento 2</div>
                <div class="drag-item" data-value="item3" draggable="true">Elemento 3</div>
            </div>
            <div class="drop-zones">
                <div class="drop-zone" data-target="item1">Zona 1</div>
                <div class="drop-zone" data-target="item2">Zona 2</div>
                <div class="drop-zone" data-target="item3">Zona 3</div>
            </div>
            <button id="puzzle2-submit">Verifica</button>
        </div>
    `);
    
    // Implementazione del drag and drop
    // Nota: questa è una versione semplificata, da completare con il codice reale
    
    $("#puzzle2-submit").click(function() {
        // Logica di verifica (esempio semplificato)
        const isCorrect = true; // Sostituire con la verifica reale
        
        if (isCorrect) {
            puzzle2Solved = true;
            showPuzzleSuccess(2, "Corretto! Hai risolto l'enigma 2.");
            checkAllPuzzles();
        } else {
            showPuzzleError(2, "L'ordinamento non è corretto. Riprova!");
        }
    });
}

function showPuzzle2Hint() {
    let hintText = "";
    
    // Indizi progressivi
    if (hintsUsed === 1) {
        hintText = "Questo è il primo indizio per l'enigma 2. Osserva attentamente l'ordine...";
    } else if (hintsUsed === 2) {
        hintText = "Questo è il secondo indizio per l'enigma 2. L'elemento 1 va nella zona 1.";
    } else {
        hintText = "Questo è il terzo indizio per l'enigma 2. L'ordine corretto è: Elemento 1 → Zona 1, Elemento 2 → Zona 2, Elemento 3 → Zona 3.";
    }
    
    // Mostra l'indizio
    $("#hint-display").text(hintText).fadeIn();
    
    // Nascondi l'indizio dopo 10 secondi
    setTimeout(function() {
        $("#hint-display").fadeOut();
    }, 10000);
}

/* 
 * IMPLEMENTAZIONE ENIGMA 3
 * ========================
 */
function initPuzzle3() {
    // Esempio di implementazione per un puzzle di scelta multipla
    $("#puzzle3 .puzzle-interactive").html(`
        <div class="quiz-container">
            <p>Domanda: Quale delle seguenti affermazioni è corretta?</p>
            <div class="quiz-options">
                <label>
                    <input type="radio" name="quiz-answer" value="A">
                    Opzione A: Questa è un'affermazione errata.
                </label>
                <label>
                    <input type="radio" name="quiz-answer" value="B">
                    Opzione B: Questa è l'affermazione corretta.
                </label>
                <label>
                    <input type="radio" name="quiz-answer" value="C">
                    Opzione C: Questa è un'affermazione errata.
                </label>
            </div>
            <button id="puzzle3-submit">Verifica</button>
        </div>
    `);
    
    $("#puzzle3-submit").click(function() {
        const selectedOption = $("input[name='quiz-answer']:checked").val();
        
        if (!selectedOption) {
            showPuzzleError(3, "Seleziona un'opzione prima di verificare!");
            return;
        }
        
        if (selectedOption === "B") {
            puzzle3Solved = true;
            showPuzzleSuccess(3, "Corretto! Hai risolto l'enigma 3.");
            checkAllPuzzles();
        } else {
            showPuzzleError(3, "Risposta errata. Riprova!");
        }
    });
}

function showPuzzle3Hint() {
    let hintText = "";
    
    // Indizi progressivi
    if (hintsUsed === 1) {
        hintText = "Questo è il primo indizio per l'enigma 3. Leggi attentamente ogni opzione.";
    } else if (hintsUsed === 2) {
        hintText = "Questo è il secondo indizio per l'enigma 3. L'opzione A e l'opzione C sono errate.";
    } else {
        hintText = "Questo è il terzo indizio per l'enigma 3. La risposta corretta è l'opzione B.";
    }
    
    // Mostra l'indizio
    $("#hint-display").text(hintText).fadeIn();
    
    // Nascondi l'indizio dopo 10 secondi
    setTimeout(function() {
        $("#hint-display").fadeOut();
    }, 10000);
}