
var hintsUsed = 0;

// Inizializzazione della stanza
$(document).ready(function () {
    console.log("Stanza X caricata!");
});

// Verifica se tutti gli enigmi sono stati risolti

//  checkAndProceed(); Definita in common.js







var gameStarted = false
var playerMovement = 6 
var player = $("#player")
var playerPosition
var upStairs = false
var stairs = {
    top: 604,
    left: 1264,
    width: 111,
    height: 234
}

$("#OK4").hide()
$("#OK3").hide()
$("#OK2").hide()
$("#game").hide()



$("#startGame").click(function () {



    $("#interface").css("visibility", "visible");
    $("#overlay").addClass("overlay");

    $("#interface-overlay").fadeIn();

    $("#fantasmino").addClass("show-on-overlay");
    $("#BENVENUTO").addClass("show-on-overlay");
    $("#OK").addClass("show-on-overlay");

    playerPosition = player.position();

    playerPosition.top -= 100;

    player.css({
        top: playerPosition.top
    });
    player.css({ opacity: 1 });

});

var completo1 = null
var completo2 = null
var completo3 = null

var hint1 = false
var hint1 = false
var hint1 = false

var inGioco1 = false
var inGioco2 = false
var inGioco3 = false
var maiStatoInStanza = true
var inStanza1 = false
var inStanza2 = false
var inStanza3 = false
var up = false
var down = false
var left = false
var right = false
var movimento = "Up"
var animation
var spriteAnimation = false
var intervalSpriteAnimation

window.onkeydown = function (e) {
    let key = e.key.toLowerCase()
    if (key == "enter" && gameStarted) {
        if (player.position().top + player.height() < 350 &&
            player.position().left > 584 &&
            player.position().left + player.width() < 810 &&
            inStanza1 &&
            movimento == "Up" &&
            completo1 == null) {
            console.log("NEL PRIMO GIUOCO")
            $("#overlay").css("z-index", 3)
            $("#game").html("")
            setGioco1()
        }

        if (player.position().top + player.height() < 555 &&
            player.position().left < 835 &&
            player.position().left + player.width() > 604 &&
            inStanza2 &&
            movimento == "Up") {
            console.log("NEL SECONDO GIUOCO")
            $("#overlay").css("z-index", 3)
            $("#game").html("")
            $("#game").fadeIn()
            setGioco2()
        }



        if (player.position().top + player.height() < 318 &&
            player.position().left < 222 &&
            inStanza3 &&
            movimento == "Up") {
            console.log("NEL TERZO GIUOCO")
            $("#overlay").css("z-index", 3)
            $("#game").html("")
            $("#game").fadeIn()
            setGioco3()
        }
    }
    if ((key == "arrowdown" || e.key == "s") && (!up && !left && !right)) {
        down = true
        movimento = "Down"
    }

    else if ((key == "arrowup" || e.key == "w") && ((!down && !left && !right))) {
        up = true
        movimento = "Up"
    }

    else if ((key == "arrowright" || e.key == "d") && (!up && !left && !down)) {
        movimento = "Right"
        right = true
    }

    else if ((key == "arrowleft" || e.key == "a") && (!up && !down && !right)) {
        movimento = "Left"
        left = true
    }
    else return

    if (gameStarted) {
        if (!animation) {
            animation = requestAnimationFrame(movement)
        }
        if (!spriteAnimation) startSpriteAnimation()
    }
}

function movement() {

    if (gameStarted && !inGioco1 && !inGioco2 && !inGioco3) {
        let x = 0
        let y = 0

        if (up && onBorderTop()) {
            y = -playerMovement
        }

        if (down && onBorderBottom()) {
            y = playerMovement
        }

        if (right && onBorderRight()) {
            x = playerMovement
        }

        if (left && onBorderLeft()) {
            x = -playerMovement
        }

        player.css({
            left: "+=" + x,
            top: "+=" + y
        });

        upStairs = upStairsUpdate()

        controlloporta1()
        controlloporta2()
        controlloporta3()
        controllaPortaUscitaStanza()
        animation = requestAnimationFrame(movement)
        controlloPortaUscita()
    }
}


window.onkeyup = function (e) {
    if (gameStarted && !inGioco1 && !inGioco2 && !inGioco3) {
        if (e.key == "ArrowDown" || e.key == "s") down = false

        if (e.key == "ArrowUp" || e.key == "w") up = false

        if (e.key == "ArrowRight" || e.key == "d") right = false

        if (e.key == "ArrowLeft" || e.key == "a") left = false

        if (!down && !up && !left && !right && gameStarted) {
            cancelAnimationFrame(animation)
            animation = null
            cancelSpriteAnimation()
        }
    }
}

