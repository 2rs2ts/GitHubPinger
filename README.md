# GitHubPinger

## Just let me send messages, jeez!

GitHubPinger is a userscript that heavy-handedly yet conveniently lets you get your message across to GitHub users who haven't provided another means of contact. Hopefully doing this will cause GitHub to reconsider having removed messages.

### How to use

Install with Scriptish (or Greasemonkey, although I haven't tested it).

Then just navigate yourself to your correspondence's profile page, e.g. `https://github.com/2rs2ts`, and you will see a "Message" button next to the Follow/Unfollow link. Click it, and a terrible dialog that I couldn't get to take to my styles will render. You will be asked to log in, which you shouldn't do because it will enable you to progress to another dialog which will let you type a message to your friend and send it.

Why is this bad? Well, the only way I could think of to send a user a notification is to *fork their repository, make a change, and then issue a pull request*. I think this could violate the ToS, actually. Fingers crossed.

Also, I didn't have time to implement OAuth so your password is stored in Scriptish's stash in plaintext. You can clear it out of the stash whenever you want by pressing the "Clear login stash" button in the message dialog.

### Why are you doing this?

I met someone at HackMIT and forgot to get his email/twitter/what-have-you but I did have his GitHub handle, so I was left wanting of the messaging feature. I knew that I would have to eventually learn Javascript at some point, so, here we are.