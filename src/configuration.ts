export default () => ({
  mqtt: {
    url: process.env.MQTT_BROKER_URL,
    port: parseInt(process.env.MQTT_BROKER_PORT) || 1883,
    username: process.env.MQTT_CLIENT_USERNAME,
    password: process.env.MQTT_CLIENT_PASSWORD,
  },

  dbConfig: {
    mongo_url: process.env.MONGO_URL,
  },
});
