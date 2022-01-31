<template>
  <div>
    <input
      type="text"
      v-model="artistName"
      placeholder="INSERT ARTIST NAME (coltrane if empty)"
      size="80"
    />
    <button id="getRecordsButton" @click="getArtistRecords()">GET RECORDS FROM ARTIST</button>
    <div v-if="hasData">      
      <h5>
        Now you can search in the client data, using this text field. It
        searches in the collectionName field (uppercase ignored)
      </h5>
      <input type="text" v-model="artistClientName" @input="filterInClient()" id="artistClientName" />
      <div id="has-artist-data" >
        <h5>Sort ascending-descending by clicking in the field names header</h5>
        <table class="centered">
          <col style="width: 5%;">
          <col style="width: 10%;">
          <col style="width: 50%;">
          <col style="width: 20%;">
          <col style="width: 5%;">
          <col style="width: 10%;">
          <thead class="recordsHead">
            <tr>
              <th>&nbsp;</th>
              <th><a id="order_collectionId" href="#" @click="sortByField('collectionId')">ID</a></th>
              <th><a id="order_collectionName" href="#" @click="sortByField('collectionName')">NAME</a></th>
              <th><a id="order_artistName" href="#" @click="sortByField('artistName')">ARTIST</a></th>
              <th><a id="order_releaseDate" href="#" @click="sortByField('releaseDate')">YEAR</a></th>
              <th><a id="order_country" href="#" @click="sortByField('country')">COUNTRY</a></th>
            </tr>
          </thead>
          <tbody>
          <collectionRow
            v-for="record in musicRecordsFilteredInClient"
            v-bind:key="record.collectionId"
            v-bind:album="record"
          />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionRow from "./CollectionRow.vue";

export default {
  name: "ArtistCollections",
  components: {
    collectionRow: CollectionRow,
  },
  data() {
    return {
      musicRecords: null,
      musicRecordsFilteredInClient: null,
      artistName: "",
      artistClientName: "",
      sorts: {
        collectionId: "ASC",
        collectionName: "ASC",
        artistName: "ASC",
        releaseDate: "ASC",
        country: "ASC",
      },
    };
  },
  methods: {
    getArtistRecords() {
      this.artistName = this.artistName === "" ? "coltrane" : this.artistName; // Coltrane is the best :-D
      const url = "http://localhost:8000/artist_albums/" + this.artistName;
      fetch(url).then((response) => {
        response.json().then((data_r) => {
          this.musicRecords = data_r; // We keep the ones we requested from the API
          this.musicRecordsFilteredInClient = this.musicRecords; // And use these ones for filtering in client
        });
      });
    },
    filterInClient() {
      console.log(this.artistClientName);
      this.musicRecordsFilteredInClient = this.musicRecords.filter((item) =>
        item.collectionName
          .toLowerCase()
          .includes(this.artistClientName.toLowerCase())
      );
    },
    sortByField(fieldName) {
      this.musicRecordsFilteredInClient.sort((item1, item2) => {
        if (this.sorts[fieldName] === "ASC") {
          if (item1[fieldName] < item2[fieldName]) {
            return -1;
          } else {
            return 0;
          }
        } else {
          if (item1[fieldName] > item2[fieldName]) {
            return -1;
          } else {
            return 0;
          }
        }
      });
      this.sorts[fieldName] = (this.sorts[fieldName] === 'ASC') ? 'DESC' : 'ASC';
    }
  },
  computed: {
    hasData() {
      return this.musicRecords === null ? false : true;
    },
  },
};
</script>

<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.centered {
  width: 80%;
  margin: auto;
  border:solid 1px; 
  border-color:black
}

.recordsHead {
  border:solid 2px; 
  border-color:black
}

</style>
