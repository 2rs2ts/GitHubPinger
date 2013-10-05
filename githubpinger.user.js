// ==UserScript==
// @name GitHubPinger
// @namespace GitHubPinger
// @description Adds some really janky "messaging" on GitHub.
// @include /^https?://github\.com/[0-9A-Za-z]+$/
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource JQueryUIStyle http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @grant GM_addStyle
// @grant GM_getResourceText
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @version 0.05
// ==/UserScript==

function loadJQueryUIStyle() {
    GM_addStyle(GM_getResourceText("JQueryUIStyle"));
}

function loadGitHubPingerStyle() {
    var styleText = ""+
    "#githubpinger-message-dialog {"+
        "display: table;"+
    "}"+
    "#message-body {"+
        "width: 100%;"+
        "display: inline-block;"+
    "}"+
    ".ui-dialog-buttonset button {"+
        "display: inline-block;"+
    "};";
    GM_addStyle(GM_getResourceText(styleText));
}

function loggedIn() {
    return $('body').hasClass('logged_in');
}

function getUsername() {
    return window.location.pathname.replace('/','');
}

function createMessageDialog() {
    //loadGitHubPingerStyle();
    return $(
        "<div id='githubpinger-message-dialog' class='dialog' title='GitHubPinger'>"+
            "<p>Send a message to: " + getUsername() + "? This will be a real dialog someday!</p>"+
            "<form><input type='text' id='message-body' class='text ui-widget-content'/></form>"+
        "</div>"
    ).dialog({
        height: 400,
        width: 500,
        modal: true,
        autoOpen: false,
        buttons: {
            "Send as gist (polite)": function() {
                sendAsGist($('#message-body').val());
                $(this).dialog("close");
            },
            "Send as PR (annoying)": function() {
                sendAsPR($('#message-body').val());
                $(this).dialog("close");
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });
}

function sendAsGist(message) {
    console.log("Send " + message + " as gist!");
}

function sendAsPR(message) {
    console.log("Send " + message + " as PR! Bad!");
}

function createLoginDialog() {
    return $(
        "<div id='githubpinger-login-dialog' class='dialog' title='Authenticate'>"+
            "<p>Authenticate so you can make more than 60 requests per hour.</p>"+
            "<form><label><input type='text' id='ghp-username' class='text ui-widget-content'/>Username</label>"+
            "<label><input type='password' id='ghp-password' class='text ui-widget-content'/>Password</label></form>"+
        "</div>"
    ).dialog({
        height:400,
        width:500,
        modal:true,
        autoOpen: false,
        buttons: {
            "Stash login": function() {
                // todo: make this secure as soon as you know how to
                GM_setValue("ghpUsername", $('#ghp-username').val());
                GM_setValue("ghpPassword", $('#ghp-password').val());
                $(this).dialog("close");
                $('#githubpinger-message-dialog').dialog('open');
            },
            "Clear stash": function() {
                GM_deleteValue('ghpUsername');
                GM_deleteValue('ghpPassword');
                $(this).dialog("close");
                $('#githubpinger-message-dialog').dialog('open');
            },
            "Pass": function() {
                $(this).dialog("close");
                $('#githubpinger-message-dialog').dialog('open');
            },
            Cancel: function() {
                $(this).dialog("close");
                $('#githubpinger-message-dialog').dialog('open');
            }
        }
    });
}

function clicky() {
    loadJQueryUIStyle();
    createLoginDialog();
    createMessageDialog();
    if (GM_getValue("ghpUsername", "not_logged_in") == "not_logged_in") {
        $('#githubpinger-login-dialog').dialog('open');
    } else {
        $('#githubpinger-message-dialog').dialog('open');
    }
}

function addButton() {
    this.$buttonNode = $('<a>Message</a>');
    $buttonNode.val('href', '');
    $buttonNode.addClass('minibutton');

    $buttonNode.click(clicky);

    $('div .tabnav-right').prepend($buttonNode);
}

function getUsersRepos() {

}

function letsGetPinging() {
    if (loggedIn()) {
        addButton();
    }
}

letsGetPinging();