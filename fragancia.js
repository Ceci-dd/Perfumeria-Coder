const shopcontent = document.getElementById("shopcontent");
const carritocontent = document.getElementById("carrito");
const inputBuscar = document.getElementById("inputprincipal");
const botonBuscar = document.getElementById("buscar");
const contadorCarrito = document.getElementById("contador-carrito");

let perfumes = []; 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("./perfumes.json")
  .then(response => response.json())
  .then(data => {
    perfumes = data;
    mostrarPerfumes(perfumes);
    actualizarContador();
  })
  .catch(() => {
    Toastify({
      text: "⚠ Error al cargar perfumes",
      duration: 3000,
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #ff0188ff, #3d001bff)",
        borderRadius: "10px",
        fontSize: "28px",  
        padding: "16px 24px"
      }
    }).showToast();
  });

function mostrarPerfumes(lista) {
  shopcontent.innerHTML = "";

  if (lista.length === 0) {
    shopcontent.innerHTML = `<p class="sin-resultados">❌ No se encontraron resultados</p>`;
    return;
  }

  lista.forEach(perfume => {
    const card = document.createElement("div");
    card.className = "cardstyle";
    card.innerHTML = `
      <img src="${perfume.img}" alt="${perfume.nombre}" class="perfumeimg"/>
      <h3>${perfume.nombre}</h3>
      <p>Tipo: ${perfume.tipo}</p>
      <p class="precio">Precio: $${perfume.precio}</p>
    `;

    const botonAgregar = document.createElement("button");
    botonAgregar.innerText = "Agregar al Carrito";
    botonAgregar.className = "botoncarrito";

    botonAgregar.addEventListener("click", () => {
      const productoExistente = carrito.find(item => item.nombre === perfume.nombre);

      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        carrito.push({
          nombre: perfume.nombre,
          tipo: perfume.tipo,
          precio: perfume.precio,
          cantidad: 1
        });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
      actualizarContador();

      Toastify({
        text: `Has agregado "${perfume.nombre}" al carrito 🛒`,
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #ff0188ff, #3d001bff)",
          borderRadius: "10px",
          fontSize: "28px",  
          padding: "16px 24px"
        }
      }).showToast();
    });

    card.appendChild(botonAgregar);
    shopcontent.appendChild(card);
  });
}

botonBuscar.addEventListener("click", () => {
  const texto = inputBuscar.value.trim().toLowerCase();
  const resultados = perfumes.filter(perfume => perfume.nombre.toLowerCase().includes(texto));
  mostrarPerfumes(resultados);
});

function mostrarCarrito() {
  carritocontent.innerHTML = "";

  carrito.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-carrito";
    itemDiv.innerHTML = `
      <p class="itemscarrito">${item.nombre} - ${item.tipo} - $${item.precio} x ${item.cantidad}</p>
      <button class="eliminarbutton">Eliminar</button>
    `;

    const eliminarButton = itemDiv.querySelector(".eliminarbutton");
    eliminarButton.addEventListener("click", () => {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
      actualizarContador();
    });

    carritocontent.appendChild(itemDiv);
  });

  actualizarContador();
}

function actualizarContador() {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contadorCarrito.innerText = totalItems;
}