export interface IProfile {
  id?: number // Don't send to create new profile
  userId?: number // Use: to add new profile
  description: string
  phone?: string
  location_state?: string
  location_country?: string
}
