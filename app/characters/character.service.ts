import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Character } from './character';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CharacterService {
  subscription : Subscription<Character>;

  constructor(private _http: Http) { }

  getCharacters_ViaPromise() {
    let promise = this._http.get('characters.json')
      .map((response: Response) => <Character[]>response.json())
      .toPromise()
      .catch(fetchFailed);

    return promise;
  }

  getCharacters() {
    let observable = this._http.get('characters.json')
      .map((response: Response) => <Character[]>response.json())

    // TODO: learning moment.
    // if i want to subscribe here and do something with the data, or handle errors.
    // i capture the subscription in case i want to kill it later
    //  ex: this.subscription.unsubscribe()
    this.subscription = observable.subscribe(
      null, //characters => characters, // Success path
      err => (err: any) => console.error('There was an error: ' + err), // Failure path
      () => console.log('getCharacters Completed') // Completed actions
    );

    // TODO: How do we chain the errors?
    // TODO: how do i tell the observable i am done and no more is expected? I expected .Completed?

    return observable;
  }

  getCharacter_ViaPromise(id: number) {
    return this._http.get('characters.json')
      .map((response: Response) => {
        return response.json().filter((c: Character) => { return c.id === id; })[0]
      })
      .toPromise()
      .catch(fetchFailed);
  }

  getCharacter(id: number) {
    return this._http.get('characters.json')
      .map((response: Response) => {
        return response.json().filter((c: Character) => { return c.id === id; })[0]
      })
  }
}

function fetchFailed(error: any) {
  //TODO: dont use console here
  console.error(error);
  return Promise.reject(error);
}
