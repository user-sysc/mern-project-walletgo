export class CategoryDTO {
  constructor(id, name_category, createdAt, usuario_id) {
    this.id = id;
    this.name_category = name_category;
    this.createdAt = createdAt;
    this.usuario_id = usuario_id; // FK Este campo para representar la relación con el Usuario
  }
}
