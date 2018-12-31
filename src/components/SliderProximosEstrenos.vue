<template>

<div class="row">
    <div class="col s12">
      <h1>PROXIMOS ESTRENOS</h1>
        <div class="slider">

        <ul class="slides">
          <li v-for="p in proximaspelis" v-bind:value="p.original_title">
            <a :href="'https://www.themoviedb.org/movie/' + p.id" target="_blank">
              <img :src="'https://image.tmdb.org/t/p/original' + p.backdrop_path" :alt="p.title">
            </a> <!-- random image -->
            <div class="caption center-align">
              <h3>{{p.original_title}}</h3>
              <h5 class="light grey-text text-lighten-3">{{p.overview}}</h5>
            </div>
          </li>
          </ul>
      </div>
    </div>

</div>

</template>

<script>

let proximaspelis1 ="https://api.themoviedb.org/3/movie/upcoming?api_key=94f02539d96dfff17116524a372eece7&language=es-ES";
export default {
  props: {
    trailer:{type:Array},
    proximaspelis: {type: Array, required: true },
    texto:{type:String},
    selected:{type:String},
    verTrailer:{type:String},
    busquedapeliculas: { type: String, required: true },
    show: { type: Boolean, required: true },
    Showerror: { type: Boolean, required: true }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  data() {
      return {
        proximaspelis:[],
      }
  },
  created() {
    this.$http.get(proximaspelis1).then(response => {
         this.proximaspelis = response.data.results;
    });
  },
 methods: {
    inicio() {
      this.$http.get(proximaspelis1).then(response => {
         this.proximaspelis = response.data.results;
      });

      }
}
}


</script>

<style>


.row {
    background-color:white;
    width:1100px;
}

.row2{
  background-color:black;
  width:950px;
  height: 700px;
}


.container .card {
  height: 690px;
  width: 310px;
  background: black;
}




.container .card-reveal {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: black;
  color:white;
}
.row h1{
    color: black;

}

.collection p{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-align: justify;
    color: green;
}

.card {
  font-size:10px;
}
</style>
