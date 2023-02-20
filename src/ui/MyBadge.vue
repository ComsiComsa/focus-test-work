<template>
    <div
        class="badge"
        :class="`badge--${color}`"
    />
</template>

<script>
export default {
    name: 'MyBadge',
    props: {
        color: {
            type: String,
            default: 'grey',
        },
    },
};
</script>

<style scoped>

</style>
