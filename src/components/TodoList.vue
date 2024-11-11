<template>
  <h1>My ToDo List</h1>
  <h2 data-test="date-msg">Today is: {{ formattedToday }}</h2>
  <h3 data-test="todos-number">You Have: {{ todosNumber }} ToDos</h3>
  <div class="wrapper">
    <form data-test="form" @submit.prevent="createTodo">
      <input data-test="new-todo" v-model="newTodo" />
    </form>
    <slot>
      <Todo v-for="todo in todos" :todo="todo" />
    </slot>
    <button @click="addRandomTodo">Random ToDo</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import getRandomTodo from '../api/randomTodo'
import { useTodoStore } from '../store/todoStore'
import Todo from './Todo.vue'
import useTodayPresenter from '../composables/useDatePresenter'

const newTodo = ref('');

const todoStore = useTodoStore();

const { todos } = storeToRefs(todoStore);

const createTodo = () => {
  todoStore.addTodo(newTodo.value);
  newTodo.value = "";
};

const addRandomTodo = async () => {
  const randomTodo = await getRandomTodo();
  todoStore.addTodo(randomTodo);
};

const todosNumber = computed(() => {
  return todos.value.length;
});

const { formattedToday} = useTodayPresenter();
</script>

<style>
button {
  margin: 8px 0;
}

form {
  margin-bottom: 12px;
}

.wrapper {
  width: fit-content;
  margin: 0 auto;
}

</style>