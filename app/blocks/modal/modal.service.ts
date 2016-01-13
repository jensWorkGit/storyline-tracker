import { Injectable } from 'angular2/core';

@Injectable()
export class ModalService {
  showDialog() {
    return new Promise<boolean>((resolve, reject) => {
      let options = {
        title: 'Hold Your Horses!',
        text: 'Do you want to cancel your changes?',
        negative: {
          title: 'Cancel',
          onClick: function(e: any) {
            console.log('Modal Canceled');
            return resolve(false);
          }
        },
        positive: {
          title: 'OK',
          onClick: function(e: any) {
            console.log('Modal OKayed');
            return resolve(true);
          }
        }
      };
      showDialog(options);
    });

    ///////////////

  }
}

declare var $: any;

function showLoading() {
  // remove existing loaders
  $('.loading-container').remove();
  $('<div id="orrsLoader" class="loading-container"><div><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>').appendTo("body");

  componentHandler.upgradeElements($('.mdl-spinner').get());
  setTimeout(function() {
    $('#orrsLoader').css({
      opacity: 1
    });
  }, 1);
}

function hideLoading() {
  $('#orrsLoader').css({
    opacity: 0
  });
  setTimeout(function() {
    $('#orrsLoader').remove();
  }, 400);
}

function showDialog(options: any) {
  options = $.extend({
    id: 'orrsDiag',
    title: null,
    text: null,
    negative: false,
    positive: false,
    cancelable: true,
    contentStyle: null,
    onLoaded: false
  }, options);

  // remove existing dialogs
  $('.dialog-container').remove();
  $(document).unbind("keyup.dialog");

  $('<div id="' + options.id + '" class="dialog-container"><div class="mdl-card mdl-shadow--16dp"></div></div>').appendTo("body");
  var dialog = $('#orrsDiag');
  var content = dialog.find('.mdl-card');
  if (options.contentStyle != null) content.css(options.contentStyle);
  if (options.title != null) {
    $('<h5>' + options.title + '</h5>').appendTo(content);
  }
  if (options.text != null) {
    $('<p>' + options.text + '</p>').appendTo(content);
  }
  if (options.negative || options.positive) {
    var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
    if (options.negative) {
      options.negative = $.extend({
        id: 'negative',
        title: 'Cancel',
        onClick: function() {
          return false;
        }
      }, options.negative);
      var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.negative.id + '">' + options.negative.title + '</button>');
      negButton.click(function(e: any) {
        e.preventDefault();
        if (!options.negative.onClick(e)) hideDialog(dialog)
      });
      negButton.appendTo(buttonBar);
    }
    if (options.positive) {
      options.positive = $.extend({
        id: 'positive',
        title: 'OK',
        onClick: function() {
          return false;
        }
      }, options.positive);
      var posButton = $('<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="' + options.positive.id + '">' + options.positive.title + '</button>');
      posButton.click(function(e: any) {
        e.preventDefault();
        if (!options.positive.onClick(e)) hideDialog(dialog)
      });
      posButton.appendTo(buttonBar);
    }
    buttonBar.appendTo(content);
  }
  componentHandler.upgradeDom();
  if (options.cancelable) {
    dialog.click(function() {
      hideDialog(dialog);
        return options.negative.onClick();
    });
    $(document).bind("keyup.dialog", function(e: any) {
      if (e.which == 27) {
        hideDialog(dialog);
        return options.negative.onClick();
      }
    });
    content.click(function(e: any) {
      e.stopPropagation();
    });
  }
  setTimeout(function() {
    dialog.css({
      opacity: 1
    });
    if (options.onLoaded) options.onLoaded();
  }, 1);
}

function hideDialog(dialog: any) {
  $(document).unbind("keyup.dialog");
  dialog.css({
    opacity: 0
  });
  setTimeout(function() {
    dialog.remove();
  }, 400);
}