<template>
  <v-dialog v-model="internalShow" max-width="400">
    <v-card class="bg-surface text-on-surface">
      <v-card-text>
        Tem certeza que deseja deletar este filme?
      </v-card-text>

      <v-card-actions>
        <v-btn color="secondary" @click="closeModal">Fechar</v-btn>
        <v-btn color="error" @click="handleDelete">Confirmar</v-btn>
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

const emit = defineEmits(['update:show', 'confirm'])
const internalShow = ref(props.show)

watch(() => props.show, (val) => {
  internalShow.value = val
})

watch(internalShow, (val) => {
  if (!val) emit('update:show', false)
})

function handleDelete() {
  emit('confirm')
}

function closeModal() {
  internalShow.value = false
}

</script>

<style scoped>

</style>
