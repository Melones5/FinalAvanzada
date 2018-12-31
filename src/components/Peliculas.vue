<template>

  <div class="movies">
    <div class="row">
      <div class="col s11">
        <div class="pelicula" v-for="peliculapopular in peliculaspopulares" v-if="!peliculapopular.poster_path == ''" :key="peliculapopular.id">
          <div class="col s11 m4">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <a :href="`https://www.themoviedb.org/movie/` + peliculapopular.id" target="_blank">
                  <img :src="'https://image.tmdb.org/t/p/original' + peliculapopular.poster_path" :alt="peliculapopular.title">
                 </a>
                </div>
            <div class="card-content ">
            <span class="card-title activator white-text text-darken-4">{{ peliculapopular.original_title }}<i class="material-icons right">Mas Info</i></span>
            </div>
                <div class="card-reveal">
                  <span class="card-title white-text text-darken-4">{{ peliculapopular.original_title }} - {{ peliculapopular.vote_average }}<i></i><i class="material-icons right">Cerrar</i></span>
                    <p>{{ peliculapopular.overview }}</p>
                    <p>Popularidad:{{peliculapopular.popularity}}</p>
                    <p>Fecha de lanzamiento: {{peliculapopular.release_date}}</p>
                    <p>GENERO:trailer.key</p>

                    </div>
                    <button data-target="modal1" class="btn modal-trigger" v-on:click="GetPeliculaSimilares(peliculapopular.id)">Peliculas Similares</button>
                    <br>
                    <button data-target="modal1" class="btn modal-trigger" v-on:click="GetTrailer(peliculapopular.id)" >Ver Trailer</button>
                    <br>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                     <button type="button" class="btn btn-secondary yellow"  v-on:click="GetIMBD(peliculapopular.id)">IMBD1</button>
                      <button type="button" class="btn btn-secondary blue" v-on:click="GetFacebook(peliculapopular.id)" >Facebook</button>
                      <button type="button" class="btn btn-secondary red" v-on:click="GetInstagram(peliculapopular.id)">Instagram</button>
                      <button type="button" class="btn btn-secondary green" v-on:click="GetTwitter(peliculapopular.id)">Twitter</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  </div>
</template>


<!--FIn de Template><!-->

<script>
export default {
  props: {
    trailer:{type:Array},
    peliculaspopulares: { type: Array, required: true },
    redes:{type:Array},
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
        proximaspeli:[],
        trailer:[],
        redes1:[],
      }
  },
 methods: {
    GetPeliculaSimilares(id) {
      this.$http.get("https://api.themoviedb.org/3/movie/"+id+"/similar?api_key=94f02539d96dfff17116524a372eece7&language=es-ES").then(response => {
        this.peliculaspopulares = response.data.results;
    });
    },
    GetTrailer(id){
       this.$http.get("https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=94f02539d96dfff17116524a372eece7&language=es-ES").then(response => {
        this.trailer= response.data.results;

        if (this.trailer==0){
          alert("NO HAY TRAILER DISPONIBLE")
          console.log(this.trailer)
        }
        else{
          location.href ="https://www.youtube.com/watch?v=" + this.trailer[0].key
          console.log(this.trailer)
        }
        });
    },
    GetIMBD(id) {

      this.$http.get("https://api.themoviedb.org/3/movie/"+id+"/external_ids?api_key=94f02539d96dfff17116524a372eece7&language=es-ES").then(response => {
         this.redes1 = response.data;
         location.href ="https://www.imdb.com/title/"  + this.redes1.imdb_id
         //console.log(this.redes1)
        });
     },
     GetFacebook(id) {

      this.$http.get("https://api.themoviedb.org/3/movie/"+id+"/external_ids?api_key=94f02539d96dfff17116524a372eece7&language=es-ES").then(response => {
         this.redes1 = response.data;
         location.href ="http://facebook.com/"  + this.redes1.facebook_id
         //console.log(this.redes1)
        });
      },
      GetInstagram(id) {

      this.$http.get("https://api.themoviedb.org/3/movie/"+id+"/external_ids?api_key=94f02539d96dfff17116524a372eece7&language=es-ES").then(response => {
         this.redes1 = response.data;
         location.href ="https://www.instagram.com/"  + this.redes1.instagram_id
         //console.log(this.redes1)
        });
      },
        GetTwitter(id) {

        this.$http.get("https://api.themoviedb.org/3/movie/"+id+"/external_ids?api_key=94f02539d96dfff17116524a372eece7&language=es-ES").then(response => {
         this.redes1 = response.data;
         location.href ="https://twitter.com/"  + this.redes1.twitter_id
         //console.log(this.redes1)
        });
        }

}
}

'Declarion de Inicializaciones Javascript de Materialize'


$(document).ready(function(){
    $('.modal').modal();
  });

</script>

<style>
.row {
    background-color:white;
    width:950px;
}

.row2 h2 {
  color:#01d277;
}

.carousel{
  height: 600px;
}
.container .card {
  height: 600px;
  background: black;
}

.container .card-reveal {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
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

.button.btn-group btn btn-secondary{
  width:1022px;
  color:red;
}
</style>


