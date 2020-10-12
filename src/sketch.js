
	 var ctx, color = "#000";	
     document.addEventListener( "DOMContentLoaded", function(){
         setTimeout(function(){
            newCanvas();
         }, 1000);
     }, false );
 
     function newCanvas(){
         // setup canvas
         ctx=document.getElementById("canvas").getContext("2d");
         ctx.strokeStyle = color;
         ctx.lineWidth = 5;
         drawMouse();
     }
             
     function selectColor(el){
         for(var i=0;i<document.getElementsByClassName("palette").length;i++){
             document.getElementsByClassName("palette")[i].style.borderColor = "#777";
             document.getElementsByClassName("palette")[i].style.borderStyle = "solid";
         }
         el.style.borderColor = "#fff";
         el.style.borderStyle = "dashed";
         color = window.getComputedStyle(el).backgroundColor;
         ctx.beginPath();
         ctx.strokeStyle = color;
     }
    
     var drawMouse = function() {
         var clicked = 0;
         var start = function(e) {
             clicked = 1;
             ctx.beginPath();
             x = e.pageX;
             y = e.pageY-44;
             ctx.moveTo(x,y);
         };
         var move = function(e) {
             if(clicked){
                 x = e.pageX;
                 y = e.pageY-44;
                 ctx.lineTo(x,y);
                 ctx.stroke();
             }
         };
         var stop = function(e) {
             clicked = 0;
         };
         document.getElementById("canvas").addEventListener("mousedown", start, false);
         document.getElementById("canvas").addEventListener("mousemove", move, false);
         document.addEventListener("mouseup", stop, false);
     };
 
     function download(){
         html2canvas(document.getElementById("canvas"),{
             onrendered: function(canvas){
                 var imgData = canvas.toDataURL('image/png');
                 console.log('Report Image URL: '+imgData);
                 var doc = new jsPDF('p', 'mm', [297, 210]); //210mm wide and 297mm high
 
                 doc.addImage(imgData, 'PNG', 10, 10);
                 doc.save('sample.pdf');
             }
         });
     }