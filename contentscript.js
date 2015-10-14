$(document).click(function(e) {
    // BFS the DOM, building a list of lists of the tree by level
    var treeByLevel = [];
    var q = [];
    q.push([0, e.target]);

    while (q.length !== 0) {
        var node = q.pop();
        var level = node[0];
        var element = node[1];

        if (!element) continue;     // leaf node
        treeByLevel[level] = treeByLevel[level] || [];
        treeByLevel[level].push(element);

        for (var i = 0; i < element.children.length; i++) {
            q.push([level+1, element.children[i]]);
        }
    }

    console.log(treeByLevel);

    chrome.runtime.sendMessage({
      from:    'content',
      subject: 'showPageAction'
    });

    /* Listen for message from the popup */
    chrome.runtime.onMessage.addListener(function(msg, sender, response) {
      /* First, validate the message's structure */
      if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
          /* Collect the necessary data
           * (For your specific requirements `document.querySelectorAll(...)`
           *  should be equivalent to jquery's `$(...)`) */
          var domInfo = {
              depth: treeByLevel.length
          };
          /* Directly respond to the sender (popup),
           * through the specified callback */
          response(domInfo);
      }
    });
});
