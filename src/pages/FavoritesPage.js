import React from "react";
import Card from "../components/Card/Card";

const FavoritesPage = ({ favorites, onFavoriteToggle }) => {
    return (
        <div className="App">
            <h1>お気に入りポケモン</h1>
            <div className="pokemonCardContainer">
                {favorites.length > 0 ? (
                    favorites.map((pokemon) => (
                        <Card key={pokemon.id} pokemon={pokemon} onFavoriteToggle={onFavoriteToggle} favorites={favorites} />
                    ))
                ) : (
                    <p>お気に入りのポケモンはいません。</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
