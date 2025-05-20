<template>
    <li class="TodoItem">
        <span :class="{ done: todo.completed }">
            <input
                type="checkbox"
                @change="todo.completed = !todo.completed"
            />
            <strong>{{ index + 1 }}</strong>
            {{ todo.title }}
        </span>
        <button
            class="rm"
            @click="$emit('removeTodo', todo.id)"
        >
            &times;
        </button>
    </li>
</template>

<script lang="ts" src="./TodoItem.ts"></script>

<style lang="scss" scoped>
.TodoItem {
    padding: 10px;
    border: 1px solid teal;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;

    input {
        margin-right: 10px;
    }

    .rm {
        background: red;
        border: none;
        color: #fff;
    }

    .done {
        text-decoration: line-through;
    }
}
</style>
