import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ServiceService} from "../app-service/service.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-popup-page',
  templateUrl: './popup-page.component.html',
  styleUrls: ['./popup-page.component.css']
})
export class PopupPageComponent implements OnInit {
    
    public optionsGroup = new FormGroup({
	'mp4' : new FormControl(true),
	'webm' : new FormControl(true),
	'3gp' : new FormControl(true),
	'ts' : new FormControl(true),
	'flv' : new FormControl(true),
    });
    constructor(@Inject(DOCUMENT) private doc : Document, public extService : ServiceService) { }
    
    onSubmit(){
	this.extService.setSettings({youTubeDownloaderSettings : {formats :this.optionsGroup.value}}).then((res)=>{
	    console.log('Новые настройки установлены!')
	});
	this.doc.defaultView.close();
    }
    
    ngOnInit() {
	let that = this;
	this.extService.getSettings('youTubeDownloaderSettings').then(result => {
	    console.log(result);
	    let settings = result['youTubeDownloaderSettings'];
	    if (!chrome.runtime.lastError && settings) {
		//настройки получены
		that.optionsGroup.setValue(settings.formats);
		console.log('Настройки разрешения получены (popup)');
	    
	    }
	})
    }

}
