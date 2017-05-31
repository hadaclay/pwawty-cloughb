const yelp = require('yelp-fusion');
const mongoose = require('mongoose');
const async = require('async');
const Bar = mongoose.model('Bar');
const User = mongoose.model('User');

exports.renderIndex = (req, res) => {
  res.render('index', { user: req.user });
};

exports.handleSearch = async (req, res) => {
  const clientId = process.env.YELP_CLIENT_ID;
  const clientSecret = process.env.YELP_CLIENT_SECRET;

  // set up Yelp query
  const search = {
    location: req.query.q,
    categories: 'bars' // limit query to bars
  };

  const tokenRequest = await yelp.accessToken(clientId, clientSecret);
  const token = tokenRequest.jsonBody.access_token;
  const client = yelp.client(token);

  const yelpResult = await client.search(search);
  const yelpResultJSON = await yelpResult.jsonBody.businesses;

  const promises = yelpResultJSON.map(async bar => {
    const barDoc = await Bar.findOrCreate({ yelpSlug: bar.id });
    bar.amountGoing = barDoc.doc.usersGoing.length;
    bar._id = barDoc.doc.id;
  });
  await Promise.all(promises);

  res.json(yelpResultJSON);
};

exports.addGoing = async (req, res) => {
  // 1. Get all bars user has marked
  const bars = req.user.going.map(obj => obj.toString());
  // 2. Determine if request is adding to or removing bar from set
  const operator = bars.includes(req.params.id) ? '$pull' : '$addToSet';
  const bar = await Bar.findByIdAndUpdate(
    req.params.id,
    { [operator]: { usersGoing: req.user.id } },
    { new: true }
  );
  const user = await User.findOneAndUpdate(
    { userID: req.user.userID },
    { [operator]: { going: await bar._id } }
  );

  res.sendStatus(200);
};