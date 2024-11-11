import { mount } from '@vue/test-utils'
import TodoList from '../TodoList.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTodoStore } from '../../store/todoStore'
import useDatePresenter from '../../composables/useDatePresenter'

const defaultTodo = { id: 1, text: 'abc', completed: false };
const defaultTemplate = '<TodoList />';
const render = ({ storeTodos = [], template = defaultTemplate } = {}) => {
    const wrapper = mount({
        template: template,
        components: {
            TodoList,
        },
    }, {
        global: {
            plugins: [createTestingPinia({
                initialState: {
                    todo: { todos: storeTodos },
                }
            })],
        }
    }
    );

    const todoStore = useTodoStore();
    const findAllTodos = () => wrapper.findAllComponents('[data-test="todo"]');

    return {
        wrapper,
        todoStore,
        findAllTodos
    }
}

describe('TodoComponent', () => {

    beforeEach(() => {
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders the todos inside a Todo component', () => {
        const { findAllTodos } = render({ storeTodos: [defaultTodo] });

        const todo = findAllTodos()[0]

        expect(todo.exists()).toBe(true);
        expect(todo.props()).toEqual({ todo: defaultTodo });
    });

    it('renders all the todos in the store', () => {
        const todos = [defaultTodo, { id: 2, text: 'def', completed: false }];
        const { findAllTodos } = render({ storeTodos: todos });
        const allTodos = findAllTodos()

        expect(allTodos.length).toBe(todos.length);
        allTodos.forEach((todoWrapper, index) => {
            expect(todoWrapper.props()).toEqual({ todo: todos[index] });
        });
    });

    it('can replace the default todo rendering with a slot', () => {
        const todos = [defaultTodo, { id: 2, text: 'def', completed: false }];
        const template = `
            <TodoList>
                <div data-test="custom-content">Custom content</div>
            </TodoList>
        `;
        const { wrapper } = render({ storeTodos: todos, template: template });
        expect(wrapper.find('[data-test="custom-content"]').exists()).toBe(true);
    });

    it('shows message with the number of toos', () => {
        const { wrapper, todoStore } = render({ storeTodos: [defaultTodo] });

        const todosMsgWrapper = wrapper.find('[data-test="todos-number"]')
        expect(todosMsgWrapper.exists()).toBe(true);
        expect(todosMsgWrapper.text()).toContain(`${todoStore.todos.length}`);
    });

    it('shows message with todays date', () => {
        const { wrapper } = render();

        const dateMsgWrapper = wrapper.find('[data-test="date-msg"]')
        expect(dateMsgWrapper.exists()).toBe(true);
        expect(dateMsgWrapper.text()).toContain(useDatePresenter().formattedToday.value);
    });
})
