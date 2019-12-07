import avatar from '../../img/avatar.png'

const serverBaseUrl =
  'https://f3gb25pq7i.execute-api.us-east-1.amazonaws.com/dev/api'

export const constants = {
  serverBaseUrl,
  image: avatar,
  mailChimpUrl: `${serverBaseUrl}/mailchimp/subscribe`,
  contactMeUrl: `${serverBaseUrl}/contact-me`,

  siteNav: [
    {
      name: 'My Newsletter',
      url: 'https://newsletter.equimper.com'
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Blog',
      url: '/blog',
    },
    {
      name: 'Projects',
      url: '/projects',
    },
    {
      name: 'Contact Me',
      url: '/contact',
    },
  ],
}
