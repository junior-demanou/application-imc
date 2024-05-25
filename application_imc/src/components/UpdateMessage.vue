<template>
    <div class="flex flex-col py-4 border">
        <div v-if="imc" class="flex flex-col w-[95%] mx-auto gap-2 rounded-lg p-4 bg-blue-100 text-blue-700">
            <p>Votre IMC : {{ imc }}</p>
            <div :class="mesageStyle[message]">{{ message }}</div>
        </div>
        <button @click="showUpdateForm = !showUpdateForm" class="pb-3 font-bold">Mettre à jour</button>
        <form v-if="showUpdateForm" class="flex flex-col gap-3" @submit.prevent="imcDataProvider">
            <input type="text" class="w-[80%] mx-auto border px-2" placeholder="Entrez votre poids"
                v-model="data.weight">
            <input type="text" class="w-[80%] mx-auto border px-2" placeholder="Entrez votre taille"
                v-model="data.length">
            <button class="w-[80%] mx-auto border">Valider</button>
        </form>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import uuid from '@/utils';
import dayjs from 'dayjs';

const props = defineProps({
    historics: Array
})

const emits = defineEmits(['saveData'])

const data = reactive({
    imc: 0,
    date: '',
    id: '',
    weight: '',
    length: ''
})
const showUpdateForm = ref(false);
const imcDataProvider = () => {
    data.id = uuid();
    const length = Number(data.length)
    data.imc = (Number(data.weight) / Math.pow(length, 2)).toFixed(2);
    data.date = dayjs().locale("en-EN").format('YYYY-MM-DD HH:mm');

    console.log(data.date)

    emits('saveData', data);

    // data.imc = 0;
    // data.id = '';
    // data.weight = '';
    // data.length = '';
    showUpdateForm.value = false;
}

const imc = computed(() => {
    return parseFloat(props.historics.at(-1)?.imc);
})

const generateMessage = computed(() => {
    switch (true) {
        case imc.value < 18.5:
            return "Poids Insuffisant";
        case (imc.value > 18.5 && imc.value < 24.9):
            return "Bonne Santé";
        case (imc.value > 25 && imc.value < 29.9):
            return "Excès de poids";
        case imc.value > 30:
            return "Vous êtes obèse";
        default:
            return '';
    }
})

const mesageStyle = {
    "Poids Insuffisant": "text-yellow-400",
    "Bonne Santé": "text-green-600",
    "Excès de poids": "text-pink-600",
    "Vous êtes obèse": "text-red-700"
}

const message = ref(generateMessage)
</script>