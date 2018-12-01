export interface ToDoItemInterface {
  id: number;
  title: string;
  description: string;
  created_at: string;
  isEditTitle?: boolean;
  isEditDescription?: boolean;
}
