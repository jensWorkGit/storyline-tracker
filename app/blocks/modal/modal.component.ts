import { Component, OnInit } from 'angular2/core';
import { ModalService } from './modal.service'

const KEY_ESC = 27;

@Component({
  selector: 'modal-confirm',
  templateUrl: 'app/blocks/modal/modal.component.html',
  styleUrls: ['app/blocks/modal/modal.component.css']
})
export class ModalComponent implements OnInit {
  title: string;
  message: string;
  okText: string;
  cancelText: string;
  negativeOnClick: (e: any) => void;
  positiveOnClick: (e: any) => void;

  private _modalElement: any;
  private _cancelButton: any;
  private _okButton: any;

  constructor(private _modalService: ModalService) {
    this._modalService.activate = this.activate.bind(this);
  }

  ngOnInit() {
    this._modalElement = document.getElementById('confirmationModal');
    this._cancelButton = document.getElementById('cancelButton');
    this._okButton = document.getElementById('okButton');
  }

  activate() {
    this.title = this._modalService.title;
    this.message = this._modalService.message;
    this.okText = this._modalService.okText;
    this.cancelText = this._modalService.cancelText;

    let promise = new Promise<boolean>((resolve, reject) => {
      this.negativeOnClick = (e: any) => resolve(false);
      this.positiveOnClick = (e: any) => resolve(true);
      this.show();
    });

    return promise;
  }

  private show() {
    document.onkeyup = null;

    this._modalElement.style.opacity = 0;
    this._modalElement.style.zIndex = 9999;

    this._cancelButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!this.negativeOnClick(e)) this.hideDialog()
    });

    this._okButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!this.positiveOnClick(e)) this.hideDialog()
    });

    componentHandler.upgradeDom();

    this._modalElement.onclick = () => {
      this.hideDialog();
      return this.negativeOnClick(null);
    };

    document.onkeyup = (e: any) => {
      if (e.which == KEY_ESC) {
        this.hideDialog();
        return this.negativeOnClick(null);
      }
    };

    this._modalElement.style.opacity = 1;
  }

  private hideDialog() {
    document.onkeyup = null;
    this._modalElement.style.opacity = 0;
    window.setTimeout(() => { this._modalElement.style.zIndex = 0; }, 400);
  }
}
