import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocationSource } from "./air-location-data";
import { SharedService } from 'src/app/app.service';
import { Output } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'air-search',
  templateUrl: './air-search.component.html',
  styleUrls: ['./air-search.component.css']
})
export class AirSearchComponent implements OnInit {
  formInvalid: boolean;
  errorMsg: string='Please select all required manidatory fields';
  searchForm: FormGroup;
  selectedDir: string = 'return';
  locationList = LocationSource;
  totalPassengers = [1, 2, 3, 4, 5, 6];
  someRange:any ;
  submitted:boolean = false;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
};


// Initialized to specific date (09.10.2018).
public model: any = { date: { year: 2018, month: 10, day: 9 } };

  @Output() searchSubmit: EventEmitter<any> = new EventEmitter();
  @Output() refineSearchValue: EventEmitter<any> = new EventEmitter();
  constructor(private _fb: FormBuilder,public sharedService:SharedService) {
    this.someRange = JSON.parse(JSON.stringify(this.sharedService.searchRange));
  }

  ngOnInit() {
    this.intializeForm();
  }

  direction(selectedItem: string) {
    this.selectedDir = selectedItem;
  }

  /* Initialize form with setup validations*/
  intializeForm() {
    this.searchForm = this._fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      dapartureDate: ['', Validators.required],
      returnDate: [''],
      passengers: ['', Validators.required]
    });
  }

  searchFlights(data,valid) {
    data['dapartureDate'] = data.dapartureDate['formatted']?data.dapartureDate['formatted']:data.dapartureDate;
    data['returnDate'] = data.returnDate['formatted']?data.returnDate['formatted']:data.returnDate;
    this.submitted = true;
    this.formInvalid = false;
    this.errorMsg='Please select all required manidatory fields';
    if((data['destination']['name'] === data['source']['name'])){
      this.errorMsg = 'Source & destination should not be same';
      this.formInvalid = true;
    }
    if( (data['destination']['name'] !== data['source']['name']) && valid ){
      this.sharedService.searchObject=data;
      this.sharedService.selectedDir = this.selectedDir;
      this.searchSubmit.emit(true);
    }
  }
  
  onChangeRange(event){
    let eventvalue = event;
     this.sendFinalValue(event);
    
  }
  sendFinalValue(event){
     this.refineSearchValue.emit(event);
  }

  
  

}
