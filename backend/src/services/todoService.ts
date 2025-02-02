import  Todo  from "../models/Todo";

export const crateTodo = async (userId: string, todo: string, selected: boolean) => {
    
    const existingTodo = await Todo.findOne({ userId, todo});
    if(existingTodo)
    {
        return null;
    }

    return await Todo.create({userId, todo, selected});
}


export const getTodos = async (userId: string) => {
    
    return await Todo.find({userId});
    
}


export const updateTodo = async (todoId: string, todo: string, selected: boolean) => {
    return await Todo.findByIdAndUpdate(todoId, {todo, selected}, {new: true});
}

export const deleteTodo = async (todoId: string) => {
    return await Todo.findByIdAndDelete(todoId);
}
