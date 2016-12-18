
/*Filtrar agenda*/

    function filtrar_agenda() {
        var idm_agenda = $j('#agenda_idm_select').val();
        var agenda_date_select = $j('#agenda_date_select').val();
        var agenda_club_select = $j('#agenda_club_select').val();
        if (idm_agenda>0) {
            $j('.filtro_idc').hide();
            $j('#filtrocompeticion'+idm_agenda).show();
            var filtro_idc = $j('#filtrocompeticion'+idm_agenda).val();
            $j(".fila_agenda").each(function() {
                var param_game = $j(this).attr("param_game");
                param_game = param_game.split('_');
                    var show_line = 1;
                    
                    if (parseInt(idm_agenda)!=parseInt(param_game[0])) {
                        show_line = 0;
                    }
                    if (show_line==1) {
                        //fecha
                        if (parseInt(agenda_date_select)>parseInt(param_game[1])) { 
                            show_line=1;
                        } else {
                            show_line=0;
                        }
                        if (show_line==1) {                 
                            //club
                            if (agenda_club_select>0) {
                                if ( (parseInt(agenda_club_select)==parseInt(param_game[2])) || (parseInt(agenda_club_select)==parseInt(param_game[3])) ) 
                                    {
                                        show_line==1;
                                    } else {
                                        show_line=0;
                                    }
                            }
                            if (show_line==1) { 
                                if (filtro_idc>0) {
                                    if (parseInt(filtro_idc)==parseInt(param_game[4])) {
                                        show_line==1;
                                    } else {
                                        show_line=0;
                                    }
                                }
                            }
                        }
                    }
                if (show_line==1) {
                    $j(this).show();
                } else {
                    $j(this).hide();
                }
            })
        } else {
            $j('.filtro_idc').hide();
            $j(".fila_agenda").each(function() {
                var param_game = $j(this).attr("param_game");
                param_game = param_game.split('_');
                    var show_line = 1;
                    //fecha
                    if (parseInt(agenda_date_select)>parseInt(param_game[1])) { 
                        show_line=1;
                    } else {
                        show_line=0;
                    }
                    if (show_line==1) {                 
                        //club
                        if (agenda_club_select>0) {
                            if ( (parseInt(agenda_club_select)==parseInt(param_game[2])) || (parseInt(agenda_club_select)==parseInt(param_game[3])) ) 
                                {
                                    show_line==1;
                                } else {
                                    show_line=0;
                                }
                        }
                        if (show_line==1) { 
                            if (filtro_idc>0) {
                                if (parseInt(filtro_idc)==parseInt(param_game[4])) {
                                    show_line==1;
                                } else {
                                    show_line=0;
                                }
                            }
                        }
                    }                   
                    if (show_line==1) {
                        $j(this).show();
                    } else {
                        $j(this).hide();
                    }                   
            })
        }
        var cliente_agenda = 'fgpatinaxe';
        if (cliente_agenda == 'fnp') {
            $j('#filtrocompeticion1').show();
        }
        $j('#pdf_params').val(idm_agenda+','+agenda_date_select+','+agenda_club_select+','+filtro_idc);
    }




/*Nos da las dimensiones de la pantalla o ventana*/

function myFunction() {
    var x = "Total Width: " + screen.width + "px" + "Total Height: " + screen.height  + "px";
    document.getElementById("demo").innerHTML = x;
}


