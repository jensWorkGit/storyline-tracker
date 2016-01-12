import { Component } from 'angular2/core';

@Component({
  selector: 'taba-binding',
  templateUrl: 'app/binding/binding.component.html'
})
export class BindingComponent {
  firstName = 'john';
  lastName = 'papa';
  city = 'orlando';
  dataAsync: Promise<string>;

  constructor() {
    this.dataAsync = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('data from promise');
      }, 500)
    });
  }

  addThing(thing: string) {
    console.log(`adding ${thing}`);
  }
}
