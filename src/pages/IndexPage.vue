<template>
  <q-page class="flex flex-center">
    <main class="app">
      <section class="todo-list">
        <h3>Todo List</h3>
        <div class="list">
          <ListForm :items="todo_asc" @remove-todo="removeTodo" />
        </div>
      </section>
    </main>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from "vue";

// Components
import ListForm from "src/components/ListForm.vue";

// Firebase
import {
  createData,
  readData,
  deleteData,
  updateData,
} from "/src/boot/firebase";

// Array
const todos = ref([]);
const name = ref("");

// Load data from database
const loadDatas = async () => {
  // Call from firebase
  try {
    console.log("Nico render");
    const datas = await readData();
    todos.value = datas;
  } catch (e) {
    console.log(e);
  }
};

// Compute sorting
const todo_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.data.createdAt - a.data.createdAt;
  })
);

// Add new list to database
const addTodo = async (content, category) => {
  if (content.value.trim() === "" || category.value === null) {
    return;
  }

  const content_data = content.value;
  const category_data = category.value;
  const status = false;
  const time = new Date().getTime();

  // Insert new data to database
  await createData(content_data, category_data, status, time);
  // Call load datas function to refresh array
  loadDatas();
};

// Remove data
const removeTodo = async (todo) => {
  // Filter data
  // todos.value = todos.value.filter(t => t !== todo)

  // Delete data from id
  await deleteData(todo.id);
  loadDatas();
};

// Watch array changes
watch(
  todos,
  (newVal) => {
    newVal.forEach((todo, i) => {
      const { id, data } = todo;
      updateData(id, data);
    });
  },
  { deep: true }
);

// Watch name changes
watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

// Run some function when render the page
onMounted(async () => {
  console.log("Nico");
  await loadDatas();
  name.value = localStorage.getItem("name") || "";
});

export default defineComponent({
  name: "IndexPage",
  components: {
    ListForm,
  },
});
</script>
