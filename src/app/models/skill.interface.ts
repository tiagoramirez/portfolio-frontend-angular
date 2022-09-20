export interface IUserSkills {
  id?: number
  userId?: number
  id_skill: number
  percentage: number
  skill?: ISkill
}

export interface ISkill {
  id: number
  name: string
  type: string
}
