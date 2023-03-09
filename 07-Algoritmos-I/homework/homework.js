"use strict";
// No cambies los nombres de las funciones.

function factorear(num) {

  // Factorear el número recibido como parámetro y devolver en un array
  // los factores por los cuales se va dividiendo a dicho número (De menor a mayor)
  // Ej: factorear(180) --> [1, 2, 2, 3, 3, 5] Ya que 1x2x2x3x3x5 = 180 y son todos números primos
  // Tu código:

  //1. Dividir num entre 2 
  //2. Guardar resultado en cociente
  //3. Dividir cociente nuavemete entre 2 hasta q el residuo sea diferente de 0

  // var numPrimos = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
  // var array = [1]
  // var dividendo = num

  // for (let i = 0; i < numPrimos.length; i++) {
  //   while (dividendo % numPrimos[i] === 0) {
  //     array.push(numPrimos[i])
  //     dividendo = dividendo / numPrimos[i]
  //   }
  // }
  // return array

  const result = [1];
  let factor = 2;

  while (num > 1) {
    if(num % factor === 0) {
      result.push(factor);
      num = num / factor;
    } else {
      factor++;
    }
  }
  return result;
}
//---------------------------------------------------------TO DO: OBTENER LOS NUMEROS PRIMOS A PARTIR DE UNA FUNCION
console.log(factorear(180));

function bubbleSort(array) {
  // Implementar el método conocido como bubbleSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  // 0. Iniciar bandera de ordenado en true
  // 1. Recorrer el array
  // 1.2 Si el elemento en la posicion i es mayor que elemento en la posicion i + 1
  // 1.2.1 Intercambiar las posiciones
  // 1.2.2 Colocar la bandera de ordenado en falso
  // 2. Volver al paso 1 mientras la bandera de ordenado este en falso

  // 0. Iniciar bandera de ordenado en true
  let ordenado;
  
  do {
    ordenado = true;
    // 1. Recorrer el array
    for (let i = 0; i < array.length - 1; i++) {
      // 1.2 Si el elemento en la posicion i es mayor que elemento en la posicion i + 1
      if (array[i] > array[i + 1]) {
        // 1.2.1 Intercambiar las posiciones
        var aux = array[i];
        array[i] = array[i + 1];
        array[i + 1] = aux;
        // 1.2.2 Colocar la bandera de ordenado en falso
        ordenado = false;
      }
    }
    // 2. Volver al paso 1 mientras la bandera de ordenado este en falso
  } while (!ordenado); 
  return array;
}


function insertionSort(array) {
  // Implementar el método conocido como insertionSort para ordenar de menor a mayor
  // el array recibido como parámetro utilizando arreglos
  // Devolver el array ordenado resultante
  // Tu código:

  // 1. Recorrer el array con i, desde 1 hasta el array.length
  // 1.2 Guardar en posicionMenor el i del bucle
  // 1.3 Recorrer el array internamente con j hacia atras desde i-1 hasta 0
  // 1.3.1 Si el elemento en la posicionMenor es menor que elemento en la posicion j
  // 1.3.1.1 Actualizar el valor de posicionMenor = j
  // 1.4 Si posicionMenor es diferente de i
  // 1.4.1 Retirar el elemento en la posicion i del array
  // 1.4.2 Inserta el elemento en la posicionMenor del array
  // 2 Retornar el array ordenado

  // 1. Recorrer el array con i, desde 1 hasta el array.length
  for (let i = 1; i < array.length; i++) {
  // 1.2 Guardar en posicionMenor el i del bucle
    var posicionMenor = i;
  // 1.3 Recorrer el array internamente con j hacia atras desde i-1 hasta 0
    for (let j = i - 1; j >= 0; j--) {
      //1.3.1 Si el elemento en la posicionMenor es menor que elemento en la posicion j
      if(array[i] < array[j]){
        // 1.3.1.1 Actualizar el valor de posicionMenor = j
        posicionMenor = j;
      }
    }
  // 1.4 Si posicionMenor es diferente de i
    if(posicionMenor !== i) {
      // 1.4.1 Retirar el elemento en la posicion i del array
      var aux = array[i];
      // 1.4.2 Inserta el elemento en la posicionMenor del array
      array.splice(i, 1);
      array.splice(posicionMenor, 0, aux);
    }
  }
  // 2 Retornar el array ordenado
  return array;

  // for (let i = 0; i < array.length; i++) {
  //   for (let j = i; j >= 1; j--) {
  //     if (array[j] < array[j - 1]) {
  //       var aux = array[j];
  //       array[j] = array[j - 1];
  //       array[j - 1] = aux;
  //     }
  //   }
  // }
  // return array;
}



function selectionSort(array) {
  // Implementar el método conocido como selectionSort para ordenar de menor a mayor
  // el array recibido como parámetro utilizando dos arreglos
  // Devolver el array ordenado resultante
  // Tu código:

  for (let i = 0; i < array.length; i++) {
    var posicionMenor = i;

    for (let j  = i + 1; j < array.length; j ++) {
      if(array[j] < array[posicionMenor]){
        posicionMenor = j;   
      }
    }
    if(posicionMenor){
      var aux = array[i];
      array[i] = array[posicionMenor];
      array[posicionMenor] = aux;
    }
  }
  return array;

  // for (let i = 0; i < array.length; i++) {
  //   for (let j = i + 1; j < array.length; j++) {
  //     if(array[i] > array[j]){ //No va a entrar cuando sea menor o igual
  //       var aux = array[i];
  //       array[i] = array[j];
  //       array[j] = aux;
  //     }
  //   }
    
  // }
  // return array;
}

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  factorear,
  bubbleSort,
  insertionSort,
  selectionSort,
};
