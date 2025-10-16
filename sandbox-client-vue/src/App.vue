<script setup lang="ts"></script>

<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-title>Sistema de Filmes</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text">
        <v-icon start>home</v-icon>
        Home
      </v-btn>
      <v-btn to="/edicao" variant="text">
        <v-icon start>edit</v-icon>
        Edição Inline
      </v-btn>
    </v-app-bar>
    
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped></style>
