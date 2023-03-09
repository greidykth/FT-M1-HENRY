'use strict'
// No cambies los nombres de las funciones.

function quickSort(array) {
  // Implementar el método conocido como quickSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  // 1. Escoger un pivote, en este caso el primero del array
  // 2. Dividir el array, los menores al pivote ponerlos en un array nuevo a la izquierda
  // 3. Los mayores al pivote ponerlos en un array nuevo a la derecha
  // 4. Los array tienen mas de un elemento ?
  // 4.1 Si
  // 4.1.1 Volver al paso 1 y hacerlos para la lista de la izquierda
  // 4.1.2 Volver al paso 1 y hacerlos para la lista de la derecha
  // 4.2 No
  // 4.2.1 Retornar y concatenar con la funcion anterior

  
  if(array.length <= 1) return array;
  let pivote = array[0];
  let arrayMenores = [];
  let arrayMayores = [];
  let n = array.length;

  for (let i = 1; i < n; i++) {
    if (array[i] < pivote) {
      arrayMenores.push(array[i]);
    } else {
      arrayMayores.push(array[i]);
    }
  }

  return quickSort(arrayMenores).concat(pivote, quickSort(arrayMayores));
}

console.log(quickSort([5,1,4,2,8]));

function mergeSort(array) {
  // Implementar el método conocido como mergeSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  if(array.length <= 1) return array;
  let numMedium = Math.floor(array.length / 2);
  let left = array.slice(0, numMedium);
  let right = array.slice(numMedium);

  return merge(mergeSort(left), mergeSort(right));

  //okey probemos ahora
}

function merge(left, right){
  const result = []
  let indexL = 0;
  let indexR = 0;

  if(true){
    left[0] > right[0]
  }
  while(indexL < left.length && indexR < right.length){
    if(left[indexL] < right[indexR]){
      result.push(left[indexL]);
      indexL++;
    } else {
      result.push(right[indexR]);
      indexR++;
    }
  }
  return result.concat(left.slice(indexL)).concat(right.slice(indexR))
}

console.log(mergeSort([5,1,4,2,8]));
// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  quickSort,
  mergeSort,
};
