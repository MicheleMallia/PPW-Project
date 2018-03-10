function caricaXML(nomeFile){  //funzione standard per caricare il file xml
   var xmlhttp;
   if (window.XMLHttpRequest) { 
      xmlhttp = new XMLHttpRequest();
   } 
   else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   } 
   xmlhttp.open("GET", nomeFile, false); 
   xmlhttp.send();
   return xmlhttp.responseXML;
}

function Photogallery(){ //costruttore Photogallery

   this.foto= new Array(); 
   this.generi= new Array();
   this.eta= new Array();
   this.colori= new Array();


   this.inizializza=  //carico gli array con gli elementi
      function(n){
         var nodo= n.getElementsByTagName("album")[0];
         var l= nodo.getElementsByTagName("foto");

         for(var i = 0; i < l.length; i++){
            var f= new Foto();
            f.inizializza(l[i]);
            this.foto.push(f);
            this.generi[f.genere] = true;
            this.eta[f.eta] = true;
            this.colori[f.colore] = true;
         }
      }

//select della form 
   this.selectEta=
      function(){
         var s= '<option value="TutteEt">Fotografie odierne e storiche</option>';
         for(var i in this.eta){
            s += '<option value="'+ i +'">Fotografie '+ i +'</option>';    
         }
         return s;
      }

//select della form 
   this.selectColore=
      function(){
         var s='<option value="TutteCol">Fotografie monocromatiche e a colori</option>';
         for(var i in this.colori){
            s+= '<option value="'+ i +'">Fotografie '+ i +'</option>';
         }
         return s;
      }

//select della form
   this.selectGenere=
      function(){
         var s='<option value="TutteGen">Fotografie con persone e monumenti</option>';
         for(var i in this.generi){
               s += '<option value="'+ i +'">Fotografie con '+ i +'</option>';                                 
         }
         return s;
      }


   this.incrociaOpzioni= //in base alle opzioni selezionate, genero delle stringhe contenenti le immagini di piccola risoluzione
      function(e, c, g){   
         var s="";
         for(var i in this.foto){
            if((this.foto[i].genere == g) && (this.foto[i].colore == c) && (this.foto[i].eta == e)){
               s += '<a href="'+ this.foto[i].grande +'" onclick="showPic(this); return false;"><img src="'+ this.foto[i].thumb +'"  height="53" width="53"  alt="little'+ this.foto[i].numero +'" /></a>';
            }
            else if((e == "TutteEt")&&(c=="TutteCol")&&(g=="TutteGen")){
               s += '<a href="'+ this.foto[i].grande +'" onclick="showPic(this); return false;"><img src="'+ this.foto[i].thumb +'"  height="53" width="53"  alt="little'+ this.foto[i].numero +'" /></a>';
            }
            else if((e == "TutteEt") &&(c=="TutteCol") &&(this.foto[i].genere == g)){
               s += '<a href="'+ this.foto[i].grande +'" onclick="showPic(this); return false;"><img src="'+ this.foto[i].thumb +'"  height="53" width="53"  alt="little'+ this.foto[i].numero +'" /></a>';
            }
            else if((e == "TutteEt")&&(this.foto[i].colore == c)&&(this.foto[i].genere == g)){
               s += '<a href="'+ this.foto[i].grande +'" onclick="showPic(this); return false;"><img src="'+ this.foto[i].thumb +'"  height="53" width="53"  alt="little'+ this.foto[i].numero +'" /></a>';
            }
            else if((this.foto[i].eta == e)&&(this.foto[i].colore == c)&&(g == "TutteGen")){
               s += '<a href="'+ this.foto[i].grande +'" onclick="showPic(this); return false;"><img src="'+ this.foto[i].thumb +'"  height="53" width="53"  alt="little'+ this.foto[i].numero +'" /></a>';
            }
            else if((e == "TutteEt") &&(this.foto[i].colore == c) &&(g == "TutteGen")){
               s += '<a href="'+ this.foto[i].grande +'" onclick="showPic(this); return false;"><img src="'+ this.foto[i].thumb +'"  height="53" width="53"  alt="little'+ this.foto[i].numero +'" /></a>';
            }
            else if((this.foto[i].eta == e)&&(c == "TutteCol")&&(g == "TutteGen")){
               s += '<a href="'+ this.foto[i].grande +'" onclick="showPic(this); return false;"><img src="'+ this.foto[i].thumb +'"  height="53" width="53"  alt="little'+ this.foto[i].numero +'" /></a>';
            }
            else if((this.foto[i].eta == e)&&(c == "TutteCol")&&(this.foto[i].genere == g)){
               s += '<a href="'+ this.foto[i].grande +'" onclick="showPic(this); return false;"><img src="'+ this.foto[i].thumb +'"  height="53" width="53"  alt="little'+ this.foto[i].numero +'" /></a>';
            }
         }
         return s;
      }
}

function Foto(){ //costruttore delle fotografie
   this.numero;
   this.thumb;
   this.genere;
   this.grande;
   this.eta;
   this.colore;

   this.inizializza=
      function(nodo){
         var lnr= nodo.getElementsByTagName("numero");
         var nr= lnr[0].firstChild.nodeValue;
         this.numero = nr;

         var llo= nodo.getElementsByTagName("thumb");
         var lo= llo[0].firstChild.nodeValue;
         this.thumb = lo;

         var lgr= nodo.getElementsByTagName("grande");
         var gr= lgr[0].firstChild.nodeValue;
         this.grande = gr;

         var let= nodo.getElementsByTagName("eta");
         var et= let[0].firstChild.nodeValue;
         this.eta= et;

         var lco= nodo.getElementsByTagName("colore");
         var co= lco[0].firstChild.nodeValue;
         this.colore= co;

         var lge= nodo.getAttribute("genere")
         this.genere = lge
      }
}



function getThumbs(){ //genero le thumbs tenendo conto delle opzioni scelte

   var menue= document.getElementById("selectEta");
   var e = menue.options[menue.selectedIndex].value;

   var menug= document.getElementById("selectGenere");
   var g = menug.options[menug.selectedIndex].value; 

   var menuc= document.getElementById("selectColore");
   var c= menuc.options[menuc.selectedIndex].value;

   var thumbs= document.getElementById("thumbs");
   thumbs.innerHTML= photo.incrociaOpzioni(e, c, g);

}

function reimposta(){ //cancello le thumbs generate e l'immagine a risoluzione alta
      var thumbs= document.getElementById("thumbs");
      thumbs.innerHTML= null;

      var placeholder= document.getElementById("placeholder");
      placeholder.style.display='none';
}
      
var photo; //variabile globale

function inizializza(){ 
   var nodo= caricaXML("fotografie.xml")
   photo = new Photogallery();
   photo.inizializza(nodo);

   var genSelectEta = document.getElementById("selectEta");
   genSelectEta.innerHTML = photo.selectEta();

   var genSelectGen= document.getElementById("selectGenere");
   genSelectGen.innerHTML = photo.selectGenere();

   var genSelectCol= document.getElementById("selectColore");
   genSelectCol.innerHTML = photo.selectColore();

   var p1= document.getElementById("visualizza");
   p1.onclick= getThumbs;

   var p2= document.getElementById("reimposta");
   p2.onclick= reimposta;
   
}

window.onload= inizializza;