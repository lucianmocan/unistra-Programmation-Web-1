/*
NOM : MOCAN
Prénom : Lucian

NOM : COSMO
Prénom : Tanguy

*/

function alea(min, max){ // [0;15[
  return Math.floor((Math.random()*(max-min))+min)
}


function estDedans(coord){
  if (coord[0]>=0 && coord[0]<=3 && coord[1]>=0 && coord[1] <=3)
    return true;
  else 
    return false;
}

function voisinsInfini(coordTmp){
  var voisin1 = [coordTmp[0], coordTmp[1]+1];
  var voisin2 = [coordTmp[0], coordTmp[1]-1];
  var voisin3 = [coordTmp[0]+1, coordTmp[1]];
  var voisin4 = [coordTmp[0]-1, coordTmp[1]];
return([voisin1, voisin2, voisin3, voisin4])
}

function voisinsValides(coordTmp){
  var checkVoisins = voisinsInfini(coordTmp);
  var bonVoisins = [];
  for (i = 0; i<4; i++){
    if (estDedans(checkVoisins[i])) {
      bonVoisins.push(checkVoisins[i]);
  }
}
  return bonVoisins;
}

function equalCoord(coord1, coord2){
  if (coord1[0] == coord2[0] && coord1[1] == coord2[1])
    return true;
  else
    return false;
}

function checkIfVideInVoisins(lstVoisins, cellule) {
  for (var i = 0; i<lstVoisins.length; i++){
      let coord1V = lstVoisins[i][0]; let coord2V = lstVoisins[i][1]; console.log("("+coord1V+","+coord2V+")");
      let coord1C = cellule[0][0]; let coord2C = cellule[0][1]; console.log("("+coord1C+","+coord2C+")");
      if (coord1V == coord1C && coord2V == coord2C) return true;
  }
  return false;
}

jQuery.fn.outerHTML = function() {
  return jQuery('<div />').append(this.eq(0).clone()).html();
};

function check_and_swap(tuile,styles) {
  var array = $(".tuile");
  var array2D = [];
  var arrayCoord = [];

  for (var i = 0; i<4; i++){
    for (var j = 0; j<4; j++){
      arrayCoord.push([i,j]);
    }
  }

  var j = 0;
  for (let i = 0; i<array.length; i++){
    array2D.push([arrayCoord[i], array[i].id]);
  }

  var tVide = 0; // pour trouver la tuile vide 
  for (tVide = 0; tVide<array2D.length; tVide++){
    if (array2D[tVide][1] == "15") break;
    }

  var tmp = 0; // pour trouver l'indice de la tuile cliquee
  for (tmp = 0; tmp<array2D.length; tmp++){
    if (array2D[tmp][1] == tuile) break;
    }
    var voisinDeTmp = voisinsValides(array2D[tmp][0]); // on cherche les voisins valides

  var tuileVide;
  var tuileEchange;
  if (checkIfVideInVoisins(voisinDeTmp, array2D[tVide])){
      saveTuileID = array[tmp].id;
      saveTuileStyle = styles;
      saveTuileinnerHTML = array[tmp].innerHTML;

      array[tmp].id = array[tVide].id;
      array[tmp].style = array[tVide].style;
      array[tmp].innerHTML = array[tVide].innerHTML;
      tuileEchange = array[tmp].outerHTML;

      array[tVide].id = saveTuileID;
      array[tVide].style = saveTuileStyle;
      array[tVide].innerHTML = saveTuileinnerHTML;
      tuileVide = array[tVide].outerHTML;
  }
  else {
      tuileVide = array[tVide].outerHTML;
      tuileEchange = array[tmp].outerHTML;
  }
  newArray = [];
  for (var i = 0; i<array.length; i++){
      if (i == tVide) { newArray.push(tuileVide) } else
      if (i == tmp) { newArray.push(tuileEchange) } else
      newArray.push(array[i].outerHTML);
  }
  $(".tuile").remove();   
  $("#puzzlearea").append(newArray);
}

function win(){
  var array = $(".tuile");
  var array2D = [];
  var arrayCoord = [];

  for (var i = 0; i<4; i++){
    for (var j = 0; j<4; j++){
      arrayCoord.push([i,j]);
    }
  }
  console.table(array);
  var j = 0;
  for (let i = 0; i<array.length; i++){
    array2D.push([arrayCoord[i], array[i].id]);
  }
  var win = true;
  for (var i = 0; i<array2D.length; i++){
    if (array2D[i][1] != i) {
      win = false;
      break;
    }
  }
  return win;
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

  $("#puzzlearea").on("click", ".tuile", function(){
    var tuile = $(this).attr('id');
    var style = $(this).attr('style');
    check_and_swap(tuile, style);
    if (win()){
      $('#output').text("Gagné !");
      $('#puzzlearea').off("click", ".tuile");
    }
  })


});