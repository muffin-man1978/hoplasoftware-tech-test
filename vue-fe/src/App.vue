<template>
  <v-app>
    <v-app-bar app color="primary" dark> Tech test </v-app-bar>
    <v-main>
      <v-container>
        <v-text-field
          v-model="artistName"
          label="Request results from backend"
        ></v-text-field>
        <v-btn @click="getDataFromService()">Search</v-btn>
        <v-data-table
          :headers="headers"
          :items="albums"
          class="elevation1"
          :search="albumSearch"
          :custom-filter="filterAlbums"
          :items-per-page=-1
        >
          <template v-slot:top>
            <v-text-field
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
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AlbumService from '../src/services/album.service';

export default {
  name: "App",
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
    ],
    albums: [],
  }),
  methods: {
    async getDataFromService() {
      if(this.artistName.length > 0) {
        this.albums = await AlbumService.getAlbumsByName(this.artistName);
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
  },
};
</script>
