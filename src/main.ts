import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(logger);

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_BROKER_HOST,
      port: parseInt(process.env.MQTT_BROKER_PORT) || 1883,
      username: process.env.MQTT_CLIENT_USERNAME,
      password: process.env.MQTT_CLIENT_PASSWORD,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 5001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
