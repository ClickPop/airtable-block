const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
require('dotenv').config();

app.use(bodyparser.json());

const oauth = OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });
  next();
});

app.get('/twitter', async (req, res) => {
  try {
    const { username } = req.query;
    let request_data = {
      url: `https://api.twitter.com/1.1/users/lookup.json?screen_name=${username}`,
      method: 'GET',
    };
    const userRes = await axios.get(request_data.url, {
      headers: oauth.toHeader(oauth.authorize(request_data)),
    });
    request_data.url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=5&tweet_mode=extended`;
    const tweetsRes = await axios.get(request_data.url, {
      headers: oauth.toHeader(oauth.authorize(request_data)),
    });
    return res.json({ user: userRes.data, tweets: tweetsRes.data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
});

app.all('*', async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      return res.send(200);
    }
    const headers = req.headers;
    delete headers.host;
    if (!headers['target-url'])
      return res.status(420).json({ error: 'Invalid target-url header' });
    const url = headers['target-url'];
    const requestConfig = {
      method: req.method.toLowerCase(),
      url,
    };
    if (req.body.length > 0) {
      requestConfig.data = req.body;
    }
    if (req.header('Authorization')) {
      requestConfig.headers = headers;
    }
    const corsRes = await axios(requestConfig);
    return res.send(corsRes.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
