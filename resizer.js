const resizerHTML=`
<style>
:host{
	--inner-width: 0;
	--inner-height: 0;
}
table{
	border-spacing: 0;
}
td{
	padding: 0;
}
#wrapper{
	display: table-cell;
}
#edgeL{
	width: 1em;
	height: var(--inner-height);
	cursor: ew-resize;
}
#edgeB{
	width: var(--inner-width);
	height: 1em;
	cursor: ns-resize;
}
#corner{
	width: 1em;
	height: 1em;
	cursor: nesw-resize;
}
</style>
<table>
	<tr>
		<td><div id="edgeL"></div></td>
		<td><div id="wrapper">
		<slot></slot>
		</div></td>
	</tr>
	<tr>
		<td><div id="corner"></div></td>
		<td><div id="edgeB"></div></td>
	</div>
</div>
`;
class ResizerElem extends HTMLElement {
	#startX;#startY;#startW;#startH;
	get innerWidth(){
		return getComputedStyle(this).getPropertyValue('--inner-width');
	}
	set innerWidth(val){
		this.style.setProperty('--inner-width',val);
	}
	get innerHeight(){
		return getComputedStyle(this).getPropertyValue('--inner-height');
	}
	set innerHeight(val){
		this.style.setProperty('--inner-height',val);
	}
	setStartPos(e){
		this.#startX=e.screenX;
		this.#startY=e.screenY;
		this.#startW=parseInt(this.innerWidth,10);
		this.#startH=parseInt(this.innerHeight,10);
	}
	resizering(e){
		console.log('resizering',e);
		let bt=this.shadowRoot.elementFromPoint(e.x,e.y);
		const detail={
			'widthChange':!(bt==this.edgeB),
			'beforeWidth':this.innerWidth,
			'afterWidth':((this.#startW+this.#startX-e.screenX)+'px'),
			'heightChange':!(bt==this.edgeL),
			'beforeHeight':this.innerHeight,
			'afterHeight':((this.#startH-this.#startY+e.screenY)+'px'),
		};
		const re=new CustomEvent('resizer',{'detail':detail,'cancelable':true});
		if(this.dispatchEvent(re)){
			console.log('resizer Event finished',detail.afterWidth,detail.afterHeight);
			this.innerWidth=detail.afterWidth;
			this.innerHeight=detail.afterHeight;
		}
	}
	constructor(){
		super();
		this.attachShadow({mode:'open'});
		this.shadowRoot.innerHTML=resizerHTML;
		this.edgeL=this.shadowRoot.getElementById('edgeL');
		this.edgeB=this.shadowRoot.getElementById('edgeB');
		this.corner=this.shadowRoot.getElementById('corner');
		this.addEventListener('mousedown',(e)=>{
			let ct=e.currentTarget;
			let bt=ct.shadowRoot.elementFromPoint(e.x,e.y);
			ct.removeEventListener('mousemove',ct.resizering);
			if(!([ct.edgeL,ct.edgeB,ct.corner].includes(bt)))return;
			ct.setStartPos(e);
			ct.addEventListener('mousemove',ct.resizering);
		});
		this.addEventListener('mouseup',(e)=>{
			let ct=e.currentTarget;
			ct.removeEventListener('mousemove',ct.resizering);
		});
	}
}
customElements.define('resize-er',ResizerElem);
