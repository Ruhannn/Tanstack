export interface Project {
  first: number;
  prev?: number;
  next?: number;
  last: number;
  pages: number;
  items: number;
  data: {
    id: number;
    name: string;
  }[]
}
