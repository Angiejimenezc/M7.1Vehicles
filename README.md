# M7.1Vehicles

![Vehiculos](/controllers/asset/vehiculos.png)

Nivel 1
1) Nos dan un código parcialmente desarrollado. Es capaz de crear un coche y mostrar la información en pantalla. Lo podemos descargar de este link ( https://github.com/ITAcademyProjects/VehiclesFE ). Únicamente habrá que modificar el archivo  index.html  y el  controller.ts

Modifica el proyecto anterior para que le pida al usuario la información del coche (matrícula, marca y su color) a través de un formulario y muestre en pantalla el resultado de una forma más elegante.

Pista:  Se recomienda crear una  variable caro  global, fuera de las funciones (y si puede ser en la línea 1 de nuestro controller.ts) como por ejemplo  let caro: Caro;  para que sea accesible desde cualquier función.

2) Una vez añadido el coche, ocultaremos el fomulario y mostraremos uno para añadir las cuatro ruedas al coche.

3) Mejorar el código anterior revisando que la matrícula tiene 4 números y 3 letras. Cada rueda tiene un diámetro entre 0.4 y 2. No se podrá añadir ninguna rueda al coche si previamente no han sido validadas las 4 ruedas.

Nivel 2
Validar los formularios utilizando la clase 'is-invalid' de bootstrap.

Nivel 3
Modifica el programa para poder almacenar más de un vehículo (pista: utiliza un array de Caro)
