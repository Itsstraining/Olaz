/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adminConfig: ServiceAccount = {
    "projectId": 'olaz-90e43',
    "privateKey": '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCumwd16nCB+KjP\nx5ct0w/5GtedxZ+MXPX2u30nw8hJcieFJzzUkZMq9V4EPWXtg5XGOJzmgOp03yry\nfzsZzzgEmmPKUqsztpmKXv65jRXxNV7ANJUWmOyVB9e4d4OjMn8JTPr7i0nMW8Lj\niOX/wlr3JloaHhRhjU7QWhDJX3SMQs/EHNW3j3E+Vb+I07w528qMz+j7eNq9jg9f\n7C4lyTflJdelDr9HACcPKA+KoW2uPUYo5bG4UMeurp56+uaUPDPmZaBwAp8tPCOP\nHhbXnh9hEUmSMBxku+JQ/rNkT7VQS9YpePR9jXu1bhtzcRmxvtkqrSIFusD+f61c\noOmvJktDAgMBAAECggEAMc7JjwqEc58CUNtHteu6Z74PedMxEzJFe8+6AQjpboIg\n4evyf1TTnXKHEkCNffaGWBg4MczelN5AexJuQouJGE8OXl28trDFFeLJWRb1BmzK\nDZwyV1LiUhT9pYJ6S6iQ8o9CHVV7hM88Rfn8WjwQBOas1zxzZeyQagD3Pup67bN8\nTNtK+HCkAKOlIwrzH27qZKeYa9n+KsbBdjjVP6UhAfA6zAkc4JUG/BAjbUi5nfIc\nlQyQQZMXo3+9nT4Fhl/zFYrq62K3hVhGL05PPuOZT3Dr/krbEaZrka5x7aIs+NLb\naIJYzO450xB1lPQT/PuKV3sP8gW4M4WfjuUPVbrp0QKBgQDmfKMfn8ftPC8GhkcF\no8+L/jUzBMA3Ben/EUwsIU40fsfNrBjxCXD9p3d3PwpBFhDSgRV+TMaDct8Cc+GE\nJxXXGC3VNOC7dEGN4EyiSExz6SdalYmjFummQXNxAxtZ72YNtQpsq9uQRRDrRpq5\nWhkVWZJn98wz7Jz4AW/Td5VDWwKBgQDB7t7QErfUnkMSQTk/wyraCfggdzcjy7r0\nuo2cbrympyJkyL8g8I/dtMTTwqdHc68mJeosWjMJOGHlRkWzKGboS2Pk8XdhHPU5\nKWHG+nIGWgSIuI34ogeRWyxJWT9GrId1gh1rcUBV3+FH0XOenp0bLloDJjAHwqTJ\nClY77oykOQKBgEQ10IS0YZNowzX4GR6nKu3wLkhJ+KSQAH723IcW2DEa8ACDFOKI\ne8Llg6propo+cH4Lq5O0Hu+Z2Du+lZfphUIhqra1Lmjrb9cP8T35jX6kGnxpUtFM\nH5uPNR3V4ItOGPKniE0+0vywI+CtBW8jJdc2qehQ4kLfnFic/D4l3quPAoGAeGL7\nZ/kmqtMv2aYpjr5t3Hpx0F2RGiR/QyqHfAN2EpIQFLZVh3IuLLfps3bTdtSGdsz0\niGHZ6rBYfQZZgDTlZPBf66BFtkBOrhRVQTr5C55X0DOY1i5nOkF5xXKkiA/T6wtB\njg/4mxZmd7m6502ZQ2VLtUbAbCDVQIOtMnkMT2kCgYEA0P7YCCtJya1vE5fju4Vl\nhMy7jA79P6hyV93bfJjnvAqXU1f15ynMpNEd+KlH7/wsVr3MEQdL7suZ2Y/yRDvP\nD0LUsAVrIG9UN9FSI8v6BAQho65OFKzJNDjW+8oeNAVTGWz8KIQaSUQlFhS1AKe6\n0b2iaidwlWZvD6NyNOvhTqM=\n-----END PRIVATE KEY-----\n'
      .replace(/\\n/g, '\n'),
    "clientEmail": 'firebase-adminsdk-966ui@olaz-90e43.iam.gserviceaccount.com',
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  })

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
