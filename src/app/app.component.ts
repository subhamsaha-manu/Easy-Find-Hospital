import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { DataFetchingService, Hospital } from './data-fetching.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  DATA: Hospital[];
  title = 'EasyFindApp';
  columnsToDisplay: string[] = ['id','name', 'totalBedCapacity', 'currentBedUsage'];
  dataSource: MatTableDataSource<Hospital>;
  expandedElement: Hospital | null;

  @ViewChild(MatPaginator, {static: false}) set matPaginator(paginator: MatPaginator) { this.dataSource.paginator = paginator; }

  constructor(private dataFetchingService:DataFetchingService) {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    this.dataFetchingService.getHospitalList()
    .subscribe(respone =>{
      this.DATA = respone;
      console.log("Response fetched ",this.DATA[0].location.addressLine);
      this.dataSource = new MatTableDataSource(this.DATA);
      //this.dataSource.paginator = this.paginator;
      
      console.log("Data source",this.dataSource.data);
    });
  }
  
}
