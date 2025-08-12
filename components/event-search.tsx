import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search } from "lucide-react"

export function EventSearch() {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-gray-600">Eventos em:</span>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="font-medium">Todas as Cidades</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <div className="flex space-x-2 max-w-md">
        <div className="relative flex-1">
          <Input placeholder="Pesquisar Eventos" className="pr-10" />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">PESQUISAR</Button>
      </div>
    </div>
  )
}
