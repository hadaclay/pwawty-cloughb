const yelp = require('yelp-fusion');

exports.handleSearch = async (req, res) => {
  const clientId = process.env.YELP_CLIENT_ID;
  const clientSecret = process.env.YELP_CLIENT_SECRET;

  const tokenRequest = await yelp.accessToken(clientId, clientSecret);
  const token = tokenRequest.jsonBody.access_token;
  const client = yelp.client(token);

  const result = await client.search({ location: 'dallas, tx' });

  res.json(result.jsonBody.businesses[0]);
};
