/**
 * author levi
 * url http://levi.cg.am
 */

// var sHTML = '';

//非组件 
// var clientW = function(){
//   return	document.documentElement.clientWidth || document.body.clientWidth;
// } 

// var clientH = function(){
//   return	document.documentElement.clientHeight || document.body.clientHeight;
// } 

// var box_ele = $('#box_content');
//非组件 




function moveBox(box) {
	// console.log(box);
	
 //  box_ele.onmousedown  = function (ent){
 // var ent = ent || window.event;
 // var x = ent.clientX - box_ele.offsetLeft;
 // var y = ent.clientY - box_ele.offsetTop;
	
	$(document).mousemove(function(e) {

    // if (x>=0 && y>=0) {
    //   //非组件 
    //     var ev = e || window.event;
    //     var cx = clientW();
    //     var cy = clientH();

    //     box_ele.style.top = ev.clientY-y+ 'px';
    //     box_ele.style.left = ev.clientX-x+ 'px';

    //     if(ev.clientX-x<0){
    //     	box_ele.style.left = 0;
    //     }else if(ev.clientX-x > cx-box_ele.offsetWidth){
    //     	box_ele.style.left = cx-box_ele.offsetWidth+'px';
    //     }

    //     if (ev.clientY-y<0) {
    //     	box.style.left = 0;
    //     }else if(ev.clientY>ch-box.offsetHeight){
    //     	box_ele.style.top = ch-box.offsetHeight + 'px';
    //     }
    //   } 
    //   }
    //非组件 

		if (!!this.move) {
			var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
				callback = document.call_down || function() {
					$(this.move_target).css({
						'top': e.pageY - posix.y,
						'left': e.pageX - posix.x
					});
				};

			callback.call(this, e, posix);
		}
	}).mouseup(function(e) {
		if (!!this.move) {
			var callback = document.call_up || function(){};
			callback.call(this, e);
			$.extend(this, {
				'move': false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
		}
	});




	var $box = $(box).mousedown(function(e) {
	    var offset = $(this).offset();
	    // console.log($(box));
	    // console.log(this.innerHTML);
	    // sHTML += this.innerHTML;
	    // console.log(sHTML);
	    this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
	    $.extend(document, {'move': true, 'move_target': this});
	}).on('mousedown', '#coor', function(e) {
	    var posix = {
	            'w': $box.width(), 
	            'h': $box.height(), 
	            'x': e.pageX, 
	            'y': e.pageY
	        };
	    // console.log(posix);
	    $.extend(document, {'move': true, 'call_down': function(e) {
	    	// console.log($box);
	        $box.css({
	            'width': Math.max(30, e.pageX - posix.x + posix.w),
	            'height': Math.max(30, e.pageY - posix.y + posix.h)
	        });
	        // console.log($box);
	        // console.log($box.context.childNodes[1].outerHTML);
	    }});

	    return false;
	});
   
}