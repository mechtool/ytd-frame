(function(){
	let video;
	document.addEventListener('click', onClickAnchor);//перехват событий нажатия на якоря
	setUserInterface();
	
	function onClickAnchor(event){ //обработка нажатия на якорь /*getAnchor(event.target)*/
		let anchor = getAnchor(event.target);
		if(/*event.target.closest('a')*/anchor && !video && anchor.href.indexOf('watch') >=0 ){
			setTimeout(setVideoTag, 1000) ;
		}
		closeDownloadList();
	}
	function getAnchor(target) {
		if(target instanceof HTMLAnchorElement) return target ;
		else if (target instanceof HTMLBodyElement) return false  ;
		return getAnchor(target.parentElement);
	}
	
	function setVideoTag(){
		video = document.querySelector('video.video-stream.html5-main-video') ; //ставим глобальную переменную
		video && video.addEventListener('loadeddata', setUserInterface);//следим за загрузкой данных
	}
	
	function sendMessage(message){
		chrome.runtime.sendMessage(message, (resp)=>{
			if(resp.type === 'formats'){
				setButtonSelector({action : resp.action, selector : resp.selector});
				setIframeHeight(resp.iframeHeight);
			}
		});
	}
	
	function closeDownloadList(){
		let frame = document.querySelector('#extension-iframe');
		if(frame && frame.classList.contains('active')) onActiveButton();
	}
	
	function setIframeHeight(height){
		document.querySelector('#extension-iframe').style.height = (height * 32) + 'px';
	}
	
	function setButtonSelector(data) {
		let button = document.querySelector('button.download-button-iframe');
		button && button.classList[data.action](data.selector);
		if(data.action === 'add' && data.selector === 'off-data') closeDownloadList();
	}
	
	function getFormats(){
		chrome.storage.sync.get('youTubeDownloaderSettings', settings =>{
			let locPath = document.location.href;
			
			if((!chrome.runtime.lastError && settings['youTubeDownloaderSettings'] && locPath.indexOf('watch') !== -1 )){ //запускаем только, если есть настройки, нет ошибок и есть слово 'watch'
				let frms = [];
				//установка кнопки в неактивное положение и запуск получения форматов
				setButtonSelector({action : 'add', selector : 'off-data'});
				
				for(let key in settings['youTubeDownloaderSettings'].formats){//обход и получение форматов из настроек
					if(settings['youTubeDownloaderSettings'].formats[key]) frms.push(key);
				}
				fetch(`https://floating-scrubland-78073.herokuapp.com/getInfo?url=${locPath}&formats=${frms.join(',')}`).then(resp => {
					return resp.json();
				}).then(formats => {
					sendMessage({type : 'formats', formats : removeDuplicates(formats), href : document.location.href});
				});
			}
			else{ return new Error('Ошибка в условии getFormats.')}
		});
	}

	function removeDuplicates(frm){
		let frms = [];
		for(let i = 0; i < frm.length; i++){
			let f0 = frm[i];
			if(frms.some(f => {
				return (f0.resolution === f.resolution && f0.container === f.container);
			})) continue;
			frms.push(f0);
		}
		return sortItems(frms);
	}
	
	function sortItems(frms){
		return frms.sort((a, b)=> {
			return a.container > b.container  ? 1 : a.container == b.container ? 0 : -1;
		})
	}
	
	function onActiveButton(event) {
		if(!event || (this instanceof HTMLButtonElement && !this.classList.contains('off-data'))){
			document.querySelector('#extension-iframe').classList.toggle('active')  ;
		}
		event && event.stopPropagation();
		
	}
	
	function setUserInterface(){//Установка интерфейса
		let sib, startPoint = Date.now(),
			cont = document.querySelector('div.container-iframe-downloader');
		if(!cont){
			let intervalId = window.setInterval(()=>{
				sib = document.querySelector('div#menu-container.style-scope');//место вставки элемента интерфейса
				if(sib){  //элемент-метка подгружен
					cont = document.createElement('div');
					cont.className = 'container-iframe-downloader';
					cont.innerHTML = `<button class="download-button-iframe off-data">
							<img style="top: 1px; position: relative;" src="${chrome.runtime.getURL('assets/img/baseline-get_app-24px.svg')}">
						</button>
						<div class="tool-tip-ext">Загрузить</div>
						<iframe id="extension-iframe" src="${chrome.runtime.getURL('assets/content/extension-iframe/extension-iframe.html')}"></iframe>` ;
					sib.parentElement.insertBefore(cont, sib);
					cont.querySelector('.download-button-iframe').addEventListener('click', onActiveButton);
					getFormats();
				}
				if(Date.now() - startPoint >= 2000 || sib) window.clearInterval(intervalId);
				
			}, 300)
		}else {
			getFormats();
		}
	}
	


})();