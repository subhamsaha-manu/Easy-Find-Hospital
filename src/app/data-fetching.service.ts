import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


export interface Hospital {
  id: string;
  name: string;
  location:{addressLine:string,district:string,state:string,country:string,pinCode:string}
  totalBedCapacity: number;
  currentBedUsage: number;
}


@Injectable({
  providedIn: 'root'
})
export class DataFetchingService {

  constructor(private httpClient:HttpClient) { }

  getHospitalList(){

    return this.httpClient.get<Hospital[]>("https://live-hospitals.herokuapp.com/api/hospital/");
  }

}
