<template>
    <div class="main">
        <div class="menu">
           <h2> <a @click="logout"> <button>Logout</button> </a></h2>
           <router-link to="/addRecipe"><button>Add Recipe</button></router-link>
        </div>
        <div class="title">
            <h1>Recipes</h1>
        </div>
<!--//This is to be added at a later date
        <div class="tags">
            <button :style="{backgroundColor: tag.color}" :class="{ white: darkColor(tag.color)}" v-for="tag in tags" :key=tag.id @click=selectTag(tag)>{{tag.name}}</button>
        </div>
        <div class="searchBar">
            <form>
                <input v-model="searchText"/>
            </form>

        </div>
-->
        <!--
        <div class="favorites">
            <div class="recipes" v-for="recipe in favoriteRecipes" :key="recipe.id">
                <h1>{{recipe.title}}</h1>
                <h2>{{recipe.author}}</h2>
                <img src="recipe.path" />

                <div class="ingredients">

                </div>

                <div class="steps">

                </div>
            </div>
        </div>
            -->
            <div class="allRecipes">
                <div class="eachRecipe" v-for="recipe in recipes" :key="recipe.id">
                    <router-link :to="'/editRecipe/'+ recipe._id">
                        <h1>{{recipe.title}}</h1>
                        <h2>{{recipe.author}}</h2>
                        <img :src="recipe.path" />


                        <ul class="recipeIngredients" v-for="ingredient in ingredients" :key="ingredient.id">
                            <li>{{ingredient.ingredient}}</li>
                        </ul>


                        <div class="mySteps" v-for="step in steps" :key="step.id">
                            <p>{{step.stepNumber}}   {{step.step}}</p>
                        </div>
                    </router-link>
                </div>

            </div>

    </div>
</template>

<script>
    import axios from 'axios';
    //import { Swatches } from 'vue-color'
export default {
        name: 'Recipes',
        components: {
            //'swatches-picker': Swatches
        },
  data() {
      return {
          recipe:'',
          recipes: [],
          step: '',
          steps: [],
          ingredient: '',
          ingredients:'',
 /*       searchText: '',
          tags: [],
          tag: null,
          tagName: '',
          color: "#000",
          show: 'all',
*/
          }
        },
        created() {
            this.getRecipes();
        },
  computed: {
      user() {
          return this.$root.$data.user;
      },

  },
  methods: {
      async logout() {
          try {
              await axios.delete("/api/users");
              this.$root.$data.user = null;
          } catch (error) {
              this.$root.$data.user = null;
          }
      },
      async getRecipes() {
          try {
              let response = await axios.get("/api/recipes");
              this.recipes = response.data;
          } catch (error) {
              console.log(error);
          }
      },
      async getSteps() {
          try {
              let response = await axios.get('/api/step/' + this.$route.params.id, {
              });
              this.steps = response.data;
          } catch (error) {
              this.error = error.response.data.message;
          }
      },
      async getIngredients() {
          try {
              let response = await axios.get('/api/ingredient/' + this.$route.params.id, {
              });
              this.ingredients = response.data;
          } catch (error) {
              this.error = error.response.data.message;
          }
      },
/*      selectTag(tag) {
          this.tag = tag;
          this.getRecipes();
      },
      async getRecipes() {
          try {
              const response = await axios.get('/api/tags/${this.tag._id}/recipes');
              this.tags = response.data;

          } catch (error) {
              console.log(error);
          }
      },
      darkColor(color) {
          return (this.lightOrDark(color) === 'dark');
      },
      lightOrDark(color) {
          let hex = color;
          if (typeof color === 'object' && color !== null)
              hex = color.hex;
          // Convert it to RGB: http://gist.github.com/983661
          let rgb = +("0x" + hex.slice(1).replace(
              hex.length < 5 && /./g, '$&$&'));
          const r = rgb >> 16;
          const g = rgb >> 8 & 255;
          const b = rgb & 255;

          // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
          const hsp = Math.sqrt(
              0.299 * (r * r) +
              0.587 * (g * g) +
              0.114 * (b * b)
          );
          // Using the HSP value, determine whether the color is light or dark
          if (hsp > 127.5) {
              return 'light';
          }
          else {
              return 'dark';
          }
      }
*/
  }
}
</script>

<style>


    /*
    .tags {
        margin-bottom: 20px;
    }
    .vc-swatches {
        margin-bottom: 20px;
    }
    .white {
        color: #fff;
    }
        */
</style>