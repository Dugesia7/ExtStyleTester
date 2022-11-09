$(window).on("load",function(){
	padElem=document.getElementById("pad");
	chrome.storage.local.get(["padContent","width","height"])
		.then((value)=>{
			padElem.innerText=value["padContent"];
			padElem.style.width=value.width;
			padElem.style.height=value.height;
			$('#style').text($('#wrapper').text());
		});
	$('#pad').on("blur keyup copy paste cut mouseup",function(){
		$('#style').text($('#wrapper').text());
		ps=getComputedStyle(padElem);
		chrome.storage.local.set({"padContent":padElem.innerText,"width":ps.width,"height":ps.height});
	});
});
