<template>
  <v-dialog v-model="internalShow" max-width="600">
    <v-card class="bg-surface text-on-surface">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ isEdit ? 'Editar' : 'Adicionar' }} filme</span>
        <v-btn icon="close" color="error" @click="closeModal">
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="formData.title"
            label="Título"
            required
          />
          <v-text-field
            v-model="formData.genre"
            label="Gênero"
            required
          />
          <v-menu
            v-model="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template #activator="{ props }">
              <v-text-field
                v-model="formData.releaseDate"
                label="Data de Lançamento"
                readonly
                v-bind="props"
              />
            </template>
            <v-date-picker v-model="formData.releaseDate" @input="menu = false"/>
          </v-menu>
          <v-text-field
            v-model="formData.duration"
            label="Duração (min)"
            type="number"
            required
          />
          <v-text-field
            v-model="formData.imdb"
            label="IMDB"
            type="number"
            required
          />
          <v-text-field
            v-model="formData.imageUrl"
            label="URL da Imagem"
          />
          <v-textarea
            v-model="formData.description"
            label="Sinopse"
            rows="3"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="closeModal">Fechar</v-btn>
        <v-btn color="primary" @click="handleSubmit">Salvar Alterações</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, watch, computed} from 'vue'
import api from '@/services/api'

const props = defineProps({
  show: Boolean,
  selectedMovie: String,
  isEdit: Boolean
})

const emit = defineEmits(['update:show', 'save'])

const internalShow = ref(props.show)
const menu = ref(false)
const formRef = ref(null)

const formData = ref({
  _id: '',
  title: '',
  duration: '',
  genre: '',
  imageUrl: '',
  description: '',
  releaseDate: '',
  imdb: ''
})


watch(() => props.show, (val) => {
  debugger;
  internalShow.value = val
  if (val && props.selectedMovie) {
    getSelectedMovie()
  }
})


watch(internalShow, (val) => {
  if (!val) emit('update:show', false)
})

function closeModal() {
  emit('update:show', false)
}

async function getSelectedMovie() {
  if (props.isEdit && props.selectedMovie) {
    try {
      const res = await api.get(`/movies/${props.selectedMovie}`)
      formData.value = res.data
      formData.value.releaseDate = formData.value.releaseDate?.split('T')[0] || ''
    } catch (err) {
      console.error('Erro ao buscar filme:', err)
    }
  } else {
    formData.value = {
      _id: '',
      title: '',
      duration: '',
      genre: '',
      imageUrl: '',
      description: '',
      releaseDate: '',
      imdb: ''
    }
  }
}

async function handleSubmit() {
  try {
    if (props.isEdit && formData.value._id) {
      const res = await api.put(`/movies/${formData.value._id}`, formData.value)
      emit('save', res.data)
    } else {
      const res = await api.post('/movies', formData.value)
      emit('save', res.data)
    }
    closeModal()
  } catch (err) {
    console.error('Erro ao salvar filme:', err)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>

<style scoped>

</style>
