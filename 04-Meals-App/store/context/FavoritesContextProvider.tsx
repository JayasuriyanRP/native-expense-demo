import React, { FC, useState } from "react";
import { FavoritesContext, IFavoritesContext } from "./favorites-context";

interface IFavoritesContextProvider {
  children: React.ReactNode;
}

const FavoritesContextProvider: React.FC<IFavoritesContextProvider> = ({
  children,
}) => {
  const [mealIds, setMealIds] = useState<string[]>([]);

  const handleAddFavorites = (id: string) => {
    setMealIds((previous) => [...previous, id]);
  };
  const handleRemoveFavorites = (id: string) => {
    setMealIds((previous) => previous.filter((x) => x !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{
        ids: mealIds,
        addFavorites: handleAddFavorites,
        removeFavorites: handleRemoveFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
