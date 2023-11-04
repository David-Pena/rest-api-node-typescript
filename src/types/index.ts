export type BaseRecord<T> = T & {
  id: string;
  createdAt: string;
  updatedAt: string;
}
