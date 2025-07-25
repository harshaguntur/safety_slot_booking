import { type SchemaTypeDefinition } from 'sanity'
import { user } from './user'
import { contract_worker } from './contract_worker'
import { slot_booking } from './slotbooking'
import { bookedSlot } from './bookedslots'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, contract_worker, slot_booking, bookedSlot],
}
