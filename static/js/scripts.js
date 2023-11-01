const newsletterBannerDismissedCookieName = "newsletterBannerDismissed";
const picsDisclaimerBannerDismissedCookieName = "picsDisclaimerBannerDismissed";
var navbarSetBackgroundAccordingToScroll = function(pageTop = null){
    if(!pageTop){
        pageTop = document.scrollTop;
    }
    const navBrandLogo = document.getElementById("navBrandLogo");
    if (pageTop > 0) {
        document.querySelector('nav.navbar').classList.add('background');
        // reduce navbar height by reducing navBrandLogo max-width;
        if(navBrandLogo){
            navBrandLogo.classList.add('reduced');
        }
    } else if(!document.getElementById('navbarNav').classList.contains('show')) {
        document.querySelector('nav.navbar').classList.remove('background');
        if (navBrandLogo) {
            navBrandLogo.classList.remove('reduced');
        }
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
var fetchAndSearchPage = function(searchTerm) {
    const resultsElement = document.getElementById("search_results");
    resultsElement.classList.add("d-none");
    for (const child of resultsElement.children) {
        child.remove();
    }
    var XHR = new XMLHttpRequest();
    XHR.addEventListener('load', (event) => {
        var data = JSON.parse(XHR.responseText);
        if(data.Results.length > 0){
            resultsElement.classList.remove("d-none");
            for (let resIdx = 0; resIdx < data.Results.length; resIdx++) {
                const result = data.Results[resIdx];
                const cat = result.DbResult.Category;
                if(cat !== "articles") continue; // we pick articles only, for now
                const title = result.DbResult.Title;
                const summary = result.DbResult.Summary;
                const path = result.DbResult.Path;
                const tagsString = result.Tags.map(tag => {
                    return `<a href="/tags/${tag.toLowerCase()}">${tag}</a>`
                }).join(", ");
                const date = new Date(result.DbResult.Date).toLocaleDateString();
                const newlement = document.createElement('div');
                newlement.classList.add('list-group-item', 'list-group-item-action');
                // newlement.setAttribute("href", path);
                const elementContent = `<a href="${path}"><div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">${title}</h5>
    <small>${date}</small>
    </div>
    <p class="mb-1">${summary}</p></a>
    <small>TAGS: ${tagsString}</small>`;
                newlement.innerHTML = elementContent;
                resultsElement.appendChild(newlement);
            }
        }
        console.log(data);
    });
    XHR.addEventListener('error', (event) => {
        console.log("fetchAndSearchPage error: " + XHR.responseText);
    });
    XHR.open('GET', `/search?q=${encodeURIComponent(searchTerm)}`);
    XHR.send();
}
var renderTableCaptions = function() {
    const elements = document.getElementsByTagName("tablecaption");
    for (let elidx = 0; elidx < elements.length; elidx++) {
        const element = elements[elidx];
        const table = element.getElementsByTagName("table").item(0);
        if(!table) return;
        const data = element.getElementsByTagName("data").item(0);
        if(data){
            const captionString = data.getAttribute("value") || "";
            if(captionString.length>0){
                var captionEl = document.createElement("caption");
                captionEl.innerHTML = captionString;
                table.prepend(captionEl);
            }
        }
    }
};
var handleDisposableBanners = function() {
    const bannerIDsList = [
        {elementId: "newsletter-banner", cookieName: newsletterBannerDismissedCookieName}, 
        {elementId: "picsdisclaimer-banner", cookieName: picsDisclaimerBannerDismissedCookieName},
    ];
    bannerIDsList.forEach(element => {
        const bannerElement = document.getElementById(element.elementId);
        if (bannerElement && bannerElement !== undefined) {
            bannerElement.addEventListener('closed.bs.alert', event => {
                console.log(`${element} closed`);
                duration = 7 * 24 * 3600;// 1 week
                document.cookie = element.cookieName + "=1;     max-age=" + duration + ";   Secure;"
            });
            wasDismissed = checkACookieExists(element.cookieName);
            if (!wasDismissed) {
                bannerElement.classList.remove('d-none');
            }
        }
    });
};
var searchData = undefined;
// const searchResultCollapse = new bootstrap.Collapse("#search_results");
const clearSearchResults = () => {
    const resultsElement = document.getElementById("search_results");
    const resultsInfoElement = document.getElementById("search_results_info");
    
    while (resultsElement.hasChildNodes()) {
        const firstChild = resultsElement.children[0];
        resultsElement.removeChild(firstChild);
    }
    resultsInfoElement.classList.add("d-none");
    resultsInfoElement.innerText = "";
};
const updateSearchResults2 = results => {
    const resultsElement = document.getElementById("search_results");
    const resultsInfoElement = document.getElementById("search_results_info");
    if (results.length > 0) {
        resultsInfoElement.classList.remove('d-none');
        const masculinePlural = results.length > 1 ? "i" : "o";
        resultsInfoElement.innerText = `${results.length} element${masculinePlural} trovat${masculinePlural}`;
        const templateItem = document.getElementById("search_result_template");
        for (let resIdx = 0; resIdx < results.length; resIdx++) {
            const result = results[resIdx];
            const classOjects = searchData.classes;
            const classTags = [];
            if ("Classes" in result) {
                result.Classes.split(", ").forEach(className => {
                    classTags.push(className.toLowerCase());
                });
            }
            const date = new Date(result.PublishDateFormatted).toLocaleDateString();
            const relpermalink = result.RelPermalink;
            const summary = result.Summary;
            const title = result.Title;
            const newElement = templateItem.cloneNode(true);
            const tagelementtemplate = newElement.querySelector(".pill-element-template");
            for (const tag of result.Tags.split(", ")) {
                const newTagElement = tagelementtemplate.cloneNode(true);
                newTagElement.classList.remove("d-none", "pill-element-template");
                newTagElement.setAttribute("href", `/tags/${tag.toLowerCase()}`);
                newTagElement.querySelector("span").innerHTML = tag;
                tagelementtemplate.parentElement.appendChild(newTagElement);
            }

            newElement.removeAttribute("id");
            newElement.getElementsByClassName("search-result-link").item(0).setAttribute("href", relpermalink);
            newElement.getElementsByClassName("search-result-title").item(0).innerHTML = title;
            newElement.getElementsByClassName("search-result-summary").item(0).innerHTML = summary;
            newElement.getElementsByClassName("search-result-date").item(0).innerText = date;

            for(cls of classTags){
                newElement.querySelector(`svg.${cls}`).classList.remove("d-none");
            }
            resultsElement.appendChild(newElement);
            newElement.classList.remove('d-none'); // TODO: make transition
        }
        // searchResultCollapse.show();
    } else {
        resultsInfoElement.innerText = `Nessun elemento trovato`;
        resultsInfoElement.classList.remove("d-none");
    }
}
const updateSearchResults = results => {
    const resultsElement = document.getElementById("search_results");
    const resultsInfoElement = document.getElementById("search_results_info");
    if (results.length > 0) {
        resultsInfoElement.classList.remove('d-none');
        const masculinePlural = results.length > 1 ? "i" : "o";
        resultsInfoElement.innerText = `${results.length} element${masculinePlural} trovat${masculinePlural}`;
        for (let resIdx = 0; resIdx < results.length; resIdx++) {
            const result = results[resIdx];
            const classOjects = searchData.classes;
            const classTags = [];
            if("Classes" in result){
                result.Classes.split(", ").forEach(className => {
                    classElement = document.createElement("span");
                    classElement.innerHTML = classOjects[className.toLowerCase()];
                    classTags.push(classElement);
                });
            }
            const publishdateformatted = new Date(result.PublishDateFormatted).toLocaleDateString();
            const relpermalink = result.RelPermalink;
            const summary = result.Summary;
            const tags = result.Tags.split(", ").map(tagstring => {
                return `<a href="/tags/${tagstring.toLowerCase()}"><span class="badge rounded-pill tag-pill">${tagstring}</span></a>`;
            });
            const title = result.Title;
            
            const newlement = document.createElement('div');
            newlement.classList.add('list-group-item', 'list-group-item-action');
            const elementLinkWrapper = document.createElement('a');
            elementLinkWrapper.setAttribute("href", relpermalink)
            var elementContent = document.createElement('div');
            elementContent.classList.add("d-flex", "w-100", "justify-content-between");
            elementContent.innerHTML = `<h5 class="mb-1 search-result-title">${title}</h5><small>${publishdateformatted}</small>`;
            elementLinkWrapper.appendChild(elementContent);
            
            elementContent = document.createElement('p');
            elementContent.classList.add("mb-1", "search-result-summary");
            elementContent.innerHTML = summary;
            elementLinkWrapper.appendChild(elementContent);

            newlement.appendChild(elementLinkWrapper);

            const elementMetadata = document.createElement('div');
            elementMetadata.classList.add("d-flex", "w-100", "justify-content-between", "align-items-center");
            const tagsColumn = document.createElement('small');
            const tagsColumnLabel = document.createElement('span');
            tagsColumnLabel.classList.add("search-result-tags-label");
            tagsColumnLabel.innerHTML = "TAGS";
            tagsColumn.appendChild(tagsColumnLabel);
            tagsColumn.innerHTML += ": ";
            tagsColumn.innerHTML += tags.join(" ");
            
            elementMetadata.appendChild(tagsColumn);

            const classesColumn = document.createElement('small');
            classTags.forEach(classElement => { classesColumn.appendChild(classElement) });
            elementMetadata.appendChild(classesColumn);

            newlement.appendChild(elementMetadata);
            resultsElement.appendChild(newlement);
        }
        // searchResultCollapse.show();
    } else {
        resultsInfoElement.innerText = `Nessun elemento trovato`;
        resultsInfoElement.classList.remove("d-none");
    }
};
const fetchSearchData = () => {
    const XHR = new XMLHttpRequest();
    XHR.addEventListener('load', (event) => {
        searchData = JSON.parse(XHR.responseText);
    });
    XHR.addEventListener('error', (event) => {
        console.log("fetchSearchData error: " + XHR.responseText);
    });
    XHR.open('GET', `/index.json`);
    XHR.send();
}
const searchSearchData = searchTerm => {
    if(searchData === undefined){
        console.log("[ERROR] Search data unavailable");
        return;
    }
    const matchingArticles = [];
    for(const article of searchData.articles){
        for(const key of ['Summary', 'Title', 'Tags']){
            const value = article[key];
            if(value !== undefined && value.toLowerCase().includes(searchTerm.toLowerCase())){
                matchingArticles.push(article);
                break;
            }
        };
    };
    updateSearchResults2(matchingArticles);
};
const searchFailed = reason => {
    const resultsInfoElement = document.getElementById("search_results_info");
    resultsInfoElement.innerHTML = reason;
    resultsInfoElement.classList.remove('d-none');
};
document.addEventListener("scroll", _.throttle(scrollUtils, 100));
window.addEventListener("load", () => {
    offsetBodyPaddingTop();
    setTimeout(() => {
        var elements = document.getElementsByClassName('fadein-onload');
        for(var i = 0; i<elements.length; i++) {
            elements[i].classList.add("visible");
        };
    }, 500);
    document.getElementById('siteNavbar').addEventListener('show.bs.collapse', event => {
        navbarSetBackgroundAccordingToScroll(1);
    });
    document.getElementById('siteNavbar').addEventListener('hidden.bs.collapse', event => {
        navbarSetBackgroundAccordingToScroll();
    });
    handleDisposableBanners();
    /// TODO: review this
    var triggersearch = () => {
        var searchTerm = document.getElementById('searchTerm').value;
        // if searchTerm is too short don't trigger search
        if(searchTerm.length < 3){
            if(searchTerm.length == 0){
                clearSearchResults();
            }else{
                searchFailed("Termine di ricerca troppo corto");
            }
        }else{
            clearSearchResults();
            setTimeout(() => {
                searchSearchData(searchTerm);
            }, 1000);
        }
    };
    const searchbutton = document.getElementById('searchButton')
    if(searchbutton){
        searchbutton.addEventListener('click', triggersearch);
    }
    const searchInput = document.getElementById('searchTerm');
    const debounced = _.debounce(triggersearch, 1000);
    if(searchInput){
        searchInput.addEventListener('keydown', event => {
            if (event.code === 'Enter') { // return press triggers immediately
                event.preventDefault();
                debounced.cancel();
                triggersearch();
            }else{
                debounced();
            }
        });
    }
    renderTableCaptions();
    fetchSearchData();
});