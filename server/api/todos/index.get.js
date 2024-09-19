import db from "../../../models/index.js"; 

export default defineEventHandler(async (event) => {
  try {
    const todos = await db.Todos.findAll(); 
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
});
