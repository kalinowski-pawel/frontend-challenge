export type VolumeInfo = {
  authors: string[];
  categories: string[];
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  pageCount: number;
  publishedDate: string;
  subtitle: string;
  title: string;
}

export type Book = {
  id: string;
  kind: string;
  volumeInfo: VolumeInfo;
}
