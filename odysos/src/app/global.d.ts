// global.d.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Hier erweitern wir das globale Objekt um prisma
  var prisma: PrismaClient | undefined;
}

export {};