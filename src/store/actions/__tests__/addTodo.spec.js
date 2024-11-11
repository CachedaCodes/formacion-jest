import { useTodoStore } from '../../todoStore';
import { setActivePinia, createPinia } from 'pinia';
import logging from '../../../utils/logging';

describe('addTodo', () => {
    let todoStore;

    beforeEach(() => {
        setActivePinia(createPinia());
        todoStore = useTodoStore();
    });

    it('should add a new todo to the store with the correct text and completed to false', () => {
        const newTodo = 'abc';
        todoStore.addTodo(newTodo);
        expect(todoStore.todos.length).toBe(1);
        expect(todoStore.todos).toEqual([expect.objectContaining({ text: newTodo, completed: false })]);    
    });

    it('should increment the id of each new todo', () => {
        todoStore.addTodo('abc');
        todoStore.addTodo('def');

        expect(todoStore.todos.length).toBe(2);
        expect(todoStore.todos).toEqual([
            expect.objectContaining({id: 1}),
            expect.objectContaining({ id: 2 })
        ]);
    });

    it('should use logging util to log new todo', () => {
        const logStringSpy = jest.spyOn(logging, 'logString');
        const newTodo = 'abc';
        todoStore.addTodo(newTodo);
        expect(logStringSpy).toHaveBeenCalledWith(`New ToDo: ${newTodo}`);
    });
});