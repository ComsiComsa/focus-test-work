<template>
    <MyInput
        v-model="filter"
        @update:model-value="handleUpdate"
    />
</template>

<script setup>
import { inject } from 'vue';
import MyInput from '../ui/MyInput.vue';

const { filter, updateFilter } = inject('filter');

const handleUpdate = (val) => {
    updateFilter(val);
};
</script>
