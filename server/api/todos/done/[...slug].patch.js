import db from "../../../../models/index";

export default defineEventHandler(async (event) => {
  try {
    const params = parseInt(event.context.params.slug);
    const findData = await db.Todos.findByPk(params);

    if (!findData)
      throw createError({ statusCode: 404, message: "Data not found" });
    const updateData = await db.Todos.update(
      {
        status: "done",
      },
      {
        where: {
          id: params,
        },
      }
    );

    const updatedData = await db.Todos.findByPk(params);

    if (updateData) {
      return {
        success: true,
        data: updatedData,
        message: "Status changed to done",
      };
    }
  } catch (error) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }
});
