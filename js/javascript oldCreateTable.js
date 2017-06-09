$(function()
{
		//$('#' + id).is(":checked")
	/*
	como se declaran funciones dentro del jquery:
	 
	 var myFunc = function() {
           // do some stuff here
     };
     myFunc();

	*/



	//AQUÍ ES DONDE EMPIEZA LA ACCIÓN
	$("#accion").on("click", function(event)
	{
		//EL IF QUE VALIDA CAMPOS INGRESADOS.
		if (document.getElementById("filas").value!="" && document.getElementById("columnas").value!="" && document.getElementById("vecinos").value!="" && document.getElementById("estados").value!="")
		{
				crearTabla();
		}
		else
		{
			alert("Debe llenar los campos antes de generar la tabla");
		}
	});

	/*for (var j = 0; j < columnas; j++) 
				{
					var posColum = j+"";
					var codeColum = "<th class='clickable1'>0</th>";
					$(".fila").append(codeColum);
					
				}*/
	 /*$(document).on('click', '.clickable1', function(){
    				alert($('.clickable1').attr('id'));
    });*/

    var crearTabla = function()
    {
    	//EXTRAIGO VALORES INGRESADOS.
				var filas = $("#filas").val();
				var columnas = $("#columnas").val();
				var vecinos = $("#vecinos").val();
				//alert(vecinos);
				
				//VERIFICO SI HARÁ FRONTERA O SERÁ CIRCULAR
				if ($('#frontera').is(":checked"))
				{
					/*AQUÍ le sumo los nuevos vecinos que necesito para crear la frontera.
					y aquí empieza el desmadre*/
					var filas2=filas+(2*vecinos);
					//PRIMER CICLO PARA CREAR FILAS.
					for (var i = 0; i < filas2; i++) 
					{
						/*Creo una variable posfila, para que cuando le ponga nombre a la casilla final, 
						esta empieza desde 1 y no desde 0 (y evitar la confusión si decimos pos[6][5] y
						resulta que estemos en la pos [5][4], porque empezaba en 0)
						No, no afecta a la creación de la tabla, porque ese número estará en el 
						id no en la posición de la tabla.
						*/
						var posfila= i+1+"";

						/*Creo la etiqueta fila, pero no se verá en pantalla hasta que le asigne 
						una columna dentro de ella*/
						var codeRow = "<tr id="+posfila+"></tr>";
						//Aquí la añado al HTML.
						$(".table tbody").append(codeRow);

						//INICIO OTRO CICLO, ESTA VEZ PARA CREAR LAS COLUMNAS, nuevamente añado los vecinos
						var columnas2 = columnas+(2*vecinos);
						for (var j = 0; j < columnas2; j++) 
						{
							/*nuevamente hago otra variable, para que identifiquemos desde la posición [1][1]
							en vez de [0][0]*/
							var posColum = j+1+"";
							//Creo la columna y la añado a la fila que estamos recorriendo actualmente.
							var codeColum = "<td class='clickable1' onclick='clickEstado(this)' id="+posfila+""+posColum+">0</td>";
							$("#"+posfila).append(codeColum);
						}
						
					}

			
				}

				//AQUÍ ES CUANDO ES CIRCULAR Y NO NECESITA CREAR FRONTERA. AQUÍ EXTRAÑAMENTE FUNCIONA BIEN.
				else
				{
					for (var i = 0; i < filas; i++) 
					{

						var posfila= i+1+"";
						var codeRow = "<tr id="+posfila+"></tr>";
						$(".table tbody").append(codeRow);
						for (var j = 0; j < columnas; j++) 
						{
							var posColum = j+1+"";
							var codeColum = "<td class='clickable1' onclick='clickEstado(this)' id="+posfila+""+posColum+">0</td>";
							$("#"+posfila).append(codeColum);
						}
						
					}

				}
    }


});

function clickEstado(x) {
    //alert("Row index is: " + x.id);
    var estado = document.getElementById("estados");
    var numEstado = parseInt(estado.value);
    cambiarValor(x,numEstado);
    var convertido = dec2bin(16,numEstado);
    alert(convertToArray(convertido));
}
//TODO: una vez ingrese un id, verificar que posición de estado pertenece y cambiar al estado siguiente.
function cambiarValor(x,numEstado)
{
	var actual= parseInt(x.innerHTML);
	if (actual+1==numEstado)
	{
		x.innerHTML=0;
	}
	else
		x.innerHTML=actual+1;
}

function borrarTabla() 
{
	var x = document.getElementById("myTable").rows.length;	
	for (i = 0; i<x; i++)
	{
    document.getElementById("myTable").deleteRow(i);
	}
}

function dec2bin(dec,estado){
    return (dec >>> 0).toString(estado);
}

function convertToArray(num)
{
	return (num).toString(10).split("").map(Number)
}

function arrayToNum(num)
{
	return (num).toString(10).split("").map(Number)
}
function cancelar()
{
	return false;
}
function devolverArregloVecinos(vecinos,matriz)
{
	var arregloVecinos=[];
	for (i = vecinos; i>(-vecinos);i--) 
	{
		if (i!=0)
		{
			arregloVecinos.append(matriz[-i][i]);
			arregloVecinos.append(matriz[0][i]);
			arregloVecinos.append(matriz[i][i]);
		}
		else
		{
			for (j = -vecinos; j>vecinos; j++) 
			{
				arregloVecinos.append(matriz[j][i]);
			}
		}

	}
	return arregloVecinos;

}

