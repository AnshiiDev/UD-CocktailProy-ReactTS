import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";
import { useMemo } from "react";

export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites); // Para que se actualice cuando cambien los favoritos
  const hasFavorites = useMemo(() => favorites.length, [favorites]);

  return (
    <>
      <h1 className="font-extrabold text-6xl">Favoritos</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-1 gap-10">
          {favorites.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          No hay recetas favoritas para mostrar. Agrega tus bebidas favoritas
          desde la página de recetas para verlas aquí.
        </p>
      )}
    </>
  );
}
