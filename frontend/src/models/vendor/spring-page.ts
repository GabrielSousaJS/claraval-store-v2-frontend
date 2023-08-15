export type SpringPage<T> = {
  content: T[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  first: boolean;
  number: number;
  numberOfElements?: number;
  empty: boolean;
};
