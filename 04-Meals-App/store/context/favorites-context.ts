import { createContext, FC } from "react";

export interface IFavoritesContext {
  ids: string[];
  addFavorites: (id: string) => void;
  removeFavorites: (id: string) => void;
}

export const FavoritesContext = createContext<IFavoritesContext | null>(null);
