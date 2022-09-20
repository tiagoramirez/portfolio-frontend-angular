export interface IBanner {
  id?: number // Don't send to create new banner
  userId?: number // Use: to add new banner
  banner: File
}
