const yelp = require('yelp-fusion');
const mongoose = require('mongoose');
const async = require('async');
const Bar = mongoose.model('Bar');

exports.renderIndex = (req, res) => {
  res.render('index', { user: req.user });
}

exports.handleSearch = async (req, res) => {
  const clientId = process.env.YELP_CLIENT_ID;
  const clientSecret = process.env.YELP_CLIENT_SECRET;
  const search = {
    location: req.query.q,
    categories: 'bars' // limit yelp query to bars
  };

  const tokenRequest = await yelp.accessToken(clientId, clientSecret);
  const token = tokenRequest.jsonBody.access_token;
  const client = yelp.client(token);

  const result = await client.search(search);
  const resultJSON = await result.jsonBody.businesses;

  const dbresults = async.each(resultJSON, bar => {
    Bar.findOrCreate({ yelpSlug: bar.id });
  });

  console.log(dbresults);
  res.json(resultJSON);
};
