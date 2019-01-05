import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../app-service/service.service";
//Отчистка хранилища
//chrome.storage.sync.clear();
//Методы заполнения хранилища настроек срабатывает до инициализации класса компонента
chrome.runtime.onInstalled.addListener(()=>{
    //создать контекстное меню
    chrome.contextMenus.create({id : '1' , title : 'Загрузить'})  ;
//обработка нажатия контекстного меню
    chrome.contextMenus.onClicked.addListener(()=>{ //обработка нажатия на элемент меню
	
    }) ;
    //При установке, записываем настройки по умолчанию в базу, если их там нет
    chrome.storage.sync.get('youTubeDownloaderSettings', settings =>{
	if(chrome.runtime.lastError || !settings['youTubeDownloaderSettings']){}
	chrome.storage.sync.set({youTubeDownloaderSettings: new ServiceService().defaultSettings}, function() {
	    console.log('Настройки разрешения сохранены (первый запуск background)');
	});
    });
    
}) ;
chrome.runtime.onStartup.addListener(()=>{
    console.log('onStartUp');
});

@Component({
  selector: 'app-background-page',
  templateUrl: './background-page.component.html',
  styleUrls: ['./background-page.component.css']
})
export class BackgroundPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
