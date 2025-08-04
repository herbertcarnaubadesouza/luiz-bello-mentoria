// prisma/seed.ts
import { PrismaClient } from '../lib/generated/prisma'; // ou '@prisma/client' se for caminho padrão
const prisma = new PrismaClient();

async function main() {
    await prisma.event.createMany({
        data: [
            {
                title: 'Quinta do Pagode com S3',
                slug: 'quinta-do-pagode-com-s3',
                venue: 'Une Bauru',
                date: new Date('2025-08-17T21:00:00Z'),
                image: 'https://d106p58duwuiz5.cloudfront.net/event/cover/ef99f244f137d61d0b344b50fe1e59b3.jpg',
                category: 'QUINTA',
            },
            {
                title: 'Grupo Vibe convida Pagode do Sidão',
                slug: 'grupo-vibe-convida-pagode-do-sidao',
                venue: 'Une Bar',
                date: new Date('2025-08-19T23:00:00Z'),
                image: 'https://d106p58duwuiz5.cloudfront.net/event/cover/14ec35aac910b020f3307a686e4ceca3.png',
                category: 'LIVE',
            },
            {
                title: 'LILI Club || Sexta 18.07 || MC GW',
                slug: 'lili-club-sexta-18-07-mc-gw',
                venue: 'Lili Club',
                date: new Date('2025-08-18T22:00:00Z'),
                image: 'https://d106p58duwuiz5.cloudfront.net/event/cover/5966952d4662614beb5446d3f97c7a00.jpg',
                category: 'FESTA',
            },
        ],
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
    });
