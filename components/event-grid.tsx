import { EventCard } from "@/components/event-card"

const events = [
  {
    id: 1,
    title: "Quinta do Pagode com S3",
    venue: "Une Bauru",
    date: "Qui 17 de Jul",
    image: "/placeholder.svg?height=200&width=300",
    category: "QUINTA",
  },
  {
    id: 2,
    title: "Grupo Vibe convida Pagode do Sidão",
    venue: "Une Bar",
    date: "Sáb 19 de Jul",
    image: "/placeholder.svg?height=200&width=300",
    category: "LIVE",
  },
  {
    id: 3,
    title: "LILI Club || Sexta 18.07 || MC GW",
    venue: "Lili Club",
    date: "Sex 18 de Jul",
    image: "/placeholder.svg?height=200&width=300",
    category: "FESTA",
  },
]

export function EventGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
