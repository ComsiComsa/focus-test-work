<template>
    <div
        id="mainContainer"
        class="document__container"
        :style="{
            height: height + 'px',
            marginLeft: sizeMarginLeft + 'px'
        }"
    >
        <div
            v-if="document.type !== 'document'"
            class="document__button"
        >
            <MyButton
                icon="chevron.svg"
                class-name="button--sm"
                :disabled="document.type === 'category'
                    && document.documents && !document.documents.length"
                :rotate="modelValue"
                @click="$emit('toggle-accordion')"
            />
        </div>

        <div class="document__label">
            {{ document.label }}
        </div>

        <div
            v-if="document.badges.length"
            class="document__badges"
        >
            <MyBadge
                v-for="(color, index) in document.badges"
                :key="index"
                :color="color"
            />
        </div>

        <div
            v-if="document.required"
            class="document__required"
        >
            Обязательный
        </div>

        <div class="document__description">
            {{ document.description }}
        </div>

        <div class="document__actions">
            <MyButton
                icon="edit.svg"
                :flat="true"
                alt="edit"
            />
            <MyButton
                icon="delete.svg"
                :flat="true"
                alt="delete"
            />
            <MyButton
                id="drag"
                icon="move.svg"
                :flat="true"
                alt="move"
            />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

import MyButton from '../ui/MyButton.vue';
import MyBadge from '../ui/MyBadge.vue';

export default {
    name: 'DocumentItem',
    components: { MyBadge, MyButton },
    props: {
        document: {
            type: Object,
            default: () => {},
        },
        marginLeft: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['toggle-accordion', 'start-drag'],
    setup(props) {
        const height = ref(props.document.type === 'document' ? 35 : 48);
        const sizeMarginLeft = ref(props.marginLeft ? 16 : 0);

        return {
            height,
            sizeMarginLeft,
        };
    },
};
</script>
