// global.d.ts
import { PrismaClient } from '@prisma/client';

// Die ESLint-Regel für var deaktivieren
/* eslint-disable no-var */
// declare global {
//   namespace NodeJS {
//     interface Global {
//       prisma: PrismaClient | undefined;
//     }
//   }
// }
// global.d.ts
import { PrismaClient } from '@prisma/client';

// Die ESLint-Regel für var deaktivieren
/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined; // Prisma direkt auf globalThis deklarieren
}
/* eslint-enable no-var */

export {};
/* eslint-enable no-var */

export {};