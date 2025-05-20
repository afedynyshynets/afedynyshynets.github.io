import { defineComponent, computed } from 'vue';
import TodoItem from '@/components/TodoItem/TodoItem.vue';

export interface iTodo {
    title: string;
    id: string;
    computed: boolean;
}

export default defineComponent({
    components: {
        TodoItem,
    },
    emits: ['removeTodo'],
    props: {
        todos: Array<iTodo>,
    },
    setup(_, { emit }) {
        // const props = defineProps(['todos']);
        // const emit = defineEmits(['removeTodo']);

        const removeTodo = (id) => {
            emit('removeTodo', id);
        };

        return { removeTodo };
    },
});
