<template>
    <div class="todo-wrapper" data-test="todo"
        :class="[todo.completed ? 'completed' : '']">
        <input @click="checkboxToggled()" type="checkbox" v-model="todo.completed" data-test="todo-checkbox" />
        {{ todo.text }}
    </div>
</template>

<script setup>
import { useTodoStore } from '../store/todoStore'
import useTodayPresenter from '../composables/useDatePresenter';

const props = defineProps({
    todo: Object
});
const emit = defineEmits(['checkboxToggled']);

const { toggleTodoCompletion } = useTodoStore();

const checkboxToggled = () => {
    emit('checkboxToggled', props.todo);
    toggleTodoCompletion(props.todo.id);
};

const { formattedNowTime } = useTodayPresenter();

</script>

<style scoped>

.todo-wrapper {
  text-align: start;
}
</style>