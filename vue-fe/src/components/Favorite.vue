<template>
  <div>
    <v-btn icon color="blue" @click="makeFavorite()">
      <v-icon>mdi-star</v-icon>
    </v-btn>
    <v-btn icon color="red" @click="removeFavorite()">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Favorite",
  props: {
    collectionId: {
      default: -1,
    },
  },
  methods: {
    makeFavorite() {
      this.$emit("new-favorite-event", this.collectionId);
    },
    removeFavorite() {
      this.$emit("remove-favorite-event", this.collectionId);
    },
  },
};
</script>

<style>
</style>