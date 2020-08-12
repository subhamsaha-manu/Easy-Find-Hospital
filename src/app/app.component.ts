import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataFetchingService, Hospital } from './data-fetching.service';
import { Observable } from 'rxjs';

import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  DATA: Hospital[];
  title = 'EasyFindApp';
  columnsToDisplay: string[] = ['name','vacantBeds', 'phoneNumber','isPrivate'];
  dataSource: MatTableDataSource<Hospital>;
  expandedElement: Hospital | null;
  screenSizeLarge: boolean = false;
  //filterByDistrictDropDown: string;
  filterByHospitalTypeDropDown: string;
  searchBar: string;
  districtList = [];
  districtValue: string;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    if (this.dataSource) this.dataSource.paginator = paginator;
    const matTable = document.getElementById('matTable');
    if (matTable)
      matTable.scrollTop = 0;
  }

  constructor(private dataFetchingService: DataFetchingService) {

  }

  applyFilter(filterValue: string) {
    //let filterValue = (event.target as HTMLInputElement).value;
    /*filterValue = filterValue.trim().toLocaleLowerCase();*/
    /*if(filterValue.trim().toLocaleLowerCase() === "private")
      filterValue = "true";*/

    console.log("Filter value ", filterValue);
    filterValue = this.searchBar + " " + this.myControl.value + " " + (this.filterByHospitalTypeDropDown + "");
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = this.customFilter();
    this.dataSource.filter = filterValue;
    //console.log("Data source after filter",this.dataSource);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  customFilter() {
    let filterFunction = function (data: any, filter: string): boolean {

      let matchFound = false;
      console.log("Filter string in customFilter() ",filter);
      let filterString:string;
      //console.log(typeof filter);
      filterString = filter.replace(/undefined/g, "").trim();
      //console.log("Filter string without undefined ", filterString);
      let rowStr = JSON.stringify(data).trim().toLowerCase().replace(/"/g, '');
      //console.log("Stringify ", rowStr);
      if (filterString.includes("true"))
        filterString = filterString.replace("true", "isPrivate:true");
      if (filterString.includes("false"))
        filterString = filterString.replace("false", "isPrivate:false");
      /*if(rowStr.includes(filterString))
        matchFound = true;*/
      //console.log(filterString);
      var exp = RegExp("(?=.*?\\b" +
        filterString
          .split(" ")
          .join(")(?=.*?\\b") +
        ").*",
        "i"
      );
      var res = exp.test(rowStr);
      if (res)
        matchFound = true;

      return matchFound;
    }
    return filterFunction;
  }

  ngOnInit() {
    console.log("Window size ", window.screen.width);
    if (window.screen.width >= 1920) {
      this.columnsToDisplay = ['name', 'totalBedCapacity', 'vacantBeds', 'phoneNumber', 'isPrivate'];
      //this.screenSizeLarge = true;
    } else {
      this.screenSizeLarge = true;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.districtList.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  ngAfterViewInit() {
    this.dataFetchingService.getHospitalList()
      .subscribe(respone => {
        this.DATA = respone;
        //console.log("Response fetched ", this.DATA.length);
        this.dataSource = new MatTableDataSource(this.DATA);
        //this.dataSource.paginator = this.paginator;
        this.DATA.forEach((val, index, arr) => {
          if (!this.districtList.includes(val.contact.district))
            this.districtList.push(val.contact.district)
        });
        //console.log(this.districtList);
        //console.log("Data source", this.dataSource);
        this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
        map(value => this._filter(value)));    
      });
  }


  resetFilters() {
    //this.filterByDistrictDropDown = "";
    this.searchBar = "";
    this.myControl.patchValue('');
    this.filterByHospitalTypeDropDown = "";
    this.dataSource.filter = "";
    this.dataSource.paginator.firstPage();
  }
}
