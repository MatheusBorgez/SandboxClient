<template>
  <v-dialog v-model="internalShow" max-width="600">
    <v-card>
      <v-card-title class="bg-surface text-on-surface d-flex align-center justify-space-between">
        {{ foundMovie.title }}
        <v-spacer></v-spacer>
        <v-btn color="error" class="text-center" icon="close" @click="closeModal"/>
      </v-card-title>

      <v-card-text class="bg-surface text-on-surface">
        <p>{{ foundMovie.description }}</p>
        <v-img v-if="foundMovie.imageUrl"
               :src="foundMovie.imageUrl"
               alt="Imagem do filme"
               max-height="300"
               contain></v-img>
      </v-card-text>

      <v-card-actions class="bg-surface text-on-surface">
        <v-spacer/>
        <v-btn color="secondary" @click="closeModal">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, watch} from 'vue'
import api from '@/services/api'

const props = defineProps({
  show: Boolean,
  selectedMovie: String,
})

const emit = defineEmits(['update:show'])
const internalShow = ref(props.show)
const foundMovie = ref({})

watch(() => props.show, (val) => {
  internalShow.value = val
  if (val && props.selectedMovie) {
    fetchMovie()
  }
})

watch(internalShow, (val) => {
  if (!val) emit('update:show', false)
})

async function fetchMovie() {
  try {
    const res = await api.get(`/movies/${props.selectedMovie}`)
    foundMovie.value = res.data
  } catch (err) {
    console.error('Erro ao buscar filme:', err)
  }
}

function closeModal() {
  internalShow.value = false
}

</script>
