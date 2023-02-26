<template>
    <div class="documents__list">
        <div
            v-for="category in filteredCategories"
            :key="category.id"
            class="documents__item"
            :class="{ 'documents__item--last': category.type === 'global-category' }"
        >
            <MyAccordion
                v-model="category.model"
            >
                <button />
                <template #header>
                    <DocumentItem
                        v-if="category.type !== 'global-category'"
                        v-model="category.model"
                        :class="{
                            'document__container--insert': dragOverObjectID === category.id
                                && availableInserts.indexOf(category.id) > -1
                        }"
                        :document="category"
                        draggable="true"
                        @toggle-accordion="category.model = !category.model"
                        @dragstart="onDragStart(category, $event)"
                        @dragend="onDragEnd($event)"
                        @dragover.prevent="onDragEnter(category.id)"
                        @dragleave.prevent="onDragLeave(category.id)"
                        @drag="onDrag($event)"
                        @drop="onDrop(category)"
                    />

                    <div
                        v-else-if="!category.documents.length"
                        style="padding: 16px; text-align: center;"
                        :class="{
                            'document__container--insert': dragOverObjectID === category.id
                                && availableInserts.indexOf(category.id) > -1
                        }"
                        @dragstart="onDragStart(category, $event)"
                        @dragend="onDragEnd($event)"
                        @dragover.prevent="onDragEnter(category.id)"
                        @dragleave.prevent="onDragLeave(category.id)"
                        @drag="onDrag($event)"
                        @drop="onDrop(category)"
                    >
                        Документы без категории
                    </div>
                </template>

                <template #section>
                    <DocumentItem
                        v-for="document in category.documents"
                        :key="document.id"
                        :class="{
                            'document__container--insert': dragOverObjectID === document.id
                                && availableInserts.indexOf(document.id) > -1,
                            'document--dragging': draggableObject?.id === category.id
                        }"
                        :document="document"
                        :margin-left="document.type === 'document'
                            && category.type !== 'global-category'"
                        draggable="true"
                        @dragstart="onDragStart(document, $event)"
                        @dragend="onDragEnd($event)"
                        @dragover.prevent="onDragEnter(document.id)"
                        @dragleave.prevent="onDragLeave(document.id)"
                        @drag="onDrag($event)"
                        @drop="onDrop(document)"
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
        const availableInserts = ref([]);
        const draggableObject = ref(null);
        const dragOverObjectID = ref(null);

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
                    {
                        id: 'doc-6',
                        type: 'document',
                        label: 'СНИЛС',
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

        const findParentElement = (elem) => {
            let parentElement = elem.target.parentNode;

            while (parentElement.id !== 'mainContainer') {
                parentElement = parentElement.parentNode;
            }

            return parentElement;
        };

        const makeCloneDragObject = (elem, event) => {
            const cloneElement = elem.cloneNode(true);
            cloneElement.style.left = `${event.pageX}px`;
            cloneElement.style.top = `${event.pageY}px`;
            cloneElement.style.opacity = 1;
            cloneElement.id = 'cloneDraggable';
            cloneElement.classList.add('document__container--shadow-clone');
            document.body.appendChild(cloneElement);
        };

        const removeCloneObject = () => {
            const elementToRemove = document.getElementById('cloneDraggable');

            if (elementToRemove) {
                elementToRemove.parentNode.removeChild(elementToRemove);
            }
        };

        const onDrag = (event) => {
            const draggableClone = document.getElementById('cloneDraggable');

            if (draggableClone) {
                draggableClone.style.left = `${event.pageX - draggableClone.offsetWidth}px`;
                draggableClone.style.top = `${event.pageY}px`;
            } else {
                const parentElement = findParentElement(event);
                makeCloneDragObject(parentElement, event);
            }
        };

        const onDragStart = (obj, event) => {
            if (event.target.parentNode.id !== 'drag') {
                event.preventDefault();
                return false;
            }

            availableInserts.value = [];

            if (obj.type === 'category') {
                filteredCategories.value.forEach((cat) => {
                    if (cat.type !== 'global-category' && cat.id !== obj.id) {
                        availableInserts.value.push(cat.id);
                    }
                });
            } else {
                filteredCategories.value.forEach((cat) => {
                    const objectIndex = cat.documents
                        .findIndex((doc) => doc.id === obj.id);

                    if (objectIndex !== -1) {
                        if (objectIndex !== 0) {
                            availableInserts.value.push(cat.id);
                        }

                        for (let i = 0; i < cat.documents.length; i++) {
                            if (i === objectIndex || i === objectIndex - 1) {
                                continue;
                            }

                            availableInserts.value.push(cat.documents[i].id);
                        }
                    } else {
                        availableInserts.value.push(
                            ...[cat.id, ...cat.documents.map((doc) => doc.id)],
                        );
                    }
                });
            }

            draggableObject.value = obj;
            const parentElement = findParentElement(event);
            event.dataTransfer.setDragImage(new Image(), 0, 0);
            parentElement.classList.add('document--dragging');
        };

        const onDragEnd = (event) => {
            event.dataTransfer.clearData();
            removeCloneObject();
            const parentElement = findParentElement(event);
            parentElement.classList.remove('document--dragging');
            draggableObject.value = null;
            dragOverObjectID.value = null;
            availableInserts.value = [];
        };

        const checkIfAbleToDrop = (doc) => {
            return doc.id === dragOverObjectID.value;
        };

        const onDragEnter = (id) => {
            dragOverObjectID.value = id;
        };

        const onDragLeave = () => {
            dragOverObjectID.value = null;
        };

        const onDrop = (target) => {
            const { id: targetId, type: targetType } = target;
            const { id: draggableId, type: draggableType } = draggableObject.value;

            if (!availableInserts.value.includes(targetId)) {
                return;
            }

            const filteredCategoriesValue = categories.value;
            const currentIndex = filteredCategoriesValue.findIndex((cat) => cat.id === draggableId);
            let targetIndex = filteredCategoriesValue.findIndex((cat) => cat.id === targetId);

            if (draggableType === 'category') {
                filteredCategoriesValue.splice(
                    currentIndex > targetIndex ? targetIndex + 1 : targetIndex,
                    0,
                    ...filteredCategoriesValue.splice(currentIndex, 1),
                );
            } else {
                const mainCategory = filteredCategoriesValue.find((cat) => cat.documents.findIndex((doc) => doc.id === draggableId) > -1);
                const draggableIndex = mainCategory.documents.findIndex((doc) => doc.id === draggableId);
                mainCategory.documents.splice(draggableIndex, 1);

                if (['category', 'global-category'].includes(targetType)) {
                    const category = filteredCategoriesValue.find((cat) => cat.id === targetId);
                    category.documents.unshift(draggableObject.value);
                } else {
                    const category = filteredCategoriesValue.find((cat) => cat.documents.findIndex((doc) => doc.id === targetId) > -1);
                    targetIndex = category.documents.findIndex((doc) => doc.id === targetId);
                    category.documents.splice(targetIndex + 1, 0, draggableObject.value);
                }
            }

            filterCategories();
        };

        return {
            availableInserts,
            dragOverObjectID,
            categories,
            filteredCategories,
            store,
            draggableObject,
            checkIfAbleToDrop,
            onDrag,
            onDragStart,
            onDragEnd,
            onDragEnter,
            onDragLeave,
            onDrop,
        };
    },
};
</script>
