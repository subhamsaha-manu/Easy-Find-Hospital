import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


export interface Hospital {
  id: string;
  name: string;
  additionalInfo:string;
  contact:
    {
      addressLine:string,
      district:string,
      state:string,
      country:string,
      pinCode:string,
      phone:string
    };
  usage:
    {
      totalBedCapacity: number,
      vacantBeds: number,
      lastUpdated:string,
      isStale : boolean,
      usagePercentage : number
    }  
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
