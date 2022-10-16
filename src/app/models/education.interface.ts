export interface IEducation {
    id?: number
    userId?: number
    type: string
    title_name: string
    institute_name: string
    isActual: boolean
    start_date: Date
    end_date: Date
    description?: string
    startMonth?: number
    startYear?: number
    endMonth?: number
    endYear?: number
}
