const Perfumes = [
    {tipo:"Floral",nombre:"Jazmin Suave",precio:120},
    {tipo:"Amaderado",nombre:"Cedro del bosque", precio:150},
    {tipo:"Frutal",nombre:"Pasión",precio:110}
];

console.log(Perfumes[2])

let perfume = prompt (`Qué tipo de perfume estás buscando?
    1 - Floral
    2 - Amaderado
    3 - Frutal
    `);

switch (perfume) {
  case "1":
    alert("Nombre: Jazmin Suave, precio:$120");
    break;
  case "2":
    alert("Nombre: Cedro del bosque, precio:$150");
    break;
  case "3":
    alert("Nombre: Pasión, precio:$110");
    break;
  default:
    alert("La opción que ingresaste no es válida");
    break;
}
