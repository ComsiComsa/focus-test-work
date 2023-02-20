<template>
    <div class="documents__list">
        <div
            v-for="category in filteredCategories"
            :key="category.id"
            class="documents__item"
            :class="{ 'documents__item--last': category.type === 'global-category' }"
        >
            <MyAccordion v-model="category.model">
                <template #header>
                    <DocumentItem
                        v-if="category.type !== 'global-category'"
                        v-model="category.model"
                        :document="category"
                        @toggle-accordion="category.model = !category.model"
                    />
                </template>

                <template #section>
                    <DocumentItem
                        v-for="document in category.documents"
                        :key="document.id"
                        :document="document"
                        :margin-left="document.type === 'document'
                            && category.type !== 'global-category'"
                    />
                </template>
            </MyAccordion>
        </div>
    </div>
</template>

<script>
import { ref, inject, watch } from 'vue';
import MyAccordion from '../ui/MyAccordion.vue';
import DocumentItem from './DocumentItem.vue';

export default {
    name: 'DocumentsList',
    components: {
        DocumentItem, MyAccordion,
    },
    setup() {
        const store = ref(inject('filter'));

        const categories = ref([
            {
                id: 'cat-1',
                type: 'category',
                label: 'Обязательные для всех',
                description: 'Документы, обязательные для всех сотрудников без исключения',
                badges: ['pink', 'yellow', 'orange'],
                model: false,
                documents: [
                    {
                        id: 'doc-1',
                        type: 'document',
                        label: 'Паспорт',
                        description: 'Для всех',
                        badges: ['blue'],
                        required: true,
                    },
                    {
                        id: 'doc-2',
                        type: 'document',
                        label: 'ИНН',
                        description: 'Для всех',
                        badges: [],
                        required: true,
                    },
                ],
            },
            {
                id: 'cat-2',
                type: 'category',
                label: 'Обязательные для трудоустройства',
                description: 'Документы, без которых невозможно трудоустройство человека на какую бы '
                    + 'то ни было должность в компании вне зависимости от гражданства',
                badges: ['pink', 'yellow', 'orange'],
                model: false,
                documents: [
                    {
                        id: 'doc-3',
                        type: 'document',
                        label: 'Трудовой договор',
                        description: 'Для всех',
                        badges: ['blue', 'grey'],
                        required: false,
                    },
                ],
            },
            {
                id: 'cat-3',
                type: 'category',
                label: 'Специальные',
                description: '',
                badges: [],
                model: false,
                documents: [],
            },
            {
                id: 'cat-4',
                type: 'global-category',
                label: '',
                description: '',
                badges: [],
                model: true,
                documents: [
                    {
                        id: 'doc-4',
                        type: 'document',
                        label: 'Тестовое задание кандидата',
                        description: 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццамейкер, повар горячего цеха',
                        badges: [],
                        required: false,
                    },
                    {
                        id: 'doc-5',
                        type: 'document',
                        label: 'Мед. книжка',
                        description: '',
                        badges: [],
                        required: false,
                    },
                ],
            },
        ]);

        const filteredCategories = ref(JSON.parse(JSON.stringify(categories.value)));

        const filterArray = (arr) => {
            return arr.filter((el) => el.label.toLowerCase().includes(store.value.filter.toLowerCase()));
        };

        const filterCategories = () => {
            let rawCategories = JSON.parse(JSON.stringify(categories.value));

            if (store.value.filter) {
                for (let i = 0; i < rawCategories.length; i++) {
                    rawCategories[i].documents = filterArray(rawCategories[i].documents);
                }

                rawCategories = rawCategories.filter((cat) => {
                    const checked = cat.label.toLowerCase().includes(store.value.filter.toLowerCase());

                    return checked || cat.documents.length > 0;
                });
            }

            filteredCategories.value = rawCategories.map((category) => {
                if (category.type === 'global-category') {
                    category.model = true;
                } else {
                    category.model = filteredCategories.value.find((cat) => cat.id === category.id)?.model || false;
                }

                return category;
            });
        };

        watch(store.value, () => {
            filterCategories();
        });

        return {
            categories,
            filteredCategories,
            store,
        };
    },
};
</script>
