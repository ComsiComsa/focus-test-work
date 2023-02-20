<template>
    <div class="accordion">
        <div class="accordion__header">
            <slot name="header" />
        </div>
        <div
            class="accordion__section"
            :class="{ open: modelValue }"
        >
            <slot name="section" />
        </div>
    </div>
</template>

<script setup>
defineProps(['modelValue']);
</script>
