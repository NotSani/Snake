var Dim = 30;

let cont = 0;

var mat = new Array (500);
for (i=0; i<mat.length; i++)
    mat[i] = new Array (2);

let stop = true;
let Time = 200;
let First = false;
var GRIGIO = "rgb(127, 127, 127)";
var BIANCO = "rgb(255, 255, 255)";
var ROSSO = "rgb(255, 0, 0)";
var BLU = "rgb(0, 0, 255)";

let x = 0;
let m = 0;
let secondi = 0;
let minuti = 0;

mat[0][0] = 15;
mat[0][1] = 15;
mat[1][0] = 15;
mat[1][1] = 15;
mat[2][0] = 15;
mat[2][1] = 15;
var Riga = 15;
var Colonna = 15;
let lastDirezione = 0;
var Direzione = "dx";
var rigaCibo = -1;
var colCibo = -1;

function avvia() {

    var tagTR, tagTD;
	var tagBTN;
    var I, J;
    
    // Gestione Tabella 
    var body = document.getElementsByTagName("body")[0];

    let center = document.createElement("center");
    body.appendChild(center);
    let div = document.createElement("div");
    div.setAttribute("id","wrapper");
    div.setAttribute("style", "padding:10px; width:560px; margin:10px; border-radius:10px; box-shadow:3px 3px #888; background-color:#E0E0E0;");
    center.appendChild(div);

    body.setAttribute("onkeypress", "keyPremuto(event)")

    let titolo = document.createElement("h1");
    titolo.innerText = "SNAKE";
    titolo.setAttribute("style","font-size: 50px");
    div.appendChild(titolo);

    var tabella = document.createElement("table");
    div.appendChild(tabella)

    tabella.style.margin = "20px auto";
    tabella.style.borderSpacing = "0";
    
    for (I = 0; I < Dim; I++) {

        tagTR = document.createElement("tr");
        tabella.appendChild(tagTR);
        
        for (J = 0; J < Dim; J++) {

            tagTD = document.createElement("td");
			tagTD.style.width = "18px";
            tagTR.appendChild(tagTD);
            
            // Nuovo Button
            tagBTN = document.createElement("input");
			tagBTN.type = "button";
			tagBTN.id = "btn" + I + "-" + J;
			tagBTN.style.width = "18px";
			tagBTN.style.height = "15px";
			tagBTN.style.backgroundColor = GRIGIO;
            tagBTN.style.color = BIANCO;
            tagBTN.name = "norm";
            // Gestione CLICK 
			tagBTN.setAttribute("onClick", "visualizza(this)");
			tagTD.appendChild(tagBTN);

        }
    }

    //Genera Menu
    generaMenu();

    // Generazione del CIBO
    generaCibo();

    idBTN = document.getElementById("btn" + 15 + "-" + 15);
    idBTN.style.backgroundColor = BLU;

    tempo();

}

function generaMenu(){
    let div = document.getElementById("wrapper");

    let div1 = document.createElement("div");

    div1.setAttribute("style","border: 1px solid black; width:40px; heigth: 40px; margin: 5px;")
    div1.innerText = cont;
    div1.id = "contatore";
    div.appendChild(div1);
    
    let selDif=document.createElement("select");
    selDif.setAttribute("id","prova");
    let op1=document.createElement("option");
    op1.setAttribute("value","1");
    op1.innerText="Facile";
    let op2=document.createElement("option");
    op2.setAttribute("value","2");
    op2.innerText="Medio";
    let op3=document.createElement("option");
    op3.setAttribute("value","3");
    op3.innerText="Difficile";
    selDif=document.createElement("select");

    selDif.appendChild(op1);
    selDif.appendChild(op2);
    selDif.appendChild(op3);

    div.appendChild(selDif);

    let timer = document.createElement("div");

    timer.setAttribute("style","border: 1px solid black; width:40px; heigth: 40px;margin: 5px;")
    timer.id = "timer";
    timer.innerText="0:00"
    div.appendChild(div1);
    div.appendChild(timer);

}


