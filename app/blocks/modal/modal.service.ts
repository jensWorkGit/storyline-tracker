import { Injectable } from 'angular2/core';

@Injectable()
export class ModalService {
  title: string = 'Confirmation';
  message: string = 'Do you want to cancel?';
  cancelText: string = 'Cancel';
  okText: string = 'OK';
  activate: () => Promise<boolean>;
}
