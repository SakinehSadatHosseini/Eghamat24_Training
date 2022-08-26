import NewTodo from '../components/new_todo/new_todo';
import TodosList from '../components/todos_list/todos_list';

const routes = [
    {
        exact: true,
        path: "/",
        element: <TodosList />
    },
    {
        path: "/new_todo",
        element: <NewTodo />
    }
];
export default routes