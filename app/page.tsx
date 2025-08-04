import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { EventSearch } from "@/components/event-search"
import { EventGrid } from "@/components/event-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroBanner />
        <div className="container mx-auto px-4 py-8">
          <EventSearch />
          <EventGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
