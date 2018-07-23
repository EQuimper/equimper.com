'use strict'

require('dotenv').config()

const axios = require('axios')

const API_KEY = process.env.MAILCHIMP_API_KEY
const LIST_ID = process.env.MAILCHIMP_LIST_ID

module.exports.subscribe = (event, context, callback) => {
  const url = `https://us12.api.mailchimp.com/3.0/lists/${LIST_ID}/members`

  const body = JSON.parse(event.body)

  if (!body.email || !body.firstName) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing parameters email or firstName',
        success: false,
      }),
    })
  }

  const data = {
    email_address: body.email,
    status: 'subscribed',
    merge_fields: {
      FNAME: body.firstName,
    },
  }

  const headers = {
    Authorization: `apikey ${API_KEY}`,
    'Content-Type': 'application/json',
  }

  axios.default
    .post(url, data, { headers })
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
          message: err.response.data.detail || '',
        }),
      }

      callback(null, response)
    })
}
