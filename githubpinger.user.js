// ==UserScript==
// @name GitHubPinger
// @namespace GitHubPinger
// @include /^https?://github\.com/[0-9A-Za-z]+$/
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @version 0.03
// ==/UserScript==

function get_username() {
	return window.location.pathname.replace('/','');
}

function clicky() {
	console.log(get_username());
}

function add_button() {
	this.$buttonNode = $('<a>Message</a>');
	$buttonNode.val('href', '#');
	$buttonNode.addClass('minibutton');

	$buttonNode.click(clicky);

	$('div .tabnav-right').prepend($buttonNode);
}

add_button();