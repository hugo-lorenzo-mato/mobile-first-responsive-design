var $j = jQuery.noConflict();
$j(document).ready(function() {
	
	var ruta_files = 'http://www.server2.sidgad.es/';
	var temp = $j('#temp').val();
	var cliente = $j('#cliente').val();
	var idm = $j('#idm').val();
	$j('.loading_portal').hide();
	var name_temp_selected = $j('#temp_activa_name').val();
	$j('#header_temp_selected').html(name_temp_selected+'<i class="fa fa-sort" aria-hidden="true" style="padding-left: 10px; font-size: 14px;"></i>');
	
$j('#listado_competiciones').load(ruta_files+cliente+'/'+cliente+'_ls_'+idm+'.php',
	function( response, status, xhr ) {
		if (status == 'success') {
			$j('.loading_portal').hide();
			$j('.temp_'+temp).show();
		}
	}	
);


$j('#scorer_competiciones').load(ruta_files+cliente+'/'+cliente+'_mc_'+idm+'.php');

/*
var sidgad_scorer = function() {
	var file_scorer = cliente+'_mc_'+idm+'.php';
	var sidgad_reload_scorer = setInterval(function() {
		$j.ajax({
			type: "POST",
			url: "http://server2.sidgad.es/0_scripts_server/check_marcador.php",
			data:	{ 	file_scorer:	file_scorer,
						cliente:		cliente,
						last_update:	$j('#last_update_scorer').val()
			},
			beforeSend: function () {
			},
			success: function(respuesta_php)
			{
				var respuesta_renovar = respuesta_php.trim();
				console.log(respuesta_renovar);
				respuesta_renovar = respuesta_renovar.split(',');
				$j('#last_update_scorer').val(respuesta_renovar[1]);
					if (respuesta_renovar[0]==1) {
						$j('#scorer_competiciones').load(ruta_files+cliente+'/'+cliente+'_mc_'+idm+'.php',
							function( response, status, xhr ) {
								if (status == 'success') {
									$j('#last_update_scorer').val(respuesta_renovar[1]);
								}
							}	
						);
					} else {
						$j('#last_update_scorer').val(respuesta_renovar[1]);
					}
			} //success				
		}); //ajax
		var scorer_activado = $j('#scorer_activado').val();
		if (scorer_activado==0) {
			clearInterval(sidgad_reload_scorer);	
		}			
	}, 30000);
}
*/

var sidgad_scorer = function() {
	var file_scorer = cliente+'_mc_'+idm+'.php';
	var sidgad_reload_scorer = setInterval(function() {	
		$j('#scorer_competiciones').load(ruta_files+cliente+'/'+cliente+'_mc_'+idm+'.php');
	}, 30000);
}	


sidgad_scorer();


$j(document).on("click",".game_report",function(e){	
	e.preventDefault();
	$j('#tab_selected_thickbox_big').val('tab_ficha_resumen');
	var idp = $j(this).attr('idp');
	$j('#idp_selected').val(idp);
	$j('#sidgad_thickbox_content').html('');
	var idc = $j('#idc').val();
	$j('.loading_portal').show();
	$j('#sidgad_thickbox_topbar_content').text($j(this).attr('topbar_title'));
	$j('#sidgad_thickbox').slideDown();
	$j('#sidgad_portal').hide();
	//reload_game_report();
	$j('#sidgad_thickbox_content').load(ruta_files+cliente+'/'+cliente+'_gr_'+idp+'_'+idm+'.php',
		{ 	idm:		idm,
			idc:		idc,
			idp:		idp,
			tab:		'tab_ficha_resumen',
		},
		function( response, status, xhr ) {
			if (status == 'success') {
				$j('.loading_portal').hide();
				var game_reload_web = function() {
					clearInterval(game_reload_web);
					var file_game_reload_web = ruta_files+cliente+'/'+cliente+'_gr_'+idp+'_'+idm+'.php';
					var sidgad_game_reload_web = setInterval(function() {
						var tab_selected = $j('#tab_selected_thickbox_big').val();
						if (tab_selected=='') { tab_selected = 'div_ficha_resumen'; }
						$j('#sidgad_thickbox_content').load(file_game_reload_web,
							{
							tab:		tab_selected,
							},
							function( response, status, xhr ) {
								if (status == 'success') {
									$j('#'+tab_selected).click();
								}
							}
						);
					}, 30000);
				
					$j(document).on("click","#close_sidgad_thickbox",function(e){	
						e.preventDefault();
						clearInterval(sidgad_game_reload_web);
					});
				
				};			
				
				
				
				
				game_reload_web();
			}
		}
	);	
});	


$j(document).on("click",".listado_competiciones_fila",function(e){	
	e.preventDefault();
	$j('.loading_portal').show();
	var idc = $j(this).attr('id');
	//var file = cliente+"_"+$j(this).attr('portada_file');
	var acceso = $j(this).attr('acceso');
	$j('#idc').val(idc);
	$j('#titulo_competicion_header_text').html($j(this).attr('idc_name'));
	//if (cliente=='fpcyl') {
		$j('#titulo_competicion_subheader').html($j('#temp_selected_name').val());
	//}
	$j('#tabs_options').load(ruta_files+'competicion_header_creator.php',
		{ 	config_params:		$j(this).attr('config_params'),
			idm:				idm,
			teams_array:		$j('#teams_array_'+idc).val(),
			cliente:			cliente,
			temp:				$j('#temp').val(),
			idc:				idc,
			logo:				$j(this).attr('logo')
		},
		function( response, status, xhr ) {
			if (status == 'success') {
				$j('#tab_modal_contenido').slideUp();
				$j('#tab_modal_container').show();
				if (acceso=='calendario_btn') {
					$j('#portada_btn').hide();
				}
				$j('#'+acceso).click();
			}
		}	
	);

});	

$j(document).on("click",".menu_competicion_btn",function(e){	
	e.preventDefault();

	//file = cliente+"_"+file;
	var btn_id = $j(this).attr('id');
	var selected_menu = $j('#input_menu_selected').val();
	var filter = $j(this).attr('filter');
	var idc = $j('#idc').val();
	var tipo_stats = $j(this).attr('tipo_stats');
	$j('.tabla_standard').hide();
	$j('#filter').val(filter);
	if (selected_menu == btn_id) {
		
		
		
		
	} else {
		$j('.loading_portal').show();
		$j('#'+selected_menu).removeClass('menu_competicion_btn_selected');
		$j('#'+btn_id).addClass('menu_competicion_btn_selected');
		$j('#input_menu_selected').val(btn_id);			
		var team_id = $j('#input_team_selected').val();
		
		
		/*if (team_id>0) {
			filtro_equipo_selected();
		} else {*/
			var file = cliente+"_"+$j(this).attr('file');
			$j('#tab_modal_contenido_competicion').load(ruta_files+cliente+'/'+file,
				{
					idc: 			idc,
					tipo_stats: 	tipo_stats
				},
				function( response, status, xhr ) {
					if (status == 'success') {
						var team_id = $j('#input_team_selected').val();
						filtro_equipo_selected();
						//$j('.idc_'+idc).show();		
						$j('.loading_portal').hide();
						
						/*if ((recarga==0) && (team_id>0)) {
							$j('.fila_stats_player').hide();
							setTimeout(function() {
								$j('.teamid_'+team_id).show('medium');					
							}, 100);
	
						}*/
						
						
						
						
					}
				}
			);
		//} //no team_id
		
		
	}
});

$j(document).on("click",".logo_equipo_menu_container",function(e){
	var team_id = $j(this).attr('id');
	team_id = team_id.split('_');
	team_id = team_id[1];
	var selected_team_id = $j('#input_team_selected').val();
	
	if (selected_team_id == team_id) {
		$j('#teamid_'+team_id).removeClass('logo_equipo_menu_selected');
		$j('#input_team_selected').val('');
		
		
	} else {
		$j('.logo_equipo_menu_selected').removeClass('logo_equipo_menu_selected').addClass('logo_equipo_menu_container');
		$j('#teamid_'+team_id).addClass('logo_equipo_menu_selected');
		$j('#input_team_selected').val(team_id);

	}
	filtro_equipo_selected();
});




function filtro_equipo_selected	() {
	$j('.loading_portal').show();
	var team_id = $j('#input_team_selected').val();
	var selected_menu = $j('#input_menu_selected').val();
	var filter = $j('#filter').val();
	var idc = $j('#idc').val();
	if (team_id>0) {
		if (filter==1) {
			var file = cliente+"_"+$j('#'+selected_menu).attr('file_team');
			$j('#tab_modal_contenido_competicion').load(ruta_files+cliente+'/'+file,
				{
					idc: idc,
					idq: $j('#input_team_selected').val()
				},
				function( response, status, xhr ) {
					if (status == 'success') {
						var team_id = $j('#input_team_selected').val();
						$j('.loading_portal').hide();
					}
				}
			);		
		}
		if (filter==2) {
			$j('.fila_stats_player').hide();
			setTimeout(function() {
				$j('.teamid_'+team_id).show('medium');					
			}, 100);		
		}	
		if (filter==3) {
			$j('.fila_stats_player').hide();
			$j('.info_selec_team').hide();
			setTimeout(function() {
				$j('.teamid_'+team_id).show('medium');					
			}, 100);		
		}
	} else {
		if (filter==1) {
			var file = cliente+"_"+$j('#'+selected_menu).attr('file');
			$j('#tab_modal_contenido_competicion').load(ruta_files+cliente+'/'+file,
				{
					idc: idc
				},
				function( response, status, xhr ) {
					if (status == 'success') {
						var team_id = $j('#input_team_selected').val();
						$j('.loading_portal').hide();
			
					}
				}
			);		
			
		}
		if (filter==2) {
			setTimeout(function() {
				$j('.fila_stats_player').show();				
			}, 100);		
		}
		if (filter==3) {
			$j('.fila_stats_player').hide();				
			$j('#tab_modal_contenido_competicion').prepend("<span class='info_selec_team'>SELECCIONE UN EQUIPO EN LA PARTE SUPERIOR PARA ACCEDER A SU PLANTILLA</span>");
		}
	}
	
	/*var file_competicion = $j('#'+selected_menu).attr('file');
	var ruta_files = 'https://www.sidgad.com/shared/portales_files/3_0_2_competiciones_views/';
	$j('#tab_modal_contenido_competicion').load(ruta_files+file_competicion,
		{ 	hostcliente:	hostcliente,
			idc:			'<?php echo $idc;?>',
			idm:			'<?php echo $_POST['idm'];?>',
			team_id:		team_id
		},
		function( response, status, xhr ) {
			if (status == 'success') {
				$j('.loading_portal').hide();
			}
		}
	);*/		
	$j('.loading_portal').hide();
}

$j(document).on("click",".volver_competiciones",function(e){	
	e.preventDefault();
	$j('#tab_modal_container').hide();	
	$j('#tab_modal_contenido').show();
});

	/*$j('#tabs_options').load(ruta_files+'competicion_header_creator.php',
		function( response, status, xhr ) {
			if (status == 'success') {
				$j('.loading_portal').hide();
			}
		}	
	);*/

$j(document).on("click",".player_season_stats",function(e){	
	e.preventDefault();
	var team_id = $j(this).attr('team_id');
	var id_player = $j(this).attr('id_player');
	var player_name = $j(this).attr('player_name');
	var temp_name = $j(this).attr('temp_name');
	var idc = $j('#idc').val();
	$j('#sidgad_thickbox_right').show('medium');
	$j('#sidgad_thickbox_right_topbar_content').text('FICHA DETALLE - Temporada '+temp_name);
	$j('#sidgad_thickbox_right_content').show('medium');
	$j('.loading_thickbox_right').show();
	$j('#sidgad_thickbox_right_content').load(ruta_files+cliente+'/'+cliente+'_profileseason_'+idm+'_'+temp+'.php',
		{ 	idm:		 	idm,
			idc:		 	idc,
			id_player:		id_player,
			team_id:		team_id,
			temp_name:		temp_name
		},
		function( response, status, xhr ) {
			if (status == 'success') {
				$j('.loading_thickbox_right').hide();
			}
		}
	);			
});	

$j(document).on("click",".goalie_season_stats",function(e){	
	e.preventDefault();
	var team_id = $j(this).attr('team_id');
	var id_player = $j(this).attr('id_player');
	var player_name = $j(this).attr('player_name');
	var temp_name = $j(this).attr('temp_name');
	var idc = $j('#idc').val();
	$j('#sidgad_thickbox_right').show('medium');
	$j('#sidgad_thickbox_right_topbar_content').text('FICHA DETALLE - Temporada '+temp_name);
	$j('#sidgad_thickbox_right_content').show('medium');
	$j('.loading_thickbox_right').show();
	$j('#sidgad_thickbox_right_content').load(ruta_files+cliente+'/'+cliente+'_goaliesprofileseason_'+idm+'_'+temp+'.php',
		{ 	idm:		 	idm,
			idc:		 	idc,
			id_player:		id_player,
			team_id:		team_id,
			temp_name:		temp_name
		},
		function( response, status, xhr ) {
			if (status == 'success') {
				$j('.loading_thickbox_right').hide();
			}
		}
	);			
});

$j(document).on("click","#close_sidgad_right_thickbox",function(e){	
	e.preventDefault();
	$j('#sidgad_thickbox_right').hide('medium');
});

$j(document).on("click","#close_sidgad_thickbox",function(e){	
	e.preventDefault();
	$j('#sidgad_thickbox').slideUp();
	$j('#sidgad_portal').show();
});



$j(document).on("click",".tab_thickbox",function(e){
	e.preventDefault();
	$j('.tab_thickbox_selected').removeClass('tab_thickbox_selected');
	$j(this).addClass('tab_thickbox_selected');
	var div_show = $j(this).attr('div_show');
	$j('#tab_selected_thickbox_big').val($j(this).attr('id'));

	//$j('.thickbox_ficha_views').hide();
	//$j('#'+div_show).animate({width:'toggle'},350);
	
	$j('.thickbox_ficha_views').hide();
	$j('#'+div_show).show();
	
	/*$j('.thickbox_ficha_views').hide("slide", { direction: "right" }, 150);	

    setTimeout(function(){
		$j('#'+div_show).show("slide", { direction: "left" }, 300);	 
    }, 150);	*/	
});	

$j(document).on("click","#header_temp_selected",function(e){
	e.preventDefault();
	$j('#selector_temporadas').toggle();
});	
	
$j(document).on("click",".select_temporada",function(e){	
	$j('.loading_portal').show();
	e.preventDefault();
	var temp = $j(this).attr('id_temp');
	$j('#temp').val(temp);
	var temp_name = $j(this).attr('temp_name');
	$j('#temp_selected_name').val(temp_name);
	$j('#selector_temporadas').hide();
	$j('#header_temp_selected').html(temp_name+'<i class="fa fa-sort" aria-hidden="true" style="padding-left: 10px; font-size: 14px;"></i>');
	$j('#listado_competiciones').load(ruta_files+cliente+'/'+cliente+'_ls_'+idm+'.php',
		function( response, status, xhr ) {
			if (status == 'success') {
				$j('.loading_portal').hide();
				$j('.temp_'+temp).show();
			}
		}	
	);
});
	
});