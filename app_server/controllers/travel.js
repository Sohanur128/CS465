const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const tripsEndpoint = 'http://localhost:3000/api/trips';

module.exports.travel = async function (req, res) {
  try {
    const response = await fetch(tripsEndpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('API request failed');
    }

    const trips = await response.json();

    if (!Array.isArray(trips)) {
      return res.status(500).send('Invalid API response format');
    }

    res.render('travel', {
      title: 'Travlr Getaways',
      trips: trips.length ? trips : []
    });

  } catch (err) {
    console.error('Error fetching trips:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
};
