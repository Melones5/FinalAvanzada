<template>
  <div class="paginaprincipal">
    <div class="container">
      <header>
        <nav class="nav-extended" >
          <div class="nav-wrapper">
          <div class="row">
                <div class="col push-m4 push-s10">
                    <img src="../assets/logo5.png" alt="">
                </div>
              </div>
          </div>

            <div class="nav-content ">
              <ul class="tabs tabs-transparent">
                  <li class="tab" ><a class="active" v-on:click="inicio()">Inicio</a></li>
                  <li class="tab" ><a class="active" v-on:click="GetPopularMovies()"> Mas Populares</a></li>
                  <li class="tab"><a v-on:click="GetPeliculasMasVotadas()" class="active">Mas Votadas</a></li>


                  <select  class="col-sm-2 form-control form-control-lg" v-model="selected"  v-on:click="getMoviesForGenere">
                    <option v-for="g in genres" v-bind:value="g.value" v-on:click="getMoviesForGenere">{{g.name}} </option>
                    </select>

                </ul>
              </div>

            <div class="input-field" id=hola>
                <input type="text" @keyup.prevent="buscarPeliculas()" v-model="busquedapeliculas" placeholder="Busca acá una pelicula/s">
              </div>


          </nav>
      </header>

        <!-- TODO: Creacion de Componentes  -->

        <!-- TODO: compnente peliculas es el componente hijo llamado aca en el Componente main o principal -->
        <Peliculas :peliculaspopulares=peliculaspopulares
                :busquedapeliculas=busquedapeliculas
                :show=show
                :Showerror=Showerror>
        </Peliculas>

        <!-- TODO: Componente hijo de mensajes de error -->
        <MensajedeError :Showerror=Showerror
                       :mensajedeerror=mensajedeerror>
        </MensajedeError>

        <!-- TODO: Componente hijo del Slider de proximos estrenos -->
        <SliderProximosEstrenos :proximaspelis=proximaspelis >
        </SliderProximosEstrenos>

      </div>

       <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l12 m12 s12">
                <h5 class="black-text">Api-Rest Peliculas The Movie Database</h5>
                <p class="black-text">Figueroa Daniel - Santos Alexis - Programacion Avanzada - Uader</p>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
              <div class="container">
              © 2018 UADER FCYT
              <a class="grey-text text-lighten-4 right" href="https://www.themoviedb.org/?language=es">Pagina de TMDB</a>
              </div>
            </div>
            </footer>
    </div>
</template>
<!--Fin de Template><!-->

<script>
'Inicializcion de componentes JavaScript de MaterializeCSS'

$(document).ready(function(){
  $('.slider').slider();
})


import MensajedeError from "./MensajedeError";
import Peliculas from "./Peliculas";
import SliderProximosEstrenos from "./SliderProximosEstrenos";

//  TODO:Si las declaramos con var, tienen un scope local.
//  TODO:Si las declaramos con let o const, tienen un scope de bloque.

let apiPopulares ="https://api.themoviedb.org/3/movie/popular?api_key=94f02539d96dfff17116524a372eece7&language=es-ES";

let apitop ="https://api.themoviedb.org/3/movie/top_rated?api_key=94f02539d96dfff17116524a372eece7&language=es-ES";

let inicio= "https://api.themoviedb.org/3/movie/now_playing?api_key=94f02539d96dfff17116524a372eece7&language=es-ES&page=1";

let trailer = "https://api.themoviedb.org/3/movie/353081/videos?api_key=94f02539d96dfff17116524a372eece7&language=es-ES";

let proximaspelis1 ="https://api.themoviedb.org/3/movie/upcoming?api_key=94f02539d96dfff17116524a372eece7&language=es-ES";

export default {
  name: "PaginaPrincipal",
  data() {
    return {
      peliculaspopulares:[],           //TODO:array de peliculas populares
      proximaspelis:[],
      redes:[],
      trailer:[],
      selected: '1',
      busquedapeliculas: "",            //TODO:
      busquedapeliculastop: "",
      show: true,                       //TODO:
      películanoencontrada: false,      //TODO: boolean peliculanoencontrada
      mensajedeerror: "",               //TODO: mensaje de error en caso de que exista la pelicula o no
      Showerror: false,                  //TODO: boolean para mostrar el mensaje o no
      genres: [
   { name: "Genero", value: '1' },
   { name: "Accion", value: '28' },
   { name: "Animada", value: '16' },
   { name: "Fantasia", value: '14' },
   { name: "Drama", value: '18' },
   { name: "Guerra", value: '10752' },
   { name: "Romance", value: '10749' },
   { name: "Comedia", value: '35' },
   { name: "Terror", value: '27' },
   { name: "Aventura", value: '12' },
   { name: "Familia", value: '107' }
   ]
    };
  },
  created() {
    this.$http.get(inicio).then(response => {
      this.peliculaspopulares = response.data.results;
    });
    this.$http.get(proximaspelis1).then(response => {
         this.proximaspelis = response.data.results;
    });
  },
  methods: {
    inicio() {
      this.$http.get(inicio).then(response => {
        this.peliculaspopulares = response.data.results;

      this.$http.get(proximaspelis1).then(response => {
         this.proximaspelis = response.data.results;
    });
      });

    },
    GetPopularMovies(){
      this.peliculaspopulares=[],
      this.$http.get(apiPopulares).then(response => {
        this.peliculaspopulares = response.data.results;
      });
    },
    GetPeliculasMasVotadas(){
      this.peliculaspopulares=[],
      this.$http.get(apitop).then(response => {
        this.peliculaspopulares = response.data.results;
      });

    },

    getMoviesForGenere(){
      //console.log(this.selected);
        var genero = this.selected;
        if (genero!='1'){
          this.peliculaspopulares=[],
          this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=1b62ccff88d2cd537027e1d82920197b&with_genres='+genero+'&sort_by=vote_average.desc&vote_count.gte=10').then(response => {
          this.peliculaspopulares = response.data.results;
          });
        }
        else {
          this.peliculaspopulares=[]
          this.$http.get(inicioactual).then(response => {
          this.peliculaspopulares = response.data.results;
        });
      }
    },
    buscarPeliculas() {
      this.$http
        .get(`https://api.themoviedb.org/3/search/movie?api_key=94f02539d96dfff17116524a372eece7&language=es-ES&query=${this.busquedapeliculas}&page=1&include_adult=true`)
        .then(response => {
            this.peliculaspopulares = response.data.results;
            if (response.data.total_results == 0) {
              if (response.genre_ids=="12,28,53"){
                alert("ENTRO");
              };
              (this.películanoencontrada = true),
                (this.mensajedeerror = "No hay resultados"),
                (this.Showerror = true);
            } else {
              this.películanoencontrada = false;
              this.Showerror = false;
            }
          },
          response => {
            (this.peliculaspopulares = []),
              (this.show = false),
              (this.mensajedeerror = "No hay resultados"),
              (this.Showerror = true);
          }
        );
      this.peliculaspopulares = [];
    },

  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    },
    components: { MensajedeError, Peliculas,SliderProximosEstrenos }
};
</script>

<style>
.h1{
  color:white;
}
.page-footer {
  background-color:#01d277;
}

.nav-extended {
  background-color:#01d277;
  width: 1085px
}

.nav-wrapper{
  background-color: #01d277;
  width: 930px;
}


.page-footer p{
  text-align: center;
  font-color:#01d277;
}
.page-footer h5{
  text-align: center;
}

.container1 {
  color:white;
}

.input-field {
  background-color:green;
  width: 1085px;
  color:green;
}

.paginaprincipal{
  background-color:#081c24;

}

</style>
