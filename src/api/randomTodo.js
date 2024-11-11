import apiConstants from './apiConstants';

const getRandomTodo = async () => {
    try {
        const response = await fetch(`${apiConstants.randomNumberUrl}min=100&max=100`);
        const data = await response.json();

        return data[0];
    } catch {
        throw new Error('API request failed')
    }
}

export default getRandomTodo;