function tempo(){
        if (x == 0 & m == 0) {
            if (secondi == 60) {
                secondi = 0;
                minuti++;
            }

            secondi++;
            if(secondi < 10)
                secondi = "0"+ secondi;

            document.getElementById("timer").innerHTML = minuti + ":" + secondi;


            setTimeout("tempo()", 1000);
        }
}

// Gestisce il la pressione di WASD
function keyPremuto(event) {

switch (event.keyCode){
        case 100:
            Direzione = "DX";
            break;
        case 97:
            Direzione = "SX";
            break;
        case 119:
            Direzione = "UP";
            break;
        case 115:
            Direzione = "DOWN";
            break;
    }

    if(First == false){
        First = true;
        sposta();
    }
    

    var idBTN = document.getElementById("btn" + 15 + "-" + 15);
    idBTN.style.backgroundColor = GRIGIO;

}


// Generazione del CIBO
function generaCibo() {
    rigaCibo = Math.floor(Dim * Math.random());
    colCibo = Math.floor(Dim * Math.random());
    var idBTN = document.getElementById("btn" + rigaCibo + "-" + colCibo);
    idBTN.style.backgroundColor = ROSSO;
    idBTN.name = "mela";
}

// Imposto lo Spostamento della Snake
function sposta(){

    var idBTN = document.getElementById("btn" + mat[cont][0] + "-" + mat[cont][1]);
    idBTN.style.backgroundColor = GRIGIO;
    idBTN.name = "vuoto";

    let select = document.getElementsByTagName("select");
    console.log(select.value);
    /*
    switch (selDif.value) {
        case 1:
            Time = 300;
            break;
        case 2:
            Time = 200;
            break;
        case 3:
            Time = 75;
            break;
    }
*/
    //spostiamo nel array la posizione dell nostro snake in modo tale da avere la testa sempre a posizione [0]
    for(let i = cont ; i >= 0; i--){
        mat[i + 1][0] = mat[i][0];  //  |0| |1| |2| |3| -> |-1| |0| |1| | 2|
        mat[i + 1][1] = mat[i][1];
        //console.log(mat[i ][0] + " | " + mat[i][1]);
    }



    // Controllo Cibo
	if (Colonna == colCibo && Riga == rigaCibo)
        generaCibo();
    
    switch (Direzione) {
        case "DX":
            Colonna++;
			break;
        case "SX":
            Colonna--;
			break;
        case "UP":
            Riga--;
			break;
        case "DOWN":
            Riga++;
			break;
    }

    // Controllo Bordo e contatto col proprio corpo
    if(Colonna >= Dim || Colonna < 0 || Riga >= Dim || Riga < 0 || document.getElementById("btn" + Riga + "-" + Colonna).name == "body") {
		  alert("Hai perso  !!!");

          for(let i = 0; i <= cont; i++){   //PULIZIA DEL CADAVERE DI UNA PARTITA PRECEDENTE (RIP)
              idBTN = document.getElementById("btn" + mat[i][0] + "-" + mat[i][1]);
              idBTN.style.backgroundColor = GRIGIO;
              idBTN.name = "vuoto";
          }
          Riga = 15;    //riassegnazione delle variabili per essere pronti a una nuova partita
          Colonna = 15;
          idBTN = document.getElementById("btn" + Riga + "-" + Colonna);
          idBTN.style.backgroundColor = BLU;
          First = false;
          cont = 0;
          secondi = 0;
          minuti = 0;
        let timer = document.createElement("div");
        timer.innerText="0:00";
        return;
	}

    mat[0][0] = Riga;
    mat[0][1] = Colonna;
    let idTesta = document.getElementById("btn" + mat[0][0] + "-" + mat[0][1]);
    
    if(idTesta.name == "mela") {
        console.log("un punto");
        cont++;
        let div1 = document.getElementById("contatore");
        div1.innerText = cont;

    }
    idTesta.name = "body";
    idTesta.style.backgroundColor = BLU;


    setTimeout ("sposta()", Time);

}
