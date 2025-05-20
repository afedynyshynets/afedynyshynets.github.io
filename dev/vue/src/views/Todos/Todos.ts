import TodoList from '@/components/TodoList/TodoList.vue';
import AddTodo from '@/components/AddTodo/AddTodo.vue';
import Loader from '@/components/Loader.vue';
import { RouterLink } from 'vue-router';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        TodoList,
        AddTodo,
        Loader,
        RouterLink,
    },
    setup() {
        const store = useStore();

        const todos = computed(() => store.getters.getTodos);
        const loading = computed(() => store.getters.getLoading);

        const fetchTodos = () => store.dispatch('fetchTodos');
        const addTodo = (todo) => store.dispatch('addTodo', todo);
        const removeTodo = (id) => store.dispatch('removeTodo', id);

        const filter = ref('all');
        const randNumb = ref(null);

        const filteredTodos = computed(() => {
            if (filter.value === 'all') {
                return todos.value;
            }

            if (filter.value === 'completed') {
                return todos.value.filter((t) => t.completed);
            }

            if (filter.value === 'notCompleted') {
                return todos.value.filter((t) => !t.completed);
            }
        });

        const changeRandNumb = () => {
            randNumb.value = (Math.random() * 100).toFixed();
        };

        onMounted(() => {
            fetchTodos();

            changeRandNumb();
        });

        return {
            addTodo,
            filter,
            loading,
            filteredTodos,
            removeTodo,
            randNumb,
            changeRandNumb,
        };
    },
});
