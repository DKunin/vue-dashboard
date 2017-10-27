'use strict';

function selectText(element) {
    let text = '';
    if (typeof element === 'string') {
        text = document.querySelector(element);
    } else {
        var newTextNode = document.createElement('span');
        newTextNode.innerText = element.text;
        document.body.appendChild(newTextNode);
        text = newTextNode;
    }
    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNode(text);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    if (typeof element !== 'string') {
        document.body.removeChild(newTextNode);
    }
}

export default selectText;
