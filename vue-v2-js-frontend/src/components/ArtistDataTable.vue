<template>
  <div id="artist-data-table-container">
    <v-data-table
      :items="albums"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import AlbumService from "../services/album.service";
const servTest = new AlbumService();

servTest.getAlbumsByArtist().then((see_what) => {
  see_what.json().then((wtf) => {
    console.log(wtf);
  });
});

export default {
  name: "ArtistDataTable",
  data() {
    servTest.getAlbumsByArtist().then((see_what) => {
      see_what.json().then((wtf) => {
        return {
          albums: wtf,
        };
      });
    });
  },
};
</script>

<style>
</style>