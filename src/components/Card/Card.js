import React from "react";
import "./Card.css";

const Card = ({ pokemon, onFavoriteToggle, favorites }) => {
    // エラーハンドリング: `pokemon` が `undefined` の場合にデフォルト値を設定
    if (!pokemon || !pokemon.sprites || !pokemon.sprites.front_default) {
        return null; // `null` を返してレンダリングしない
    }

    // ⭐️ お気に入り状態を `App.js` の `favorites` から判定
    const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

    return (
        <div className="card">
            {/* ⭐️ お気に入りボタン */}
            <button className="favorite-button" onClick={() => onFavoriteToggle(pokemon)}>
                {isFavorite ? "⭐️" : "☆"}
            </button>

            <div className="carding">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <h3 className="cardName">{pokemon.name}</h3>
            <div className="cardTypes">
                <div>タイプ</div>
                {pokemon.types.map((type) => (
                    <div key={type.type.name}>
                        <span className="typeName">{type.type.name}</span>
                    </div>
                ))}
            </div>
            <div className="cardInfo">
                <div className="cardData">
                    <p className="title">重さ : {pokemon.weight}</p>
                </div>
                <div className="cardData">
                    <p className="title">高さ : {pokemon.height}</p>
                </div>
                <div className="cardData">
                    <p className="title">アビリティ : {pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
