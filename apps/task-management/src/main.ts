/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as fs from 'fs';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const key = JSON.parse(fs.readFileSync(
    './keys/firebase-admin.json', 'utf8'
  ));
  admin.initializeApp({
    credential: admin.credential.cert(key)
  });

  const app = await NestFactory.create(AppModule,{bodyParser:true, cors: true});
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
