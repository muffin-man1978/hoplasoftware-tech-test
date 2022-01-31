<template>
  <tr>
      <td>
          <img :src="album.artworkUrl60" />
      </td>
      <td id='collectionId'>{{ album.collectionId }}</td>
      <td>{{ album.collectionName  }}</td>
      <td>{{ album.artistName }}</td>
      <td>{{ onlyYear }}</td>
      <td>{{ album.country }}</td>      
  </tr>
</template>

<script>
export default {
    name: 'CollectionRow',
    props: ['album'],
    computed: {
        onlyYear() {
            const n_date = new Date(this.album.releaseDate);
            return n_date.getFullYear();
        }
    }
}
</script>

<style>

</style>