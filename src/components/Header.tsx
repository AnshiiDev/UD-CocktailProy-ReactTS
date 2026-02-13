import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import type { SyntheticEvent } from "react";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  //vacío al inicio
  const fetchCategories = useAppStore((state) => state.fetchCategories);

  //trae las categorias
  const categories = useAppStore((state) => state.categories);
  // console.log(categories);

  //trae funcion de búsqueda
  const searchRecipes = useAppStore((state) => state.searchRecipes);

  const showNotification = useAppStore((state) => state.showNotification);
  const hideNotification = useAppStore((state) => state.hideNotification);

  useEffect(() => {
    fetchCategories();
  }, []);

  //manejo de busqueda
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Validar
    // Update: Validado en el front
    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true,
      });
      return;
      setTimeout(() => {
        hideNotification();
      }, 3000);
    }

    //Consultar las recetas
    searchRecipes(searchFilters);
  };

  return (
    <header
      // style={{ backgroundImage: "url('/bg.jpg')" }}

      className={
        isHome ? "bg-[url('/bg.jpg')] bg-center bg-cover" : "bg-slate-800 "
      }
    >
      <div className="mx-auto container px-5 py-16">
        <div className=" flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="Logo" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
            <NavLink
              to="/generate-ai"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Chat IA
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className=" md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingrediente
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full bg-white  rounded-lg focus:outline-none"
                placeholder="Nombre o ingrediente. Ej: Vodka, Tequila, Cafe"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full bg-white  rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">-- Seleccione --</option>
                {/* recorrer el array */}
                {categories.drinks.map((category) => (
                  <option
                    // Llave y valor para cada categoría
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {/* Nombre de la categoria */}
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
}
