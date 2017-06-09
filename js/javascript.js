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
				var filas = parseInt($("#filas").val());
				var columnas = parseInt($("#columnas").val());
				var vecinos = parseInt($("#vecinos").val());
				//alert(vecinos);
				
				//VERIFICO SI HARÁ FRONTERA O SERÁ CIRCULAR
				if ($('#frontera').is(":checked"))
				{
					filas=(filas+(2*vecinos));
					columnas=(columnas+(2*vecinos));

					iterarTabla(filas,columnas,true,vecinos);
				}

				//AQUÍ ES CUANDO ES CIRCULAR Y NO NECESITA CREAR FRONTERA. AQUÍ EXTRAÑAMENTE FUNCIONA BIEN.
				else
				{
					iterarTabla(filas,columnas,false,vecinos);	
				}
    
    }
    var iterarTabla = function(filas1,columnas1, checked,vecinos)
    {
    	for (var i = 0; i < filas1; i++) 
					{
						var posfila= i+1+"";
						var codeRow = "<tr id="+posfila+"></tr>";
						$(".table tbody").append(codeRow);
						for (var j = 0; j < columnas1; j++) 
						{
							var posColum = j+1+"";
							if (esFrontera(i,j, filas1,columnas1,vecinos) && checked)
							{
							var codeColum = "<td class='clickable2' onclick='clickEstado(this)' id="+posfila+""+posColum+">0</td>";
							}
							else
								var codeColum = "<td class='clickable1' onclick='clickEstado(this)' id="+posfila+""+posColum+">0</td>";
							
							$("#"+posfila).append(codeColum);
						}
						
					}
    }

    var esFrontera = function(i,j, filas,columnas,vecinos)
    {
    	if ((j<vecinos || i<vecinos) || (j>=(columnas-vecinos) || i>=(filas-vecinos)))
    	{
    		return true;
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

