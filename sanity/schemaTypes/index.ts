import { type SchemaTypeDefinition } from 'sanity'
import { user } from './user'
import { contract_worker } from './contract_worker'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, contract_worker],
}
