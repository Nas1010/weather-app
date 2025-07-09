require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://nasrins-weather-app.vercel.app'
}));


app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const currentData = await currentRes.json();

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
    const forecastData = await forecastRes.json();

    res.json({ current: currentData, forecast: forecastData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
