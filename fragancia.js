const shopcontent = document.getElementById("shopcontent");
const carritocontent = document.getElementById("carrito");
const inputBuscar = document.getElementById("inputprincipal");
const botonBuscar = document.getElementById("buscar");

let perfumes = []; 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("./perfumes.json")
  .then(response => response.json())
  .then(data => {
    perfumes = data;
    mostrarPerfumes(perfumes);
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

  lista.forEach((perfume) => {
    const card = document.createElement("div");
    card.className = "cardstyle";
    card.innerHTML = `
      <img src="${perfume.img}" alt="${perfume.nombre}" class="perfumeimg"/>
      <h3>${perfume.nombre}</h3>
      <p>Tipo: ${perfume.tipo}</p>
      <p class="precio">Precio: $${perfume.precio}</p>
    `;

    const AgregarAlCarrito = document.createElement("button");
    AgregarAlCarrito.innerText = "Agregar al Carrito";
    AgregarAlCarrito.className = "botoncarrito";

    AgregarAlCarrito.addEventListener("click", () => {
      carrito.push({
        nombre: perfume.nombre,
        tipo: perfume.tipo,
        precio: perfume.precio
      });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();

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

    card.appendChild(AgregarAlCarrito);
    shopcontent.appendChild(card);
  });
}

botonBuscar.addEventListener("click", () => {
  const texto = inputBuscar.value.trim().toLowerCase();

  const resultados = perfumes.filter(perfume =>
    perfume.nombre.toLowerCase().includes(texto)
  );

  mostrarPerfumes(resultados.length > 0 ? resultados : perfumes);
});

function mostrarCarrito() {
  carritocontent.innerHTML = ""; 

  carrito.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-carrito";
    itemDiv.innerHTML = `
      <p class="itemscarrito">${item.nombre} - ${item.tipo} - $${item.precio}</p>
      <button class="eliminarbutton">Eliminar</button>
    `;

    const eliminarButton = itemDiv.querySelector(".eliminarbutton");
    eliminarButton.addEventListener("click", () => {
      eliminarDelCarrito(index);
    });

    carritocontent.appendChild(itemDiv);
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1); 
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito(); 
}