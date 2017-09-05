function change_num(n){
    var n = n.toString();
    var it = $("#total .changes");
    var len = String(n).length;
   for(var i=0; i<len; i++){
      if(it.length<=i){
      	$("#total").append("<div class='changes'>"+n[i]+"</div>");
      }

      var num = String(n).charAt(i);
      console.log(num);
      var obj = $("#total changes").eq(i);
      console.log(obj);
    
   }
}

console.log(change_num(10));