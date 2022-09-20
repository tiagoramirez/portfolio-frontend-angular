export interface IPhoto {
  id?: number // Don't send to create new photo
  userId?: number // Use: to add new photo
  photo: File
}
