window.onload = function () {
    apiMostrarProductos();
    apiMostrarCategorias();
};

document.getElementById("btnBuscar").onclick = () => {
    nombreProducto = document.getElementById("inpBuscar").value;
    apiBuscarProductos(nombreProducto);
};

document.getElementById("cbxCategoria").onchange = () => {
   idCategoria = document.getElementById("cbxCategoria").value;
   apiBuscarCategoria(idCategoria);
};


function apiMostrarProductos() {
    const API_URL = "https://bsaleapi.herokuapp.com/productos";
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const HTMLResponse = document.querySelector("#ContProductos");
            const tpl = data.map(producto => templateProductos(producto.url_image, producto.name, producto.price))
            HTMLResponse.innerHTML = tpl.join("");
        }).catch(
            err => { console.log(err); }
        )
}

function apiMostrarCategorias() { 
    const API_URL = "https://bsaleapi.herokuapp.com/categoria";
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const HTMLResponse = document.querySelector("#cbxDefecto");
            console.log(HTMLResponse)
            const tpl = data.map(categoria => templateCategorias(categoria.id , categoria.name))
            HTMLResponse.insertAdjacentHTML('afterend',tpl.join(""));
        }).catch(
            err => { console.log(err); }
        )
}


function apiBuscarCategoria(idCategoria) {
    if (idCategoria != 0) {
        const API_URL = "https://bsaleapi.herokuapp.com/productos/categorias/" + idCategoria;
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const HTMLResponse = document.querySelector("#ContProductos");
                const tpl = data.map(producto => templateProductos(producto.url_image, producto.name, producto.price))
                HTMLResponse.innerHTML = tpl.join("");
            }).catch(
                err => { console.log(err); }
            )
    }else{
        apiMostrarProductos();
    }
}


function apiBuscarProductos(nombreProducto) {
    if (nombreProducto != '') {
        const API_URL = "https://bsaleapi.herokuapp.com/productos/buscador/" + nombreProducto;
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const HTMLResponse = document.querySelector("#ContProductos");
                const tpl = data.map(producto => templateProductos(producto.url_image, producto.name, producto.price))
                HTMLResponse.innerHTML = tpl.join("");
            }).catch(
                err => { console.log(err); }
            )
    }else{
        apiMostrarProductos();
    }
}


function templateCategorias(idCategoria,NombreCategoria) {
    const template = `<option value="${idCategoria}" >${NombreCategoria}</option>`
    return template;
}


function templateProductos(url_image, name, price) {
    let notfound = "../static/NotFound.jpg"
    let url_imagen = url_image == null || url_image == '' ? notfound : url_image
    const template = `<div class="producto">
                            <img class="imagen" src="${url_imagen}" alt="cargando..">
                            <div class="contNombreProducto">  
                                <p class="texto">${name}</p>
                            </div>
                            <div class="fotterProducto">
                                <p class="texto">$${price}</p>
                                <i class="fas fa-cart-plus circulo"></i>
                            </div>
                        </div>`
    return template;
}





