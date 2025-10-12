<template>
  <v-container>
    <v-table fixed-header height="600px" class="mt-4">
      <thead>
      <tr>
        <th>Título</th>
        <th>Gênero</th>
        <th>Duração</th>
        <th>IMDb</th>
        <th>Data de lançamento</th>
        <th></th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="item in data" :key="item._id">
        <td>{{ item.title }}</td>
        <td>{{ item.genre }}</td>
        <td>{{ item.duration }} minutos</td>
        <td>{{ item.imdb }}</td>
        <td>{{ formatDate(item.releaseDate) }}</td>
        <td>
          <v-btn
            size="small"
            color="primary"
            icon="information"
            @click="openModal('info', item._id)"
          >
          </v-btn>
          <v-btn
            size="small"
            color="warning"
            icon="edit"
            class="ms-2"
            @click="openModal('edit', item._id)"
          />
          <v-btn
            size="small"
            color="error"
            icon="delete"
            class="ms-2"
            @click="openModal('delete', item._id)"
          />
        </td>
      </tr>
      </tbody>
    </v-table>

    <ModalMaisInformacoes
      v-model:show="showMaisInformacoes"
      :selectedMovie="selectedMovie"
    />

    <ModalInsert
      v-model:show="showInsert"
      :selectedMovie="selectedMovie"
      :isEdit="true"
      @save="handleEditData"
    />

    <ModalDelete
      v-model:show="showDelete"
      :selectedMovie="selectedMovie"
      @confirm="handleDelete"
    />
  </v-container>
</template>

<style scoped>

</style>

<script setup>
import {ref} from 'vue'
import api from '@/services/api'

import ModalMaisInformacoes from './ModalMaisInformacoes.vue'
import ModalInsert from './ModalInsert.vue'
import ModalDelete from './ModalDelete.vue'

defineProps({
  data: Array,
})

const emit = defineEmits(['update-data'])

const selectedMovie = ref('')
const showMaisInformacoes = ref(false)
const showInsert = ref(false)
const showDelete = ref(false)

function openModal(type, id) {
  selectedMovie.value = id

  if (type === 'info') showMaisInformacoes.value = true
  if (type === 'edit') showInsert.value = true
  if (type === 'delete') showDelete.value = true
}

async function handleDelete() {
  try {
    await api.delete(`/movies/${selectedMovie.value}`)
    emit('update-data', selectedMovie.value)
  } catch (err) {
    console.error('Erro ao deletar:', err)
  } finally {
    showDelete.value = false
  }
}

function handleEditData(editData) {
  emit('update-data', editData)
  showInsert.value = false
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR')
}

function removeMovie(id) {
  data.value = data.value.filter(m => m._id !== id)
}


</script>
