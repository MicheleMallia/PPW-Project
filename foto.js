function showPic(whichpic){
   var source= whichpic.getAttribute("href");
   var placeholder= document.getElementById("placeholder");
   placeholder.setAttribute("src", source);
   placeholder.style.display='block';
}


