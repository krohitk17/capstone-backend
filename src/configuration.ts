export default () => ({
  mqtt: {
    host: process.env.MQTT_BROKER_HOST,
    port: parseInt(process.env.MQTT_BROKER_PORT) || 1883,
    username: process.env.MQTT_CLIENT_USERNAME,
    password: process.env.MQTT_CLIENT_PASSWORD,
  },
  dbConfig: {
    mongo_url: process.env.MONGO_URL,
  },
  bcryptConfig: {
    salt: parseInt(process.env.BCRYPT_SALT) || 10,
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    timeout: process.env.JWT_TIMEOUT,
  },
});
