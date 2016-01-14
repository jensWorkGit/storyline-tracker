import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export interface Vehicle {
	id: number;
	name: string;
  type: string;
}

@Injectable()
export class VehicleService {
  subscription : Subscription; //<Vehicle>;

  constructor(private _http: Http) { }

  getVehicles() {
    let observable = this._http.get('api/vehicles')
      .map((response: Response) => <Vehicle[]>response.json())

    this.subscription = observable.subscribe(
      null, //Vehicles => Vehicles, // Success path
      err => (err: any) => console.error('There was an error: ' + err), // Failure path
      () => console.log('getVehicles Completed') // Completed actions
    );

    return observable;
  }

  getVehicle(id: number) {
    return this._http.get(`api/vehicles/${id}`)
      .map((response: Response) =>  <Vehicle>response.json())
  }
}

function fetchFailed(error: any) {
  //TODO: dont use console here
  console.error(error);
  return Promise.reject(error);
}
