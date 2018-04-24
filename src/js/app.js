import $ from 'jquery';
import moment from 'moment';
import {lory} from 'lory.js';
import tingle from 'tingle.js';
import mlStackNav from 'ml-stack-nav';

const defaults = {
  sortOrder: 'desc'
};

const hoverHandler = function(e) {
  $(e.currentTarget).find('.dropdown-menu').toggleClass('dropdown-show');
};

const bootstrapDropdowns = function() {
  let $toggles = $('.dropdown');
  $toggles.each((idx, el) => {
    $(el).hover(hoverHandler, hoverHandler);
  });
}

const bootstrapModals = function() {
  // instanciate new modal
  $(document).on('click', '.modal-open', (e) => {
    let modalContentId = $(e.currentTarget).data('launch-id');
    let modalContent = $(`#${modalContentId}`);
    debugger;

    var modal = new tingle.modal({
      footer: modalContent.find('#include-footer').data('include-footer'),
      stickyFooter: modalContent.find('#include-footer').data('sticky-footer'),
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: modalContent.find('#include-footer').data('close-label'),
      cssClass: modalContent.find('#css-classes').data('css-classes').split(','),
      onOpen: () => {
        console.log('modal open');
      },
      onClose: () => {
        console.log('modal closed');
      },
      beforeClose: () => {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        // return false; // nothing happens
      }
    });

    // set content
    modal.setContent(modalContent.find('div#content').html());

    // add a button
    modal.addFooterBtn(modalContent.find('#footer-button-label').data('footer-label'), 'tingle-btn tingle-btn--primary', function() {
      // here goes some logic
      modal.close();
    });

    modal.open();
  })

}

const bootstrapSlider = function() {
  //http://meandmax.github.io/lory/
  // EVENTS
  // before.lory.init
  // fires before initialisation (first in setup function)
  // after.lory.init
  // fires after initialisation (end of setup function)
  // before.lory.slide
  // arguments: currentSlide, nextSlide
  // fires before slide change
  // after.lory.slide
  // arguments: currentSlide
  // fires after slide change
  // before.lory.destroy
  // fires before the slider instance gets destroyed
  // after.lory.destroy
  // fires after the slider instance gets destroyed
  // on.lory.resize
  // fires on every resize event
  // on.lory.touchstart
  // fires on every slider touchstart event
  // on.lory.touchmove
  // fires on every slider touchmove event
  // on.lory.touchend
  // fires on every slider touchend event
  // var slider = document.querySelector('.js_slider');

  $('.js_slider').each((idx, slider) => {
    if (slider) {
      lory(slider, {
        // options going here
        // infinite: 4,
        // slidesToScroll: 1,
        // enableMouseEvents: false,
        // rewind: false,
        // slideSpeed: 300,
        // rewindSpeed: 600,
        // snapBackSpeed: 200,
        // initialIndex: 0,
        // ease: 'ease',
        // classNameFrame: 'js_frame',
        // classNameSlideContainer: 'js_slides',
        // classNamePrevCtrl: 'js_prev',
        // classNameNextCtrl: 'js_next',
      });
    }
  });

}

const getEvents = function() {
  return $.get('/events/feed/index.json', (resp)=> {
    buildEventsList(resp.events);
  });
}

const buildEventsList = function(events) {
  let htmlOut = '';
  events.sort((a,b) => {
    return moment(a.eventDate).isBefore(b.eventDate);
  });
  events.forEach((el) => {
    if (moment(el.eventDate).isAfter()) {
      htmlOut += `<div class="row aside-item">
            <div class="bg-accent col-md row middle-md center-md"><i class="material-icons">event_available</i></div>
            <div class="col-md aside-info">
              <a href="${el.permalink}">${el.title}</a>
              ${el.eventDate}
            </div>
          </div>`;
    }
  });

  $('#events-list-injected').html(htmlOut);
}

const bootstrapSorts = function() {
  if (window.location.pathname.includes('events')) {
    $('.sort-button').on('click', (el)=> {
      let sortBy    = $(el.currentTarget).data('sort-by');
      let $wrapper  = $('.current-events-list-container');
      let $nodes    = $wrapper.children('.box');
      let htmlOut   = '';
      let sortOrder = defaults.sortOrder;

      let sorted = $nodes.sort((a,b) => {
        if (sortBy === 'eventDate') {
          if (sortOrder === 'asc') {
            return moment($(a).data(sortBy)).isAfter($(b).data(sortBy));
          } else {
            return moment($(a).data(sortBy)).isBefore($(b).data(sortBy));
          }
        }
        if (sortBy === 'eventTitle') {
          if (sortOrder === 'asc') {
            return $(a).data(sortBy) > $(b).data(sortBy);
          } else {
            return $(a).data(sortBy) < $(b).data(sortBy);
          }
        }
      });

      if (sortOrder === 'asc') {
        defaults.sortOrder = 'desc';
      } else {
        defaults.sortOrder = 'asc';
      }

      sorted.each((idx, evt) => {
        htmlOut += evt.outerHTML;
      });
      $wrapper.html(htmlOut);
    })
  }
}

const bootstrapNav = function () {
  // mobile nav
  // init-attaches to js object
  mlStackNav();
  // consume
  $(".js-ml-stack-nav").mlStackNav();

  // sidenav
  $('.tree-nav .tree-nav-item').on('click', function(e) {
    // actual clicked element
    let target = e.target;

    if (!target.href) {
      // stop it from affecting other nodes
      e.preventDefault();
      e.stopPropagation();


      let sub = $(e.currentTarget).find('>ul.tree-nav-sublist')// || $(e.target).next('ul.tree-nav-sublist');
      if (sub.length > 0) {
        sub.toggleClass('hide');

        // parent li rather then actual el clicked
        $(e.currentTarget).toggleClass('open');
      }
    }

  });
}


bootstrapNav();
bootstrapDropdowns();
bootstrapModals();
bootstrapSorts();
bootstrapSlider();

if ($('#events-list-injected').length > 0) {
  getEvents();
}
