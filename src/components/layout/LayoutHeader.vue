<template>
    <header class="header">
        <div class="header__title">
            Документы
        </div>

        <div class="header__actions">
            <MyButton icon="bookmark.svg" />
            <MyButton
                icon="plus.svg"
                label="Новый тип"
            />
            <MyButton
                icon="plus.svg"
                label="Новый документ"
            />
        </div>
    </header>
</template>

<script>
import MyButton from '../../ui/MyButton.vue';

export default {
    name: 'LayoutHeader',
    components: { MyButton },
};
</script>
