import { getSessionCookie } from "@/lib/cookies";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI; 


export const getTodos = async () => {
  try {
    const uid = getSessionCookie(); 
    
    if (!uid) throw new Error("No session found");

    const response = await fetch(`${API_URL}/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "userid": `${uid}`
      },
    });

    if (!response.ok) throw new Error("Failed to fetch todos");
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const addTodo = async (todoText: string) => {
  try {
    const uid = getSessionCookie();
    if (!uid) throw new Error("No session found");

    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "userid": `${uid}`
      },
      body: JSON.stringify({ userId: uid, todo: todoText, selected: false }),
    });

    if (!response.ok) throw new Error("Failed to add todo");
    return await response.json();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};


export const updateTodo = async (todoId: string, todoText: string, selected: boolean) => {
  try {
    const uid = getSessionCookie();
    if (!uid) throw new Error("No session found");

    const response = await fetch(`${API_URL}/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "userid": `${uid}`
      },
      body: JSON.stringify({ todo: todoText, selected: selected }),
    });

    if (!response.ok) throw new Error("Failed to update todo");
    return await response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const uid = getSessionCookie();
    if (!uid) throw new Error("No session found");

    const response = await fetch(`${API_URL}/${todoId}`, {
      method: "DELETE",
      headers: {
        "userid": `${uid}`
      },
    });

    if (!response.ok) throw new Error("Failed to delete todo");
    return await response.json();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
