<template>
    <div class="container">
        <h1>Add New Task</h1>
        <form @submit.prevent="submitForm">
            <!-- Title -->
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                    type="text"
                    id="title"
                    class="form-control"
                    v-model="task.title"
                    required />
            </div>
            <!-- Content -->
            <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea
                    id="content"
                    class="form-control"
                    v-model="task.content"
                    rows="3"
                    required></textarea>
            </div>
            <!-- State -->
            <div class="mb-3">
                <label for="state" class="form-label">State</label>
                <select
                    id="state"
                    class="form-select"
                    v-model="task.state"
                    required>
                    <option value="open">Open</option>
                    <option value="inprogress">In Progress</option>
                    <option value="finished">Finished</option>
                </select>
            </div>
            <!-- Submit -->
            <button type="submit" class="btn btn-primary">Add Task</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Použití Vue Routeru
import TodoService from "../services/todoService.js";

// Reaktivní proměnná pro nový úkol
const task = ref({
    title: "",
    content: "",
    state: "open",
});

// Použití Vue Routeru pro navigaci
const router = useRouter();

// Metoda pro odeslání úkolu
const submitForm = async () => {
    try {
        console.log("Submitting task:", task.value);
        await TodoService.create(task.value); // Odeslání na backend
        alert("Task added successfully!");

        // Přesměrování na stránku Task Board
        router.push("/task-board");
    } catch (error) {
        console.error("Error adding task:", error);
        alert("Failed to add task. Check console for details.");
    }
};
</script>

<style>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}
</style>
