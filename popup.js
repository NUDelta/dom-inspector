/* Update the relevant fields with the new data */
function generateSlider(info) {
    document.getElementById('depth').textContent = info.depth;
    if (info.depth) {
        var depth = parseInt(info.depth);
        $('#slider').slider({
            min: 1,
            max: depth,
            value: depth,
            slide: function(event, ui) {
                $('#level').val(ui.value);
            }
        });
        $('#level').val($('#slider').slider('value'));
    }
}

/* Once the DOM is ready... */
window.addEventListener('DOMContentLoaded', function() {
    /* ...query for the active tab... */
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        /* ...and send a request for the DOM info... */
        chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'DOMInfo'},
                /* ...also specifying a callback to be called
                 *    from the receiving end (content script) */
                generateSlider);
    });
});
