<template>
    <button
        class="button"
        :class="{ 'button--gap': ifGapNeeded, 'button--flat': flat }"
    >
        <img
            v-if="icon"
            class="button__icon"
            :class="{ 'rotate': rotate }"
            :src="`/icons/${icon}`"
            alt="icon"
        >

        <span
            class="button__label"
        >
            {{ label }}
        </span>
    </button>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'MyButton',
    props: {
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: null,
        },
        flat: {
            type: Boolean,
            default: false,
        },
        rotate: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const ifGapNeeded = computed(() => props.label && props.icon);

        return {
            ifGapNeeded,
        };
    },
};
</script>

<style scoped>

</style>
