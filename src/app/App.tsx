import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import MainPage from "../pages/MainPage";
import "./App.css";
import SearchHeroPage from "../pages/SearchHeroPage";
// import DoubleRangeSlider from "../features/Filter/ui/AgeFilter";
// import CheckboxFilter from "../features/Filter/ui/CheckboxFilter";
// import LettersFilter from "../features/Filter/ui/LettersFilter";

function App() {
  return (
    <Routes>
      <Route path="/:name?" element={<MainPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/search" element={<SearchHeroPage />} />
      {/* <Route path="/test" element={<LettersFilter />} /> */}
    </Routes>
  );
}

export default App;
