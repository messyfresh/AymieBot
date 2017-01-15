// Stuff not related to commands

const debug = require('debug')('aymiebot:guildHandler')

function guildHandler (client) {
  debug('guildHandler called')
}

/*  This code will print the game each user is currently playing
 let usersArray = client.users.array()
 for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].username === 'messyfresh') {
        debug('messyfresh found!')
        client.fetchUser(usersArray[i].id)
          .then((User) => {
        console.log(User.presence.game)
        })
    }
 }
 */

module.exports.guildHandler = guildHandler
