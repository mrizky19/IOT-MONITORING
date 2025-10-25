// server.js
const express = require('express');
const cors = require('cors');
const mqtt = require('mqtt');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// --- MQTT Connection ---
const mqttClient = mqtt.connect('mqtt://mqtt-broker:1883'); // sesuai nama service di docker-compose

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient.subscribe('iot/sensor', (err) => {
    if (!err) console.log('Subscribed to topic: iot/sensor');
  });
});

mqttClient.on('message', (topic, message) => {
  console.log(`Message from ${topic}: ${message.toString()}`);
  // nanti bisa kamu simpan ke MongoDB
});

// --- API ---
app.get('/', (req, res) => {
  res.send('Backend running successfully!');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
