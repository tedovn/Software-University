'use strict';

$(function() {

    //settings for slider
    var width = 720; 
    var animationSpeed = 1000;
    var pause = 5000;
    var currentSlide = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);

    var interval;

    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, pause);
    }
    function pauseSlider() {
        clearInterval(interval);
    }

    function slideLeft () {
        $slideContainer.animate({'margin-left': '-=' + width}, animationSpeed, function() {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
                pause = 5000;
            });
    }

    function slideRight () {
        $slideContainer.animate({'margin-left': '+=' + width}, animationSpeed, function() {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
                pause = 5000;
            });
    }
    $slideContainer
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);
    $('#prev').on('click', slideLeft);
    $('#next').on('click', slideRight);

    startSlider();


});
