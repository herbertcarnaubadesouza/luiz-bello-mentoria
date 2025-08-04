// app/[slug]/page.tsx
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface SlugPageProps {
    params: {
        slug: string;
    };
}

export default async function EventSlugPage({ params }: SlugPageProps) {
    const event = await prisma.event.findUnique({
        where: {
            slug: params.slug,
        },
    });

    if (!event) return notFound();

    return (
        <div className="min-h-screen bg-white py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <Image
                    src={event.image || '/placeholder.svg'}
                    alt={event.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <p className="text-gray-700 mb-1">📍 {event.venue}</p>
                <p className="text-gray-500 mb-4">
                    🗓{' '}
                    {event.date.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}
                </p>
                <span className="inline-block bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">
                    {event.category}
                </span>
            </div>
        </div>
    );
}
