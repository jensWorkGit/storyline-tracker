import { Component } from 'angular2/core';
import { ModalService } from './modal.service'

@Component({
  selector: 'modal-confirm',
  templateUrl:'app/blocks/modal/modal.component.html',
  styleUrls: ['app/blocks/modal/modal.component.css'],
  providers: [ModalService]
})
export class ModalComponent {
  title: string;
  message: string;
  okText: string;
  cancelText: string;

  constructor(private _modalService: ModalService) {}

  showDialog() {
    // this.title = this._modalService.config.title || this.title;
    // this.message = this._modalService.config.message || this.message;
    // this.okText = this._modalService.config.okText || this.okText;
    // this.cancelText = this._modalService.config.cancelText || this.cancelText;

    return new Promise<boolean>((resolve, reject) => {
      let options = {
        title: this.title = this.title || 'Confirmation',
        text: this.message = this.message || 'Do you want to cancel your changes?',
        negative: {
          title: this.cancelText = this.cancelText || 'Cancel',
          onClick: (e: any) => resolve(false)
        },
        positive: {
          title: this.okText = this.okText || 'OK',
          onClick: (e: any) => resolve(true)
        }
      };
      showDialog(options);
    });
  }
}

declare var $: any;
const KEY_ESC = 27;

function showDialog(options: any) {
  options = $.extend({
    id: 'theModalDialog',
    title: null,
    text: null,
    negative: false,
    positive: false,
    cancelable: true
  }, options);

  $(document).unbind('keyup.dialog');

  var dialog = $('#theModalDialog');
  dialog.css({ display: 'inline' });

  if (options.negative || options.positive) {
    var buttonBar = $('.dialog-button-bar');
    if (options.negative) {
      options.negative = $.extend({ onClick: () => false }, options.negative);

      $('#negative').click((e: any) => {
        e.preventDefault();
        if (!options.negative.onClick(e)) hideDialog(dialog)
      });
    }
    if (options.positive) {
      options.positive = $.extend({onClick: ()=> false}, options.positive);

      $('#positive').click((e: any) => {
        e.preventDefault();
        if (!options.positive.onClick(e)) hideDialog(dialog)
      });
    }
  }
  componentHandler.upgradeDom();

  if (options.cancelable) {
    dialog.click(() => {
      hideDialog(dialog);
      return options.negative.onClick();
    });
    $(document).bind('keyup.dialog', (e: any) => {
      if (e.which == KEY_ESC) {
        hideDialog(dialog);
        return options.negative.onClick();
      }
    });
  }
  setTimeout(() => { dialog.css({opacity: 1}); }, 1);
}

function hideDialog(dialog: any) {
  $(document).unbind('keyup.dialog');
  dialog.css({opacity: 0});
  setTimeout(() => { dialog.css({display: 'none'}); }, 400);
}