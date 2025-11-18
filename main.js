
//Mostrar la palabra escrita por el usuario
document.getElementById("bMostrar1").onclick = function () {
    let input = document.getElementById("palabraAbuscar");
    if (input.type === "password") {
        input.type = "text";
        document.getElementById("bMostrar1").innerText = "Ocultar palabra";
    } else {
        input.type = "password";
        document.getElementById("bMostrar1").innerText = "Mostrar palabra";
    }
}



//empezar el juego
document.getElementById("bEmpezar").onclick = function (){
    //anulamos que se pueda cambiar la palabra y deshabilitamos el boton de mostrar la palabra
    document.getElementById("palabraAbuscar").disabled = true;
    document.getElementById("bMostrar1").disabled = true;
    //Y habilitamos la interfaz del usuario
    document.getElementById("letraUsuario").disabled = false;
    document.getElementById("bAceptar").disabled = false;

    //VARIABLES
    let letrasFallidas = [];
    let intentosRestantes = 6; //numero de intentos
    let palabraAbuscar = document.getElementById("palabraAbuscar").value;
    let letrasPalabra = [];
    letrasPalabra= palabraAbuscar.split(""); //array con las letras de la palabra
    //creamos un array con la longitud de la palabra a buscar y censurado con "-"
    let palabraCensurada = [];
    for (x=0; x < palabraAbuscar.length; x++){
        palabraCensurada[x] = "-";
    }
    document.getElementById("palabraCensurada").innerText = palabraCensurada.join(" "); //palabra censurada con "-"


    //al pulsar el boton aceptar
    document.getElementById("bAceptar").onclick = function () {

        let letraUsuario = document.getElementById("letraUsuario").value; //letra que introduce el usuario
        let contadorAciertos = 0;

        if (soloLetras(letraUsuario) == false || letraUsuario == "") { //si el contenido no es valido
            alert("Solo se permiten letras mayusculas o minusculas ");
            return;
        } else {
            for (x = 0; x < letrasPalabra.length; x++) { //vamos rellenando la palabra censurada si encontramos letra
                if (letraUsuario === letrasPalabra[x]) {
                    palabraCensurada[x] = letraUsuario;
                    document.getElementById("palabraCensurada").innerText = palabraCensurada.join(" "); //palabra censurada con "-"
                    contadorAciertos ++;
                }
            }
            //si no hay aciertos se resta un intento y se añade la letra fallida a un array
            if (contadorAciertos == 0){
                intentosRestantes--;
                añadirLetraFallida(letrasFallidas, letraUsuario);
            }

            document.getElementById("letrasFallidas").innerHTML = "Letras fallidas: "+ letrasFallidas.join(" ");
            document.getElementById("intentos").innerHTML = "Aciertos: "+contadorAciertos;
            document.getElementById("intentos").innerHTML = "Te quedan " + intentosRestantes + " vidas";
        }
    // si no quedan vidas
    perder(intentosRestantes);

    ganar(palabraCensurada, palabraAbuscar);
    
    }   
}




//funcion que devuelve true o false si coincide con solo letras minusculas y mayusculas
function soloLetras(texto) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(texto);
}



function perder(vidas) {
    if (vidas == 0) {
        document.getElementById("letraUsuario").disabled = true;
        document.getElementById("bAceptar").disabled = true;
        document.getElementById("intentos").innerHTML = "GAME OVER";
    }
}



//se pasa la palabra censurada a un string sin separaciones y si es igual a la palabra a buscar, ganas
function ganar(palabraCensurada, palabraAbuscar) {
    if (palabraCensurada.join("") === palabraAbuscar) {
        document.getElementById("bAceptar").disabled = true;
        document.getElementById("intentos").innerHTML = "HAS GANADO";
        
        /*alert() interrumpe el flujo de renderizado, asi que el cambio 
        no se muestra hasta que el usuario cierra la alerta.
        Por eso se debe retrasar:
        */
        setTimeout(() => {
            alert("Has ganado, muy bien tio");
        }, 100); // espera 100 milisegundos
    }
}



//funcion que añade una letra fallida a un array si la letra no esta dentro de este 
function añadirLetraFallida(array, letra){
    let apariciones = 0;
    for (x=0; x < array.length; x++){
        if (array[x] == letra){
            apariciones++;
        }
    }
    if (apariciones == 0){
        array.push(letra);
    }
}


