const perfumes = [
    { tipo: "Floral", nombre: "Jazmin Suave", precio: 120 },
    { tipo: "Amaderado", nombre: "Cedro del bosque", precio: 150 },
    { tipo: "Frutal", nombre: "Pasión", precio: 110 }
];


function buscarPerfume() {
    const perfume = prompt(`¿Qué tipo de perfume estás buscando?
    1 - Floral
    2 - Amaderado
    3 - Frutal`);

    switch (perfume) {
        case "1":
            alert("Elegiste el perfume 1: Jazmin Suave - precio: $120");
            console.log(perfumes[0]);
            break;
        case "2":
            alert("Elegiste el perfume 2: Cedro del bosque - precio: $150");
            console.log(perfumes[1]);
            break;
        case "3":
            alert("Elegiste el perfume 3: Pasión - precio: $110");
            console.log(perfumes[2]);
            break;
        default:
            alert("La opción que ingresaste no es válida");
            console.log("Entrada inválida")
            break;
    }
}

buscarPerfume();