export class AppSettings {
  public serverErrorMessage = 'Error en el servidor. Intenta de nuevo mas tarde 👀'
  public serverErrorMessageSection = 'Error en el servidor al cargar esta seccion. Intenta de nuevo mas tarde 🙈'
  public emptyListMessage (sectionName: string): string {
    return 'No hay ' + sectionName + '. Agrega una nueva 😋'
  }
}
