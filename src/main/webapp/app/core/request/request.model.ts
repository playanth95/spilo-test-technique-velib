export interface Pagination {
  page?: number;
  size?: number;
  sort?: string[];
  rows?: number;
  start?: number;
}

export interface Search {
  query: string;
}

export interface SearchWithPagination extends Search, Pagination {}
