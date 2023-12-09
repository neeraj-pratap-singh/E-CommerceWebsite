function loadContent() {
    loadExternalHTML('header.html', 'header');
    loadExternalHTML('slider.html', 'slider');
    loadExternalHTML('content.html', 'content');
    loadExternalHTML('footer.html', 'footer');
}

function loadExternalHTML(url, elementId) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.onload = function() {
        if (req.status === 200) {
            document.getElementById(elementId).innerHTML = req.responseText;
        } else {
            console.error(`Error loading ${url}: ${req.statusText}`);
        }
    };
    req.send();
}

window.onload = loadContent;
