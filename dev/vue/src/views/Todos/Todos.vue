<template>
    <div>
        <RouterLink to="/">Home</RouterLink>
        <AddTodo
            @addTodo="addTodo"
            title="Add form:"
            :testRandBind="randNumb"
        />
        <div>
            <button @click="changeRandNumb">Change Rand Number</button>
        </div>
        <hr />
        <select v-model="filter">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">NotCompleted</option>
        </select>
        <Loader v-if="loading" />
        <TodoList
            v-else-if="filteredTodos.length"
            :todos="filteredTodos"
            @removeTodo="removeTodo"
        >
            <template #header>Header!</template>
            <template #footer>Footer!</template>
        </TodoList>
        <p v-else>No Todos!</p>
    </div>
</template>

<script lang="ts" src="./Todos.ts"></script>
