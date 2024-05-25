<template>
  <div class="flex flex-col my-3">
    <h2 class="font-bold">Historique</h2>
    <table class="table-auto">
      <thead>
        <tr>
          <th class="text-start">Date</th>
          <th class="text-start">Poids</th>
          <th class="text-start">Taille</th>
        </tr>
      </thead>
      <tbody>
        <HistoricRow v-for="historic in historics" :historic="historic" :key="historic.id" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import HistoricRow from './HistoricRow.vue'

defineProps({
  historics: Array
})
</script>
