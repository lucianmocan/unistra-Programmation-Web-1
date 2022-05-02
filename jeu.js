/*
NOM :
Prénom :

NOM :
Prénom :

*/

function alea(min, max){ // [0;15[
  return Math.floor((Math.random()*(max-min))+min)
}

$(document).ready(function(){
  let use=[];
  for(var i=0; i<16; i++){
    var nb = alea(0,16);
    if(use.includes(nb)){
      while(use.includes(nb)){
        nb = alea(0,16);
      }
    }
    use.push(nb);
    if(nb!=15){
      let newtuile = $('<div class="tuile"></div>');
      newtuile.attr('id',nb);
      let newtuiletext=$('<p>'+nb+'</p>');
      newtuile.append(newtuiletext);
      newtuile.css('background-image','url(img/'+0+nb+'.jpg)');
      $('#puzzlearea').append(newtuile);
    }
    else{
      let newtuile = $('<div class="tuile"></div>');
      newtuile.attr('id',nb);
      let newtuiletext=$('<p>'+nb+'</p>');
      newtuile.append(newtuiletext);
      $('#puzzlearea').append(newtuile);
    }
  }
});