'use strict';

function BinarioADecimal(num) {
   /*
   1. Convertir num a string
   2. Inicializar var decimal
   3. Hacer un for
   4. Acumular en decimal el valor de cada iteracion
   5. Retorna el binario
   */

   // var mult = "2" * 1 = 2  para transformar string a entero -> num
   // var se = "" + 1 = "1"  para transformar numero a string -> string

   let decimal = 0;
   let j = 0;
   for (var i = num.length -1 ; i >= 0; i--) {
      decimal += Number(num[i]) * Math.pow(2, j++);
   }
   return decimal;

   //return num.split('').reverse().reduce((a, b, i) => a +  (Number(b) * Math.pow(2,  i)), 0)

   // var result = 0;
   // var pos = num.length -1 ;
   // for (let i = 0; i < num.length; i++) {
   //    result = result + num[i] * Math.pow(2, pos);
   //    pos--;
   // }
   // return result;
}



function DecimalABinario(num) {
   //1. Dividir num entre 2
   //2. Ir concatenando los restos de la division
   //3. Realizar el loop mientras el resultado, lo que luego se convierte en dividendo, sea mayor que cero

   let binario = '';
   let dividendo = num;

   while (dividendo > 0 ){
      binario = (dividendo % 2) + binario ;
      dividendo = Math.trunc(dividendo / 2);
      //console.log("dividendo", dividendo, "binario", binario) 
   }
   return binario;
}

module.exports = {
   BinarioADecimal,
   DecimalABinario,
};
