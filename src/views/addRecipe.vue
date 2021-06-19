<template>
    <div>


        <form @submit.prevent="upload">
            <fieldset class="buttons">
                <button type="submit">Upload</button>
            </fieldset>
            <fieldset>
                <input v-model="title" placeholder="Title">
            </fieldset>

            <fieldset>
                <textarea v-model="author" placeholder="Author"></textarea>
            </fieldset>

            <fieldset>
                <div class="imageInput">
                    <img v-if="url" :src="url" />
                    <div v-if="!url" class="placeholder">
                        Choose an Image
                    </div>
                    <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
                </div>
                <p v-if="error" class="error">{{error}}</p>
            </fieldset>

        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'AddRecipe',
        props: {
            show: Boolean,
        },
        data() {
            return {
                title: '',
                author: '',
                url: '',
                file: null,
                error: '',
            }
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
            async upload() {
                try {
                    const formData = new FormData();
                    formData.append('title', this.title);
                    formData.append('author', this.author);
                    if (this.file) {
                        formData.append('photo', this.file, this.file.name);
                    }
                    let response = await axios.post("/api/recipes", formData);
                    console.log(response.data);
                        this.$router.push({path: "/editRecipe/"+ response.data._id });
                } catch (error) {
                    this.error = "Error: " + error.response.data.message;
                }

            }

        }
    }

</script>


