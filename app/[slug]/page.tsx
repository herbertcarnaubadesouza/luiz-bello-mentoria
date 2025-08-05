'use client';

import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import styles from '../../styles/EventSlugPage.module.css';

export const dynamic = 'force-dynamic';

export default async function EventSlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
        where: { slug },
    });

    if (!event) return notFound();

    const ticketTypes = [
        {
            id: 'pista',
            name: 'PISTA | LOTE 2',
            price: 30,
            fee: 3.9,
        },
        {
            id: 'vip',
            name: 'ÁREA VIP | LOTE 2',
            price: 60,
            fee: 7.8,
        },
        {
            id: 'premium',
            name: 'OPEN BAR PREMIUM | LOTE 3',
            price: 150,
            fee: 19.5,
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Image
                    src={event.image || '/placeholder.svg'}
                    alt={event.title}
                    width={800}
                    height={400}
                    className={styles.image}
                />
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <div className="grid grid-cols-2 text-sm text-gray-700 mb-4 border rounded-lg p-4 bg-gray-50">
                    <div>
                        <p className="font-medium">📍 Local</p>
                        <p>{event.venue}</p>
                    </div>
                    <div>
                        <p className="font-medium">🗓 Data</p>
                        <p>
                            {event.date.toLocaleString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-2">
                    Selecione um ingresso para comprar
                </h2>

                {/* Campo cupom */}
                <div className="flex gap-2 items-center mb-4">
                    <label className="text-sm">Possui algum cupom?</label>
                    <input
                        type="text"
                        placeholder="Seu código"
                        className="border px-3 py-1 rounded text-sm w-full max-w-[200px]"
                    />
                    <button className="bg-[#f97316] text-white text-sm px-3 py-1 rounded">
                        Aplicar
                    </button>
                </div>

                {/* Lista de ingressos */}
                <TicketSelector ticketTypes={ticketTypes} />

                <button className="mt-6 w-full bg-gradient-to-r from-[#fbbf24] via-[#f97316] to-[#c2410c] text-white font-semibold py-3 rounded-full shadow-md hover:brightness-110 transition">
                    Comprar Ingresso
                </button>
            </div>
        </div>
    );
}

// Componente client-side
function TicketSelector({
    ticketTypes,
}: {
    ticketTypes: { id: string; name: string; price: number; fee: number }[];
}) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const increment = (id: string) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const decrement = (id: string) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) - 1),
        }));
    };

    return (
        <div className="space-y-3">
            {ticketTypes.map((ticket) => (
                <div
                    key={ticket.id}
                    className="flex justify-between items-center border rounded-lg px-4 py-3 bg-white shadow-sm"
                >
                    <div>
                        <p className="font-medium text-sm">{ticket.name}</p>
                        <p className="text-sm text-gray-600">
                            R$ {ticket.price.toFixed(2).replace('.', ',')} + R${' '}
                            {ticket.fee.toFixed(2).replace('.', ',')} taxa
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => decrement(ticket.id)}
                            className="text-red-500 text-lg border border-red-500 w-7 h-7 rounded-full flex items-center justify-center"
                        >
                            −
                        </button>
                        <span className="w-4 text-center">
                            {quantities[ticket.id] || 0}
                        </span>
                        <button
                            onClick={() => increment(ticket.id)}
                            className="text-green-600 text-lg border border-green-600 w-7 h-7 rounded-full flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
