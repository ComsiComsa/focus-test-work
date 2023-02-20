<template>
    <div class="page">
        <LayoutHeader />
        <FilterContainer />
        <DocumentsList />
    </div>
</template>

<script setup>
import LayoutHeader from './components/layout/LayoutHeader.vue';
import FilterContainer from './components/FilterContainer.vue';
import DocumentsList from './components/DocumentsList.vue';
</script>
