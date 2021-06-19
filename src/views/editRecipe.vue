<template>
    <div>
        <!--
            <form @submit.prevent="addTag">
        <input type="text" v-model="tagName">
      <swatches-picker v-model="color" />
        <button type="submit">Add a Tag</button>
    </form>
            -->
        <h2>EDIT</h2>
        <fieldset>
            <input v-model="title" placeholder="title">
            <button @click="editTitle">Confirm Edit</button>
        </fieldset>

        <fieldset>
            <input v-model="author" placeholder="Author">
            <button @click="editAuthor">Confirm Edit</button>
        </fieldset>

        <fieldset>
            <div class="imageInput">

                <img v-if="url" :src="url" />
                <div v-if="!url" class="placeholder">
                    <img :src="path" />
                </div>
                <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
            </div>
            <p v-if="error" class="error">{{error}}</p>
            <button @click="editImage">Confirm Edit Image</button>
        </fieldset>

        <div v-for="ingredient in ingredients" v-bind:key="ingredient._id">
            <form>
                <fieldset>
                    <input v-model="ingredientUpdate" :placeholder="[[ingredient.ingredient]]" />
                    <button @click.prevent="editIngredient(ingredient)">Edit</button>
                    <button @click.prevent="deleteIngredient(ingredient)">Delete</button>
                </fieldset>
            </form>
        </div>

        <form>
            <fieldset>
                <input v-model="ingredient" placeholder="Another Ingredient" />
                <button @click.prevent="addIngredient">Add Ingredient</button>
            </fieldset>
    
        </form>

        <div v-for="step in steps" v-bind:key="step._id">
            <form>
                <fieldset>
                    <input v-model="stepNumberUpdate" :placeholder="[[step.stepNumber]]" />
                    <input v-model="stepUpdate" :placeholder="[[step.step]]" />
                    <button @click.prevent="editStep(step)">Edit</button>
                    <button @click.prevent="deleteStep(step)">Delete</button>
                </fieldset>
            </form>
        </div>
            <form>
                <fieldset>
                    <input v-model="stepNumber" placeholder="Step Number" />
                    <input v-model="step" placeholder="Another Step" />
                    <button @click.prevent="addStep">add Step</button>
                </fieldset>
                
            </form>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'EditRecipe',
        props: {
            show: Boolean,
        },
        data() {
            return {
                title: '',
                author: '',
                path: '',
                url: '',
                file: null,
                ingredient: '',
                ingredients: [],
                ingredientUpdate:'',
                stepNumber: 0,
                step: '',
                steps:[],
                stepNumberUpdate: '',
                stepUpdate:'',
                error: '',
            }
        },
        async created() {
            let response = await axios.get("/api/recipes/" + this.$route.params.id);
            this.title = response.data.title;
            this.author = response.data.author;
            this.path = response.data.path;
            let response2 = await axios.get("/api/ingredient/" + this.$route.params.id);
            this.ingredients = response2.data;
            let response3 = await axios.get("/api/step/" + this.$route.params.id);
            this.steps = response3.data;

        },
        methods: {
            fileChanged(event) {
                this.file = event.target.files[0];
                this.url = URL.createObjectURL(this.file);
            },
            close() {
                this.$emit('close');
            },
            chooseImage() {
                this.$refs.fileInput.click()
            },

            async editTitle() {
                try {
                    await axios.put("/api/recipes/" + this.$route.params.id, {
                        title: this.title,
                    });
                } catch (error) {
                    this.error = "Error: " + error.response.data.message;
                }

            },
            async editAuthor() {
                try {
                    await axios.put("/api/recipes/" + this.$route.params.id, {
                        author: this.author,
                    })
                } catch (error) {
                    this.error = "Error: " + error.response.data.message;
                }
            },
            async editImage() {
                try {
                    const formData = new FormData();
                    if (this.file) {
                        formData.append('photo', this.file, this.file.name);
                    }
                    await axios.put("/api/recipes/" + this.$route.params.id, formData);
                } catch (error) {
                    this.error = "Error: " + error.response.data.message;
                }

            },

            async addIngredient() {
                try {
                    await axios.post("/api/ingredient/" + this.$route.params.id, {
                        ingredient: this.ingredient,
                        recipe: this.$root.$data.recipe,
                    });
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
            async deleteIngredient(ingredient) {
                try {
                    await axios.delete('/api/ingredient/' + ingredient._id);
                    this.ingredientUpdate = null;
                    this.getIngredients();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editIngredient(ingredient) {
                try {
                    await axios.put('/api/ingredient/' + ingredient._id, {
                        ingredient: this.ingredientUpdate,
                    });
                    this.ingredientUpdate = null;
                    this.getIngredients();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async addStep() {
                try {
                    await axios.post("/api/step/" + this.$route.params.id, {
                        step: this.step,
                        stepNumber: this.stepNumber,
                        recipe: this.$root.$data.recipe,
                    });
                } catch (error) {
                    this.error = error.response.data.message;
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
            async deleteStep(step) {
                try {
                    await axios.delete('/api/step/' + step._id);
                    this.stepUpdate = null;
                    this.stepNumberUpdate = null;
                    this.getSteps();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editStep(step) {
                try {
                    await axios.put('/api/step/' + step._id, {
                        step: this.stepUpdate,
                        stepNumber: this.stepNumberUpdate,
                    });
                    this.stepUpdate = null;
                    this.stepNumberUpdate = null;
                    this.getSteps();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
        }
    }

</script>