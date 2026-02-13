import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import GenerateAI from "./views/GenerateAI";
import { lazy, Suspense } from "react";

const FavoritesPage = lazy(() => import("./views/FavoritesPage"));
const IndexPage = lazy(() => import("./views/IndexPage"));

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback="Cargando...">
                {" "}
                <IndexPage />{" "}
              </Suspense>
            }
            index
          />
          <Route
            path="/favorites"
            element={
              <Suspense fallback="Cargando...">
                <FavoritesPage />
              </Suspense>
            }
          />
          <Route path="/generate-ai" element={<GenerateAI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
