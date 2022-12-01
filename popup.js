$(window).on("load",function(){
	//save&load per change
	padElem=document.getElementById("pad");
	resElem=padElem.parentNode.parentNode;
	chrome.storage.local.get(["padContent","width","height"])
		.then((value)=>{
			padElem.innerText=value["padContent"];
			resElem.innerWidth=value.width;
			resElem.innerHeight=value.height;
			$('#style').text($('#pad-wrapper').text());
		});
	$('#pad').on("blur keyup copy paste cut mouseup",function(){
		$('#style').text($('#pad-wrapper').text());
		chrome.storage.local.set({"padContent":padElem.innerText,"width":resElem.innerWidth,"height":resElem.innerHeight});
	});
	$('resize-er').on('resizer',(e)=>{
		console.log('resizer',e.detail);
		chrome.storage.local.set({"width":e.detail.afterWidth});
		chrome.storage.local.set({"height":e.detail.afterHeight});
	});
	/*
	$(window).on('mouseup',function(e){
		$('resize-er').trigger('mouseup',e.currentTarget=padElem.parentNode.parentNode);
	});
	*/
});
