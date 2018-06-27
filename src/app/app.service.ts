import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    searchObject:Object={};
    searchResult:boolean = false;
    selectedDir:string ='';
    searchRange = [ 0, 30000 ];

  constructor() { 

  }
}
