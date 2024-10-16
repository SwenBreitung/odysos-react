import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh Token ist erforderlich' });
        }

        try {
            // Refresh Token verifizieren
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            // Benutzer anhand des Refresh Tokens finden
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ message: 'Ungültiger Refresh Token' });
            }

            // Neues Access Token erstellen
            const accessToken = jwt.sign({ userId: user.id, email: user.email },
                process.env.JWT_SECRET, { expiresIn: '15m' }
            );

            res.status(200).json({ accessToken });
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: 'Ungültiger oder abgelaufener Refresh Token' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Methode ${req.method} ist nicht erlaubt`);
    }
}