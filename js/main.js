//Este programa merece 10 en Álgebra Lineal :-)
$('select').material_select();
$('.dropdown-button').dropdown();

$("#m1-filas").keyup(e => crearMatriz(e));
$("#m1-col").keyup(e => crearMatriz(e));
$("#m2-filas").keyup(e => crearMatriz(e)); //Evento: Cuando se presiona una tecla
$("#m2-col").keyup(e => crearMatriz(e));

function selectOption(t){ //Cuando cambia la eleccion del <select />
  switch ($(t)[0].options.selectedIndex){
    case 1:
      sumaMatriz(); //Si el indice de <select /> es 1 se suman las matrices
      break;
    case 2:
      restaMatriz(); //Si el indice de <select /> es 2 se multiplican las matrices
      break;
    case 3:
      multMatriz(); //Si el indice de <select /> es 2 se multiplican las matrices
      break;
  }
}

function deterMatriz(el){ //Determinante de la matriz
  var Mval = [$($(el).parent().parent().parent().find("input").get(0)).val(), //Se obtienen las dimensiones de la matriz
              $($(el).parent().parent().parent().find("input").get(1)).val()];//a partir de el parámetro DOM de la función

  if(!((Mval[0] == 3 && Mval[1] == 3)||(Mval[0] == 2 && Mval[1] == 2))){ //Si las columnas o las filas son diferentes a 3
    Materialize.toast('Esta opción sólo está disponible para matrices cuadradas de 3x3 y 2x2.', 3000, 'rounded'); //Mensaje: Error
    return; //Se termina la función
  }

  var determinante = toMatrizDeter($(el).parent().parent().parent().find(".Matriz").find("input"), Mval, ""), //Se saca la determinante de la matriz
      TeX = "",
      Matriz = toMatriz($(el).parent().parent().parent().find(".Matriz").find("input"), Mval, ""); //Se obtiene la matriz seleccionada

  TeX += "$det \\begin{pmatrix}\n";
  for (var i = 0; i < Mval[0]; i++) {
    for (var e = 0; e < Mval[1]; e++) {
      var num = Number(Matriz[i][e]);         //Se va concatenando la matriz inicial al lenguaje TeX
      TeX += num+(e==(Mval[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{pmatrix} = "+determinante+" $"; //Se concatena el resultado de la matriz a el string TeX

  displayResu(TeX); //Se llama la función para imprimir el resultado
}

function transMatriz(el){
  var Mval = [$($(el).parent().parent().parent().find("input").get(0)).val(), //Se obtienen las dimensiones de la matriz seleccionanada
              $($(el).parent().parent().parent().find("input").get(1)).val()];

  var Matriz = toMatriz($(el).parent().parent().parent().find(".Matriz").find("input"), Mval, ""), //Se obtiene la matriz inicial
      TeX = "";

  console.log(Matriz);

  TeX += "$\\begin{bmatrix}\n";
  for (var i = 0; i < Mval[0]; i++) {
    for (var e = 0; e < Mval[1]; e++) {
      var num = Number(Matriz[i][e]);      //Se concatena en TeX la matriz inicial
      TeX += num+(e==(Mval[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix}^t =";


  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < Mval[1]; i++) {
    for (var e = 0; e < Mval[0]; e++) {
      var num = Number(Matriz[e][i]);       //Se invierte la matriz inicial y se concatena
      TeX += num+(e==(Mval[0]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix}$";

  displayResu(TeX); //Se imprime el resultado
}

function crearMatriz(ev){ //Cuando el evento se desencadena se crea una matriz
  var HTML_Matriz = "<table>",
      row = $($(ev.target).parent().parent().find("input")[0]).val(),//Se obtienen los valores de los
      col = $($(ev.target).parent().parent().find("input")[1]).val();//<inputs /> correspondientes a filas y columnas

    if(row < 0 || row > 25 || col < 0 || col > 25){ //Si las filas o columnas no entran en el rango
      if (ev.originalEvent.key != "Backspace") {
        Materialize.toast('Alguno de los datos proporcionados es incorrecto.', 1000, 'rounded'); //Error
      }
      return; //Se termina la función
    }

  for (var i = 0; i < row; i++) {
    HTML_Matriz += "<tr>";
    for (var e = 0; e < col; e++) {
      HTML_Matriz += "<td style='padding-top:0px; padding-bottom:0px'><input type='number' style='min-width: 17px !important; max-height: 17px !important; margin-bottom: 0px'></td>"; //Se concatena la tabla que contiene los <input />
    }
    HTML_Matriz += "</tr>";
  }
  HTML_Matriz+="</table>";

  $($(ev.target).parent().parent().parent().find(".Matriz").get(0)).html(HTML_Matriz); //Se ingresa el string HTML concatenado
}

function multMatriz(){
  var M1val = [$("#m1-filas").val(), $("#m1-col").val()],
      M2val = [$("#m2-filas").val(), $("#m2-col").val()];

  var Matriz1 = toMatriz($(".M1.Matriz").find("input"), M1val, 1),
      Matriz2 = toMatriz($(".M2.Matriz").find("input"), M2val, 2),
      TeX = "";

  if(M1val[1] != M2val[0] && Matriz1 != -1 && Matriz2 != -1){
    Materialize.toast('La multiplicación sólo es posible si el número de filas de la Matriz 1 es igual al número de columnas de la Matriz 2.', 5000, 'rounded');
    return;
  }

  TeX += "$\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz1[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & "); //Se concatena la matriz 1
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M2val[0]; i++) {
    for (var e = 0; e < M2val[1]; e++) {
      var num = Number(Matriz2[i][e]);
      TeX += num+(e==(M2val[1]-1)?"":" & "); //Se concatena la matriz 2
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n=\n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {    //Filas de la matriz 1
    for (var e = 0; e < M2val[1]; e++) {  //Columnas de la matriz 2  La matriz resulatante es de ixj
      var num = 0;
      for (var k = 0; k < M2val[0]; k++) { //Fila por columna
        num += Number(Matriz1[i][k]) * Number(Matriz2[k][e]);
      }
      TeX += num+(e==(M2val[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix}$";

  displayResu(TeX);
}

function sumaMatriz(){
  var M1val = [$("#m1-filas").val(),
               $("#m1-col").val()], //Se obtienen las dimensiones de la matriz 1

      M2val = [$("#m2-filas").val(),
               $("#m2-col").val()]; //y de la matriz 2

  var Matriz1 = toMatriz($(".M1.Matriz").find("input"), M1val, 1), //Se obtiene la matriz 1
      Matriz2 = toMatriz($(".M2.Matriz").find("input"), M2val, 2), //y la matriz 2
      TeX = "";

  if((M1val[0] != M2val[0] || M1val[1] != M2val[1]) && Matriz1 != -1 && Matriz2 != -1){ //Si las dimensiones de las matrieces no son iguales
    Materialize.toast('No se pueden sumar dos matrices de diferentes dimensiones.', 3000, 'rounded'); //Error
    return; //Se termina la función
  }

  TeX += "$\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz1[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & "); //Se concatena la matriz 1
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n+\n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz2[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & "); //Se concatena la matriz 2
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n=\n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz1[i][e]) + Number(Matriz2[i][e]);  //Se suma M1ij con M2ij
      TeX += num+(e==(M1val[1]-1)?"":" & ");                    //Se concatena la matriz resultante de la suma
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix}$";

  displayResu(TeX); //Se imprime el TeX
}

function restaMatriz(){
  var M1val = [$("#m1-filas").val(),
               $("#m1-col").val()], //Se obtienen las dimensiones de la matriz 1

      M2val = [$("#m2-filas").val(),
               $("#m2-col").val()]; //y de la matriz 2

  var Matriz1 = toMatriz($(".M1.Matriz").find("input"), M1val, 1), //Se obtiene la matriz 1
      Matriz2 = toMatriz($(".M2.Matriz").find("input"), M2val, 2), //y la matriz 2
      TeX = "";

  if((M1val[0] != M2val[0] || M1val[1] != M2val[1]) && Matriz1 != -1 && Matriz2 != -1){ //Si las dimensiones de las matrieces no son iguales
    Materialize.toast('No se pueden sumar dos matrices de diferentes dimensiones.', 3000, 'rounded'); //Error
    return; //Se termina la función
  }

  TeX += "$\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz1[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & "); //Se concatena la matriz 1
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n-\n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz2[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & "); //Se concatena la matriz 2
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n=\n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz1[i][e]) - Number(Matriz2[i][e]);  //Se suma M1ij con M2ij
      TeX += num+(e==(M1val[1]-1)?"":" & ");                    //Se concatena la matriz resultante de la suma
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix}$";

  displayResu(TeX); //Se imprime el TeX
}

function copyTeX(){
  $("#copy").select();
  try{
    document.execCommand("Copy");
    Materialize.toast('Se ha copiado al portapapeles.', 3000, 'rounded');
  }catch(e){
    Materialize.toast(e, 3000, 'rounded');
  }
  $("#m1-filas").focus();
}

function displayResu(s){ //Se imprime el resultado
  console.log(s);
  $(".respuesta").text(s); //El string se incluye en el <div /> para el resultado
  $("#copy").val(s); //Se pone el resultado en un <textarea /> para poder copiarlo
  $(".respuesta").html($(".respuesta").html()+'<br><br><a type="button" name="button" class="btn waves-effect waves-light" onclick="copyTeX()">Copiar TeX</a>'); //Se crea el boton para copiar
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]); //Se refresca la librería que renderiza el TeX para mostrarlo
}

function toMatriz(v, c, n){ //Convierte el vector de <input /> a una matriz con los valores de los <input />
  var matriz = [],
      k=0;

  if(c[0] < 1 || c[1] < 1){ //Si alguna de las dimensiones es 0, undefinded o NaN
    Materialize.toast('Se necesita la matriz ' + n + ' para hacer el cálculo.', 3000, 'rounded'); //Error
    return -1;
  }

  for (var i = 0; i < c[0]; i++) {
    matriz[i]=new Array(c[1]); //A cada indice del vector se le agrega otro vector
    for (var e = 0; e < c[1]; e++) {
      matriz[i][e] = Number($(v[k++]).val()); //Se llena la matriz
    }
  }
  return matriz;
}

function toMatrizDeter(v, c, n){ //función que saca la determinante 3x3
  var matriz = toMatriz(v, c, n),
      k=0,
      det = 0,
      TeX = "";

  if(c[0] < 1 || c[1] < 1){ //Error
    return -1;
  }

  if(c[0]==3){
    for(var e = 0 ; e < 3 ; ++e){ //Se suman las multiplicaciones de las diagonales de arriba hacia abajo
          var mult = 1;
          TeX += "(";
          for(var k = 0 ; k < 3 ; ++k){
              if(k+e<3){
                  mult *= matriz[k][k+e];
                  TeX += matriz[k][k+e];
              }else{
                  mult *= matriz[k][k+e-3];
                  TeX += matriz[k][k+e-3];
              }
              TeX += k==2?"":"\\cdot"
          }
          det += mult;
          TeX += e==2?"":")+";
      }

      for(var e = 0 ; e < 3 ; ++e){ //Se restan las multiplicaciones de las diagonales de abajo hacia arriba
          var i = 0, mult = 1;
          TeX += ")-("
          for(var k = 2 ; k >= 0 ; --k){
              if(k+e<3){
                  mult *=  matriz[i++][k+e];
                  TeX += matriz[i-1][k+e];
              }else{
                  mult *= matriz[i++][k+e-3];
                  TeX += matriz[i-1][k+e-3];
              }
              TeX += k==0?"":"\\cdot"
          }
          det -= mult;
      }
      TeX += ")";
    }else{
      det = (matriz[0][0] * matriz[1][1]) - (matriz[1][0] * matriz[0][1]);
      TeX = "("+matriz[0][0]+"\\cdot"+matriz[1][1]+")-("+matriz[1][0]+"\\cdot"+matriz[0][1]+")"; //Determinante de 2x2
    }

  TeX += "= "+det;

  return TeX;
}
