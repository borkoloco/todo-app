export interface ITodo {
  id: number;
  title: string;
  createdAt: Date;
  status: "pending" | "in-progress" | "complete";
}
