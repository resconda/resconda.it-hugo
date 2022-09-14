var scrollUtils = function () {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".fadein-scroll");

    if (pageTop > 0) {
        $('nav.navbar').addClass('background');
    } else {
        $('nav.navbar').removeClass('background');

    }
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
$(document)
.on("scroll", _.throttle(scrollUtils, 100))
.on("ready", function () {
    setTimeout(() => {
        $('.fadein-onload').addClass("visible");
    }, 500);
    var navheight = $("nav.navbar").outerHeight(true);
    $('body').css("padding-top", navheight);
});