var flag = false
function startSpriteAnimation() {
    spriteAnimation = true
    intervalSpriteAnimation = setInterval(function () {
        var string = ""
        if (flag) {
            string = "img/playerScript/player" + movimento + "Movement.png"
            flag = !flag
        } else {
            string = "img/playerScript/player" + movimento + ".png"
            flag = !flag
        }
        player.attr("src", string)
    }, 100)

}

function cancelSpriteAnimation() {
    clearInterval(intervalSpriteAnimation)
    intervalSpriteAnimation = null
    spriteAnimation = false
    player.attr("src", "img/playerScript/player" + movimento + ".png")


}
function onBorderLeft() {
    if ((inStanza1 || inStanza3) && (player.position().top + player.height() < 315) && player.position().left > 805) return player.position().left > 810

    if (inStanza2 && player.position().left > 820 && player.position().top + player.height() > 338 && player.position().top + player.height() < 545) return player.position().left > 835

    if (inStanza3) {
        if (player.position().top + player.height() < 308 && player.position().left > 0) {
            return player.position().left > 222
        }
        else return player.position().left > 0
    }

    if (player.position().top + (player.height() / 2) < 505 &&
        player.position().top + player.height() > 260 &&
        player.position().left > 755 && !(inStanza1 || inStanza2 || inStanza3)) return player.position().left > 760
    return player.position().left > 0

}
function onBorderRight() {
    if (inStanza1) if (player.position().top + player.height() < 315 && player.position().left + player.width() < 590) {
        return player.position().left + player.width() < 585
    } else return player.position().left + player.width() < $("#interface").width()

    if (inStanza2 && player.position().left + player.width() < 610 && player.position().top + player.height() > 338 && player.position().top + player.height() < 545) return player.position().left + player.width() < 604
    else if (inStanza2) return player.position().left + player.width() < $("#interface").width()

    if (inStanza3) return player.position().left + player.width() < $("#interface").width()

    else player.position().left + player.width() < $("#interface").width()
    if (player.position().top + (player.height() / 2) < 505 &&
        !upStairs &&
        player.position().left < 755) return player.position().left + player.width() < 721

    if (player.position().top + (player.height() / 2) < 505 &&
        player.position().top + player.height() > 260 &&
        player.position().left > 755) return player.position().left + player.width() < 865

    return player.position().left + player.width() < $("#interface").width()


}
function onBorderTop() {
    if ((inStanza1)) if (player.position().left + player.width() > 584 && player.position().left < 810) {
        return player.position().top + player.height() > 340
    } else return player.position().top + player.height() > 245

    if (inStanza2 && player.position().top + player.height() > 500 && player.position().left < 835 && player.position().left + player.width() > 604) return player.position().top + player.height() > 545
    else if (inStanza2) return player.position().top + player.height() > 245

    if (inStanza3) {
        if (player.position().left < 215) return player.position().top + player.height() > 312
        else return player.position().top + player.height() > 245

    }

    if (player.position().left < 755 &&
        player.position().left + player.width() > 720 &&
        !upStairs) return player.position().top + player.height() > 510

    if ((!upStairs && player.position().left > 751 && player.position().left + player.width() < 866) || upStairs) return player.position().top + player.height() > 185

    if (!upStairs) return player.position().top + player.height() > 425
}

function onBorderBottom() {
    if (inStanza1) return player.position().top + player.height() + 10 < $("#interface").height()

    if (inStanza2 && player.position().top < 330 && player.position().left < 835 && player.position().left + player.width() > 604) return player.position().top + player.height() < 338
    else if (inStanza2) return player.position().top + player.height() + 10 < $("#interface").height()

    if (inStanza3) return player.position().top + player.height() < $("#interface").height()



    if ((upStairs && player.position().left > 751 && player.position().left + player.width() < 866) || !upStairs) return player.position().top + player.height() < $("#interface").height()
    if (upStairs) return player.position().top + player.height() < 274

}


function upStairsUpdate() {
    return player.position().top < 274
}



