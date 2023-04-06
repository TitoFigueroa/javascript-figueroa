//Aplicacion e-commerce de elementos para autos
let startMessage = prompt("Para comenzar con su compra, por favor indicanos tu nombre: ")
let fisrtBuy = true
const reproTypesPrices = [{name:"stage1",precio:9000},{name:"stage2",precio:12000},{name:"stage3",precio:15000}] 

function showReproInfo(reproType){
    switch (reproType) {
        case "1":
            return Object.values(reproTypesPrices[reproType-1])
            break;
        case "2":
            return Object.values(reproTypesPrices[reproType-1])
            break;
        case "3":
            return Object.values(reproTypesPrices[reproType-1])
            break;
    
        default:
            break;
    }
}

function main(name){
    while (fisrtBuy === true) {
    let todayDate = new Date()
    welcomeMessageInput = prompt ("Hola " + name + " , te damos la bienvenida al sitio donde encontraras los mejores chips para tu auto \n"
    + "Elegi por favor que tipo de stage potencia desea y le compartiremos el costo del mismo: \n"
    + "\n 1)stage1 \n 2)stage2 \n 3)stage3:")
    if (welcomeMessageInput == 1  || welcomeMessageInput == 2 || welcomeMessageInput == 3){
        if (welcomeMessageInput == 1){
            alert("El precio al dia de la fecha " + todayDate.toLocaleDateString() + " del " + showReproInfo(welcomeMessageInput)[0] + " es: " + showReproInfo(welcomeMessageInput)[1])
            fisrtBuy = false
        }
        else if (welcomeMessageInput == 2){
            alert("El precio al dia de la fecha " + todayDate.toLocaleDateString() + " del " + showReproInfo(welcomeMessageInput)[0] + " es: " + showReproInfo(welcomeMessageInput)[1])
            fisrtBuy = false
        }
        else if (welcomeMessageInput == 3){
            alert("El precio al dia de la fecha " + todayDate.toLocaleDateString() + " del " + showReproInfo(welcomeMessageInput)[0] + " es: " + showReproInfo(welcomeMessageInput)[1])
            fisrtBuy = false
        }
    }
        else{
            alert("Ud ha ingresado un valor incorrecto, por favor ingrese 1 para seleccionar stage1,  2 para stage2 o 3 para stage3")
            location.reload()
        } 
    }
    
    secondOffer = prompt("Desea comprar metanol para potenciar aun mas su auto?, escriba SI. En caso negativo, NO para finalizar la compra ")
    if(secondOffer == "si" || secondOffer == "SI"){
        location.reload()
    }
    else{
        alert("Muchas gracias por su compra, que disfrutes tu vehiculo potenciado. Hasta la proxima")
    }
}

main(startMessage)