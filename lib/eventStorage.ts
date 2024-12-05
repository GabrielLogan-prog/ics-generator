// Simples armazenamento em memória para os eventos
// Em uma aplicação real, você usaria um banco de dados
const eventsStorage = new Map()

// Função para adicionar um evento ao armazenamento
export function addEvent(id: string, eventData: any) {
  eventsStorage.set(id, eventData)
}

// Função para obter um evento do armazenamento
export function getEvent(id: string) {
  return eventsStorage.get(id)
}
