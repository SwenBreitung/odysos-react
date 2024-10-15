// pages/api/auth/login.js
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email und Passwort sind erforderlich' });
        }

        try {
            // Benutzer anhand der E-Mail-Adresse abrufen
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
            }

            // Passwort überprüfen
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
            }

            // Erfolgreiches Login
            res.status(200).json({ message: 'Login erfolgreich', user });
        } catch (error) {
            console.error('Fehler beim Login:', error);
            res.status(500).json({ message: 'Serverfehler' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Methode ${req.method} ist nicht erlaubt`);
    }
}