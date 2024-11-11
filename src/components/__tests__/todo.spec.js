import { mount } from '@vue/test-utils'
import Todo from '../Todo.vue'
import { useTodoStore } from '../../store/todoStore'

jest.mock('@/store/todoStore', () => ({
  useTodoStore: jest.fn(),
}))

const defaultTodo = {id: 1, text: 'abc', completed: false};
const render = ({todo = defaultTodo} = {}) => {
    const wrapper = mount(Todo, {
        props: {
            todo,
        },
    });

    const checkbox = wrapper.find('input[type="checkbox"]');
    const clickCheckbox = checkbox.trigger.bind(checkbox, 'click');

    return {
        wrapper,
        checkbox,
        isCheckboxChecked: () => checkbox.element.checked,
        clickCheckbox
    }
}

describe('TodoComponent', () => {
  const toggleTodoCompletion = jest.fn()

  beforeEach(() => {
    useTodoStore.mockReturnValue({
      toggleTodoCompletion,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

    it('should render the todo text', () => {
        const { wrapper } = render();
        expect(wrapper.text()).toContain(defaultTodo.text);
    });

    it('should render a checkbox with the todo completed value', () => {
        const { checkbox, isCheckboxChecked } = render();
        expect(checkbox.exists()).toBe(true);
        expect(isCheckboxChecked()).toBe(false);

        const { checkbox: completedCheckbox, isCheckboxChecked: isCompletedCheckboxChecked } = render({todo: {...defaultTodo, completed: true}});
        expect(completedCheckbox.exists()).toBe(true);
        expect(isCompletedCheckboxChecked()).toBe(true);
    });

    it('should change the completed value when the checkbox is clicked', () => {
        const { clickCheckbox, isCheckboxChecked } = render();

        expect(isCheckboxChecked()).toBe(false);

        clickCheckbox();

        expect(isCheckboxChecked()).toBe(true);
    });

    it('should emit a toggle event when the checkbox is clicked', () => {
        const { clickCheckbox, wrapper } = render();

        clickCheckbox();

        expect(wrapper.emitted().checkboxToggled).toBeTruthy();
        expect(wrapper.emitted().checkboxToggled.length).toBe(1);
        expect(wrapper.emitted().checkboxToggled[0]).toEqual([defaultTodo]);
    });

    it('should call the toggleTodoCompletion function when the checkbox is clicked', () => {
        const { clickCheckbox } = render();
        clickCheckbox();
        expect(toggleTodoCompletion).toHaveBeenCalledTimes(1);
        expect(toggleTodoCompletion).toHaveBeenCalledWith(defaultTodo.id);
    });

})
