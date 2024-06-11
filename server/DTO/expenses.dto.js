export class ExpensesDTO {
  constructor(id, title, description, amount, createdAt, user_id, category_id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.createdAt = createdAt;
    this.user_id = user_id; // FK
    this.category_id = category_id; // FK
  }
}
