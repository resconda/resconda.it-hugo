const newsletterBannerDismissedCookieName = "newsletterBannerDismissed";
const picsDisclaimerBannerDismissedCookieName = "picsDisclaimerBannerDismissed";
const resultsElement = () => {
    return document.getElementById("search_results");
};
const resultsInfoElement = () => {
    return document.getElementById("search_results_info");
};
const spinnerLoadingDiv = () => {
    var rie = resultsInfoElement();
    if(rie !== null){
        return rie.querySelector(".spinner-border");
    }else{
        return null;
    }
};
var navbarSetBackgroundAccordingToScroll = function (pageTop = null) {
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
    resultsElement().classList.add("d-none");
    for (const child of resultsElement().children) {
        child.remove();
    }
    var XHR = new XMLHttpRequest();
    XHR.addEventListener('load', (event) => {
        var data = JSON.parse(XHR.responseText);
        if(data.Results.length > 0){
            resultsElement().classList.remove("d-none");
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
                resultsElement().appendChild(newlement);
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
    const elements = document.getElementsByClassName("table-caption");
    for (let elidx = 0; elidx < elements.length; elidx++) {
        const element = elements[elidx];
        const tStyle =  element.getAttribute("style");
        const cClass =  element.getAttribute("caption-class");
        const tClass =  element.getAttribute("table-class");

        const table = element.getElementsByTagName("table").item(0);
        if(!table) return;
        if(tClass){
            table.setAttribute("class", tClass);
        }
        if(tStyle){
            table.style = tStyle;
        }
        const data = element.getElementsByTagName("data").item(0);
        if(data){
            const captionString = data.getAttribute("value") || "";
            if(captionString.length>0){
                var captionEl = document.createElement("caption");
                captionEl.innerHTML = captionString;
                if(cClass){
                    captionEl.setAttribute("class", cClass);
                }
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
    while (resultsElement().hasChildNodes()) {
        const firstChild = resultsElement().children[0];
        resultsElement().removeChild(firstChild);
    }
    resultsInfoElement().querySelector(".info_message").innerText = "";
};
const updateSearchResults2 = results => {

    if (results.length > 0) {
        const masculinePlural = results.length > 1 ? "i" : "o";
        resultsInfoElement().querySelector(".info_message").innerText = `${results.length} element${masculinePlural} trovat${masculinePlural}`;
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
            for (const tag of (result.Tags ? result.Tags.split(", ") : [])) {
                const newTagElement = tagelementtemplate.cloneNode(true);
                newTagElement.classList.remove("d-none", "pill-element-template");
                newTagElement.setAttribute("href", `/tags/${tag.toLowerCase().trim().replace(/\s+/g, "-")}/`);
                newTagElement.querySelector("span").innerHTML = tag;
                tagelementtemplate.parentElement.appendChild(newTagElement);
            }

            newElement.removeAttribute("id");
            newElement.getElementsByClassName("search-result-link").item(0).setAttribute("href", relpermalink);
            newElement.getElementsByClassName("search-result-title").item(0).innerHTML = title;
            newElement.getElementsByClassName("search-result-summary").item(0).innerHTML = result._snippet || summary;
            newElement.getElementsByClassName("search-result-date").item(0).innerText = date;

            for(cls of classTags){
                newElement.querySelector(`svg.${cls}`).classList.remove("d-none");
            }
            resultsElement().appendChild(newElement);
            newElement.classList.remove('d-none'); // TODO: make transition
        }
    } else {
        resultsInfoElement().querySelector(".info_message").innerText = `Nessun elemento trovato`;
    }
}

const fetchSearchData = () => {
    const XHR = new XMLHttpRequest();
    XHR.addEventListener('load', (event) => {
        searchData = JSON.parse(XHR.responseText);
        // ricerca arrivata dalla casella nel menu: /articles/?q=termine
        const query = new URLSearchParams(window.location.search).get('q');
        const searchInput = document.getElementById('searchTerm');
        if (query && searchInput) {
            searchInput.value = query;
            if (query.length >= 3) {
                clearSearchResults();
                searchSearchData(query);
            }
        }
    });
    XHR.addEventListener('error', (event) => {
        console.log("fetchSearchData error: " + XHR.responseText);
    });
    XHR.open('GET', `/index.json`);
    XHR.send();
}
// --- Ricerca nella pagina News -------------------------------------------------
// Cerca in titolo, tag, riassunto e nel testo completo delle pillole.
// Il testo completo (search-text.json, ~280 KB compressi) si scarica solo alla prima ricerca.
// Più parole = devono esserci tutte; maiuscole e accenti non contano ("citta" trova "città").
var searchTexts = undefined;
var searchTextsPromise = undefined;
const loadSearchTexts = () => {
    if (!searchTextsPromise) {
        searchTextsPromise = fetch('/search-text.json')
            .then(r => r.ok ? r.json() : {})
            .then(d => { searchTexts = d; })
            .catch(() => { searchTexts = {}; });
    }
    return searchTextsPromise;
};
const normalizeForSearch = s => (s || '').normalize('NFC').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’‘]/g, "'");
const stripHtml = s => { const d = document.createElement('div'); d.innerHTML = s || ''; return d.textContent || ''; };
const escapeHtml = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// estratto del testo intorno alla prima parola trovata, con le parole evidenziate
// la parola cercata deve essere l'inizio di una parola del testo ("bari" trova "Bari", non "barili")
const wordRegex = (w, flags) => new RegExp('(^|[^a-z0-9])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
const findWord = (n, w, from) => { const re = wordRegex(w, 'g'); re.lastIndex = from || 0; const m = re.exec(n); return m ? m.index + m[1].length : -1; };
const countWord = (n, w) => (n.match(wordRegex(w, 'g')) || []).length;
// estratto del testo intorno alla prima parola trovata, con le parole evidenziate
const makeSnippet = (text, words) => {
    const t = text.normalize('NFC');
    const n = normalizeForSearch(t);
    if (n.length !== t.length) return '';               // per sicurezza: posizioni non allineabili
    let first = -1;
    for (const w of words) { const i = findWord(n, w); if (i >= 0 && (first < 0 || i < first)) first = i; }
    if (first < 0) return '';
    let start = Math.max(0, first - 90), end = Math.min(t.length, first + 170);
    if (start > 0) { const sp = t.indexOf(' ', start); if (sp > 0 && sp < first) start = sp + 1; }
    if (end < t.length) { const sp = t.lastIndexOf(' ', end); if (sp > first) end = sp; }
    const seg = t.slice(start, end), segN = n.slice(start, end);
    const marks = [];
    for (const w of words) { let i = findWord(segN, w); while (i >= 0) { marks.push([i, i + w.length]); i = findWord(segN, w, i + w.length); } }
    marks.sort((a, b) => a[0] - b[0]);
    let out = '', pos = 0;
    for (const [a, b] of marks) { if (a < pos) continue; out += escapeHtml(seg.slice(pos, a)) + '<mark>' + escapeHtml(seg.slice(a, b)) + '</mark>'; pos = b; }
    out += escapeHtml(seg.slice(pos));
    return (start > 0 ? '… ' : '') + out + (end < t.length ? ' …' : '');
};
const searchSearchData = async searchTerm => {
    if(searchData === undefined){
        spinnerLoadingDiv().classList.add("d-none");
        console.log("[ERROR] Search data unavailable");
        return;
    }
    spinnerLoadingDiv().classList.remove("d-none");
    await loadSearchTexts();
    spinnerLoadingDiv().classList.add("d-none");
    const words = normalizeForSearch(searchTerm).split(/\s+/).filter(w => w.length >= 2);
    if (!words.length) { updateSearchResults2([]); return; }
    const matchingArticles = [];
    for (const article of searchData.articles) {
        const title = normalizeForSearch(article.Title);
        const tags = normalizeForSearch(article.Tags);
        const summary = normalizeForSearch(stripHtml(article.Summary));
        const rawText = (searchTexts && searchTexts[article.RelPermalink]) || '';
        const text = normalizeForSearch(rawText);
        let score = 0, everyWord = true, onlyInText = true;
        for (const w of words) {
            const inTitle = findWord(title, w) >= 0, inTags = findWord(tags, w) >= 0, inSummary = findWord(summary, w) >= 0;
            const count = countWord(text, w);
            if (!inTitle && !inTags && !inSummary && count === 0) { everyWord = false; break; }
            if (inTitle || inTags || inSummary) onlyInText = false;
            score += (inTitle ? 10 : 0) + (inTags ? 5 : 0) + (inSummary ? 3 : 0) + Math.min(count, 5);
        }
        if (!everyWord) continue;
        const result = Object.assign({}, article, { _score: score });
        if (onlyInText) result._snippet = makeSnippet(rawText, words);
        matchingArticles.push(result);
    }
    matchingArticles.sort((a, b) => (b._score - a._score) || (b.PublishDateFormatted > a.PublishDateFormatted ? 1 : -1));
    updateSearchResults2(matchingArticles);
};
const searchFailed = reason => {
    resultsInfoElement().querySelector(".info_message").innerHTML = reason;
};
const enableSocialShareButtons = () => {
    document.querySelectorAll(".share-toggle-button").forEach((button) => {
        const target = button.getAttribute("data-target");
        if(!target) return;
        button.addEventListener("click", () => {
            document.getElementById(target.replace(/^#/, ""))?.classList.toggle("d-none");
        });
        button.addEventListener("pointerenter", () => {
            document.getElementById(target.replace(/^#/, ""))?.classList.remove("d-none");
        })
    });
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
            resultsInfoElement().querySelector(".spinner-border").classList.add("d-none");
            if(searchTerm.length == 0){
                clearSearchResults();
            }else{
                searchFailed("Termine di ricerca troppo corto");
            }
        }else{
            clearSearchResults();
            searchSearchData(searchTerm);
            // setTimeout(() => {
            //     searchSearchData(searchTerm);
            // }, 1000);
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
            spinnerLoadingDiv().classList.remove('d-none');
            if (event.code === 'Enter') { // return press triggers immediately
                event.preventDefault();
                debounced.cancel();
                triggersearch();
            } else {
                var toIgnore = false;
                const excludeRegexes = [/Escape/, /Tab/, /Control/, /Shift/, /Alt/, 
                    /CapsLock/, /F[0-9]+/, /Pause/, /ScrollLock/, /PrintScreen/, /KanaMode/, 
                    /Lang[0-9]/, /Intl/, /(Non)?Convert/, /Media/, /Volume/, 
                    /Home/, /NumLock/, /Arrow/, /End/, /Page/, /Delete/, /Meta/, 
                    /ContextMenu/, /Browser/, /Launch/, /Power/, /Unidentified/
                ];
                for (const regex of excludeRegexes) {
                    if(event.code !== undefined && event.code.match(regex)){
                        toIgnore = true;
                        console.log("Ignored key code: " + event.code)
                        break;
                    }
                }
                if(!toIgnore){
                    debounced();
                }else{
                    spinnerLoadingDiv().classList.add('d-none');
                }
            }
        });
    }
    renderTableCaptions();
    fetchSearchData();
    enableSocialShareButtons();
});