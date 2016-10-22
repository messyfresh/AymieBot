// Insults and helpers
var util = require('./util')

// Courtesy of okilubb
var ebi = [
  'Have you fallen off a mountain today?',
  'Did you get gold dps yet?',
  'Have you missed an LB today?',
  'Don\'t forget to change your batteries!',
  'WORDS WORDS WORDS!',
  'Is that like a trebushet?  Because you know, it\'s trebuchet.',
  'Wow, at least you\'re saying more than just "Look!"',
  'Do they have that at Chili\'s?',
  'Let me guess, you\'re really AFK...',
  'Remember that time you fell off of a mountain and lost all your stuff?',
  'Congrats on getting that gold medal for damage! ... Oh wait ... Nevermind.',
  'The department of SCIENCE! has denied your request for WORDS WORDS WORDS!',
  'Make sure your batteries are charged.',
  'What\'s new at Chili\'s?'
]

// Insults shamelessly stolen from http://www.thetoptens.com/best-insults/
// Mention placeholder is $mention
var generic = [
  'Shut up $mention, you\'ll never be the man your mother is.',
  '$mention must have been born on a highway, because that\'s where most accidents happen.',
  '$mentions\'s family tree is a cactus, because everybody on it is a prick.',
  '$mention is so ugly, Hello Kitty said goodbye to them.',
  'It looks like $mention\'s face caught on fire, and someone tried to put it out with a fork.',
  '$mention\'s so ugly that when their mama dropped them off at school she got a fine for littering.',
  'If $mention were twice as smart, they\'d still be stupid.',
  '$mention, do you have to leave so soon? I was just about to poison the tea.',
  '$mention, you\'re so ugly when you popped out the doctor said "Aww, What a treasure" and your mom said "Yeah, let\'s bury it."',
  '$mention, you clearly have not been burdened by an overabundance of education.',
  'Oh $mention, the most insulting thing I can do is quote you.',
  'Why play so hard to get, $mention, when you\'re already so hard to want.',
  'Sounds like a personal problem, $mention.',
  'Oh $mention, I love how you state the obvious with such a sense of discovery.',
  'Your mother was a hamster, and your father smelt of elderberries! I fart in your general direction.',
  'How nice, $mention! Do you have any crayons? I\'d love to see you express yourself further.',
  'Somewhere a tree is making oxygen for you, $mention. Go and apologize to it.',
  'Why don\'t you slip into something more comfortable, $mention, like a coma.',
  'Your IQ does not even make a respectable earthquake, $mention.',
  '$mention can compress the most words into the smallest idea of anyone I know.',
  'I treasure the time I don\'t spend with you, $mention.',
  'If you were any less intelligent, $mention, you would have to be watered twice a day.',
  'I\'ve been called worse things by better people.',
  '$mention, you use statistics like a drunk uses a lamp post; for support rather than illumination.',
  'I\'d challenge you to a battle of wits, $mention, but I see you\'re unarmed.',
  'I can explain it to you, $mention, but I can\'t understand it for you.',
  '$mention, you couldn\'t pour water out of a boot if the instructions were on the sole.',
  'I\'d agree with you, $mention, but then we\'d both be wrong.'
]

// Generate an insult
// TODO change arguments into a context so not all arguments are required to be passed
function genInsult (insultList, mentions, callback) {
  util.randomInt(0, insultList.length, function (result) {
    var mentionedInsult = insultList[result].replace('$mention', mentions)
    callback(mentionedInsult)
  })
}

// Export all the things
module.exports.ebi = ebi
module.exports.generic = generic
module.exports.genInsult = genInsult

module.exports = {
  ebi: ebi,
  generic: generic,
  genInsult: genInsult
}
