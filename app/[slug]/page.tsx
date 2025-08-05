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

                <h1 className={styles.eventTitle}>{event.title}</h1>

                <div className={styles.gridInfo}>
                    <div>
                        <p className={styles.label}>📍 Local</p>
                        <p>{event.venue}</p>
                    </div>
                    <div>
                        <p className={styles.label}>🗓 Data</p>
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

                <h2 className={styles.label}>
                    Selecione um ingresso para comprar
                </h2>

                {/* Campo cupom */}
                <div className={styles.couponRow}>
                    <label className={styles.label}>Possui algum cupom?</label>
                    <input
                        type="text"
                        placeholder="Seu código"
                        className={styles.input}
                    />
                    <button className={styles.applyBtn}>Aplicar</button>
                </div>

                {/* Lista de ingressos */}
                <TicketSelector ticketTypes={ticketTypes} />

                <button className={styles.buyBtn}>Comprar Ingresso</button>
            </div>
        </div>
    );
}

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
        <div className={styles.ticketList}>
            {ticketTypes.map((ticket) => (
                <div key={ticket.id} className={styles.ticketItem}>
                    <div>
                        <p className={styles.ticketName}>{ticket.name}</p>
                        <p className={styles.ticketPrice}>
                            R$ {ticket.price.toFixed(2).replace('.', ',')} + R${' '}
                            {ticket.fee.toFixed(2).replace('.', ',')} taxa
                        </p>
                    </div>
                    <div className={styles.counter}>
                        <button
                            onClick={() => decrement(ticket.id)}
                            className={`${styles.counterBtn} ${styles.counterBtnMinus}`}
                        >
                            −
                        </button>
                        <span>{quantities[ticket.id] || 0}</span>
                        <button
                            onClick={() => increment(ticket.id)}
                            className={`${styles.counterBtn} ${styles.counterBtnPlus}`}
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
