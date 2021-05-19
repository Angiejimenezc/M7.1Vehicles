let car: Car;
let arrayCar: { plate: string; brand: string; color: string }[] = new Array();

let carForm: any = <HTMLDivElement>document.getElementById("carForm");
let wheelForm: any = <HTMLDivElement>document.getElementById("wheelForm");
let carInfo: any = <HTMLDivElement>document.getElementById("carInfo");

// Crear un coche y añadirle ruedas //
function createCar() {
  let plate: any = <HTMLInputElement>document.getElementById("plate");
  let brand: any = <HTMLInputElement>document.getElementById("brand");
  let color: any = <HTMLInputElement>document.getElementById("color");

  if (validateCar(plate, color, brand)) {
    car = new Car(plate.value, color.value, brand.value);
    console.log(car);
    arrayCar.push(car);

    // Ocultar carForm , mostrar wheelForm //
    carForm.classList.remove("d-flex");
    carForm.classList.add("d-none");
    wheelForm.classList.remove("d-none");
    wheelForm.classList.add("d-flex");

    showCar();
  }
}

function addWheels() {
  if (validateWheels()) {
    for (let i = 1; i <= 4; i++) {
      let diameter: any = (<HTMLInputElement>(
        document.getElementById("dWheel" + i)
      )).value;
      let brand: any = (<HTMLInputElement>document.getElementById("bWheel" + i))
        .value;
      car.addWheel(new Wheel(diameter, brand));
    }
    console.log(car.wheels);
    console.log(arrayCar);
    showWheel();

    /* Ocultar form wheel, mostrar form car. Resetear formularios  */
    wheelForm.classList.remove("d-flex");
    wheelForm.classList.add("d-none");
    (<HTMLFormElement>document.getElementById("form2")).reset();
    carForm.classList.remove("d-none");
    carForm.classList.add("d-flex");
    (<HTMLFormElement>document.getElementById("form1")).reset();
  }
}

// Funciones para mostrar un coche y sus ruedas.//
function showCar() {
  let newDiv: any = document.createElement("div");
  carInfo.appendChild(newDiv).innerHTML = `
  <br>
  <div class="row col-12 text-center">
          <div class="col-4"><div class="font-weight-bold">Car Plate</div>${car.plate}</div>
          <div class="col-4"><div class="font-weight-bold">Brand</div>${car.brand}</div>
          <div class="col-4"><div class="font-weight-bold">Color</div>${car.color}</div>
  </div>
  `;
}
function showWheel() {
  let newDiv: any = document.createElement("div");
  carInfo.appendChild(newDiv).innerHTML = `
  <br>
  <div class="row col-12 text-center">
          <div class="col-3"><div class="font-weight-bold">Wheel 1</div>
              Brand: ${car.wheels[0].brand} 
              <p>Diameter: ${car.wheels[0].diameter}</p></div>
          <div class="col-3"><div class="font-weight-bold">Wheel 2</div>
              Brand: ${car.wheels[1].brand}
              <p>Diameter: ${car.wheels[1].diameter}</p></div>
          <div class="col-3"><div class="font-weight-bold">Wheel 3</div>
              Brand: ${car.wheels[2].brand}
              <p>Diameter: ${car.wheels[2].diameter}</p></div>
          <div class="col-3"><div class="font-weight-bold">Wheel 4</div>
              Brand: ${car.wheels[3].brand}
              <p>Diameter: ${car.wheels[3].diameter}</p></div>
          </div>`;
}
// Validación de Campos //
function validateCar(plate: any, color: any, brand: any) {
  let accumError: number = 0;

  plate.classList.remove("is-invalid");
  color.classList.remove("is-invalid");
  brand.classList.remove("is-invalid");

  let errorPlate: any = <HTMLDivElement>document.getElementById("errorPlate");
  let errorColor: any = <HTMLDivElement>document.getElementById("errorColor");
  let errorBrand: any = <HTMLDivElement>document.getElementById("errorBrand");

  if (plate.value == "") {
    required(plate, errorPlate);
    accumError = +1;
  } else if (!validatePlate(plate.value)) {
    plate.classList.add("is-invalid");
    errorPlate.textContent = "La matrícula debe contener 4 numeros y 3 letras.";
    accumError = +1;
  }
  if (color.value == "") {
    required(color, errorColor);
    accumError = +1;
  }
  if (brand.value == "") {
    required(brand, errorBrand);
    accumError = +1;
  }

  if (accumError > 0) {
    return false;
  } else {
    return true;
  }
}

function validatePlate(plate: string) {
  let plateReg: any = /^(\d{4}[b-df-hj-np-tv-z]{3})*$/gi;
  return plateReg.test(plate) ? true : false;
}

function required(inputId: any, errorId: any) {
  inputId.classList.add("is-invalid");
  errorId.textContent = "El campo es requerido";
}

function validateWheels() {
  let accumError: number = 0;

  /* Bucle para recorrer inputs ruedas */
  for (let i = 1; i <= 4; i++) {
    let diameter: any = <HTMLInputElement>document.getElementById("dWheel" + i);
    let brandW: any = <HTMLInputElement>document.getElementById("bWheel" + i);

    let errorDiameter: any = <HTMLDivElement>(
      document.getElementById("errorDwheel" + i)
    );
    let errorBrandW: any = <HTMLDivElement>(
      document.getElementById("errorBwheel" + i)
    );

    diameter.classList.remove("is-invalid");
    brandW.classList.remove("is-invalid");

    if (diameter.value == "") {
      required(diameter, errorDiameter);
      accumError = +1;
    } else if (diameter.value < 0.4 || diameter.value > 2) {
      diameter.classList.add("is-invalid");
      errorDiameter.textContent = "El diámetro debe estar entre 0.4 y 2.";
      accumError = +1;
    }
    if (brandW.value == "") {
      required(brandW, errorBrandW);
      accumError = +1;
    }
  }

  if (accumError > 0) {
    return false;
  } else {
    return true;
  }
}
