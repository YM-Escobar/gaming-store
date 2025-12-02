import { ReactNode } from "react";

export type Product = {
  color: ReactNode;
  quantity: ReactNode;
  href: string | undefined;
  imageSrc: string | Blob | undefined;
  imageAlt: string | undefined;
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  category?: string;

  genre: string;
  platforms: string[];
  releaseDate: string;
  developer: string;
  image?: string; 
};
