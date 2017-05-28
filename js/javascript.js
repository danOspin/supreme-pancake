$(function()
{
		
	//se presiona creación de tablas
	$("#accion").on("click", function(event)
	{

		//alert(document.getElementById("filas").value!="");
		if (document.getElementById("filas").value!="" && document.getElementById("columnas").value!="" && document.getElementById("vecinos").value!="" && document.getElementById("estados").value!="")
		{
				var filas = $("#filas").val();
				var columnas = $("#columnas").val();

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
				/*for (var j = 0; j < columnas; j++) 
				{
					var posColum = j+"";
					var codeColum = "<th class='clickable1'>0</th>";
					$(".fila").append(codeColum);
					
				}*/
		}
		else
		{
			alert("Debe llenar los campos antes de generar la tabla");
		}
	});
	 /*$(document).on('click', '.clickable1', function(){
    				alert($('.clickable1').attr('id'));
    });*/

});

function clickEstado(x) {
    //alert("Row index is: " + x.id);
    var estado = document.getElementById("estados");
    var numEstado = parseInt(estado.value);
    cambiarValor(x,numEstado);
}

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
