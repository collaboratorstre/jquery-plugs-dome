
var jing = function(containerId,data){

	 $("#"+containerId).empty();
	  var jing_type = echarts.init(document.getElementById(containerId));
       console.log(data);
       var len = data[0]['groupby-endtime'].buckets;
     
       var arr1 = [];
  

       // for(var i= 0;i<len.length;i++ ){
       for(var i= 0;i<len.length;i++ ){
       		var times = new Date(len[i].key).toLocaleDateString()	
       		arr1.push(times);
       	
       }
   


       
       option = {
       			tooltip : {
					        trigger: 'axis',
					        // position: ['50%', '20%'],
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
				 grid: {
				        left: 0,
				        right: '1%',
				     
				        containLabel: true
				    },
				legend: [],
			   xAxis:  {
				        type: 'value'
				    },	    
			   yAxis: {
			        type: 'category',
			        data: arr1
			    },
			     dataZoom: [
					        {
					            type: 'slider',
					            show: true,
					            // xAxisIndex: [0],
					            //    start: 1,
           						//    end: 35
					     
					        }
					        // ,
					        // {
					        //     type: 'slider',
					        //     show: true,
					        //     yAxisIndex: [0],
					        //     left: '93%'
					        // }
					    ],
			    series: []
			
       }
       var arrayObj = new Array();
       var array_n = [];

       for(var x = 0; x<10; x++){
       	arrayObj[x] = new Array();
       		console.log(data[x].key)
       		array_n.push(data[x].key);
       		for(var y = 0; y<data[x]['groupby-endtime'].buckets.length;y++){
       			arrayObj[x].push(data[x]['groupby-endtime'].buckets[y].doc_count);
       		}
       		  option.series.push( {
		          name: data[x].key,
		          type: 'bar',
		          stack: '总量',
			      label: {
						  normal: {
						            show: false,
						             position: 'insideRight'
						           }
						  },
		          data: arrayObj[x]
		         });
       }



       // $.each(data,function(index,item){
       // 		arrayObj[index] = new Array();
       // 		// console.log(item.key)
       // 		array_n.push(item.key);
       // 		// console.log(item['groupby-endtime'].buckets)
       // 		for(var i = 0; i<item['groupby-endtime'].buckets.length;i++){
       // 			// for(var i = 0; i<item['groupby-endtime'].buckets.length;i++){
       // 				// console.log(item['groupby-endtime'].buckets[i].doc_count);
       // 				arrayObj[index].push(item['groupby-endtime'].buckets[i].doc_count);
       // 		}
       			

       // 		    option.series.push( {
		     //      name: item.key,
		     //      type: 'bar',
		     //      stack: '总量',
			    //   label: {
						 //  normal: {
						 //            show: true,
						 //             position: 'insideRight'
						 //           }
						 //  },
		     //      data: arrayObj[index]
		     //     });

       	
       // })
       option.legend.push({
       				type: 'scroll',
       				height: 20,
       				data:array_n
       			})
      
   
       jing_type.setOption(option);
}



 //数据统一处理
 var refreshData = function(){
    $.get("json/jing.json",function(data){
      // console.log(data);
      jing('jing',data.buckets)
     

    	    });
};

$(document).ready(function(){
    refreshData();
    // setInterval(function(){
    //     refreshData();
    // },30*1000);
});