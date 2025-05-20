import { createStore } from 'vuex';

export const store = createStore({
    state() {
        return {
            todos: [],
            loading: true,
        };
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },
        addTodo(state, todo) {
            state.todos.push(todo);
        },
        removeTodo(state, id) {
            state.todos = state.todos.filter((t) => t.id !== id);
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
    },
    actions: {
        fetchTodos({ commit }) {
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
                .then((response) => response.json())
                .then((json) => {
                    commit('setTodos', json);
                    commit('setLoading', false);
                });
        },
        addTodo({ commit }, todo) {
            commit('addTodo', todo);
        },
        removeTodo({ commit }, id) {
            commit('removeTodo', id);
        },
    },
    getters: {
        getTodos(state) {
            return state.todos;
        },
        getLoading(state) {
            return state.loading;
        },
    },
});
