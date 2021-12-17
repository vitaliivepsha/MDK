// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
  require('./assets/templates/layouts/about.html');
  require('./assets/templates/layouts/contacts.html');
  require('./assets/templates/layouts/product.html');
  require('./assets/templates/layouts/reviews.html');
  require('./assets/templates/layouts/blog.html');
  require('./assets/templates/layouts/article.html');
  require('./assets/templates/layouts/fields.html');
  require('./assets/templates/layouts/fields-chosen.html');
  require('./assets/templates/layouts/field.html');
  require('./assets/templates/layouts/404.html');
  require('./assets/templates/layouts/catalog.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Slider = require('_modules/slider');
var Popup = require('_modules/popup');
var Fancy_select = require('_modules/fancyselect');
var Jscrollpane = require('_modules/jscrollpane');
var LightGallery = require('_modules/lightgallery');
var Jslider = require('_modules/jslider');
var Fancybox = require('_modules/fancybox');
//require('../node_modules/sumoselect/jquery.sumoselect.min');
//import PerfectScrollbar from 'perfect-scrollbar';

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
  new Fancy_select();
  new Jscrollpane();
  new LightGallery();
  new Slider();
  new Jslider();
  new Fancybox();

  setTimeout(function() {
    $('body').trigger('scroll');
  }, 100);

    // lazy load
  var lazyload = function() {
    var scroll = $(window).scrollTop() + $(window).height() * 3;

    $('.lazy').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('src', $(this).data('original'));
      }
    });
    $('.lazy-web').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('srcset', $(this).data('original'));
      }
    });
  };
  $(window).scroll(lazyload);

    // upload file

  $(document).on('change', '.input-file input', function() {
    var $file = $(this),
      $label = $file.next('label'),
      $labelText = $label.find('span'),
      labelDefault = $labelText.text(),
      fileName = $file.val().split( '\\' ).pop();
    if ( fileName ) {
      $labelText.text(fileName);
    } else {
      $labelText.text(labelDefault);
    }
  });

    // dropdown

  $('.dropdown').click(function() {
    $(this).closest('.dropdown-wrapper').toggleClass('open').siblings().removeClass('open');
  });

  $(document).click(function() {
    $('.dropdown-wrapper').removeClass('open');
  });

  $(document).on('click', '.dropdown', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.dropdown-list', function(e) {
    e.stopPropagation();
  });

    // catalog filters

  $('.catalog-filter__header').click(function() {
    $(this).closest('.catalog-filter').toggleClass('opened').find('.catalog-filter__body').slideToggle();
  });

  $('.catalog-filters__btn').click(function() {
    $('body').toggleClass('opened-filters');
  });

  $('.mobile-filters__close').click(function() {
    $('body').removeClass('opened-filters');
  });

  // colors tabs

    $('.rocks-section .tabs').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
    });
});


$('.production__wrap .btn-more').click(function() {
  $('.production__list').toggleClass('active');
  $(this).toggleClass('active');
  $(this).find('span').html() == 'Открыть' ? $(this).find('span').html('Закрыть') : $(this).find('span').html('Открыть');
});

$('.header-location-confirm a').click(function() {
  $('.header-location-confirm').css('display', 'none');
});


// header-search
$('.header-search > svg').click(function() {
  $('.header-search').addClass('active');
});

$(document).click(function() {
  $('.header-search').removeClass('active');
});

$(document).on('click', '.header-search', function(e) {
  e.stopPropagation();
});

// mobile menu

var touch = $('.mobile-btn');

var toggles = document.querySelectorAll('.mobile-btn');

for (var i = toggles.length - 1; i >= 0; i--) {
  var toggle = toggles[i];
  toggleHandler(toggle);
}

function toggleHandler(toggle) {
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
  });
}

$(touch).click(function(e) {
  e.preventDefault();
  $('body').toggleClass('menu-opened');
  return false;
});

$(document).on('click', '.mobile-btn', function(e) {
  e.stopPropagation();
});

$(document).on('click', '.mobile-menu', function(e) {
  e.stopPropagation();
});


// mobile menu list

$('.mobile-menu__list .has-children.lvl1 > span').click(function() {
  $('body').addClass('mm-lvl2');
  $(this).next('.mobile-menu__lvl2').addClass('show');
});

$('.mobile-menu__list .menu-back.lvl2').click(function() {
  $('body').removeClass('mm-lvl2');
  $('.mobile-menu__lvl2').removeClass('show');
});

$('.mobile-menu__list .has-children.lvl2 > span').click(function() {
  $('body').addClass('mm-lvl3');
  $(this).next('.mobile-menu__lvl3').addClass('show');
});

$('.mobile-menu__list .menu-back.lvl3').click(function() {
  $('body').removeClass('mm-lvl3');
  $('.mobile-menu__lvl3').removeClass('show');
});


// tabs

$('.tabs').each(function() {
  let tabs = $(this);
  tabs.find('.tabs-content-item').not(':first').hide();
  tabs.find('.tabs-caption-item').click(function() {
    tabs.find('.tabs-caption-item').removeClass('active').eq($(this).index()).addClass('active');
    tabs.find('.tabs-content-item').hide().eq($(this).index()).fadeIn(500);
  }).eq(0).addClass('active');
});


