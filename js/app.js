//Calculadora relacion de cilindrada total
// La formula de calculo de cilindrada en centimetros cubicos es ((((diametro*diametro*pi)/4)*carrera)*cantidadCilindros)/1000


let diametroCilindro = prompt("Ingrese diametro de cilindro en milimetros (ejemplo 86.4): ");
let desplazamientoPiston = prompt("Ingrese el desplazamiento del piston en milimetros (ejemplo 67.4): ");
let cantidadCilindros = prompt("Ingrese la cantidad de cilindros de su motor (ejemplo 4): ");
const piNumber = 3.1416;
const constanteCalc = 4;
let calc = true;

while (calc == true){
    if ((diametroCilindro != "") && (desplazamientoPiston != "") && (cantidadCilindros != "")  ){
        Number(diametroCilindro)
        Number(desplazamientoPiston)
        Number(cantidadCilindros)
        cilindradaTotalCalc = ((((diametroCilindro*diametroCilindro*piNumber)/constanteCalc)*desplazamientoPiston)*cantidadCilindros)/1000
        alert("La cilindrada de su motor es: " + parseInt(cilindradaTotalCalc) + " cc3")
    }
    else{
        alert("Por favor complete los campos, al parecer uno o mas valores no han sido ingresados")
        break
    }
    seguirCalculando = prompt("Desea calcular otra cilindrada?, escriba SI para continuar, enter para finalizar:")
    if ((seguirCalculando == "SI") || (seguirCalculando == "si") ){
        calc = false
        location.reload()
    }
    else{
        break
    }
}