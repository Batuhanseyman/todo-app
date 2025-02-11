import { getSessionCookie } from "@/lib/cookies";
import axios from "axios";
import { Todo } from "@/components/todo/TodoItem";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI; 


export const getTodos = async () => {
  try {
    const uid = getSessionCookie(); 
    
    if (!uid) throw new Error("No session found");

    const response = await axios.get(`${API_URL}/todos/${uid}`, {
      headers: {
        "Content-Type": "application/json",
        "userid": `${uid}`,
      },
    });

    return  response.data
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const addTodo = async (todoText: string) => {
  try {
    const uid = getSessionCookie();
    if (!uid) throw new Error("No session found");

    const response = await axios.post(
      `${API_URL}/todos/`,
      { todo: todoText, selected: false },
      {
        headers: {
          "Content-Type": "application/json",
          "userid": `${uid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};


export const updateTodo = async (todo: Todo) => {
  try {
    const uid = getSessionCookie();
    if (!uid) throw new Error("No session found");


    const response = await axios.put(
      `${API_URL}/todos/${todo.todoId}`,
      { todo: todo.todo, selected: todo.selected },
      {
        headers: {
          "Content-Type": "application/json",
          "userid": `${uid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const uid = getSessionCookie();
    if (!uid) throw new Error("No session found");

    const response = await axios.delete(`${API_URL}/todos/${todoId}`, {
      headers: {
        "userid": `${uid}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};


