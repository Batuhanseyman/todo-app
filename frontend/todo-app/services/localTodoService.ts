import { getSessionCookie } from "@/lib/cookies";
import axios from "axios";
import { Todo } from "@/components/todo/TodoItem";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI; 


export const getLocalTodos = (): Todo[] => {

    try {
      if (typeof window === "undefined") return [];
      
      const todos = localStorage.getItem("todos");
      return todos ? (JSON.parse(todos) as Todo[]) : [];
  } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return []; 
  }
};

export const addLocalTodo = (todo: string): Todo => {
    const localTodos = getLocalTodos();
    const now = new Date().toISOString();

    const newTodo: Todo = {todoId: Date.now().toString(), todo, selected: false, 
      createdAt: now, updatedAt: now};

    localTodos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(localTodos));

    return newTodo;
};


export const deleteLocalTodo = (todoId: string): void => {
    const localTodos = getLocalTodos().filter((todo) => todo.todoId !== todoId);

    localStorage.setItem("todos", JSON.stringify(localTodos));
};

export const updateLocalTodo = (localTodo: Todo): void => {
    const localTodos = getLocalTodos().map((todo) =>
        todo.todoId === localTodo.todoId ? { ...todo, todo: localTodo.todo, selected: localTodo.selected, updatedAt: new Date().toISOString()} : todo
      );
      localStorage.setItem("todos", JSON.stringify(localTodos))
};


  export const addLocalTodosToBackend = async (userId: string): Promise<void> => {
    const localTodos = getLocalTodos();

    if (!userId) throw new Error("No session found") 

      try {
        if (localTodos.length > 0) {

          const todosForBackend = localTodos.map((todo) => ({
            userId: userId,   
            todo: todo.todo,
            selected: todo.selected,
            createdAt: (todo.createdAt), 
            updatedAt: todo.updatedAt,
          }));
    
          await axios.post(
             `${API_URL}/todos/insert-many`,
            {data: todosForBackend},
            {
              headers: {
                "Content-Type": "application/json",
                "userid": `${userId}`,
              },
            }
          );
      
          localStorage.removeItem("todos");
        }
      } catch (error) {
        console.error("Error syncing local todos to backend:", error);
      }
  };