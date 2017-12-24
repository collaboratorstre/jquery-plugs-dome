var reg=/[^\x00-\xff]/g;
//checkLen主方法，保留定义长度的字符
function checkLen(obj,len){  
  if(obj.value.replace(reg,'**').length>=len){
   obj.value=leftUTFString(obj.value,len);
  }
 }
 
 function getStringUTFLength(str) { 
  var value = str.replace(reg,"  "); 
  return value.length; 
 }

 function leftUTFString(str,len) { 
  if(getStringUTFLength(str)<=len) 
   return str; 
  var value = str.substring(0,len); 
  while(getStringUTFLength(value)>len) { 
   value = value.substring(0,value.length-1); 
  } 
  return value; 
 }