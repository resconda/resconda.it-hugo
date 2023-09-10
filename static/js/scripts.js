const newsletterBannerDismissedCookieName = "newsletterBannerDismissed";
var navbarSetBackgroundAccordingToScroll = function(pageTop = null){
    if(!pageTop){
        pageTop = document.scrollTop;
    }
    if (pageTop > 0) {
        document.querySelector('nav.navbar').classList.add('background');
    } else if(!document.getElementById('navbarNav').classList.contains('show')) {
        document.querySelector('nav.navbar').classList.remove('background');
    }
};
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        // rect.left >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) *0.9
        // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function checkACookieExists(cookieName) {
    if (
        document.cookie.split(";").some((item) => item.trim().startsWith(`${cookieName}=`))
    ) {
        return true;
    }
    return false;
}
var scrollUtils = function () {
    var pageTop = document.body.scrollTop || document.documentElement.scrollTop;
    var pageBottom = pageTop + window.innerHeight;
    var tags = document.getElementsByClassName("fadein-scroll");

    navbarSetBackgroundAccordingToScroll(pageTop);

    for (var i = 0; tags && i < tags.length; i++) {
        var tag = tags[i];
        // var scrollInView = tag.getBoundingClientRect().top;
        // if (scrollInView < pageBottom) {
        if (isInViewport(tag)) {
            // console.log(`[DEBUG] VISIBLE element at ${tag.getBoundingClientRect().top} with content: ${tag.innerHTML}`);
            tag.classList.add("visible");
        }else{
            tag.classList.remove("visible");
        }
    }
    // home page only
    var peopleWalkingVideo = document.getElementById('peopleWalkingVideo');
    if (peopleWalkingVideo && peopleWalkingVideo.length > 0 ){
        if( 
        peopleWalkingVideo.offsetTop < pageBottom && peopleWalkingVideo.offsetTop + peopleWalkingVideo.offsetHeight > pageTop) {
        peopleWalkingVideo[0].play();
        } else {
            peopleWalkingVideo[0].pause();
        }
    }
};
var offsetBodyPaddingTop = function() {
    var navheight = document.querySelector("nav.navbar").offsetHeight;
    document.body.style.paddingTop = `${navheight}px`;
};
var searchPage = function(searchTerm) {
    var XHR = new XMLHttpRequest();
    XHR.addEventListener('load', (event) => {
        var data = JSON.parse(XHR.responseText);
        console.log(data);
    });
    XHR.addEventListener('error', (event) => {
        console.log("searchPage error: " + XHR.responseText);
    });
    XHR.open('GET', `/search?q=${encodeURIComponent(searchTerm)}`);
    XHR.send();
}
document.addEventListener("scroll", _.throttle(scrollUtils, 100));
window.addEventListener("load", () => {
    offsetBodyPaddingTop();
    setTimeout(() => {
        var elements = document.getElementsByClassName('fadein-onload');
        for(var i = 0; i<elements.length; i++) {
            elements[i].classList.add("visible");
        };
    }, 500);
    // document.getElementById("navBrandLogo").addEventListener("load", offsetBodyPaddingTop);
    // document.getElementById("navBrandLogo").addEventListener("ready", offsetBodyPaddingTop);    
    // friendlyCaptchaSetup();
    document.getElementById('siteNavbar').addEventListener('show.bs.collapse', event => {
        navbarSetBackgroundAccordingToScroll(1);
    });
    document.getElementById('siteNavbar').addEventListener('hidden.bs.collapse', event => {
        navbarSetBackgroundAccordingToScroll();
    });
    var newsletterBanner = document.getElementById('newsletter-banner');
    if(newsletterBanner !== undefined){
        newsletterBanner.addEventListener('closed.bs.alert', event => {
            console.log('Newsletter banner closed');
            duration = 7 * 24 * 3600;// 1 week
            document.cookie = newsletterBannerDismissedCookieName + "=1;     max-age=" + duration + ";   Secure;"
        });
        wasDismissed = checkACookieExists(newsletterBannerDismissedCookieName);
        if(!wasDismissed){
            newsletterBanner.classList.remove('d-none');
        }confi
    }
    /// TODO: review this
    document.getElementById('searchButton').addEventListener('click', event => {
        var searchTerm = document.getElementById('searchTerm').value;
        searchPage(searchTerm);
    });
});