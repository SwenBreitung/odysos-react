import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error('Fehler beim Abrufen der Benutzer:', error);
      res.status(500).json({ message: 'Fehler beim Abrufen der Benutzer' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Methode ${req.method} ist nicht erlaubt`);
  }
}