// ==UserScript==
// @name GitHubPinger
// @namespace GitHubPinger
// @include /^https?://github\.com/[0-9A-Za-z]+$/
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @version 0.03
// ==/UserScript==

function loggedIn() {
    return $('body').hasClass('logged_in');
}

function getUsername() {
    return window.location.pathname.replace('/','');
}

function createDialog() {
    return $(
        "<div id='githubpinger-dialog' title='GitHubPinger'>"+
            "Send a message to: " + getUsername() + "? This will be a real dialog someday!"+
        "</div>"
    ).dialog({
        height: 300,
        modal: true,
        buttons: {
            "Send as gist (polite)": function() {
                //sendAsGist();
                $(this).dialog("Send as gist (polite)");
            },
            "Send as PR (annoying)": function() {
                //sendAsPR();
                $(this).dialog("Send as PR (annoying)");
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });
}

function sendAsGist() {
    console.log("Send as gist!");
}

function sendAsPR() {
    console.log("Send as PR! Bad!");
}

function clicky() {
    createDialog();
}

function addButton() {
    this.$buttonNode = $('<a>Message</a>');
    $buttonNode.val('href', '');
    $buttonNode.addClass('minibutton');

    $buttonNode.click(clicky);

    $('div .tabnav-right').prepend($buttonNode);
}

addButton();