function controlloporta1() {
    const playerRect = player[0].getBoundingClientRect();
    const porta1Rect = $("#porta1")[0].getBoundingClientRect();

    const collision =
        playerRect.left < porta1Rect.right &&
        playerRect.right > porta1Rect.left &&
        playerRect.top < porta1Rect.bottom &&
        playerRect.bottom > porta1Rect.top;

    if (collision && movimento == "Up" && !inStanza1 && !inStanza2 && !inStanza3) {
        gameStarted = false
        inStanza1 = true
        cancelAnimationFrame(animation)
        animation = null
        cancelSpriteAnimation()

        $("#room").animate({ opacity: 0 }, 500)
        $("#player").fadeOut(500)
        $("#ghost").fadeOut(500)
        $("#ombra").fadeOut(500, function () {
            $("#room").attr("src", "img/rooms/room1.png")
            $("#room").attr("height", "792.344px")
            $("#room").attr("width", "909.328px")
            player.css({
                top: playerPosition.top,
                left: playerPosition.left
            })
        })


        left = right = up = down = false
        setTimeout(function () {
            $("#room").animate({ opacity: 1 }, 500)
            $("#player").fadeIn(500)
            if (!maiStatoInStanza) $("#ghost").fadeIn(500)
            if (!maiStatoInStanza) $("#ombra").fadeIn(500)
            if (!maiStatoInStanza) gameStarted = true
            else maiInStanza()
        }, 100)



        /*
            IDEA: fare un desktop del computer mettendo come sfondo l'immagine desktop oppure mettere come sfondo una 
                  tinta nera e mettere delle icone ad esempio: google, il gioco, l'immagine desktop 
            
            DA SISTEMARE: l'ultimo check se faccio 0 errori, perchè non esiste pidove6
    
    
    
        $('#game').css({
            backroungColor: "black"
        });
    
    
        $('#game').css({
            'background-image': 'url("img/rooms/desktop.png")',
            'background-size': 'cover',    
            'background-position': 'center',   
            
        });*/
    }
}


var numeroCasuale
var indiceDomanda = 0;




function setGioco1() {
    inGioco1 = true
    $("#game").append("<img src='img/rooms/dekstop2.png' id='imgGioco1'>  <button id='startGameButton' class='bottoneBello'>Start Game</button>")
    $("#imgGioco1").css({
        "width": "500px",
        "height": "500px"
    })

    $("#game").css({ "visibility": "visible" })
    $("#game").show()
}

$("#game").on("click", "#startGameButton", function () {
    avvioGioco1()
})

function avvioGioco1() {
    $("#game").html("")
    $('#game').css({
        backgroundColor: "green"
    })
    $('#game').css({
        "width": "500px",
        "height": "500px"
    })
    $('#game').append("<div id='giocoo1'></div>")
    $('#giocoo1').append("<img src='img/pokemon/pidove1.png' id='pokemon'>")

    $('#giocoo1').append("<p id='domanda'>domande</p>")

    $('#giocoo1').append("<input type='text' id='inizioIntervallo' style='position:relative; top:0px' placeholder='inserisci inizio intervallo'>")
    $('#giocoo1').append("<input type='text' id='fineIntervallo' style='position:relative; top:10px' placeholder='inserisci fine intervallo'>")

    $('#giocoo1').append("<input type='button' id='but1' value='CHECK'>");

    $("#butHelp").show()
    $('#game').on("click", "#but1", controllaGioco1);

    console.log("Gioco 1 setted")
    indiceDomanda = 0;
    mostraDomanda();
}


$('#butHelp').click(function () {
    if (inStanza1) {
        if (Math.floor(Math.random() * 2) == 0) {
            $('#inizioIntervallo').val(array[indiceDomanda].risposta1)
            $('#inizioIntervallo').css("background-color", "lightgreen")
            $('#inizioIntervallo').attr("disabled", "true")
        } else {
            $('#fineIntervallo').val(array[indiceDomanda].risposta2)
            $('#fineIntervallo').css("background-color", "lightgreen")
            $('#fineIntervallo').attr("disabled", "true")
        }
        $('#butHelp').attr("disabled", "true")
        $('#butHelp').addClass("no-hover")
    }
});

function mostraDomanda() {
    if (indiceDomanda < array.length) {
        $("#domanda").text(array[indiceDomanda].domanda);
    } else {
        $("#domanda").text("fine");
        $("#fineIntervallo").hide()
        $("#inizioIntervallo").hide()
        $("#but1").hide()

        if (cont != indiceDomanda + 1) {
            $("#giocoo1").append("<h3 style='font-size:27px'>Non hai completato il gioco totalmente!!</h2>")
            completo1 = false
        }
        else {
            completo1 = true
            $("#giocoo1").append("<h3>hai completato perfettamente il gioco !!</h2>")
        }

        setTimeout(function () {
            $('#butHelp').fadeOut(500)
            $("#game").fadeOut(500, function () {

                $('#butHelp').removeAttr("disabled")
                $('#butHelp').removeClass("no-hover")
                $("#overlay").css("z-index", 1)
                inGioco1 = false
                gameStarted = true
            })
        }, 500)
    }

}

