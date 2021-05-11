"use strict";
var car = [];
function createCar() {
    var plate = document.querySelector("#plate");
    var brand = document.querySelector("#brand");
    var color = document.querySelector("#color");
    if (!validateCar()) {
        return;
    }
    //Validar coche
    function validateCar() {
        var retPlate = inputPlate();
        var retBrand = inputBrand();
        var retColor = inputColor();
        if (retPlate && retBrand && retColor) {
            return true;
        }
        else {
            return false;
        }
    }
    //Input matrícula
    function inputPlate() {
        var plate = document.querySelector("#plate");
        plate.classList.remove("is-invalid");
        var regEx = /^(\d{4}[b-df-hj-np-tv-z]{3})*$/gi;
        if (plate.value == "") {
            plate.classList.add("is-invalid");
            var matricula = document.querySelector("#errorPlate");
            matricula.textContent = "Introduce una matrícula.";
            return false;
        }
        else if (!regEx.test(plate.value)) {
            plate.classList.add("is-invalid");
            var matricula = document.querySelector("#errorPlate");
            matricula.textContent = "Formato de matrícula incorrecto.";
            return false;
        }
        return true;
    }
    //Input marca
    function inputBrand() {
        var brand = document.querySelector("#brand");
        brand.classList.remove("is-invalid");
        if (brand.value == "") {
            brand.classList.add("is-invalid");
            var marca = document.querySelector("#errorBrand");
            marca.textContent = "Introduce una marca.";
            return false;
        }
        return true;
    }
    //Input color
    function inputColor() {
        var color = document.querySelector("#color");
        color.classList.remove("is-invalid");
        if (color.value == "") {
            color.classList.add("is-invalid");
            var colorCar = document.querySelector("#errorColor");
            colorCar.textContent = "Introduce un color.";
            return false;
        }
        return true;
    }
    //Instanciamos
    car.push(new Car(plate.value, color.value, brand.value));
    showCar(car);
    var carForm = document.querySelector(".carForm");
    carForm.classList.remove("d-flex");
    carForm.classList.add("d-none");
    var wheelForm = document.querySelector(".wheelForm");
    wheelForm.classList.remove("d-none");
    wheelForm.classList.add("d-flex", "flex-column", "align-items-center");
}
//Mostrar coche
function showCar(car) {
    var info = document.querySelector("#informacion");
    var container = document.createElement("div");
    container.classList.add("container", "text-success", "text-align-center");
    var subTitle = document.createElement("h4");
    var carInfo = document.createElement("p");
    carInfo.classList.add("infoCoche", "text-white", "list-group-item");
    subTitle.classList.add("tituloCoche", "list-inline-item");
    carInfo.append(subTitle);
    container.prepend(subTitle, carInfo);
    info.prepend(container);
    for (var i = 0; i < car.length; i++) {
        subTitle.textContent = "\n    Coche " + (i + 1);
        carInfo.textContent = "\n    Matr\u00EDcula : " + car[i].plate + " ,\n    Marca : " + car[i].brand + " , \n    Color : " + car[i].color + " \n     ";
    }
}
//Inputs marcas
function marcasRuedas() {
    var marcasRuedas = [];
    for (var i = 0; i < 4; i++) {
        var marca = document.querySelector("#marcaRueda" + (i + 1));
        marcasRuedas[i] = marca.value;
    }
    return marcasRuedas;
}
//Añadir ruedas
function ruedas(car) {
    var diametros = diametrosRuedas();
    var marcas = marcasRuedas();
    //Valido
    if (!validateWheels()) {
        return;
    }
    //Inputs ruedas
    function inputWheelBrand(i) {
        var marcaRueda = document.querySelector("#marcaRueda" + i);
        marcaRueda.classList.remove("is-invalid");
        if (marcaRueda.value == "") {
            marcaRueda.classList.add("is-invalid");
            var wheelB = document.querySelector("#errorWheelBrand" + i);
            wheelB.textContent = "Introduce la marca de la rueda " + i;
            return false;
        }
        return true;
    }
    //Validar ruedas
    function validateWheels() {
        var retMarca = [];
        var retDiametro = [];
        var flag = true;
        for (var i = 1; i <= 4; i++) {
            retMarca[i - 1] = inputWheelBrand(i);
            retDiametro[i - 1] = inputDiameter(i);
            if (retMarca[i - 1] && retDiametro[i - 1]) {
                flag = true;
            }
            else {
                flag = false;
            }
        }
        if (flag) {
            return true;
        }
        else {
            return false;
        }
    }
    //Añadimos ruedas
    var ruedas = [];
    for (var i = 0; i < 4; i++) {
        ruedas[i] = new Wheel(diametros[i], marcas[i]);
        car[car.length - 1].addWheel(ruedas[i]);
    }
    showWheels(car);
    console.log(car);
    reset();
}
//Mostrar ruedas
function showWheels(car) {
    var container = document.querySelector(".container");
    var infoCoche = document.querySelector(".infoCoche");
    var tituloCoche = document.querySelector(".tituloCoche");
    var ruedas = car[car.length - 1].wheels;
    for (var i = ruedas.length - 1; i >= 0; i--) {
        var wheelInfo = document.createElement("li");
        container.prepend(wheelInfo);
        var diameter = ruedas[i].diameter;
        var brand = ruedas[i].brand;
        wheelInfo.textContent = "Rueda " + (i + 1) + ": Marca = " + brand + " - Con di\u00E1metro = " + diameter;
        wheelInfo.before(infoCoche);
        infoCoche.before(tituloCoche);
    }
}
//Inputs diámetros
function diametrosRuedas() {
    var diametrosRuedas = [];
    for (var i = 0; i < 4; i++) {
        var diametro = document.querySelector("#diametroRueda" + (i + 1));
        diametrosRuedas[i] = diametro.valueAsNumber;
    }
    return diametrosRuedas;
}
//Valida Diámetros
function inputDiameter(i) {
    var diametroRueda = document.querySelector("#diametroRueda" + i);
    diametroRueda.classList.remove("is-invalid");
    if (diametroRueda.value == "") {
        diametroRueda.classList.add("is-invalid");
        var wheelB = document.querySelector("#errorDiameter" + i);
        wheelB.textContent = "Introduce el di\u00E1metro de la rueda " + i;
        return false;
    }
    else if (diametroRueda.valueAsNumber < 0.4 ||
        diametroRueda.valueAsNumber > 2) {
        diametroRueda.classList.add("is-invalid");
        var wheelB = document.querySelector("#errorDiameter" + i);
        wheelB.textContent = "El diámetro debe estar entre 0.4 y 2.";
        return false;
    }
    return true;
}
//Reset
function reset() {
    var wheelForm = document.querySelector(".wheelForm");
    wheelForm.classList.remove("d-flex");
    wheelForm.classList.add("d-none");
    var carForm = document.querySelector(".carForm");
    carForm.classList.remove("d-none");
    carForm.classList.add("d-flex");
    //Inputs
    var plate = document.querySelector("#plate");
    var brand = document.querySelector("#brand");
    var color = document.querySelector("#color");
    plate.value = "";
    brand.value = "";
    color.value = "";
    for (var i = 1; i <= 4; i++) {
        var diametro = document.querySelector("#diametroRueda" + i);
        diametro.value = "";
    }
    for (var i = 1; i <= 4; i++) {
        var marca = document.querySelector("#marcaRueda" + i);
        marca.value = "";
    }
}
