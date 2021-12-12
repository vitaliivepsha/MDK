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
$(function () {
    new Forms();
    new Popup();
    new Fancy_select();
    new Jscrollpane();
    new LightGallery();
    new Slider();
    new Jslider();
    new Fancybox();

    setTimeout(function () {
        $('body').trigger('scroll');
    }, 100);

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
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
});


$('.production__wrap span').click(function () {
    $('.production__list').toggleClass('active');
    $('.production__wrap span').toggleClass('active');
})

$('.header-location-confirm a').click(function () {
    $('.header-location-confirm').css('display', 'none');
})


// header-search
$('.header-search > svg').click(function () {
    $('.header-search').addClass('active');
})

$(document).click(function () {
    $('.header-search').removeClass('active');
});

$(document).on("click", '.header-search', function (e) {
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
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
    });
}

$(touch).click(function (e) {
    e.preventDefault();
    $('body').toggleClass('menu-opened');
    return false;
});

$(document).on('click', '.mobile-btn', function (e) {
    e.stopPropagation();
});

$(document).on('click', '.mobile-menu', function (e) {
    e.stopPropagation();
});


// mobile menu list

$('.mobile-menu-list > li.has-children').click(function () {
    $('.mobile-menu-list > li.has-children').removeClass('myShow');
    $(this).addClass('myShow');
    $('.mobile-menu-list > li.has-children > a').addClass('myHide');
    $('.mobile-menu-list > li.no-children').addClass('myHide');
})


// tabs

$('.tabs').each(function () {
    let tabs = $(this);
    tabs.find('.tabs-content-item').not(':first').hide();
    tabs.find('.tabs-caption-item').click(function () {
        tabs.find('.tabs-caption-item').removeClass('active').eq($(this).index()).addClass('active');
        tabs.find('.tabs-content-item').hide().eq($(this).index()).fadeIn(500);
    }).eq(0).addClass('active');
});



