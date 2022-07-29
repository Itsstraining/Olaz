/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ServiceAccount } from "firebase-admin";
import { AppModule } from './app/app.module';
import * as fs from 'fs';
import * as admin from 'firebase-admin';

async function bootstrap() {
 
  const adminConfig: ServiceAccount = {
    "projectId": 'olaz-backup',
    "privateKey": '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCmsMHB10qrMXAV\nKEPwHM1wqAtoo7Rr+MwpuRF1bsxn96jacIeMUywR2YPR+v+NLBk1EJvYDytKPkVq\n3H4YTWTI1CUpYB1enY5ExFHpl6iVcAoxh/Oh7bboxmQh5WDrIm3mw+xYXJnsQFe9\nl5fnCvHWqr12+1k/eoNMEOoau7cLVZod9ZpVYN59inVU6sLRvJXVXnqZzqnb21dz\n8F0unCx+4FFAmO3Z4A+CC663QXxbp/fdc8lO/NI3bJgx0m2tfDDqxhR8dyG8S6CL\n+sFr6Zpy02q1goAmggxyfOQzu0MFD8GmBBXOpKgbuQhNMCe1qdPJbI4q3WtRxc78\nHRsoB4CrAgMBAAECggEABsfl+eayKOin8JRkvx3M1apgXG9cZZAHbiMTLL3HHuua\nONifCvxPLKK2lBIr1yhWFiyIym9DiY+i70fs8Twkv26x3E8GotSx9uYtlt0OhJW8\nNGudY5bx++ImLKLSIH6UDfEmainKMSwk5ZeHHGT7lYn4jyCGbuii8rM1csT0G0fd\nUbFgkCGN3FhqjUtUa/QnA6Zg1Ipw0NrOOQfwHgoYWvtffqN9rV7szpedPvIii2l7\nVUkdAcN2vakrrlBZI9mYjL4B+ICMng+0PlS73+xzb6cIYDQ1FfqGzH6KChx7GEAp\nWFrRnhFhNdBHkLFTqPeq0LWyiQRtDT3MOnQTdaRhcQKBgQDge+MBGraQGD7g3jxX\nvoAOEw4zhrxkNPE2nhV3CubDK+K1ZD4KW/InV0ZZho+a1+axr6ZQlWxhmlOyymdr\n4fmkHEgv+lsVf/YS+aGhYUnNi7r6P53+NT2tVlg+EIjqFYE6I0bASBTilP9IwBZP\nGKGOCL1ZEwPthCBNm+MhvAzFFQKBgQC+F7sxL7UPzDTVBQAQ4aIH38FZCexO8B8H\nsVm7gcqw2stwQ8Y2kOJd8FkIgl/s45WbkQxvbB+oxpaPCCjNifNvlTU64YHq8+a2\nSFDY66xYUdRCcTo6rL4/UvC+qDxo/2BI2n1if++sQN59M4Vb8iyXJROHacMD4n+H\n4aM5l8gevwKBgQCZ2q7x0dIwHj3yNr6a0LjJbKv+CqlR8Ksl6OEDTthsCcb+1W5k\nATKNXhacQ0pnMPQu8hkF//NhTblxv6F0YlOL88pR/7+vk50e0jLB/YDsvIjw/OsX\nEHxuMdCW8RQ1g3mnVAgovv55cO8qeGSR32rSgxDrXMoDXtwY9O+N7mm+JQKBgGEv\nfNK+01EKVBB8h/YZhV+FNDKzcg9BkHu8XmYRC3GzysLQw6vuEu14DezdyvEvwbNR\nSwxEOUNulFb4EvRSjRUFMbuyw1s96zxSaJMemnRlEaIOhXiuDG4Pl2nCVXBQ8AcP\nPX94bS6h054rEwlZHRcBK6TVm5CG4jC0WWD+ip+9AoGAHa+wT4YQk44N5FqGAWjx\nrqCUdmrEnw5lmArOrBEntXg/dmYsggseKcn+jI9IN75+ZgGyrlQ/+aDqCwvqwPaP\n4ErALgKylo30+6bQ80ZOsXT+ULpr5st3EAW6aC0pusuvY/bQnpGq4tC/i5auxjlD\n2W2BhQGiicET9PR5EFkE1nY=\n-----END PRIVATE KEY-----\n'
      .replace(/\\n/g, '\n'),
    "clientEmail": 'firebase-adminsdk-wh4tm@olaz-backup.iam.gserviceaccount.com',
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  })

  const app = await NestFactory.create(AppModule, { bodyParser: true, cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
