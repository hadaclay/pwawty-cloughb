const yelp = require('yelp-fusion');

exports.renderIndex = (req, res) => {
  res.render('index');
}

exports.handleSearch = async (req, res) => {
  const clientId = process.env.YELP_CLIENT_ID;
  const clientSecret = process.env.YELP_CLIENT_SECRET;

  const search = {
    location: req.query.q,
    categories: 'bars'
  };
  const tokenRequest = await yelp.accessToken(clientId, clientSecret);
  const token = tokenRequest.jsonBody.access_token;
  const client = yelp.client(token);

  const result = await client.search(search);

  res.json(result.jsonBody.businesses);
};
