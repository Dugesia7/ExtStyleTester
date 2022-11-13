$(window).on("load",function(){
	//save&load per change
	padElem=document.getElementById("pad");
	chrome.storage.local.get(["padContent","width","height"])
		.then((value)=>{
			padElem.innerText=value["padContent"];
			padElem.style.width=value.width;
			padElem.style.height=value.height;
			$('#style').text($('#resizer').text());
		});
	$('#pad').on("blur keyup copy paste cut mouseup",function(){
		$('#style').text($('#resizer').text());
		chrome.storage.local.set({"padContent":padElem.innerText,"width":padElem.style.width,"height":padElem.style.height});
	});
	//resizerW
	function resizerW(e){
		padElem.style.width=''+(startW+startX-e.screenX)+'px';
		chrome.storage.local.set({"width":padElem.style.width});
	}
	function resizerH(e){
		padElem.style.height=''+(startH+e.screenY-startY)+'px';
		chrome.storage.local.set({"height":padElem.style.height});
	}
	function setStartPos(e){
		startX=e.screenX;startY=e.screenY;
		startW=parseInt(padElem.style.width,10);startH=parseInt(padElem.style.height,10);
	}
	$('#edge_r').on('mousedown',function(e){
		//ps=getComputedStyle(padElem);
		setStartPos(e);
		$(window).on('mousemove',resizerW);
	});
	$('#edge_b').on('mousedown',function(e){
		//ps=getComputedStyle(padElem);
		setStartPos(e);
		$(window).on('mousemove',resizerH);
	});
	$('#corner').on('mousedown',function(e){
		//ps=getComputedStyle(padElem);
		setStartPos(e);
		$(window).on('mousemove',resizerW);
		$(window).on('mousemove',resizerH);
	});
	$(window).on('mouseup',function(e){
		$(window).off('mousemove',resizerW);
		$(window).off('mousemove',resizerH);
	});
});
