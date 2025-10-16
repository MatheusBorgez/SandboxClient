<template>
  <v-container class="pa-6 bg-surface text-on-surface">
    <v-row>
      <v-col cols="12">
        <v-divider class="text-center mb-4">
          <h1 class="text-h4 font-weight-bold">Edição Inline de Filmes</h1>
        </v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2">edit</v-icon>
            <span>Grid de Edição</span>
            <v-spacer></v-spacer>
            <v-btn 
              color="primary" 
              prepend-icon="refresh"
              @click="fetchMovies"
            >
              Atualizar
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="movies"
              :loading="loading"
              item-value="_id"
              class="elevation-1"
              :items-per-page="10"
            >
              <template v-slot:[`item.title`]="{ item }">
                <v-text-field
                  v-if="editingId === item._id"
                  v-model="editedItem.title"
                  density="compact"
                  hide-details
                  variant="outlined"
                />
                <span v-else>{{ item.title }}</span>
              </template>

              <template v-slot:[`item.genre`]="{ item }">
                <v-text-field
                  v-if="editingId === item._id"
                  v-model="editedItem.genre"
                  density="compact"
                  hide-details
                  variant="outlined"
                />
                <span v-else>{{ item.genre }}</span>
              </template>

              <template v-slot:[`item.duration`]="{ item }">
                <v-text-field
                  v-if="editingId === item._id"
                  v-model.number="editedItem.duration"
                  type="number"
                  density="compact"
                  hide-details
                  variant="outlined"
                />
                <span v-else>{{ item.duration }} min</span>
              </template>

              <template v-slot:[`item.imdb`]="{ item }">
                <v-text-field
                  v-if="editingId === item._id"
                  v-model.number="editedItem.imdb"
                  type="number"
                  step="0.1"
                  density="compact"
                  hide-details
                  variant="outlined"
                />
                <v-chip v-else color="amber" size="small">
                  {{ item.imdb }}
                </v-chip>
              </template>

              <template v-slot:[`item.imageUrl`]="{ item }">
                <v-text-field
                  v-if="editingId === item._id"
                  v-model="editedItem.imageUrl"
                  density="compact"
                  hide-details
                  variant="outlined"
                />
                <v-avatar v-else size="40">
                  <v-img 
                    :src="item.imageUrl" 
                    :alt="item.title"
                  >
                    <template v-slot:error>
                      <v-icon>image</v-icon>
                    </template>
                  </v-img>
                </v-avatar>
              </template>

              <template v-slot:[`item.description`]="{ item }">
                <v-textarea
                  v-if="editingId === item._id"
                  v-model="editedItem.description"
                  density="compact"
                  hide-details
                  variant="outlined"
                  rows="2"
                />
                <v-tooltip v-else location="top">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props" class="text-truncate d-inline-block" style="max-width: 200px;">
                      {{ item.description }}
                    </span>
                  </template>
                  <span>{{ item.description }}</span>
                </v-tooltip>
              </template>

              <template v-slot:[`item.releaseDate`]="{ item }">
                <v-text-field
                  v-if="editingId === item._id"
                  v-model="editedItem.releaseDate"
                  type="date"
                  density="compact"
                  hide-details
                  variant="outlined"
                />
                <span v-else>{{ formatDate(item.releaseDate) }}</span>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <div v-if="editingId === item._id">
                  <v-btn
                    icon="check"
                    color="success"
                    size="small"
                    @click="saveEdit(item._id)"
                    :loading="saving"
                  />
                  <v-btn
                    icon="close"
                    color="error"
                    size="small"
                    class="ms-1"
                    @click="cancelEdit"
                  />
                </div>
                <div v-else>
                  <v-btn
                    icon="edit"
                    color="primary"
                    size="small"
                    @click="startEdit(item)"
                  />
                </div>
              </template>

              <template v-slot:loading>
                <v-skeleton-loader type="table-row@10" />
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'

interface Movie {
  _id: string
  title: string
  genre: string
  duration: number
  imdb: number
  imageUrl: string
  description: string
  releaseDate: string
}

const movies = ref<Movie[]>([])
const loading = ref(false)
const saving = ref(false)
const editingId = ref<string | null>(null)
const editedItem = ref<Movie>({
  _id: '',
  title: '',
  genre: '',
  duration: 0,
  imdb: 0,
  imageUrl: '',
  description: '',
  releaseDate: ''
})

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const headers = [
  { title: 'Título', key: 'title', align: 'start' as const },
  { title: 'Gênero', key: 'genre', align: 'start' as const },
  { title: 'Duração', key: 'duration', align: 'center' as const },
  { title: 'IMDB', key: 'imdb', align: 'center' as const },
  { title: 'Imagem', key: 'imageUrl', align: 'center' as const, sortable: false },
  { title: 'Sinopse', key: 'description', align: 'start' as const },
  { title: 'Data de Lançamento', key: 'releaseDate', align: 'center' as const },
  { title: 'Ações', key: 'actions', align: 'center' as const, sortable: false }
]

async function fetchMovies() {
  loading.value = true
  try {
    const res = await api.get('/movies')
    movies.value = res.data
    showSnackbar('Filmes carregados com sucesso!', 'success')
  } catch (err) {
    console.error('Erro ao buscar filmes:', err)
    showSnackbar('Erro ao carregar filmes', 'error')
  } finally {
    loading.value = false
  }
}

function startEdit(item: Movie) {
  editingId.value = item._id
  const releaseDate = item.releaseDate ? item.releaseDate.split('T')[0] || '' : ''
  editedItem.value = {
    _id: item._id,
    title: item.title,
    genre: item.genre,
    duration: item.duration,
    imdb: item.imdb,
    imageUrl: item.imageUrl,
    description: item.description,
    releaseDate: releaseDate
  }
}

function cancelEdit() {
  editingId.value = null
  editedItem.value = {
    _id: '',
    title: '',
    genre: '',
    duration: 0,
    imdb: 0,
    imageUrl: '',
    description: '',
    releaseDate: ''
  }
}

async function saveEdit(id: string) {
  saving.value = true
  try {
    const res = await api.put(`/movies/${id}`, editedItem.value)
    const index = movies.value.findIndex(m => m._id === id)
    if (index !== -1) {
      movies.value[index] = res.data
    }
    showSnackbar('Filme atualizado com sucesso!', 'success')
    cancelEdit()
  } catch (err) {
    console.error('Erro ao salvar filme:', err)
    showSnackbar('Erro ao salvar filme', 'error')
  } finally {
    saving.value = false
  }
}

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR')
}

function showSnackbar(text: string, color: string) {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}

onMounted(fetchMovies)
</script>

<style scoped>
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
