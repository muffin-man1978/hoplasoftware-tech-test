export default {
    addNewFavorite(album) {
        if (sessionStorage) {
            const existingFavorites = (sessionStorage.getItem('techTest.favorites')) ? JSON.parse(sessionStorage.getItem('techTest.favorites')) : [];
            const exists = existingFavorites.filter(item => {
                return item.collectionId === album.collectionId;
            });
            if (exists.length === 0) {
                existingFavorites.push(album);
                sessionStorage.setItem('techTest.favorites', JSON.stringify(existingFavorites));
            }
        }
    },
    removeFavorite(album) {
        if (sessionStorage) {
            const existing = JSON.parse(sessionStorage.getItem('techTest.favorites'));
            if (existing !== null) {
                const removed = existing.filter(item => {
                    return item.collectionId !== album.collectionId;
                });
                sessionStorage.setItem('techTest.favorites', JSON.stringify(removed));
            }
        }
    },
    getFavorites() {
        if (sessionStorage) {
            return JSON.parse(sessionStorage.getItem('techTest.favorites'));
        }
    },
    areThereAny() {
        if (sessionStorage) {
            const existing = JSON.parse(sessionStorage.getItem('techTest.favorites'));
            return (existing !== null) ? (existing.length > 0 ? true : false) : false;
        } else {
            return false;
        }
    },
    totalFavorites() {
        if(sessionStorage) {
            if(this.areThereAny()) {
                const existing = JSON.parse(sessionStorage.getItem('techTest.favorites'));
                return existing.length;
            } else {
                return 0;
            }
        }
    }
}