var cont = 1

function controllaGioco1() {


    var risposta1 = $('#inizioIntervallo').val().trim();
    var risposta2 = $('#fineIntervallo').val().trim();

    if (indiceDomanda < array.length && risposta1 == array[indiceDomanda].risposta1 && risposta2 == array[indiceDomanda].risposta2) {
        console.log("giusto" + cont)
        if (cont == 5) {
            $('#pokemon').attr("src", `img/pokemon/vittoria.png`);
        }
        if (cont < 5) {
            cont++
            $('#pokemon').attr("src", `img/pokemon/pidove${cont}.png`);
        }

    } else {
        console.log("sbagliato" + cont)
        if (cont > 1) {

            cont--
            $('#pokemon').attr("src", `img/pokemon/pidove${cont}.png`);
        }
    }

    $('#inizioIntervallo').val("");
    $('#inizioIntervallo').css("background-color", "")
    $('#inizioIntervallo').removeAttr("disabled")
    $('#fineIntervallo').val("");
    $('#fineIntervallo').css("background-color", "")
    $('#fineIntervallo').removeAttr("disabled")
    indiceDomanda++;
    mostraDomanda();
}



let array = [
    { domanda: "CLASSE A", risposta1: "1.0.0.0", risposta2: "127.255.255.255" },
    { domanda: "CLASSE B", risposta1: "128.0.0.0", risposta2: "191.255.255.255" },
    { domanda: "CLASSE C", risposta1: "192.0.0.0", risposta2: "223.255.255.255" },
    { domanda: "CLASSE D", risposta1: "224.0.0.0", risposta2: "239.255.255.255" },
    { domanda: "CLASSE E", risposta1: "240.0.0.0", risposta2: "255.255.255.255" },
];




function controlloporta2() {
    const playerRect = player[0].getBoundingClientRect();
    const porta2Rect = $("#porta2")[0].getBoundingClientRect();


    const collision =
        playerRect.left < porta2Rect.right &&
        playerRect.right > porta2Rect.left &&
        playerRect.top < porta2Rect.bottom &&
        playerRect.bottom > porta2Rect.top;

    if (collision && movimento == "Up" && !inStanza1 && !inStanza2 && !inStanza3) {
        gameStarted = false
        inStanza2 = true
        cancelAnimationFrame(animation)
        animation = null
        cancelSpriteAnimation()

        $("#room").animate({ opacity: 0 }, 500)
        $("#player").fadeOut(500)
        $("#ghost").fadeOut(500)
        $("#ombra").fadeOut(500, function () {
            $("#room").attr("src", "img/rooms/room2.png")
            $("#room").attr("height", "792.344px")
            $("#room").attr("width", "909.328px")
            player.css({
                top: playerPosition.top,
                left: playerPosition.left
            })
        })


        left = right = up = down = false
        setTimeout(function () {
            $("#room").animate({ opacity: 1 }, 500)
            $("#player").fadeIn(500)
            if (!maiStatoInStanza) $("#ghost").fadeIn(500)
            if (!maiStatoInStanza) $("#ombra").fadeIn(500)

            if (!maiStatoInStanza) gameStarted = true
            else maiInStanza()
        }, 100)
    }
}


function setGioco2() {
    inGioco2 = true
    console.log("Gioco 2 setted")
}


function controlloporta3() {
    const playerRect = player[0].getBoundingClientRect();
    const porta3Rect = $("#porta3")[0].getBoundingClientRect();

    const collision =
        playerRect.left < porta3Rect.right &&
        playerRect.right > porta3Rect.left &&
        playerRect.top < porta3Rect.bottom &&
        playerRect.bottom > porta3Rect.top;

    if (collision && movimento == "Up" && !inStanza1 && !inStanza2 && !inStanza3) {
        gameStarted = false
        inStanza3 = true
        cancelAnimationFrame(animation)
        animation = null
        cancelSpriteAnimation()

        $("#room").animate({ opacity: 0 }, 500)
        $("#player").fadeOut(500)
        $("#ghost").fadeOut(500)
        $("#ombra").fadeOut(500, function () {
            $("#room").attr("src", "img/rooms/room3.png")
            $("#room").attr("height", "792.344px")
            $("#room").attr("width", "909.328px")
            player.css({
                top: playerPosition.top,
                left: playerPosition.left
            })
        })


        left = right = up = down = false
        setTimeout(function () {
            $("#room").animate({ opacity: 1 }, 500)
            $("#player").fadeIn(500)
            if (!maiStatoInStanza) $("#ghost").fadeIn(500)
            if (!maiStatoInStanza) $("#ombra").fadeIn(500)

            if (!maiStatoInStanza) gameStarted = true
            else maiInStanza()
        }, 100)
    }
}



