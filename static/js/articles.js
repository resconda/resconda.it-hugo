window.addEventListener("load", () => {
    document.getElementById("content").querySelectorAll("a").forEach((link) => {
        link.setAttribute("target", "_blank");
    });
});