<template>
  <div
    class="w-full min-h-screen bg-[#1a1a1c] flex flex-col px-[55px] py-[24px]"
  >
    <div class="w-full flex items-center justify-center">
      <div
        class="w-full md:w-[445px] h-[155px] py-4 rounded-xl shadow-raised text-start px-4 border border-white border-[0px] bg-gradient-to-r from-[#1f1f21] via-[#1f1f21] to-[#1f1f21] justify-center flex flex-col ..."
      >
        <h1 class="text-white text-4xl font-medium">{{ greeting }}</h1>
        <p class="text-white text-md mt-4">Start Managing Todos</p>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
const greeting = computed(() => {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning";
  if (hours < 18) return "Good Afternoon";
  return "Good Evening";
});

const incompleteTodosCount = computed(() => todos.value.length);

const todos = ref([]);

const fetchTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/todos");
    const data = await response.json();
    todos.value = data.filter((todo) => todo.status !== "done");
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

const fetchAllTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/todos");
    const data = await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

onMounted(() => {
  fetchAllTodos();
  fetchTodos();
});
</script>
