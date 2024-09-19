import db from "../../../models/index";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.title || !body.description) {
      throw new Error("Missing required fields: title, description");
    }

    const newTodo = await db.Todos.create({
      title: body.title,
      description: body.description,
      status: "pending",
    });

    return {
      success: true,
      data: newTodo,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error.message,
    };
  }
});
