//Inicializacion de variables
let targetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

//apuntando a documento Html
let mostrarMovimentos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo =document.getElementById("t-restante");
let winAudio = new Audio('./sounds/win.wav');
let clickAudio= new Audio('./sounds/click.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

//Generacion de numeros aletorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

//funciones
function contarTiempo(){
   tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas(){
    for (let i = 0; i <=15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = ` <img src="./img/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
        
    }
}

//funcion principal
function destapar(id) {

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

  targetasDestapadas++;
  console.log(targetasDestapadas);

  if (targetasDestapadas == 1) {
    //mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`;
    clickAudio.play();

    //desabilitar primer boton
    tarjeta1.disabled = true;
  } else if (targetasDestapadas == 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = ` <img src="./img/${segundoResultado}.png" alt="">`;

    //desabilitar segundo boton
    tarjeta2.disabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimentos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      targetasDestapadas = 0;

      //aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      rightAudio.play();

      if(aciertos == 8){
        winAudio.play();
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 👍`;
        mostrarTiempo.innerHTML = `Fantastico! 🎉 solo demoraste ${timerInicial - timer} segundos`;
        mostrarMovimentos.innerHTML = `Movimientos: ${movimientos} 👀`;
      }

    } else {
      wrongAudio.play();
      //mostrar momentaneamente valores
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        targetasDestapadas = 0;
      }, 300);
    }
  }
}
