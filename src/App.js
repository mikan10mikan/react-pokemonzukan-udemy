import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navber from "./components/Navbar/Navber.js";
import FavoritesPage from "./pages/FavoritesPage.js"; // お気に入りページを追加

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [isSearching, setIsSearching] = useState(false); // 検索中の状態
  const [favorites, setFavorites] = useState([]); // ⭐️ お気に入りリストを管理

  // ⭐️ **ローカルストレージからお気に入りデータを読み込む**
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // 🔄 **ポケモンデータを取得**
  const fetchPokemonData = async () => {
    setLoading(true);
    let res = await getAllPokemon(initialURL);
    await loadPokemon(res.results);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setLoading(false);
  };

  useEffect(() => {
    if (!isSearching) {
      fetchPokemonData();
    }
  }, [isSearching]);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map((pokemon) => getPokemon(pokemon.url)));
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    if (!nextURL) return;
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  // 🔍 **検索処理**
  const handleSearch = async (query) => {
    setLoading(true);
    setIsSearching(true);
    try {
      const data = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setPokemonData([data]); // 検索結果をセット
    } catch (error) {
      setPokemonData([]);
    }
    setLoading(false);
  };

  // ⭐️ **お気に入りを追加/削除**
  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.some((fav) => fav.id === pokemon.id)) {
        updatedFavorites = prevFavorites.filter((fav) => fav.id !== pokemon.id);
      } else {
        updatedFavorites = [...prevFavorites, pokemon];
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // 🏠 **ホームボタン処理**
  const handleHomeClick = () => {
    if (isSearching) {
      setIsSearching(false);
      fetchPokemonData();
    }
  };

  return (
    <Router>
      <Navber onSearch={handleSearch} onHomeClick={handleHomeClick} />
      <Routes>
        {/* ホーム画面 */}
        <Route
          path="/"
          element={
            <div className="App">
              {loading ? (
                <h1>ロード中・・・</h1>
              ) : (
                <>
                  <div className="pokemonCardContainer">
                    {pokemonData.map((pokemon) => (
                      <Card key={pokemon.id} pokemon={pokemon} onFavoriteToggle={toggleFavorite} favorites={favorites} />
                    ))}
                  </div>
                  {!isSearching && (
                    <div className="btn">
                      <button onClick={handlePrevPage}>前へ</button>
                      <button onClick={handleNextPage}>次へ</button>
                    </div>
                  )}
                </>
              )}
            </div>
          }
        />
        {/* お気に入りページ */}
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} onFavoriteToggle={toggleFavorite} />} />
      </Routes>
    </Router>
  );
}

export default App;
