export class Test {

  taskId: string;
  _id: string;
  nom: string;
  type: string;
  resultat_attendu: string;

  constructor(taskId: string, id: string = null, nom: string, type: string, resultat_attendu: string) {
    if ( id !== null ) {
      this._id = id;
    }
    this.taskId = taskId;
    this.nom = nom;
    this.type = type;
    this.resultat_attendu = resultat_attendu;
  }
}
