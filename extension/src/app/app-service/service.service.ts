import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    
    public defaultSettings = {
	formats : {
	    'mp4' : true,
	    'webm' : true,
	    '3gp' : true,
	    'ts' : true,
	    'flv' : true,
	}
    };
    
    getSettings(settings) : Promise<any>{
	return new Promise((res, rej)=>{
	    chrome.storage.sync.get(settings, result => {
		res(result);
	    })
	})
    }
    setSettings(settings) : Promise<any>{
	return new Promise((res, rej)=>{
	    chrome.storage.sync.set(settings, () =>{
		res('Настройки сохранены!');
	    })
	})
    }
}
