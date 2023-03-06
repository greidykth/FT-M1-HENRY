'use strict';

const { isString } = require("markdown-it/lib/common/utils");

/* EJERCICIO 1
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  EJEMPLO 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/
function LinkedList() {
  this.head = null;
}

function Node(value) {
    this.value = value;
    this.next = null;
}

LinkedList.prototype.add = function (value) {
  //1 Crear un nodo con ese valor (instanciar un nodo con ese valor)
  //2 Agragar ese nodo al final de la lista

  var newNode = new Node(value);
  var current = this.head;

  if(!current) {//Lista vacia
    this.head = newNode;
    return;
  }

  while(current.next){//Lista con mas de un nodo
    current = current.next;
  }

  current.next = newNode;
}

LinkedList.prototype.remove = function(){
  //Elimina el último nodo de la lista y
  //retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  
  var current = this.head;
  var prev = null;
  
  if(!current) return null; //Lista vacia
  if(current.next != null) { //Lista con varios nodos
      while(current.next != null){
        prev = current;
        current = current.next;
      }
      prev.next = null;
    return current.value;
  } else { // Lista con un nodo
    this.head = null;
    return current.value
  }
  
}

LinkedList.prototype.search = function(value){
  /* - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: 
  el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; 
  en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  EJEMPLO 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null. */

  //1 Obtener el primer nodo de la lista
  //2 Verificar que la propiedad value sea la buscada
  //2.1 Si es verdadero, retorna la propiedad value
  //2.2 Si es falso, 
  //2.2.1 Debo preguntar si existe el siguiente nodo
  //2.2.1.1 En caso de true ir al paso 2
  //2.2.1.2 En caso de falso return null

  function findValue(value, nodo) {
    if (
      value === nodo.value 
      || ( typeof value === "object" && compareObjects(value, nodo.value))
      || ( typeof value === "function" && value(nodo.value))
    ) {
      return nodo.value;
    }
    else if (nodo.next) {
      return findValue(value, nodo.next)
    } else {
      return null;
    }
  }

  function compareObjects(obj1, obj2) {
    if(JSON.stringify(obj1) === JSON.stringify(obj2)){
      return true;
    }
    return false;
  }

  if (this.head) return findValue(value, this.head);
  
  return null; 
}

// var myList = new LinkedList();
// myList.add(1);
// myList.add(2);
// myList.add(3);
// myList.add({ user: "Greidy", edad: 30});
// console.log(myList.search({ user: "Greidy", edad: 32}));
// console.log(myList);

/* EJERCICIO 2
Implementar la clase HashTable.
Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/
function HashTable(numBuckets = 35) {
  this.numBuckets = numBuckets;
  this.table = Array.apply(null, {length: this.numBuckets}).map(() => [])
}


HashTable.prototype.hash = function (key){

  var hash = 0;
  var codigo = 0;

  if(isString(key)){
    for (var i = 0; i < key.length; i++) {
      codigo += key[i].charCodeAt();
    }
    hash = codigo % this.table.length;
  } else {
    throw TypeError('Keys must be strings');
  }

  return hash;
}

HashTable.prototype.set = function (key, value){

  if(isString(key)){
    var posicionBucket = this.hash(key) -1 ;
    if(this.hasKey(key)){
      var posicionObject = getPosicionObject(key,this.table[posicionBucket]);
      this.table[posicionBucket][posicionObject][key] = value;
    } else {
      this.table[posicionBucket] = [...this.table[posicionBucket], { [key]: value}];
    }
  } else {
    throw TypeError('Keys must be strings');
  }
}

HashTable.prototype.get = function (key){
  if(isString(key)){
    if(this.hasKey(key)){
      var posicionBucket = this.hash(key) - 1;
      var posicionObject = getPosicionObject(key, this.table[posicionBucket]);
      
      return this.table[posicionBucket][posicionObject][key];
    }

    return void 0;
  } else {
    throw TypeError('Keys must be strings');
  }

  

  // if(isString(key)){
  //   if(this.hasKey(key)){
  //     getValueByKey(this.table, key);
      
  //   }
  // }
}

function getValueByKey(variable, key){
  //1. Verificar si la variable es array u objeto
  if (Object.prototype.toString.call(variable) === '[object Array]'|| Object.prototype.toString.call(variable) === '[object Object]') {
  //1.1 Si es array
    if (Object.prototype.toString.call(variable) === '[object Array]'){
      //1.1.1 Recorrer el array por posiciones
      variable.forEach((value, arrayKey) => {
        //1.1.1.1 Revisar si dentro de la posicion hay un array o un objeto
        if (Object.prototype.toString.call(variable) === '[object Array]'|| Object.prototype.toString.call(variable) === '[object Object]') {
          //1.1.1.1.1 Retornar la invocacion de getValue(contenido de la posicion, key)
          return getValueByKey(value, key)
        }
        //1.1.1.1.2 Revisar si key es igual a la posicion
        if(key === arrayKey) {
          //1.1.1.1.2.1 Retornar valor
          return value;
        }
      });
      //1.1.2 Retornar undefined
      return "undefined1";
    }
    //1.2 Si es object
    //1.2.1 Revisar si el objeto tiene la propiedad key
    if(variable.hasOwnProperty(key)){
      //1.2.1.1 Retornar valor (objeto[key])
      return variable[key];
    }
    //1.2.1.2 Recorrer las propiedades del objeto
    for (const property in variable) {
      //1.2.1.2.1 Revisar si dentro de la propiedad hay un array o un objeto
      if (Object.prototype.toString.call(variable) === '[object Array]'|| Object.prototype.toString.call(variable) === '[object Object]') {
        //1.2.1.2.1.1 Retornar la invocacion de getValue(contenido de la posicion, key)
        return getValueByKey(variable[property], key);
      }
    }
    //1.2.1.3 Retornar undefined
    return "undefined2";
  }
  //2 Retornar undefined
  return "undefined3";
}


HashTable.prototype.hasKey = function (key){

  return this.table.map(bucket => (
    bucket.map(
      objeto =>  Object.keys(objeto)[0])
    ).includes(key)
  ).includes(true);
  return getValueByKey(this.table, key);
}

function getPosicionObject(key, array){
  var posicion = null;
  array.forEach((obj, i) => {
    if (obj.hasOwnProperty(key)){
      posicion = i;
    }
  });
  return posicion;
}

console.log(typeof [1,2, []]);
var newHashTable = new HashTable();
newHashTable.set('foobar', 'fluf cats');
console.log(newHashTable.hasKey('foobar'));
console.log(newHashTable.table);
console.log(getValueByKey(newHashTable.table, "foobar"));
// console.log(newHashTable.set('key1', 'val1'));
// newHashTable.set('foo', 'bar1');
// newHashTable.set('ofo', 'bar2');
// console.log(newHashTable.get('ofor'));

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
   Node,
   LinkedList,
   HashTable,
};
