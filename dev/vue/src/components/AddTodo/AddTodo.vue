<template>
    <p>{{ title }}</p>
    <form @submit.prevent="onSubmit">
        <input
            type="text"
            v-model="input"
        />
        <button type="submit">Create</button>
    </form>
    <p>Test rand number: {{ testRandBind }}</p>
</template>

<script lang="ts" src="./AddTodo.ts"></script>

<style lang="scss" scoped>
form {
    display: flex;
    margin-bottom: 20px;

    input {
        width: 400px;
    }
}
</style>
