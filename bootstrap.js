import $ from 'jquery';
global.$ = global.jQuery = $;

$.fn.modal = function (className) {
  this['0'].classList.toggle(className);
};
