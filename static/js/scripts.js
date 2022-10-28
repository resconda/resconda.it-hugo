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
var friendlyCaptchaSetup = function() {
    // Friendly Captcha observer
    // Select the node that will be observed for mutations
    targetNodes = $('.frc-container');

    if(targetNodes.length == 0) return;
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: false, subtree: false };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'attributes') {
                if ($(mutation.target).hasClass('.frc-success')) {
                    $(mutation.target).find('.contactformSubmit').removeAttr('disabled');
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    targetNodes.each((index, targetNode) => {
        observer.observe(targetNode, config);        
    });
}
var friendlyCaptchaSolved = function(solution) {
    $('#contactForm .showtransition').removeClass("invisible");
    $('#friendlyCaptchaFormSubmit').removeAttr('disabled');
}
$(document)
.on("scroll", _.throttle(scrollUtils, 100))
.on("ready", function () {
    setTimeout(() => {
        $('.fadein-onload').addClass("visible");
    }, 500);
    $("#navBrandLogo").on("load", function() {
        var navheight = $("nav.navbar").outerHeight(false);
        $('body').css("padding-top", navheight);    
    });
    
    // friendlyCaptchaSetup();
});