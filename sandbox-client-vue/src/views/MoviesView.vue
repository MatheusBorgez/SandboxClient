<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Biblioteca Marvel</h1>
      </v-col>

      <v-col
        v-for="movie in movies"
        :key="movie.id"
        cols="12"
        md="4"
      >
        <v-card class="ma-2 pa-2" elevation="3">
          <v-card-title>{{ movie.title }}</v-card-title>
          <v-card-subtitle>{{ movie.year }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="getCharacters(movie.id)">
              Ver personagens
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-if="characters[movie.id]">
              <v-list>
                <v-list-item
                  v-for="char in characters[movie.id]"
                  :key="char.id"
                >
                  {{ char.name }}
                </v-list-item>
              </v-list>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api.js'

const movies = ref([])
const characters = ref({})

onMounted(async () => {
  const res = await api.get('/filmes')
  movies.value = res.data
})

async function getCharacters(id) {
  const res = await api.get(`/filmes/${id}/personagens`)
  characters.value[id] = res.data
}
</script>
