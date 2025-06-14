const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

module.exports.travel = async function (req, res) {
  try {
    const response = await fetch(tripsEndpoint, options);
    const trips = await response.json();

    if (!Array.isArray(trips)) {
      return res.status(500).send('API lookup error');
    } else if (!trips.length) {
      return res.render('travel', { title: 'Travlr Getaways', trips: [] });
    }

    res.render('travel', { title: 'Travlr Getaways', trips });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
