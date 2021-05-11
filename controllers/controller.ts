let car: Car[] = [];

function createCar() {
  const plate = document.querySelector("#plate") as HTMLInputElement;
  const brand = document.querySelector("#brand") as HTMLInputElement;
  const color = document.querySelector("#color") as HTMLInputElement;

  if (!validateCar()) {
    return;
  }
  //Validar coche
  function validateCar() {
    let retPlate = inputPlate();
    let retBrand = inputBrand();
    let retColor = inputColor();
    if (retPlate && retBrand && retColor) {
      return true;
    } else {
      return false;
    }
  }
  //Input matrícula
  function inputPlate() {
    const plate = document.querySelector("#plate") as HTMLInputElement;
    plate.classList.remove("is-invalid");
    let regEx = /^(\d{4}[b-df-hj-np-tv-z]{3})*$/gi;
    if (plate.value == "") {
      plate.classList.add("is-invalid");
      let matricula = document.querySelector("#errorPlate") as HTMLElement;
      matricula.textContent = "Introduce una matrícula.";
      return false;
    } else if (!regEx.test(plate.value)) {
      plate.classList.add("is-invalid");
      let matricula = document.querySelector("#errorPlate") as HTMLElement;
      matricula.textContent = "Formato de matrícula incorrecto.";
      return false;
    }
    return true;
  }
  //Input marca
  function inputBrand() {
    const brand = document.querySelector("#brand") as HTMLInputElement;
    brand.classList.remove("is-invalid");
    if (brand.value == "") {
      brand.classList.add("is-invalid");
      let marca = document.querySelector("#errorBrand") as HTMLElement;
      marca.textContent = "Introduce una marca.";
      return false;
    }
    return true;
  }
  //Input color
  function inputColor() {
    const color = document.querySelector("#color") as HTMLInputElement;
    color.classList.remove("is-invalid");
    if (color.value == "") {
      color.classList.add("is-invalid");
      let colorCar = document.querySelector("#errorColor") as HTMLElement;
      colorCar.textContent = "Introduce un color.";
      return false;
    }
    return true;
  }
  //Instanciamos
  car.push(new Car(plate.value, color.value, brand.value));
  showCar(car);

  const carForm = document.querySelector(".carForm") as HTMLElement;
  carForm.classList.remove("d-flex");
  carForm.classList.add("d-none");
  const wheelForm = document.querySelector(".wheelForm") as HTMLElement;
  wheelForm.classList.remove("d-none");
  wheelForm.classList.add("d-flex", "flex-column", "align-items-center");
}
//Mostrar coche
function showCar(car: Car[]) {
  const info = document.querySelector("#informacion") as HTMLElement;
  const container = document.createElement("div");
  container.classList.add("container", "text-success", "text-align-center");
  const subTitle = document.createElement("h4");
  const carInfo = document.createElement("p");
  carInfo.classList.add("infoCoche", "text-white", "list-group-item");
  subTitle.classList.add("tituloCoche", "list-inline-item");
  carInfo.append(subTitle);
  container.prepend(subTitle, carInfo);
  info.prepend(container);
  for (let i = 0; i < car.length; i++) {
    subTitle.textContent = `
    Coche ${i + 1}`;
    carInfo.textContent = `
    Matrícula : ${car[i].plate} ,
    Marca : ${car[i].brand} , 
    Color : ${car[i].color} 
     `;
  }
}

