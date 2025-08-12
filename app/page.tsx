// app/page.tsx
import { EventGrid } from '@/components/event-grid';
import { EventSearch } from '@/components/event-search';
import { HeroBanner } from '@/components/hero-banner';
import { getEvents } from '@/lib/services/get-events';

export default async function Home() {
    const events = await getEvents();

    return (
        <div className="min-h-screen bg-white">
            <main>
                <HeroBanner />
                <div className="container mx-auto px-4 py-8">
                    <EventSearch />
                    <EventGrid events={events} />
                </div>
            </main>
        </div>
    );
}
