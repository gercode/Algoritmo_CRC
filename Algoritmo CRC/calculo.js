  //DECLARACION DE VARIABLES Y CAPTURA DE DATOS DE LOS FORMULARIOS
  var vecTramaD = [];
  var vecTramaG = [];
  var vecTramaR = [];
  var vecTramaTX = [];
  var vecAuxiliar = [];
  var vecresta = [];
  var vecPolinomial = [];
  var vecPolinomialG = [];
  var vecHexaD = [];
  var vecHexaG = [];
  var primerD = document.querySelector('#primerD');
  var primerG = document.querySelector('#primerG');
  var primerR = document.querySelector('#primerR');
  var primerTX = document.querySelector('#primerTX');
  var mostrarDatos = document.querySelector('#mostrarDatos');
  var formularioBinario = document.querySelector('#forBinarioD');
  var strar = document.querySelector('#strat');
  var divErrores = document.querySelector("#errores");
  // FIN DECLARACION DE VARIABLES

  //METODO LIMPIAR
  function limpiar() {
      primerG.innerHTML = "";
      primerD.innerHTML = "";
      primerR.innerHTML = "";
      primerTX.innerHTML = "";
      document.querySelector('#segundaD').innerHTML = "";
      document.querySelector('#segundaG').innerHTML = "";
      document.querySelector('#segundaR').innerHTML = "";
      document.querySelector('#poliD').innerHTML = "";
      document.querySelector('#poliG').innerHTML = "";
      document.querySelector('#hexaD').innerHTML = "";
      document.querySelector('#hexaG').innerHTML = "";
      document.querySelector('#resultado').innerHTML = "";


  } // FIN FUNCION LIMPIAR()

  // CAPTURA DEL EVENTO SUBMIT DEL FORMULARIO CON ID forBinarioD 
  formularioBinario.addEventListener('submit', function() {
      limpiar();
      var nD = document.querySelector("#numD").value;
      var nG = document.querySelector("#numG").value;

      if (nD.length <= 0 || nG.length <= 0 || nD == null || nG == null) {
          divErrores.innerHTML = "EXISTEN CAMPOS VACIOS";
          divErrores.style = "background: red";
          return;

      } else {
          divErrores.innerHTML = "";
          divErrores.style = "background: withe";
          let separador = '';
          vecTramaDauxi = nD.split(separador);
          for (let i = 0; i < vecTramaDauxi.length; i++) {
              let numero = parseInt(vecTramaDauxi[i]);
              agregar(numero, 1);
          }
          console.log(vecTramaD);
          let separador1 = '';
          vecTramaGauxi = nG.split(separador1);
          for (var i = 0; i < vecTramaGauxi.length; i++) {
              let numero = parseInt(vecTramaGauxi[i]);
              agregar(numero, 2);
          }

          if (vecTramaD.length < vecTramaG.length) {
              divErrores.innerHTML = "EL GENERADOR ES MAYOR, QUE LA TRAMA";
              divErrores.style = "background: red";

              vecTramaD = [];
              vecTramaG = [];
          } else if (vecTramaD[0].dato == 0) {
              divErrores.innerHTML = "DEBE COMENZAR CON 1, LA TRAMA";
              divErrores.style = "background: red";
              vecTramaD = [];
              vecTramaG = [];
          } else if (vecTramaG[0].dato == 0) {
              divErrores.innerHTML = "DEBE COMENZAR CON 1, EL GENERADOR";
              divErrores.style = "background: red";
              vecTramaD = [];
              vecTramaG = [];
          } else {
              divErrores.innerHTML = "";
              divErrores.style = "background: withe";
              for (var i = 0; i < vecTramaG.length - 1; i++) {
                  agregar(0, 3)
              }
              //   console.log(vecTramaG);
              vecTramaTX = vecTramaD.concat(vecTramaR);

              for (var i = 0; i < vecTramaD.length; i++) {
                  var dato = vecTramaD[i].dato;
                  if (dato == 1) {
                      let valor = (vecTramaD.length - 1) - i;
                      let ingreso = 'x^' + valor;
                      agregar(ingreso, 6);
                      console.log(vecPolinomial);
                  }
              } //FIN FOR
              for (var i = 0; i < vecTramaG.length; i++) {
                  var dato = vecTramaG[i].dato;
                  if (dato == 1) {
                      let valor = (vecTramaG.length - 1) - i;
                      let ingreso = 'x^' + valor;
                      agregar(ingreso, 7);
                      console.log(vecPolinomialG);
                  }
              } //FIN FOR
              let otroBinario = nD; // El 11
              let decimalTemporal = parseInt(otroBinario, 2); // Desde la base 2
              let otroHexadecimal = decimalTemporal.toString(16); // Hacia la base 16
              console.log("El binario %s equivale a %s en hexadecimal", otroBinario, otroHexadecimal);
              agregar(otroHexadecimal, 8);
              let otroBinario1 = nG; // El 11
              let decimalTemporal1 = parseInt(otroBinario1, 2); // Desde la base 2
              let otroHexadecimal1 = decimalTemporal1.toString(16); // Hacia la base 16
              console.log("El binario %s equivale a %s en hexadecimal", otroBinario1, otroHexadecimal1);
              agregar(otroHexadecimal1, 9);
          } // FIN ELSE
      } // fin else
  }); // FIN DEL EVENTO CLICK DE FORMULARIO 1

  //UTILIZAMOS EL VECTOR AUXILIAR PARA COMENZAR LA DIVISION
  // LLENAMOS EL VECTOR AUXILIAR CON EL TAMAÑO DE G PARA COMENZAR A DIVIDIR
  document.querySelector('#strat').addEventListener('click', function() { // COMIENZO DEL EVENTO CLICK
      formularioBinario.reset();

      primerG.innerHTML = "";
      primerD.innerHTML = "";
      primerR.innerHTML = "";
      primerTX.innerHTML = "";
      document.querySelector('#segundaD').innerHTML = "";
      document.querySelector('#segundaG').innerHTML = "";
      document.querySelector('#segundaR').innerHTML = "";
      document.querySelector('#poliD').innerHTML = "";
      document.querySelector('#poliG').innerHTML = "";
      document.querySelector('#hexaD').innerHTML = "";
      document.querySelector('#hexaG').innerHTML = "";
      document.querySelector('#resultado').innerHTML = "";

      llenadoVectorAuxiliar(); // LLENADO EL VECTOR AUXILIAR
      // COMENZAMOS A DIVIRIR TENIENDO EN CUENTA, QUE LA PRIMERA ITERACION EL VECAUXILIAR YA ESTA LLENO
      // CON EL TAMAÑO DEL VECTOR DE G POR ESO I COMIENZA EN PRIMER QUE ARRIBA SE LLENO CON EL TAMAÑO DE G 
      operacionNucleoPrincipal(); // LLAMADO DE LA FUNCION QUE EJECUTA LA DIVISION
      vecTramaTX = [];
      vecTramaTX = vecTramaD.concat(vecAuxiliar); // LLENADO DE LA TRAMA TX PARA LA SEGUNDA DIVISION
      mostrarDatosD(2); // MUESTRA LOS DATOS EN LA PAGINA
      vecAuxiliar = []; // VACIADO DEL VECTOR AUXILIAR
      //COMIENZO DE LA SEGUNDA DIVISION PARA COMPROBAR SI ESTA CORRECTO
      llenadoVectorAuxiliar(); // LLENADO EL VECTOR AUXILIAR
      operacionNucleoPrincipal(); //LLAMADO DE LA FUNCION QUE EJECUTA LA DIVISION
      mostrarDatosD(3); // MUESTRA LOS DATOS EN LA PAGINA
      vecAuxiliar = [];
      vecTramaD = [];
      vecTramaG = [];
      vecTramaR = [];
      vecTramaTX = [];
      vecPolinomial = [];
      vecPolinomialG = [];
      vecHexaD = [];
      vecHexaG = [];
  }); // FIN DEL EVENTO CLICK DEL BOTON primerResultado

  // GUARDAMOS LOS DATOS EN LAS TRAMAS D G R Y TX y EL VECTOR AUXILIAR
  function agregar(dato, a) {
      var binary = dato;

      function infoAuxi(dato) {
          this.dato = dato;
      }
      nuevainfoAuxi = new infoAuxi(binary);
      guardar(a);
  } //FIN FUNCION agregar

  function guardar(a) {
      if (a == 1) {
          vecTramaD.push(nuevainfoAuxi);
      }
      if (a == 2) {
          vecTramaG.push(nuevainfoAuxi);
      }
      if (a == 3) {
          vecTramaR.push(nuevainfoAuxi);
      }
      if (a == 4) {
          vecAuxiliar.push(nuevainfoAuxi);
          console.log(vecAuxiliar);
      }
      if (a == 5) {
          vecresta.push(nuevainfoAuxi);
      }
      if (a == 6) {
          vecPolinomial.push(nuevainfoAuxi);
      }
      if (a == 7) {
          vecPolinomialG.push(nuevainfoAuxi);
      }
      if (a == 8) {
          vecHexaD.push(nuevainfoAuxi);
      }
      if (a == 9) {
          vecHexaG.push(nuevainfoAuxi);
      }
  } //FIN FUNCION GUARDAR

  // MOSTRAR DATOS DE LA TRAMA
  function mostrarDatosD(controlador) {
      if (controlador == 1) {
          for (var i = 0; i < vecTramaD.length; i++) {
              DD.innerHTML += vecTramaD[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecTramaG.length; i++) {
              GG.innerHTML += vecTramaG[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecTramaR.length; i++) {
              RR.innerHTML += vecTramaR[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecTramaTX.length; i++) {
              TX.innerHTML += vecTramaTX[i].dato;
          } //FIN FOR
      } // FIN IF

      if (controlador == 2) {
          for (var i = 0; i < vecTramaD.length; i++) {
              primerD.innerHTML += vecTramaD[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecTramaG.length; i++) {
              primerG.innerHTML += vecTramaG[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecAuxiliar.length; i++) {
              primerR.innerHTML += vecAuxiliar[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecTramaTX.length; i++) {
              primerTX.innerHTML += vecTramaTX[i].dato;
          } //FIN FOR
      } //FIN IF

      if (controlador == 3) {
          var cont = 0;
          for (var i = 0; i < vecTramaD.length; i++) {
              document.querySelector('#segundaD').innerHTML += vecTramaD[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecTramaG.length; i++) {
              document.querySelector('#segundaG').innerHTML += vecTramaG[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecAuxiliar.length; i++) {
              document.querySelector('#segundaR').innerHTML += vecAuxiliar[i].dato;
              if (vecAuxiliar[i].dato == 0) {
                  cont++;
                  if (cont == vecAuxiliar.length) {
                      document.querySelector('#resultado').innerHTML = "LA TRAMA ES CORRECTA";
                  } //FIN IF
              } //FIN IF
              //if(cont < vecAuxiliar.length - 1 && i == vecAuxiliar.length - 1) {
              else {
                  document.querySelector('#resultado').innerHTML = "LA TRAMA ES INCORRECTA";
              } //FIN IF
          } //FIN FOR
       /*   for (var i = 0; i < vecPolinomial.length; i++) {
              document.querySelector('#poliD').innerHTML += vecPolinomial[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecPolinomialG.length; i++) {
              document.querySelector('#poliG').innerHTML += vecPolinomialG[i].dato;
          } //FIN FOR
          for (var i = 0; i < vecHexaD.length; i++) {
              document.querySelector('#hexaD').innerHTML += vecHexaD[i].dato;
          }
          for (var i = 0; i < vecHexaG.length; i++) {
              document.querySelector('#hexaG').innerHTML += vecHexaG[i].dato;
          } */
      } //FIN IF
  } // FIN FUNCION MOSTRAR

  // FUNCTION PARA LLENAR EL VECTOR AUXILIAR CON LOS DATOS DE LA TRAMA RESPECTO AL TAMAÑO DE LA TRAMA G
  function llenadoVectorAuxiliar() {
      for (var t = 0; t <= vecTramaG.length - 1; t++) {
          agregar(vecTramaTX[t].dato, 4);
      } // FIN FOR
  } //FIN FUNCTION  llenadoVectorAuxiliar

  // FUNCTION QUE SE EJECUTA EL NUCLEO DEL EJERCICIO EL QUE RECORREO LA TRAMA TX Y REALIZA LAS DIVISIONES
  function operacionNucleoPrincipal() {
      var primer = (vecTramaG.length - 1);
      for (var h = primer; h < vecTramaTX.length; h++) {
          if (h == (vecTramaG.length - 1)) {
              operacionResta();
              console.log("a " + h);
          } else if (vecAuxiliar.length < vecTramaG.length) {
              console.log("b " + h);
              agregar(vecTramaTX[h].dato, 4);
              console.log(vecAuxiliar);
          } // FIN ELSE IF
          var nn = (vecTramaTX.length - 1);
          if (h == nn) {
              if (vecAuxiliar.length == vecTramaG.length) {
                  console.log("final " + h);
                  operacionResta2();
              } else {
                  console.log("final " + h);
                  operacionEspecial(vecAuxiliar, h);
              } //FIN  ELSE IF

          } else if (vecAuxiliar.length == vecTramaG.length) {
              console.log("c " + h);
              operacionResta();
          } //FIN ELSE IF
      } // FIN DEL FOR
  } //FIN FUNCION  operacionNucleoPrincipal

  //FUNCION QUE REALIZA EL PROCESO PDE LA DIVISION Y EL LLENADO DEL VECTOR AUXILIAR 
  function operacionResta() {
      for (var j = 0; j < vecAuxiliar.length; j++) {
          var nu1 = vecAuxiliar[j].dato;
          var nu2 = vecTramaG[j].dato;
          var r = nu1 - nu2;
          if (r < 0) {
              agregar(1, 5);
              //  vecresta += 1;
          } else {
              agregar(r, 5);
              //vecresta += r;
          }
          console.log("RESTA " + vecresta[j].dato);
      } //FIN FOR
      vecAuxiliar = [];
      operacionAcomodar();
  } // FIN FUNCION OPERACION RESTAR 

  function operacionResta2() {
      for (var j = 0; j < vecAuxiliar.length; j++) {
          var nu1 = vecAuxiliar[j].dato;
          var nu2 = vecTramaG[j].dato;
          var r = nu1 - nu2;
          if (r < 0) {
              agregar(1, 5);
              //  vecresta += 1;
          } else {
              agregar(r, 5);
              //vecresta += r;
          }
          console.log("RESTA " + vecresta[j].dato);
      } //FIN FOR
      vecAuxiliar = [];
      operacionAcomodar2();
  } // FIN FUNCION OPERACION RESTAR

  function operacionAcomodar() {
      vecAuxiliar = [];
      var m = 1;
      for (let k = 0; k < vecresta.length; k++) {
          if (vecresta[k].dato == m) {
              agregar(vecresta[k].dato, 4);
              // vecaxi += vecresta[k];
              var tt = k + 1;
              if (tt > (vecresta.length - 1)) {
                  break;
              } else {
                  m = vecresta[tt].dato;
              }
          } //FIN SI
      } // FIN DEL FOR
      vecresta = [];
  } //FIN FUNCION OPERACIONACOMODAR

  function operacionAcomodar2() {
      vecAuxiliar = [];
      var mmm = vecTramaG.length - vecTramaR.length;
      for (var k = mmm; k < vecresta.length; k++) {
          agregar(vecresta[k].dato, 4);
          // vecaxi += vecresta[k];
      } // FIN DEL FOR
      vecresta = [];
  } //FIN FUNCION OPERACIONACOMODAR

  function operacionEspecial(vector, h) {
      var temporal = vector;
      vecAuxiliar = [];
      if (temporal.length < vecTramaG.length && h == (vecTramaTX.length - 1)) {
          console.log("aqui estoy entranodo" + temporal);
          var diferencia = vecTramaR.length - temporal.length;
          if (diferencia == 0) {
              for (var k = 0; k < temporal.length; k++) {
                  agregar(temporal[k].dato, 4);
              } // FIN FOR
          } else if (diferencia > 0) {
              var cont = 0;
              while (cont < diferencia) {
                  agregar(0, 4);
                  cont++;
                  if (cont == diferencia) {
                      console.log("aqui estoy entranodo 22222" + temporal);
                      for (var k2 = 0; k2 < temporal.length; k2++) {
                          agregar(temporal[k2].dato, 4);
                      } // FIN FOR
                  } //FIN IF
              } // FIN WHILE

          } // FIN ELSE IF
      } //FIN SI
      vecresta = [];
  } //FIN FUNCION OPERACIONESPECIAL