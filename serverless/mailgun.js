'use strict'

require('dotenv').config()

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

const USER_EMAIL = process.env.USER_EMAIL

module.exports.sendEmailToMe = (event, context, callback) => {
  const body = JSON.parse(event.body)

  if (!body.email || !body.subject || !body.message) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing parameters message or subject',
        success: false,
      }),
    })
  }

  const data = {
    from: `${body.name} ${body.email}`,
    to: USER_EMAIL,
    subject: body.subject,
    text: `${body.message} sent from equimper.com`,
  }

  mailgun
    .messages()
    .send(data)
    .then(res => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      }

      callback(null, response)
    })
    .catch(err => {
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: JSON.stringify(err) || '',
        }),
      }

      callback(null, response)
    })
}
