<template>
  <v-container class="pa-6 bg-surface text-on-surface">
    <v-divider class="text-center">
    <h1 class="text-h4 font-weight-bold">Cadastro de filmes</h1>
    </v-divider>

    <v-btn
      color="success"
      class="mb-3"
      @click="showInsert = true"
    >
      Cadastrar
    </v-btn>

    <ModalInsert
      v-if="showInsert"
      :show="showInsert"
      @close="showInsert = false"
      @save="addNewData"
    />

    <MainGrid
      :data="movies"
      @update-data="updateData"
    />
  </v-container>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import api from '@/services/api'
import MainGrid from '@/views/MainGrid.vue'
import ModalInsert from '@/views/ModalInsert.vue'

const movies = ref([])
const showInsert = ref(false)

async function fetchMovies() {
  try {
    const res = await api.get('/movies')
    movies.value = res.data
  } catch (err) {
    console.error('Erro ao buscar filmes:', err)
  }
}

onMounted(fetchMovies)


function updateData(updated) {
  if (typeof updated === 'string') {
    movies.value = movies.value.filter(m => m._id !== updated)
  } else {
    const index = movies.value.findIndex(m => m._id === updated._id)
    if (index !== -1) {
      movies.value[index] = updated
    } else {
      movies.value.push(updated)
    }
  }
}

function addNewData(newMovie) {
  movies.value.push(newMovie)
  showInsert.value = false
}
</script>
