// Obtener referencias a los elementos del DOM
const listaProductos = document.getElementById('lista-productos');
const botonFinalizar = document.getElementById('boton-finalizar');
const montoTotal = document.getElementById('monto-total');
const carritoIcon = document.querySelector('.carrito-icon');
const carritoCantidad = document.getElementById('carrito-cantidad');

// Variables globales
let productos = [];
let carrito = [];

// Clase Producto
class Producto {
	constructor(id, nombre, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = 1; // Agregamos una propiedad para contar la cantidad de productos seleccionados
	}
}

// Función para mostrar los productos en la lista
const mostrarProductos = () => {
	listaProductos.innerHTML = '';

	productos.forEach((producto) => {
    const productoElemento = document.createElement('li');
    productoElemento.classList.add('producto');

    const imagenElemento = document.createElement('img');
    imagenElemento.src = producto.imagen;
    imagenElemento.alt = producto.nombre;
    productoElemento.appendChild(imagenElemento);

    const nombreElemento = document.createElement('span');
    nombreElemento.textContent = producto.nombre;
    productoElemento.appendChild(nombreElemento);

    const precioElemento = document.createElement('span');
    precioElemento.textContent = `$${producto.precio}`;
    productoElemento.appendChild(precioElemento);

    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al Carrito';
    botonAgregar.classList.add('boton-agregar');
    botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));
    productoElemento.appendChild(botonAgregar);

    listaProductos.appendChild(productoElemento);
	});
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
	const productoExistente = carrito.find((item) => item.id === producto.id);
	if (productoExistente) {
	  // Si el producto ya existe en el carrito, incrementamos su cantidad
	productoExistente.cantidad++;
	} else {
	  // Si es un nuevo producto, lo agregamos al carrito
	carrito.push(producto);
	}
	localStorage.setItem('carrito', JSON.stringify(carrito));
	Swal.fire({
		icon: 'success',
		title: '¡Producto agregado al carrito!',
		text: `${producto.nombre} ha sido agregado al carrito.`,
	});
	actualizarMontoTotal();
	actualizarCarritoCantidad();
	botonFinalizar.style.display = 'block';
};

  // Función para actualizar la cantidad de elementos en el carrito
const actualizarCarritoCantidad = () => {
	const cantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
	carritoCantidad.textContent = cantidad;
};

// Función para calcular el subtotal de la compra
const calcularSubtotal = () => {
	const subtotal = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
	return subtotal.toFixed(2);
};

// Función para actualizar el monto total de la compra
const actualizarMontoTotal = () => {
	const subtotal = calcularSubtotal();
	const montoTotalTexto = `Monto total a pagar: $${subtotal}`;
	montoTotal.textContent = subtotal;
	botonFinalizar.textContent = montoTotalTexto;
};

// Función para finalizar la compra
const finalizarCompra = () => {
	localStorage.removeItem('carrito');
	carrito = [];
	Swal.fire({
		icon: 'success',
		title: '¡Compra finalizada!',
		text: `Monto total: $${montoTotal.textContent}`,
	});
	montoTotal.textContent = '0.00';
	botonFinalizar.style.display = 'none';
	actualizarCarritoCantidad();
};

// Obtener productos de la API
const obtenerProductos = async () => {
try {
	const response = await fetch('https://fakestoreapi.com/products');
	if (!response.ok) {
		throw new Error('Error al obtener los productos');
	}
	const data = await response.json();
	productos = data.map((producto) => new Producto(producto.id, producto.title, producto.price, producto.image));
	mostrarProductos();
	} catch (error) {
	console.error(error);
	}
};

// Cargar el carrito desde el almacenamiento local (localStorage)
const cargarCarritoDesdeLocalStorage = () => {
const carritoJSON = localStorage.getItem('carrito');
	if (carritoJSON) {
	carrito = JSON.parse(carritoJSON);
	botonFinalizar.style.display = 'block';
	actualizarMontoTotal();
	}
};

// Manejador de evento para finalizar la compra
botonFinalizar.addEventListener('click', finalizarCompra);

// Llamar a las funciones iniciales
obtenerProductos();
cargarCarritoDesdeLocalStorage();
actualizarCarritoCantidad();
actualizarMontoTotal();