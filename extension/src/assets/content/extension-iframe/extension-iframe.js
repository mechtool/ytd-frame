let formats;
document.addEventListener('DOMContentLoaded', ()=>{
	chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
		if(message.type === 'formats'){
			formats = message.formats;
			setFormatCollection(message.href);
			sendResponse({type : 'formats', action : 'remove', selector : 'off-data', iframeHeight : formats.length + 1});
			return true;
		}
	}) ;
});

function setFormatCollection(href) {
	
	let collection = document.querySelector('div.formatCollection'),
		imgUrl = chrome.runtime.getURL('assets/img/outline-info-24px.svg');
	collection.innerHTML = '';
	formats.forEach(format => {
		let anchor = document.createElement('a');
		anchor.className = 'format-element-ydl';
		anchor.href = `https://floating-scrubland-78073.herokuapp.com/download?url=${href}&itag=${format.itag}&name=${format.name}&container=${format.container}`;
		anchor.innerHTML = `<img src=${imgUrl} class="imgList material-icons">&nbsp; &nbsp;<span class="element-container">${format.container}</span> &nbsp;-&nbsp; <span class="element-resolution" > ${format.resolution}</span>`;
		collection.appendChild(anchor);
	}) ;
}
