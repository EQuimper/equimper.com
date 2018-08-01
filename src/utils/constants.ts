import avatar from '../../img/avatar.png'

const serverBaseUrl =
  'https://f3gb25pq7i.execute-api.us-east-1.amazonaws.com/dev/api'

export const constants = {
  serverBaseUrl,
  image: avatar,
  staticManUrl:
    'https://api.staticman.net/v2/entry/EQuimper/equimper.com/master',
  mailChimpUrl: `${serverBaseUrl}/mailchimp/subscribe`,
  contactMeUrl: `${serverBaseUrl}/contact-me`,
}
