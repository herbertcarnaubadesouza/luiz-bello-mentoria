'use client';

import { useState } from 'react';
import styles from '../../styles/EventSlugPage.module.css';

export default function TicketSelector({
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
