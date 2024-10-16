// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Verwende entweder die globale Prisma-Instanz oder erstelle eine neue.
const prisma = globalThis.prisma || new PrismaClient();

// In der Entwicklungsumgebung Prisma in globalThis speichern, um wiederholte Instanzen zu vermeiden.
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;