function setGioco3() {
    inGioco3=true
    gameStarted=false
    
    $('#game').append("<div id='giocoo3'></div>")
    $('#giocoo3').append("<h1 style='color:white'>Scegli la difficoltà :</h1>")
    $('#giocoo3').append("<img src='img/fantasma/fantasmaFelice.png' id='felice'>")
    $('#giocoo3').append("<img src='img/fantasma/fantasmaArrabbiato.png' id='arrabbiato'>")

    $('#game').css({
        "width": "500px",
        "height": "500px"
    })
    $('#giocoo3').on('click', '#felice', function () {
        $('#felice').remove();
        $('#arrabbiato').remove();
        gioco3funzz1();
    });

    $('#giocoo3').on('click', '#arrabbiato', function () {
        $('#felice').remove();
        $('#arrabbiato').remove();
        gioco3funzz2();
    });

}


function continuaGioco3() {
    $('#sub, #consegna, #prova3, #buttonGioco3').remove();

    $('#giocoo3').append("<h2 id='rete'> RETE: 192.168.10.0/24</h2>");
    $('#giocoo3').append("<p id='consegna1'>Determina la nuova subnet mask per 6 sottoreti</p>");
    $('#giocoo3').append("<h3 id='titoletto'>Subnet Mask: </h3><input id='inputRisposta' type='text' width='70px' placeholder='Inserisci la risposta'>");
    $('#giocoo3').append("<button id='controllaI'>CONTROLLA</button>");

    $('#controllaI').click(controllaSub);
}
var faseGioco3 = 0; // 0: subnet mask, 1: numero host

function controllaSub() {
    const risposta = $('#inputRisposta').val().trim();

    if (faseGioco3 == 0) {
        if (risposta == "255.255.255.224") {
            $('#inputRisposta').css("backgroundColor", "white");
            $('#inputRisposta').val("");
            $('#consegna1').html("Calcola il numero di host disponibili per ciascuna sottorete se devono essere 6 le reti");
            $('#titoletto').html("Host disponibili:");
            faseGioco3 = 1;
        } else {
            $('#inputRisposta').css("backgroundColor", "red");
        }
    } else if (faseGioco3 == 1) {
        if (risposta == "30") {
            $('#inputRisposta').css("backgroundColor", "white");
            $('#inputRisposta, #rete, #controllaI, #titoletto').remove();

            $("#rete").css({
                marginTop: "20px"
            })

            $('#consegna1').html("Prima sottorete:");
            $("#consegna1").append("<br> Rete iniziale : 192.168.10.0")
            $('#consegna1').css({
                fontSize: "27px",
                color: "red"
            })

            $('#giocoo3').append("<h3 id='titoletto1' class='titoletti'>Indirizzo di rete: </h3><input id='primoCampo' type='text' width='70px' placeholder='Inserisci la risposta'>");
            $('#giocoo3').append("<h3 id='titoletto2' class='titoletti'>Primo host: </h3><input id='secondoCampo' type='text' width='70px' placeholder='Inserisci la risposta'>");
            $('#giocoo3').append("<h3 id='titoletto3' class='titoletti'>Ultimo host: </h3><input id='terzoCampo' type='text' width='70px' placeholder='Inserisci la risposta'>");
            $('#giocoo3').append("<h3 id='titoletto4' class='titoletti'>Indirizzo broadcast: </h3><input id='quartoCampo' type='text' width='70px' placeholder='Inserisci la risposta'>");

            $('#giocoo3').append("<button id='controllaI'>CONTROLLA</button>");

            $('#controllaI').click(controllaTuttiInput);

        } else {
            $('#inputRisposta').css("backgroundColor", "red");
        }
    }
}

