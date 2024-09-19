<script setup>
const nowTodos = ref(null);
const latestTodos = ref(null);

const { data: todos, refresh: refreshTodos } = useFetch(
  "http://localhost:3000/api/todos",
  {
    transform: (data) => {
      const today = new Date().toISOString().split("T")[0];
      return data.filter(
        (todo) => new Date(todo.createdAt).toISOString().split("T")[0] === today
      );
    },
  }
);

function handleTodoAdded() {
  refreshTodos();
}
</script>

<template>
  <NuxtLayout name="default">
    <AddTodos   />
  </NuxtLayout>
</template>
