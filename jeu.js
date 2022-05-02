/*
NOM : MOCAN
Prénom : Lucian

NOM : COSMO
Prénom : Tanguy

*/

function alea(min, max){ // [0;15[
  return Math.floor((Math.random()*(max-min))+min)
}

$(document).ready(function(){

  function shuffle () {
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
  }
  shuffle();

  $("#shuffle").click(function(){
    $(".tuile").remove();
    shuffle();
  })

  function check_and_swap() {
    var array = $(".tuile");
    var i = 0;
    for (; i<array.length() && array[i] != this; i++){}
    
  }


  $("#puzzlearea").on("click", ".tuille", function(){
    check_and_swap();
  })

});