function controllaTuttiInput() {
    var cont = 0;
    if ($('#primoCampo').val() == "192.168.10.0") {
        cont++;
        $('#primoCampo').css({
            backgroundColor: "white"
        })
    }
    else {
        $('#primoCampo').css({
            backgroundColor: "red"
        })
    }

    if ($('#secondoCampo').val() == "192.168.10.1") {
        cont++;
        $('#secondoCampo').css({
            backgroundColor: "white"
        })
    }
    else {
        $('#secondoCampo').css({
            backgroundColor: "red"
        })
    }

    if ($('#terzoCampo').val() == "192.168.10.30") {
        cont++;
        $('#terzoCampo').css({
            backgroundColor: "white"
        })
    }
    else {
        $('#terzoCampo').css({
            backgroundColor: "red"
        })
    }

    if ($('#quartoCampo').val() == "192.168.10.31") {
        cont++;
        $('#quartoCampo').css({
            backgroundColor: "white"
        })
    }
    else {
        $('#quartoCampo').css({
            backgroundColor: "red"
        })
    }

    if (cont == 4) {
        $("#giocoo3").html("<h1 style='padding-top:100px;color:white'>Complimenti hai terminato il gioco FACILE!!</h1>")
        setTimeout(function () {
            $('#butHelp').fadeOut(500)
            $("#game").fadeOut(500, function () {

                $('#butHelp').removeAttr("disabled")
                $('#butHelp').removeClass("no-hover")
                $("#overlay").css("z-index", 1)
                inGioco3 = false
                gameStarted = true
            })
        }, 500)
    }
    

}





function gioco3funzz2() {

    $('#game').append("<div id='giocoo3'></div>")

    $('#giocoo3').append("<h2 id='sub' >VLSM</h2>")

    $('#giocoo3').append("<h3 id='consegna' >Hai a disposizione la rete 192.168.1.0/24.<br>RETE A: 100 host <br> RETE B: 50 host <br>RETE C: 25 <br>RETE D: 10 </h3 > ")
    $('#giocoo3').append("<div id='prova3'></div")
    $('#prova3').append("<h3 id='richiesto'>RICHIESTO: </h3>")
    $('#prova3').append("<p id='esercizio' > Indica per ogni rete: <br> - Subnet mask <br> - Indirizzo di rete <br> - Broadcast</p>")
    $('#giocoo3').append("<button id='buttonGioco3'>PROCEDI</button>");


    $('#buttonGioco3').click(continua2Gioco3);

}


function continua2Gioco3() {
    $('#sub, #consegna, #prova3, #buttonGioco3').remove();

    $('#giocoo3').append("<h2 id='rete'> RETE: 192.168.1.0/24</h2>");
    $('#giocoo3').append("<h2 id='rete2'>sottorete A</h2>");

    creaCampiInput("controllaI", controllaTuttiInputRete1);
}

function creaCampiInput(buttonId, funzioneControllo) {
    $('#giocoo3').append("<h3 id='titoletto1' class='titoletti'>Subnet Mask: </h3><input id='primoCampo' type='text' width='70px' placeholder='Inserisci la risposta'>");
    $('#giocoo3').append("<h3 id='titoletto2' class='titoletti'>Indirizzo di rete: </h3><input id='secondoCampo' type='text' width='70px' placeholder='Inserisci la risposta'>");
    $('#giocoo3').append("<h3 id='titoletto3' class='titoletti'>Indirizzo broadcast: </h3><input id='terzoCampo' type='text' width='70px' placeholder='Inserisci la risposta'>");

    $('#giocoo3').append(`<button id='${buttonId}'>CONTROLLA</button>`);

    $(`#${buttonId}`).click(funzioneControllo);
}

function controllaTuttiInputRete1() {
    var cont = 0;

    if ($('#primoCampo').val() == "255.255.255.128") {
        cont++;
        $('#primoCampo').css({
            backgroundColor: "white"
        });
    } else {
        $('#primoCampo').css({
            backgroundColor: "red"
        });
    }

    if ($('#secondoCampo').val() == "192.168.1.0") {
        cont++;
        $('#secondoCampo').css({
            backgroundColor: "white"
        });
    } else {
        $('#secondoCampo').css({
            backgroundColor: "red"
        });
    }

    if ($('#terzoCampo').val() == "192.168.1.127") {
        cont++;
        $('#terzoCampo').css({
            backgroundColor: "white"
        });
    } else {
        $('#terzoCampo').css({

            backgroundColor: "red"
        });
    }

    if (cont == 3) {
        $('#titoletto1, #primoCampo, #titoletto2, #secondoCampo, #titoletto3, #terzoCampo, #controllaI').remove();
        controllaTuttiInputRete2_pt1();
    }
}

function controllaTuttiInputRete2_pt1() {
    $('#rete2').html("sottorete B");
    creaCampiInput("controllaII", controllaTuttiInputRete2);
}

