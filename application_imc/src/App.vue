<script setup>
import { computed, ref } from "vue";
import UpdateMessage from "./components/UpdateMessage.vue";
import HistoricsRowList from "./components/HistoricsRowList.vue";

const historics = ref(JSON.parse(localStorage.getItem("Historics")) || []);

const data = computed(() => {
    return historics.value;
})

const saveUserData = (data) => {
    historics.value.push(data);
    localStorage.setItem("Historics", JSON.stringify(historics.value));
    console.log(historics.value);
}
</script>

<template>
    <div class="flex flex-col max-w-[1024px] mx-auto mt-4">
        <UpdateMessage @save-data="saveUserData" :historics="data" />
        <HistoricsRowList :historics="data" />
    </div>    
</template>
