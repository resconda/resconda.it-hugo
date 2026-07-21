window.addEventListener("load", () => {
    document.getElementById("searchTags")?.addEventListener("keyup", (event) => {
        var searchTerm = event.target.value.toLowerCase();
        var items = document.querySelectorAll("ul.cloud li a");
        if(searchTerm.length > 2){
            // loop over all tag items and highlight those matching the search term
            items.forEach(function (item, currentIndex, listObj) {
                let currentValue = item.text.toLowerCase();
                if( currentValue.search(searchTerm) >= 0) {
                    // matches
                    item.classList.add("tag-highlight");
                }else {
                    item.classList.remove("tag-highlight");
                }
            });
        }else{
            // remove highlighting from all items
            items.forEach(function (item, currentIndex, listObj) {
                item.classList.remove("tag-highlight");
            });
        }
    });
});