//Inputs marcas
function marcasRuedas() {
  let marcasRuedas: string[] = [];
  for (let i = 0; i < 4; i++) {
    const marca = document.querySelector(
      "#marcaRueda" + (i + 1)
    ) as HTMLInputElement;
    marcasRuedas[i] = marca.value;
  }
  return marcasRuedas;
}
//Añadir ruedas
function ruedas(car: Car[]) {
  const diametros = diametrosRuedas();
  const marcas = marcasRuedas();
  //Valido
  if (!validateWheels()) {
    return;
  }
  //Inputs ruedas
  function inputWheelBrand(i: number) {
    let marcaRueda = document.querySelector(
      "#marcaRueda" + i
    ) as HTMLInputElement;
    marcaRueda.classList.remove("is-invalid");
    if (marcaRueda.value == "") {
      marcaRueda.classList.add("is-invalid");
      let wheelB = document.querySelector(
        "#errorWheelBrand" + i
      ) as HTMLElement;
      wheelB.textContent = `Introduce la marca de la rueda ${i}`;
      return false;
    }
    return true;
  }
  //Validar ruedas
  function validateWheels() {
    let retMarca: boolean[] = [];
    let retDiametro: boolean[] = [];
    let flag: boolean = true;
    for (let i = 1; i <= 4; i++) {
      retMarca[i - 1] = inputWheelBrand(i);
      retDiametro[i - 1] = inputDiameter(i);
      if (retMarca[i - 1] && retDiametro[i - 1]) {
        flag = true;
      } else {
        flag = false;
      }
    }
    if (flag) {
      return true;
    } else {
      return false;
    }
  }
  //Añadimos ruedas
  let ruedas: Wheel[] = [];
  for (let i = 0; i < 4; i++) {
    ruedas[i] = new Wheel(diametros![i], marcas[i]);
    car[car.length - 1].addWheel(ruedas[i]);
  }
  showWheels(car);
  console.log(car);
  reset();
}
//Mostrar ruedas
function showWheels(car: Car[]) {
  const container = document.querySelector(".container") as HTMLElement;
  const infoCoche = document.querySelector(
    ".infoCoche"
  ) as HTMLParagraphElement;
  const tituloCoche = document.querySelector(
    ".tituloCoche"
  ) as HTMLHeadingElement;
  let ruedas = car[car.length - 1].wheels;
  for (let i = ruedas.length - 1; i >= 0; i--) {
    const wheelInfo = document.createElement("li");
    container.prepend(wheelInfo);
    let diameter = ruedas[i].diameter;
    let brand = ruedas[i].brand;
    wheelInfo.textContent = `Rueda ${
      i + 1
    }: Marca = ${brand} - Con diámetro = ${diameter}`;
    wheelInfo.before(infoCoche);
    infoCoche.before(tituloCoche);
  }
}

//Inputs diámetros
function diametrosRuedas() {
  let diametrosRuedas: number[] = [];
  for (let i = 0; i < 4; i++) {
    const diametro = document.querySelector(
      "#diametroRueda" + (i + 1)
    ) as HTMLInputElement;
    diametrosRuedas[i] = diametro.valueAsNumber;
  }
  return diametrosRuedas;
}
//Valida Diámetros
function inputDiameter(i: number) {
  let diametroRueda = document.querySelector(
    "#diametroRueda" + i
  ) as HTMLInputElement;
  diametroRueda.classList.remove("is-invalid");
  if (diametroRueda.value == "") {
    diametroRueda.classList.add("is-invalid");
    let wheelB = document.querySelector("#errorDiameter" + i) as HTMLElement;
    wheelB.textContent = `Introduce el diámetro de la rueda ${i}`;
    return false;
  } else if (
    diametroRueda.valueAsNumber < 0.4 ||
    diametroRueda.valueAsNumber > 2
  ) {
    diametroRueda.classList.add("is-invalid");
    let wheelB = document.querySelector("#errorDiameter" + i) as HTMLElement;
    wheelB.textContent = "El diámetro debe estar entre 0.4 y 2.";
    return false;
  }
  return true;
}
//Reset
function reset() {
  const wheelForm = document.querySelector(".wheelForm") as HTMLElement;
  wheelForm.classList.remove("d-flex");
  wheelForm.classList.add("d-none");
  const carForm = document.querySelector(".carForm") as HTMLElement;
  carForm.classList.remove("d-none");
  carForm.classList.add("d-flex");
  //Inputs
  const plate = document.querySelector("#plate") as HTMLInputElement;
  const brand = document.querySelector("#brand") as HTMLInputElement;
  const color = document.querySelector("#color") as HTMLInputElement;
  plate.value = "";
  brand.value = "";
  color.value = "";
  for (let i = 1; i <= 4; i++) {
    const diametro = document.querySelector(
      "#diametroRueda" + i
    ) as HTMLInputElement;
    diametro.value = "";
  }
  for (let i = 1; i <= 4; i++) {
    const marca = document.querySelector("#marcaRueda" + i) as HTMLInputElement;
    marca.value = "";
  }
}
