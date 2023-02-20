<template>
    <div class="input__container">
        <input
            placeholder="Поиск"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <img
            v-if="modelValue.length"
            class="input__button"
            src="icons/close.svg"
            alt="del"
            @click="$emit('update:modelValue', '')"
        >
    </div>
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
