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
	var tablaCreada =false;
	$(document).on('click', '#borrar', function(){
    				borrar();
    			});
	/*$("#accion").on("click", function(event)
		{

			borrar();
		});*/
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

    var borrar = function() 
	{
		var filas = $('#table tr').length;
		alert("borraré"+filas);
		for (i = 0; i<filas; i++)
		{
	   		$("#fila"+i).remove();
		}
	}

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
						if (tablaCreada)
			    		{
			    			borrar();
			    		}
					iterarTabla(filas,columnas,true,vecinos);
				}

				//AQUÍ ES CUANDO ES CIRCULAR Y NO NECESITA CREAR FRONTERA. AQUÍ EXTRAÑAMENTE FUNCIONA BIEN.
				else
				{
					if (tablaCreada)
			    	{
			    		borrar();
			    	}
					iterarTabla(filas,columnas,false,vecinos);	
				}
				tablaCreada=true;
    }

    var iterarTabla = function(filas1,columnas1, checked,vecinos)
    {
    	for (var i = 0; i < filas1; i++) 
					{
						var posfila= i;
						var codeRow = "<tr id=fila"+posfila+"></tr>";
						$(".table tbody").append(codeRow);

						for (var j = 0; j < columnas1; j++) 
						{
							var posColum = j;

							if (esFrontera(i,j, filas1,columnas1,vecinos) && checked)
							{
							var codeColum = "<td class='clickable2' onclick='clickEstado(this)' id="+i+""+j+">0</td>";
							}
							else
							var codeColum = "<td class='clickable1' onclick='clickEstado(this)' id="+posfila+""+posColum+">0</td>";
							
							$("#fila"+posfila).append(codeColum);
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
    var clave = document.getElementById("clave");
    var numEstado = parseInt(estado.value);
    cambiarValor(x,numEstado);
    var convertido = dec2bin(clave,numEstado);
    alert("Clave en arreglo"+convertToArray(convertido));
    //alert("Clave en arreglo"+convertToArray(convertido));
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
	var x = document.getElementById("table").rows.length;	
	alert(x);
	for (i = 0; i<x; i++)
	{
    document.getElementById("table").deleteRow(i);
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

