const shopcontent = document.getElementById("shopcontent");
const carritocontent = document.getElementById("carrito");
const inputBuscar = document.getElementById("inputprincipal");
const botonBuscar = document.querySelector(".inputbuscar button");



const perfumes = [
  { tipo: "Floral", nombre: "Jazmin Suave", precio: 120, img: "medios/perfumejazminsuave.jpeg"},
  { tipo: "Amaderado", nombre: "Cedro del bosque", precio: 150, img: "medios/perfumecedrodelbosque.jpeg"},
  { tipo: "Frutal", nombre: "Pasión", precio: 110, img: "medios/perfumepasion.jpeg" }
];

let carrito = [];

perfumes.forEach((perfume) => {
  const card = document.createElement("div");
  card.className = "cardstyle";
  card.innerHTML = `
    <img src="${perfume.img}" alt="" class="perfumeimg"/>
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

    mostrarCarrito();
  });

  card.appendChild(AgregarAlCarrito);
  shopcontent.appendChild(card);
});

botonBuscar.addEventListener("click", () => {
  const texto = inputBuscar.value.trim().toLowerCase();
  shopcontent.innerHTML = "";

  perfumes.forEach(perfume => {
    if (perfume.nombre.toLowerCase().includes(texto) || texto === "") {
      const card = document.createElement("div");
      card.classList.add("cardstylefiltro");
      card.innerHTML = `
        <img src="${perfume.img}" alt="" class="perfumeimgsola"/>
        <h3 class="h3sola">${perfume.nombre}</h3>
        <p>Tipo: ${perfume.tipo}</p>
        <p class="precio">Precio: $${perfume.precio}</p>
      `;

      const botonAgregar = document.createElement("button");
      botonAgregar.innerText = "Agregar al Carrito";
      botonAgregar.className = "botoncarrito";

      botonAgregar.addEventListener("click", () => {
        carrito.push({
          nombre: perfume.nombre,
          tipo: perfume.tipo,
          precio: perfume.precio
        });
        mostrarCarrito();
      });

      card.appendChild(botonAgregar);
      shopcontent.appendChild(card);
    }
  });
});

function mostrarCarrito() {
  carritocontent.innerHTML = ""; 

  carrito.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-carrito";
    itemDiv.innerHTML = `
      <p class="itemscarrito">${item.nombre} - ${item.tipo} - $${item.precio}</p>
      <button onclick="eliminarDelCarrito(${index})" class="eliminarbutton">Eliminar</button>
    `;


    carritocontent.appendChild(itemDiv);

  });
}





function eliminarDelCarrito(index) {
  carrito.splice(index, 1); 
  mostrarCarrito(); 
}









