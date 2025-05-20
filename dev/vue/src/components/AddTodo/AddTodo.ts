import { ref, defineComponent } from 'vue';

export default defineComponent({
    emits: ['addTodo'],
    props: {
        title: String,
        testRandBind: Number,
    },
    setup(_, { emit }) {
        const input = ref('');

        // const emit = defineEmits(['addTodo']);

        const onSubmit = () => {
            if (input.value.trim()) {
                const newTodo = {
                    id: Date.now(),
                    title: input.value,
                    completed: false,
                };

                emit('addTodo', newTodo);
                input.value = '';
            }
        };

        return {
            input,
            onSubmit,
        };
    },
});
