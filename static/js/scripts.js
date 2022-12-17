var navbarSetBackgroundAccordingToScroll = function(pageTop = null){
    if(!pageTop){
        pageTop = $(document).scrollTop();
    }
    if (pageTop > 0) {
        $('nav.navbar').addClass('background');
    } else if(!$('#navbarNav').hasClass('show')) {
        $('nav.navbar').removeClass('background');
    }
}
var scrollUtils = function () {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".fadein-scroll");

    navbarSetBackgroundAccordingToScroll(pageTop);

    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        if ($(tag).offset().top < pageBottom) {
            $(tag).addClass("visible");
        }
    }
    // home page only
    var peopleWalkingVideo = $('#peopleWalkingVideo');
    if (peopleWalkingVideo.length > 0 ){
        if( 
        peopleWalkingVideo.offset().top < pageBottom && peopleWalkingVideo.offset().top + peopleWalkingVideo.height() > pageTop) {
        peopleWalkingVideo[0].play();
        } else {
            peopleWalkingVideo[0].pause();
        }
    }
};
var offsetBodyPaddingTop = function() {
    var navheight = $("nav.navbar").outerHeight(false);
    $('body').css("padding-top", navheight);
};
$(document)
.on("scroll", _.throttle(scrollUtils, 100))
.on("ready", function () {
    offsetBodyPaddingTop();
    setTimeout(() => {
        $('.fadein-onload').addClass("visible");
    }, 500);
    $("#navBrandLogo").on("load ready", offsetBodyPaddingTop);    
    // friendlyCaptchaSetup();
    $('#siteNavbar')[0].addEventListener('show.bs.collapse', event => {
        navbarSetBackgroundAccordingToScroll(1);
    });
    $('#siteNavbar')[0].addEventListener('hidden.bs.collapse', event => {
        navbarSetBackgroundAccordingToScroll();
    });
});