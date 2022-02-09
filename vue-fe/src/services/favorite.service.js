export default {
    addNewFavorite(album) {
        if (sessionStorage) {
            const existingFavorites = (sessionStorage.getItem(process.env.VUE_APP_SESSION_STORAGE_FAVORITES_NAME)) 
            ? JSON.parse(sessionStorage.getItem(process.env.VUE_APP_SESSION_STORAGE_FAVORITES_NAME)) 
            : [];
            const exists = existingFavorites.filter(item => {
                return item.collectionId === album.collectionId;
            });
            if (exists.length === 0) {
                existingFavorites.push(album);
                sessionStorage.setItem(process.env.VUE_APP_SESSION_STORAGE_FAVORITES_NAME, JSON.stringify(existingFavorites));
            }
        }
    },
    removeFavorite(album) {
        if (sessionStorage) {
            const existing = JSON.parse(sessionStorage.getItem(process.env.VUE_APP_SESSION_STORAGE_FAVORITES_NAME));
            if (existing !== null) {
                const removed = existing.filter(item => {
                    return item.collectionId !== album.collectionId;
                });
                sessionStorage.setItem(process.env.VUE_APP_SESSION_STORAGE_FAVORITES_NAME, JSON.stringify(removed));
            }
        }
    },
    getFavorites() {
        if (sessionStorage) {
            return JSON.parse(sessionStorage.getItem(process.env.VUE_APP_SESSION_STORAGE_FAVORITES_NAME));
        }
    },
    areThereAny() {
        if (sessionStorage) {
            const existing = JSON.parse(sessionStorage.getItem(process.env.VUE_APP_SESSION_STORAGE_FAVORITES_NAME));
            return (existing !== null) ? (existing.length > 0 ? true : false) : false;
        } else {
            return false;
        }
    },
    totalFavorites() {
        if(sessionStorage) {
            if(this.areThereAny()) {
                const existing = JSON.parse(sessionStorage.getItem(process.env.VUE_APP_SESSION_STORAGE_FAVORITES_NAME));
                return existing.length;
            } else {
                return 0;
            }
        }
    }
}