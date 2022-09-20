/* eslint-disable @typescript-eslint/no-extraneous-class */
export class AppSettings {
  public static serverErrorMessage = 'Error en el servidor. Intenta de nuevo mas tarde 👀'
  public static serverErrorMessageSection = 'Error en el servidor al cargar esta seccion. Intenta de nuevo mas tarde 🙈'
  public static emptyListMessage (sectionName: string): string {
    return 'No hay ' + sectionName + '. Agrega una nueva 😋'
  }
}
