var main = function(){

	$.ajax({
		type: 'GET',
		url: 'http://' + window.location.hostname + ':8080/otit',
		dataType: 'json',
		success: function(data){
			var names = data.names;
			$.each(names, function(i){
				$('<li>').text(names[i]).appendTo('.OTiTilm');
			});
		}
	});

	$.ajax({
		type: 'GET',
		url:  'http://' + window.location.hostname + ':8080/blanko',
		dataType: 'json',
		success: function(data){
			var names = data.names;
			$.each(names, function(i){
				$('<li>').text(names[i]).appendTo('.Blankoilm');
			});
		}
	});
	$.ajax({
		type: 'GET',
		url:  'http://' + window.location.hostname + ':8080/sigma',
		dataType: 'json',
		success: function(data){
			var names = data.names;
			$.each(names, function(i){
				$('<li>').text(names[i]).appendTo('.Sigmailm');
			});
		}
	});

	$('.btn').addClass('disabled');

	$('.ilmoa').click(function(){
		$('.ilmo').animate({
			left: '0px'
		}, 200);
		$('body').animate({
			left: '285px'
		}, 200);
		$('.info').animate({
			top: '-300px'
		}, 200);
	});

	$('.infonappi').click(function(){
		$('.ilmotlista').animate({
			right: '-500px'
		}, 200);
		$('body').animate({
			left: '0px'
		}, 200);$('.info').animate({
			top: '0px'
		}, 200);
		$('body').animate({
			left: '0px'
		}, 200);
		$('.ilmo').animate({
			left: '-500px'
		}, 200);
		/*$('body').animate({
			top: '300px'
		}, 200);*/
	});

	$('.xilmoa').click(function(){
		$('body').animate({
			left: '0px'
		}, 200);
		$('.ilmo').animate({
			left: '-500px'
		}, 200);
	});

	$('.xinfo').click(function(){
		$('.info').animate({
			top: '-300px'
		}, 200);
		/*$('body').animate({
			top: '0px'
		}, 200);*/
	});

	$('.ilmosta').click(function(){

/*
		$.get('http://0.0.0.0:8080/sigma').always(function(data){
			var names = data.names
			$(names).each(function(index){
				$('.Sigmailm').append('<li>'+names[index]+'</li>');
			});
		});
*/

		$('.ilmo').animate({
			left: '-500px'
		}, 200);
		$('.ilmotlista').animate({
			right: '0px'
		}, 200);
		$('body').animate({
			left: '-285px'
		}, 200);
		});

	$('.ilmonneista').click(function(){
		
		$('.ilmotlista').animate({
			right: '-500px'
		}, 200);
		$('.ilmo').animate({
			left: '0px'
		}, 200);
		$('body').animate({
			left: '285px'
		}, 200);
	});

	$('.ilmot').click(function(){
		$('.info').animate({
			top: '-300px'
		}, 200);
		$('.ilmotlista').animate({
			right: '0px'
		}, 200);
		$('body').animate({
			left: '-285px'
		}, 200);
	});

	$('.xilmot').click(function(){
		$('.ilmotlista').animate({
			right: '-500px'
		}, 200);
		$('body').animate({
			left: '0px'
		}, 200);
	});

	//Kiltaa vastaavan napin painamisen jälkeen nimi ja kilta lähetetään serverille hackapong.py:hyn, joka kirjaa ilmoittautumisen killan listaan.
	$('.otitnappi').click(function(){
		var post = $('.nimikentta').val();
		var email = $('.sposti').val();
		$('<li>').text(post).appendTo('.OTiTilm');
		$('.nimikentta').val('');
		$('.sposti').val('');
		$('.btn').addClass('disabled');
		$.post( 'http://' + window.location.hostname + ':8080/otit', JSON.stringify({"name": post, "email": email})).done(function () {
                alert("Ilmoittautuminen vastaanotettu");
            });
		});
	
	$('.blankonappi').click(function(){
		var post = $('.nimikentta').val();
		var email = $('.sposti').val();
		$('<li>').text(post).appendTo('.Blankoilm');
		$('.nimikentta').val('');
		$('.sposti').val('');
		$('.btn').addClass('disabled');
		$.post( 'http://' + window.location.hostname + ':8080/blanko', JSON.stringify({"name": post, "email": email})).done(function () {
                alert("Ilmoittautuminen vastaanotettu");
                });
		});

	$('.sigmanappi').click(function(){
		var post = $('.nimikentta').val();
		var email = $('.sposti').val();
		$('<li>').text(post).appendTo('.Sigmailm');
		$('.nimikentta').val('');
		$('.sposti').val('');
		$('.btn').addClass('disabled');
		$.post( 'http://' + window.location.hostname + ':8080/sigma', JSON.stringify({"name": post, "email": email})).done(function () {
            alert("Ilmoittautuminen vastaanotettu");
            });
		});

	$('.nimikentta').keyup(function(){
			var postLength = $(this).val().length;
			var charactersLeft = 30 - postLength;
			if(charactersLeft < 0){
				$('.btn').addClass('disabled');
			}
			else if(charactersLeft > 23){
				$('.btn').addClass('disabled');
			}
			else{
				$('.sposti').keyup(function(){
					var emailLength = $(this).val().length;
					var charactersLeft = 50 - emailLength;
					if(charactersLeft < 0){
						$('.btn').addClass('disabled');
					}
					else if(charactersLeft > 40){
						$('.btn').addClass('disabled');
					}
					else{
						$('.btn').removeClass('disabled');
					}
	});
			}
			
	});

	$('.sposti').keyup(function(){
		var emailLength = $(this).val().length;
		var charactersLeft = 50 - emailLength;
		if(charactersLeft < 0){
			$('.btn').addClass('disabled');
		}
		else if(charactersLeft > 40){
			$('.btn').addClass('disabled');
		}
		else{
			$('.nimikentta').keyup(function(){
			var postLength = $(this).val().length;
			var charactersLeft = 30 - postLength;
			if(charactersLeft < 0){
				$('.btn').addClass('disabled');
			}
			else if(charactersLeft > 23){
				$('.btn').addClass('disabled');
			}
			else{
				$('.btn').removeClass('disabled');
			}
		});
		}
	});

	$('.btn').addClass('disabled');
}

$(document).ready(main);