function controllaTuttiInputRete2() {
    var cont = 0;

    if ($('#primoCampo').val() == "255.255.255.192") {
        cont++;
        $('#primoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#primoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if ($('#secondoCampo').val() == "192.168.1.128") {
        cont++;
        $('#secondoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#secondoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if ($('#terzoCampo').val() == "192.168.1.191") {
        cont++;
        $('#terzoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#terzoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if (cont == 3) {
        console.log("HB");

        $('#titoletto1, #primoCampo, #titoletto2, #secondoCampo, #titoletto3, #terzoCampo, #controllaII').remove();
        controllaTuttiInputRete3_pt1();
    }
}
function controllaTuttiInputRete3_pt1() {
    $('#rete2').html("sottorete C");
    creaCampiInput("controllaIII", controllaTuttiInputRete3);
}
function controllaTuttiInputRete3() {
    var cont = 0;

    if ($('#primoCampo').val() == "255.255.255.224") {
        cont++;
        $('#primoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#primoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if ($('#secondoCampo').val() == "192.168.1.192") {
        cont++;
        $('#secondoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#secondoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if ($('#terzoCampo').val() == "192.168.1.223") {
        cont++;
        $('#terzoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#terzoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if (cont == 3) {

        $('#titoletto1, #primoCampo, #titoletto2, #secondoCampo, #titoletto3, #terzoCampo, #controllaIII').remove();
        controllaTuttiInputRete4_pt1();
    }
}


function controllaTuttiInputRete4_pt1() {
    $('#rete2').html("sottorete D");
    creaCampiInput("controllaIIII", controllaTuttiInputRete4);
}
function controllaTuttiInputRete4() {
    var cont = 0;

    if ($('#primoCampo').val() == "255.255.255.240") {
        cont++;
        $('#primoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#primoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if ($('#secondoCampo').val() == "192.168.1.224") {
        cont++;
        $('#secondoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#secondoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if ($('#terzoCampo').val() == "192.168.1.239") {
        cont++;
        $('#terzoCampo').css({ 
            backgroundColor: "white" 
        });
    } else {
        $('#terzoCampo').css({ 
            backgroundColor: "red" 
        });
    }

    if (cont == 3) {
        console.log("HSSBDA");

        $("#giocoo3").html("<h1 style='padding-top:100px;color:white'>Complimenti hai terminato il gioco DIFFICILE!!</h1>")
        setTimeout(function () {
            $('#butHelp').fadeOut(500)
            $("#game").fadeOut(500, function () {

                $('#butHelp').removeAttr("disabled")
                $('#butHelp').removeClass("no-hover")
                $("#overlay").css("z-index", 1)
                inGioco3 = false
                gameStarted = true
            })
        }, 500)
    }
}

function gioco3funzz1() {

    $('#game').append("<div id='giocoo3'></div>")

    $('#giocoo3').append("<h2 id='sub' >SUBNETTING</h2>")

    $('#giocoo3').append("<h3 id='consegna' >Hai a disposizione la rete 192.168.10.0/24.<br> Devi suddividere questa rete in 6 sottoreti uguali.</h3>")
    $('#giocoo3').append("<div id='prova3'></div")
    $('#prova3').append("<h3 id='richiesto'>RICHIESTO: </h3>")
    $('#prova3').append("<p id='esercizio' > - Determina la nuova subnet mask.<br> - Calcola il numero di host disponibili per ciascuna sottorete.<br> - Elenca le prime 3 sottoreti, indicando:<br> - Indirizzo di rete <br>- Primo host <br> - Ultimo host <br> - Indirizzo di broadcast</p>")
    $('#giocoo3').append("<button id='buttonGioco3'>PROCEDI</button>");

    $('#buttonGioco3').click(continuaGioco3);

}



function controllaPortaUscitaStanza() {
    if (inStanza1 || inStanza2 || inStanza3) {
        if (
            player.position().left > 378 &&
            player.position().left + player.width() < 534 &&
            player.position().top + player.height() > 770 &&
            movimento == "Down"
        ) {
            gameStarted = false;

            $("#room").animate({ opacity: 0 }, 500)
            $("#player").fadeOut(500)
            $("#ghost").fadeOut(500)
            $("#ombra").fadeOut(500, function () {
                $("#room").attr("src", "img/rooms/startRoom.png")

                if (inStanza1) {
                    player.css({ top: "185px", left: "188px" })
                }
                if (inStanza2) {
                    player.css({ top: "185px", left: "408px" })
                }
                if (inStanza3) {
                    player.css({ top: "185px", left: "648px" })
                }

                left = right = up = down = false
                inStanza1 = inStanza2 = inStanza3 = false
                cancelSpriteAnimation()
                setTimeout(function () {
                    $("#room").animate({ opacity: 1 }, 500)
                    $("#player").fadeIn(500)
                    $("#ghost").fadeIn(500)
                    $("#ombra").fadeIn(500)
                    gameStarted = true
                    movement()
                }, 100)
            })
        }
    }
}



function controlloPortaUscita() {
    if (!(inStanza1 || inStanza2 || inStanza3)) {
        if (player.position().top + player.height() < 430 && player.position().top + player.height() > 400 && player.position().left > 410 && player.position().left + player.width() < 486 && movimento == "Up") {
            if (completo1 != null && completo2 != null && completo3 != null) {
                $("#ghost").hide()
                $("#ombra").hide()
                player.hide()
                $("#room").fadeOut(1000, function () {
                    $("#room").attr("src", "img/rooms/desktop.png")
                    $("#room").css({
                        height: "792.344px",
                        width: "909.328px"
                    })
                    $("#room").fadeIn(1000, function () {
                        console.log(!completo1 || !completo2 || !completo3)

                        if (!completo1 || !completo2 || !completo3) {
                            $("#testoBENVENUTO").html("Complimenti hai completato la stanza 6, anche se con un po' di difficoltà!! Torna pure ogni volta che vuoi per un ripassino!!😉😉")
                            $("#BENVENUTO").height(200)
                        }
                        else {
                            $("#testoBENVENUTO").html("BRAVISSIMO!! NEANCHE UN ERRORE... 😮😮<br> Hai completato la stanza 6!!")
                            $("#BENVENUTO").height(150)

                        }

                        $("#interface-overlay").fadeIn()
                        $("#OK3").addClass("show-on-overlay");


                        $("#BENVENUTO").show()
                        $("#fantasmino").show()
                        $("#OK3").show()
                    })
                })
            } else {
                gameStarted = false
                left = right = up = down = false

                cancelAnimationFrame(animation)
                animation = null
                cancelSpriteAnimation()

                $("#ombra").hide()
                $("#ghost").hide()
                $("#testoBENVENUTO").html("Prima di uscire dovrai completare tutti i GIOCHINIII👻👻")
                $("#BENVENUTO").height(200)
                $("#interface-overlay").fadeIn()
                $("#OK4").addClass("show-on-overlay");

                $("#BENVENUTO").show()
                $("#fantasmino").show()
                $("#OK4").show()
            }
        }
    }
}

$("#OK4").click(function () {
    $("#BENVENUTO").hide()
    $("#interface-overlay").fadeOut()

    player.fadeOut(500)
    $("#room").fadeOut(1000, function () {
        player.css({
            top: playerPosition.top,

            left: playerPosition.left,
        })
        $("#ombra").fadeIn(1000)
        $("#ghost").fadeIn(1000)
        player.fadeIn(1000)
        $("#room").fadeIn(1000)
        gameStarted = true
        movimento = ""
    })

})

$("#OK2").click(function () {
    $("#BENVENUTO").hide()
    $("#interface-overlay").fadeOut()
    $("#ombra").show()
    $("#ghost").show()
    setTimeout(function() {
        gameStarted = true
    }, 100)
})


function checkCompletion() {
    return true
}


$("#OK3").click(function () {
    checkCompletion()
    checkAndProceed(); // Definita in common.js

})

$("#OK").click(function () {
    $("#BENVENUTO").hide();
    $("#interface-overlay").fadeOut();
    gameStarted = true;

    const img = $("<img>", {
        "id": "ghost",
        src: "img/fantasma/fantasmino.png",
        css: {
            position: "absolute",
            left: "50px",
            bottom: "250px",
            height: "100px",
            zIndex: 2
        }
    });

    const gameInterface = $("#interface");
    img.addClass("animate");

    gameInterface.append(img);


    const ombra = $("<img>", {
        "id": "ombra",
        src: "img/fantasma/ombra.png",
        css: {
            position: "absolute",
            left: "50px",
            bottom: "170px",
            width: "100px",
            zIndex: 2
        }
    });


    ombra.addClass("animate");

    gameInterface.append(ombra);



})


function maiInStanza() {
    $("#ombra").hide()
    $("#ghost").hide()

    $("#testoBENVENUTO").html("Ti do il benvenuto in una delle mie stanze!! Per uscire da qui dovrai completare tutte e 3 le stanze, che tu le faccia bene o male. Per accedere ai minigiochi dirigiti verso un computer e clicca il tasto di invio! BUONAFORTUNA!!😉😉")
    $("#BENVENUTO").height(350)

    $("#OK2").addClass("show-on-overlay");


    $("#BENVENUTO").show()
    $("#fantasmino").show()
    $("#OK2").show()
    $("#interface-overlay").fadeIn();

    maiStatoInStanza = false
}


function showHint() {

}


function gioco1() { }
function gioco2() { }
function gioco3() { }