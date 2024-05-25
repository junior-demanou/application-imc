<template>
    <tr>
        <td>{{ historic.date }}</td>
        <td>{{ historic.weight }}</td>
        <td>{{ historic.length }}</td>
    </tr>
</template>

<script setup>
defineProps(["historic"])
</script>