<template>
  <div>
    <!-- Button to trigger the modal -->
    <button
      @click="openModal"
      class="w-32 lg:w-48 h-16 bg-gradient-to-r from-[#1f1f21] via-[#1f1f21] to-[#1f1f21] shadow-raised text-white rounded-xl mt-8 font-medium text-lg hover:opacity-70 transition"
    >
      Add Todo
    </button>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="fixed inset-0 bg-black opacity-50"
          @click="closeModal"
        ></div>
        <div
          class="relative bg-[#1a1a1c] p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:max-w-3xl md:mx-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <button
            class="absolute top-4 right-4 text-gray-100 hover:text-gray-400"
            @click="closeModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 class="text-xl font-semibold mb-4 text-white">Add Todo</h2>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label
                for="title"
                class="block text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                v-model="form.title"
                class="mt-1 block w-full border border-gray-600 rounded-md shadow-inner bg-[#1a1a1c] text-white"
              />
              <p v-if="errors.title" class="text-red-500 text-sm mt-1">
                {{ errors.title }}
              </p>
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="mt-1 block w-full border border-gray-600 rounded-md shadow-inner bg-[#1a1a1c] text-white"
              ></textarea>
              <p v-if="errors.description" class="text-red-500 text-sm mt-1">
                {{ errors.description }}
              </p>
            </div>
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Todos List -->
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4 text-white">Todos List</h1>
      <p v-if="todos.length === 0" class="text-center text-gray-400">
        Please Add Todos for Today
      </p>

      <!-- Card Layout for Mobile -->
      <div v-if="todos.length > 0" class="block lg:hidden">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="bg-[#1a1a1c] text-white p-4 rounded-lg shadow-lg border border-gray-700 mb-4"
        >
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold">{{ todo.title }}</h2>
            <span class="text-sm">{{ todo.status }}</span>
          </div>
          <p class="text-gray-400 mb-2">{{ todo.description }}</p>
          <div>
            <button
              v-if="todo.status === 'pending'"
              @click="updateStatus(todo.id)"
              class="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
            >
              Processing
            </button>
            <button
              v-if="todo.status === 'process'"
              @click="doneStatus(todo.id)"
              class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      </div>

      <!-- Table Layout for Desktop -->
      <table
        v-if="todos.length > 0"
        class="min-w-full bg-[#1a1a1c] text-white rounded-lg shadow-lg hidden lg:table"
      >
        <thead>
          <tr class="border-b border-gray-700">
            <th class="py-2 px-4 text-left">ID</th>
            <th class="py-2 px-4 text-left">Title</th>
            <th class="py-2 px-4 text-left">Description</th>
            <th class="py-2 px-4 text-left">Status</th>
            <th class="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="todo in todos"
            :key="todo.id"
            class="border-b border-gray-700"
          >
            <td class="py-2 px-4">{{ todo.id }}</td>
            <td class="py-2 px-4">{{ todo.title }}</td>
            <td class="py-2 px-4">{{ todo.description }}</td>
            <td class="py-2 px-4">{{ todo.status }}</td>
            <td class="py-2 px-4">
              <button
                v-if="todo.status === 'pending'"
                @click="updateStatus(todo.id)"
                class="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
              >
                Processing
              </button>
              <button
                v-if="todo.status === 'process'"
                @click="doneStatus(todo.id)"
                class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              >
                Done
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAsyncData } from "#app";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const isModalOpen = ref(false);
const form = ref({
  title: "",
  description: "",
});
const errors = ref({ title: "", description: "" });

const { data: todos, refresh } = useAsyncData("todos", () =>
  $fetch("/api/todos")
);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  form.value = { title: "", description: "" };
  errors.value = {};
};

const submitForm = async () => {
  if (form.value.title === "") {
    errors.value.title = "Title is required";
    return;
  }
  if (form.value.description === "") {
    errors.value.description = "Description is required";
    return;
  }
  try {
    await $fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });
    await refresh();
    closeModal();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

const doneStatus = async (id) => {
  try {
    await $fetch(`/api/todos/done/${id}`, { method: "PATCH" });
    await refresh();
  } catch (error) {
    console.error("Error updating status to done:", error);
  }
};

const updateStatus = async (id) => {
  try {
    await $fetch(`/api/todos/${id}`, { method: "PATCH" });
    await refresh();
  } catch (error) {
    console.error("Error updating status to processing:", error);
  }
};

onMounted(() => {
  refresh();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #333;
}
</style>
