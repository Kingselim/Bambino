// src/app/Models/Post.Model.ts
export interface Post {
  idPost?: number;
  date: string;
  recipeType: 'Plat' | 'dessert'; // Match backend enum
  nutrition: any | null;
  nblike: number;
  recipe: string;
  nbcomment: number;
  nutritionDescription?: string;
}