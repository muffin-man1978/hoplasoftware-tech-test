<template>
  <v-app>
    <v-app-bar app color="primary" dark>{{ $t("barTitle") }}</v-app-bar>
    <v-main>
      <v-container>
        <v-text-field
          id="artistNameTextField"
          v-model="artistName"
          label="Request results from backend"
        ></v-text-field>
        <v-btn @click="getDataFromService()" id="btnSearchBackend"
          >Search</v-btn
        >
        <v-btn
          @click="loadFavorites()"
          id="btnLoadFavorites"
          :key="areThereFavorites"
          v-if="favoritesTotal > 0"
          >Load favorites</v-btn
        >
        <v-data-table
          :headers="headers"
          :items="albums"
          class="elevation1"
          :search="albumSearch"
          :custom-filter="filterAlbums"
          :items-per-page="-1"
        >
          <template v-slot:top>
            <v-text-field
              id="albumSearchTextField"
              v-model="albumSearch"
              label="Search in client data (album name)"
              class="mx-4"
            ></v-text-field>
          </template>
          <template v-slot:item.artworkUrl100="{ item }">
            <img :src="item.artworkUrl100" />
          </template>
          <template v-slot:item.releaseDate="{ item }">
            {{ new Date(item.releaseDate).getFullYear() }}
          </template>
          <template v-slot:item.collectionId="{ item }">
            <favorite
              :collectionId="item.collectionId"
              v-on:new-favorite-event="addNewFavorite(item)"
              v-on:remove-favorite-event="removeFavorite(item)"
            />
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AlbumService from "../src/services/album.service";
import FavoriteService from "../src/services/favorite.service";
import Favorite from "../src/components/Favorite.vue";

export default {
  name: "MainApp",
  components: {
    Favorite,
  },
  data: () => ({
    artistName: "",
    albumSearch: "",
    headers: [
      {
        text: "",
        value: "artworkUrl100",
      },
      {
        text: "Album name",
        value: "collectionName",
        sortable: true,
      },
      {
        text: "Artist name",
        value: "artistName",
        sortable: true,
      },
      {
        text: "Release Year",
        sortable: true,
        value: "releaseDate",
      },
      {
        text: "FAVORITE",
        value: "collectionId",
      },
    ],
    albums: [],
    favoritesLoaded: false,
    favoritesTotal: 0,
  }),
  methods: {
    async getDataFromService() {
      if (this.artistName.length > 0) {
        this.albums = await AlbumService.getAlbumsByName(this.artistName);
        this.favoritesLoaded = false;
      }
    },
    filterAlbums(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        item.collectionName.toLowerCase().includes(search.toLowerCase())
      );
    },
    addNewFavorite(album) {
      FavoriteService.addNewFavorite(album);
      this.favoritesTotal = FavoriteService.totalFavorites();
    },
    removeFavorite(album) {
      FavoriteService.removeFavorite(album);
      this.favoritesTotal = FavoriteService.totalFavorites();
      if (this.favoritesLoaded) {
        this.loadFavorites();
      }
    },
    loadFavorites() {
      this.albums = FavoriteService.getFavorites();
      this.favoritesLoaded = true;
    },
  },
};
</script>
