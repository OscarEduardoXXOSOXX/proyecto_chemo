let carrito = [];

function agregarAlCarrito(nombre, precio, imagen) {
    const producto = { nombre, precio, imagen };
    carrito.push(producto);
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    carritoLista.innerHTML = '';
    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="button" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoLista.appendChild(item);
    });
    document.getElementById('carrito-total').innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function aprovecharPromocion(nombre, precio, imagen) {
    agregarAlCarrito(nombre, precio, imagen);
    agregarAlCarrito(nombre, 0, imagen); // El segundo producto es gratis
}

function enviarComentario(event) {
    event.preventDefault();
    const texto = document.getElementById('comentario-texto').value;
    const comentario = document.createElement('div');
    comentario.classList.add('comentario');
    comentario.innerHTML = `
        <h3>Usuario</h3>
        <p>${texto}</p>
    `;
    document.getElementById('comentarios-lista').appendChild(comentario);
    document.getElementById('comentario-texto').value = '';
}

function confirmarCerrarSesion() {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
        window.location.href = 'index.html'; // Redirige a index.html
    }
}

function buscarProductos() {
    const searchBar = document.getElementById('search-bar');
    const query = searchBar.value.toLowerCase();
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        const nombre = producto.querySelector('h3').textContent.toLowerCase();
        if (nombre.includes(query)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
    
    searchBar.value = ''; // Limpiar la barra de búsqueda
}

function filtrarProductos() {
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        const categoriaProducto = producto.classList.contains(categoria) || categoria === 'todos';
        const precioProducto = getPrecioCategoria(producto);

        if (categoriaProducto && (precioProducto === precio || precio === 'todos')) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

function getPrecioCategoria(producto) {
    const precioTexto = producto.querySelector('p').textContent;
    const precio = parseFloat(precioTexto.replace('$', ''));

    if (precio < 20) {
        return 'bajo';
    } else if (precio >= 20 && precio <= 50) {
        return 'medio';
    } else {
        return 'alto';
    }
}
