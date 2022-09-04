$(document).on("scroll", function () {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".fadein-scroll");

    if(pageTop > 0){
        $('nav.navbar').addClass('background');
    }else{
        $('nav.navbar').removeClass('background');

    }
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        if ($(tag).offset().top < pageBottom) {
            $(tag).addClass("visible");
        } 
        // else {
        //     $(tag).removeClass("visible");
        // }
    }
}).on("ready", function () {
    setTimeout(() => {
        $('.fadein-onload').addClass("visible");
    }, 500);
    var navheight = $("nav.navbar").height();
    $("nav.navbar").siblings().each((id, el) => {
        var baseoffset = $(el).offset();
        $(el).offset({top: navheight + baseoffset.top});
    });
});