import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataFetchingService, Hospital } from './data-fetching.service';

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
  columnsToDisplay: string[] = ['name', 'totalBedCapacity', 'vacantBeds', 'phoneNumber'];
  dataSource: MatTableDataSource<Hospital>;
  expandedElement: Hospital | null;
  screenSizeLarge: boolean = false;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    if (this.dataSource) this.dataSource.paginator = paginator; 
    const matTable = document.getElementById('matTable');
    if(matTable)
      matTable.scrollTop = 0;
  }

  constructor(private dataFetchingService: DataFetchingService) {

  }

  applyFilter(filterValue : string) {
    //let filterValue = (event.target as HTMLInputElement).value;
    /*filterValue = filterValue.trim().toLocaleLowerCase();*/
    /*if(filterValue.trim().toLocaleLowerCase() === "private")
      filterValue = "true";*/
      this.dataSource.filterPredicate = (data:Hospital,filterString:string) => {
        //console.log("Therererere")
        //console.log("Filter String ",filterString);
        if((data.name.trim().toLowerCase().indexOf(filterString.trim().toLowerCase())!=-1) || ((data.contact.addressLine.trim().toLowerCase().indexOf(filterString.trim().toLowerCase())!=-1))){
          console.log(data.name);
          return true;
        }else
          return false;
      }
    this.dataSource.filter = filterValue;
    
    // this.dataSource.data.filter(e =>{
    //   if(e.name.indexOf(filterValue) != -1 || e.contact.addressLine.indexOf(filterValue) !=-1){
    //     this.dataSource.f
    //     console.log(typeof e);
    //   }
    // });
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    //console.log("Data source after filter",this.dataSource);
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

  ngAfterViewInit() {
    this.dataFetchingService.getHospitalList()
      .subscribe(respone => {
        this.DATA = respone;
        console.log("Response fetched ", this.DATA.length);
        this.dataSource = new MatTableDataSource(this.DATA);
        //this.dataSource.paginator = this.paginator;

        console.log("Data source", this.dataSource);
      });
      
  }

}
