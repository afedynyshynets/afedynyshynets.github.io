<template>
    <p><slot name="header">header</slot></p>
    <ul>
        <TodoItem
            v-for="(todo, index) of todos"
            :key="todo.id"
            :todo="todo"
            :index="index"
            @removeTodo="removeTodo"
        />
    </ul>
    <p><slot name="footer">header</slot></p>
</template>

<script lang="ts" src="./TodoList.ts"></script>

<style lang="scss" scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
