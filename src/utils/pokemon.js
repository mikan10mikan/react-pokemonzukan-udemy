// 全てのポケモンデータを取得
export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error)); // エラー処理を追加
    });
};

// 特定のポケモンを取得（名前またはIDで）
export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("ポケモンが見つかりませんでした");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                resolve(data);
            })
            .catch((error) => {
                reject(error); // エラーをreject
            });
    });
};
