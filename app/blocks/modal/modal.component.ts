import { Component } from 'angular2/core';

@Component({
  selector: 'modal-confirm',
  templateUrl:'app/blocks/modal/modal.component.html',
  styleUrls: ['app/blocks/modal/modal.component.css']
  // inputs: ['title', 'message', 'okText', 'cancelText']
})
export class ModalComponent {
  title: string;
  message: string;
  okText: string;
  cancelText: string;

  showDialog() {
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

function showDialog(options: any) {
  options = $.extend({
    id: 'theModalDialog',
    title: null,
    text: null,
    negative: false,
    positive: false,
    cancelable: true
  }, options);

  $(document).unbind("keyup.dialog");

  var dialog = $('#theModalDialog');
  dialog.css({ display: 'inline' });

  if (options.negative || options.positive) {
    var buttonBar = $('.dialog-button-bar');
    if (options.negative) {
      options.negative = $.extend({ onClick: () => false }, options.negative);
      var negButton = $('#negative');

      negButton.click((e: any) => {
        e.preventDefault();
        if (!options.negative.onClick(e)) hideDialog(dialog)
      });
    }
    if (options.positive) {
      options.positive = $.extend({onClick: ()=> false}, options.positive);
      var posButton = $('#positive');

      posButton.click((e: any) => {
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
      if (e.which == 27) {
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