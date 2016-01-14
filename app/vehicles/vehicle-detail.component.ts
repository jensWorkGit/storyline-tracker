import { Component, Input, OnChanges, OnInit } from 'angular2/core';
import { CanDeactivate, ComponentInstruction, RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { Vehicle, VehicleService } from '../vehicles/vehicle.service';
import { CONFIG } from '../config';
import { ModalService } from '../blocks/modal/modal.service';

@Component({
  selector: 'taba-vehicle-detail',
  templateUrl: 'app/vehicles/vehicle-detail.component.html',
  styles: ['.mdl-textfield__label {top: 0;}'],
  directives: [ROUTER_DIRECTIVES]
})
export class VehicleDetailComponent implements CanDeactivate, OnChanges, OnInit {
  @Input()
  vehicle: Vehicle;
  editName: string;
  editType: string;

  constructor(
    private _vehicleService: VehicleService,
    private _modalService: ModalService,
    private _routeParams: RouteParams,
    private _router: Router) {
  }

  gotoVehicles() {
    let route = ['Vehicles', { id: this.vehicle ? this.vehicle.id : null }]
    this._router.navigate(route);
  }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return !this.vehicle ||
      !this.isDirty() ||
      this._modalService.activate();
  }

  isDirty() {
    return this.vehicle.name !== this.editName ||
      this.vehicle.type !== this.editType;
  }

  cancel() {
    this.editName = this.vehicle.name;
    this.editType = this.vehicle.type;
    this.gotoVehicles();
  }

  save() {
    this.vehicle.name = this.editName;
    this.vehicle.type = this.editType;
    this.gotoVehicles();
  }

  ngOnChanges(changes: any) {
    console.log(changes);
  }

  ngOnInit() {
    //componentHandler.upgradeDom();

    if (!this.vehicle) {
      let id = +this._routeParams.get('id');

      this._vehicleService.getVehicle(id)
        .subscribe((vehicle: Vehicle) => { this.setVehicle(vehicle) });
    }
  }

  private setVehicle(vehicle: Vehicle) {
    if (vehicle) {
      this.editName = vehicle.name;
      this.editType = vehicle.type;
      this.vehicle = vehicle;
    } else {
      this.gotoVehicles();
    }
  }
}
