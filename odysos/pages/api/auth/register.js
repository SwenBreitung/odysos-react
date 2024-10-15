// pages/api/auth/register.js
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        // Überprüfen, ob alle erforderlichen Felder ausgefüllt sind
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, Email und Passwort sind erforderlich' });
        }

        try {
            // Überprüfen, ob ein Benutzer mit der angegebenen E-Mail bereits existiert
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ message: 'Benutzer existiert bereits' });
            }

            // Passwort hashen
            const hashedPassword = await bcrypt.hash(password, 10);

            // Benutzer erstellen
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            // Erfolgreiche Registrierung
            res.status(201).json({ message: 'Benutzer erfolgreich erstellt', user: newUser });
        } catch (error) {
            console.error('Fehler bei der Registrierung:', error);
            res.status(500).json({ message: 'Serverfehler' });
        }
    } else {
        // Methode ist nicht erlaubt
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Methode ${req.method} ist nicht erlaubt`);
    }
}