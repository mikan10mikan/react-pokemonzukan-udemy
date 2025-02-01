import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Navber.css";

const Navber = ({ onSearch, onHomeClick }) => {
    const [searchQuery, setSearchQuery] = useState(""); // 検索語の状態
    const [isSearchOpen, setIsSearchOpen] = useState(false); // 検索フォームの表示状態
    const navigate = useNavigate();
    const currentLocation = useLocation(); // 現在のページのURLを取得

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
            setSearchQuery(""); // 検索後に検索欄をクリア
            setIsSearchOpen(false); // 検索後にフォームを閉じる
        }
    };

    // 🏠 **ホームボタン処理**
    const handleHomeClick = () => {
        if (currentLocation.pathname !== "/") {
            navigate("/");
        }
        onHomeClick();
    };

    return (
        <nav>
            <div className="nav-left">
                {/* ホームアイコン */}
                <button className="home-icon" onClick={handleHomeClick}>
                    🏠
                </button>
                {/* お気に入りページ */}
                <Link to="/favorites" className="favorite-icon">⭐️
                </Link>
                <h1>ポケモン図鑑</h1>
            </div>

            {/* 検索ボタンとフォーム */}
            <div className="search-container">
                <button className="search-button" onClick={toggleSearch}>検索</button>
                {isSearchOpen && (
                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="ポケモンを検索"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">検索</button>
                    </form>
                )}
            </div>
        </nav>
    );
};

export default Navber;
