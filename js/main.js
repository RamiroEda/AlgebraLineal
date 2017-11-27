$('select').material_select();
$('.dropdown-button').dropdown();

$("#m1-filas").keyup(e => crearMatriz(e));
$("#m1-col").keyup(e => crearMatriz(e));
$("#m2-filas").keyup(e => crearMatriz(e));
$("#m2-col").keyup(e => crearMatriz(e));

function selectOption(t){
  switch ($(t)[0].options.selectedIndex){
    case 1:
      sumaMatriz();
      break;
    case 2:
      multMatriz();
      break;
  }
}

function deterMatriz(el){
  var Mval = [$($(el).parent().parent().parent().find("input").get(0)).val(), $($(el).parent().parent().parent().find("input").get(1)).val()];
  if(Mval[0] != 3 || Mval[1] != 3){
    Materialize.toast('Esta opcion solo esta disponible para matrices cuadradas de 3x3.', 3000, 'rounded');
    return;
  }
  var determinante = toMatrizDeter($(el).parent().parent().parent().find(".Matriz").find("input"), Mval, ""), TeX = "",
      Matriz = toMatriz($(el).parent().parent().parent().find(".Matriz").find("input"), Mval, "");

  TeX += "$det \\begin{pmatrix}\n";
  for (var i = 0; i < Mval[0]; i++) {
    for (var e = 0; e < Mval[1]; e++) {
      var num = Number(Matriz[i][e]);
      TeX += num+(e==(Mval[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{pmatrix} = "+determinante+" $";

  displayResu(TeX);
}

function transMatriz(el){
  var Mval = [$($(el).parent().parent().parent().find("input").get(0)).val(), $($(el).parent().parent().parent().find("input").get(1)).val()];
  var Matriz = toMatriz($(el).parent().parent().parent().find(".Matriz").find("input"), Mval, ""), TeX = "";
  console.log(Matriz);

  TeX += "$\\begin{bmatrix}\n";
  for (var i = 0; i < Mval[0]; i++) {
    for (var e = 0; e < Mval[1]; e++) {
      var num = Number(Matriz[i][e]);
      TeX += num+(e==(Mval[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix}^t =";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < Mval[1]; i++) {
    for (var e = 0; e < Mval[0]; e++) {
      var num = Number(Matriz[e][i]);
      TeX += num+(e==(Mval[0]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix}$";

  displayResu(TeX);
}

function crearMatriz(ev){
  var HTML_Matriz = "<table>",
    row = $($(ev.target).parent().parent().find("input")[0]).val(),
    col = $($(ev.target).parent().parent().find("input")[1]).val();

    if(row < 0 || row > 25 || col < 0 || col > 25){
      if (ev.originalEvent.key != "Backspace") {
        Materialize.toast('Alguno de los datos proporcionados es incorrecto.', 1000, 'rounded');
      }
      return;
    }

  for (var i = 0; i < row; i++) {
    HTML_Matriz += "<tr>";
    for (var e = 0; e < col; e++) {
      HTML_Matriz += "<td style='padding-top:0px; padding-bottom:0px'><input type='number' style='min-width: 17px !important; max-height: 17px !important; margin-bottom: 0px'></td>";
    }
    HTML_Matriz += "</tr>";
  }
  HTML_Matriz+="</table>";

  $($(ev.target).parent().parent().parent().find(".Matriz").get(0)).html(HTML_Matriz);
}

function multMatriz(){
  var M1val = [$("#m1-filas").val(), $("#m1-col").val()],
      M2val = [$("#m2-filas").val(), $("#m2-col").val()];

  var Matriz1 = toMatriz($(".M1.Matriz").find("input"), M1val, 1),
      Matriz2 = toMatriz($(".M2.Matriz").find("input"), M2val, 2),
      TeX = "";

  if(M1val[0] != M2val[1] && Matriz1 != -1 && Matriz2 != -1){
    Materialize.toast('La multiplicacion solo es posible si las filas de la Matriz 1 e igual a las columnas de la Matriz 2.', 5000, 'rounded');
    return;
  }

  TeX += "$\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz1[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M2val[0]; i++) {
    for (var e = 0; e < M2val[1]; e++) {
      var num = Number(Matriz2[i][e]);
      TeX += num+(e==(M2val[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n=\n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M2val[1]; e++) {
      var num = 0;
      for (var k = 0; k < M2val[0]; k++) {
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
  var M1val = [$("#m1-filas").val(), $("#m1-col").val()],
      M2val = [$("#m2-filas").val(), $("#m2-col").val()];

  var Matriz1 = toMatriz($(".M1.Matriz").find("input"), M1val, 1),
      Matriz2 = toMatriz($(".M2.Matriz").find("input"), M2val, 2),
      TeX = "";

  if((M1val[0] != M2val[0] || M1val[1] != M2val[1]) && Matriz1 != -1 && Matriz2 != -1){
    Materialize.toast('No se pueden sumar dos matrices de diferentes dimensiones.', 3000, 'rounded');
    return;
  }

  TeX += "$\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz1[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n+\n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz2[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix} \n=\n";

  TeX += "\\begin{bmatrix}\n";
  for (var i = 0; i < M1val[0]; i++) {
    for (var e = 0; e < M1val[1]; e++) {
      var num = Number(Matriz1[i][e]) + Number(Matriz2[i][e]);
      TeX += num+(e==(M1val[1]-1)?"":" & ");
    }
    TeX += "\\\\ \n";
  }
  TeX += "\\end{bmatrix}$";

  displayResu(TeX);
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

function displayResu(s){
  console.log(s);
  $(".respuesta").text(s);
  $("#copy").val(s);
  $(".respuesta").html($(".respuesta").html()+'<br><br><a type="button" name="button" class="btn waves-effect waves-light" onclick="copyTeX()">Copiar TeX</a>');
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function toMatriz(v, c, n){
  var matriz = [],
      k=0;

  if(c[0] < 1 || c[1] < 1){
    Materialize.toast('Se necesita la matriz ' + n + ' para hacer el calculo.', 3000, 'rounded');
    return -1;
  }

  for (var i = 0; i < c[0]; i++) {
    matriz[i]=new Array(c[1]);
    for (var e = 0; e < c[1]; e++) {
      matriz[i][e] = Number($(v[k++]).val());
    }
  }
  return matriz;
}

function toMatrizDeter(v, c, n){
  var matriz = toMatriz(v, c, n),
      k=0,
      det = 0,
      TeX = "";

  if(c[0] < 1 || c[1] < 1){
    return -1;
  }

  for(var e = 0 ; e < 3 ; ++e){
        var mult = 1;
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
        TeX += e==2?"":"+"
    }

    for(var e = 0 ; e < 3 ; ++e){
        var i = 0, mult = 1;
        TeX += "-"
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

  TeX += "= "+det;

  return TeX;
}
