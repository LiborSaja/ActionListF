<template>
    <div class="container my-5">
        <h1 class="text-center text-dark mb-4">Add New Task</h1>
        <form @submit.prevent="submitForm" class="p-3">
            <!-- Title -->
            <div class="mb-4">
                <label for="title" class="form-label fw-bold">Task Title</label>
                <input
                    type="text"
                    id="title"
                    class="form-control border-primary"
                    placeholder="Enter task title"
                    v-model="task.title"
                    required />
            </div>

            <!-- Content -->
            <div class="mb-4">
                <label for="content" class="form-label fw-bold">Details</label>
                <textarea
                    id="content"
                    class="form-control border-primary"
                    placeholder="Enter task details"
                    v-model="task.content"
                    rows="4"
                    required></textarea>
            </div>

            <!-- State -->
            <div class="mb-4">
                <label for="state" class="form-label fw-bold">
                    Task Status
                </label>
                <select
                    id="state"
                    class="form-select border-primary"
                    v-model="task.state"
                    required>
                    <option value="open">Open</option>
                    <option value="inprogress">In Progress</option>
                    <option value="finished">Finished</option>
                </select>
            </div>

            <!-- Buttons -->
            <div class="d-flex justify-content-between mt-4">
                <button
                    type="button"
                    class="btn btn-outline-secondary px-4"
                    @click="goBack">
                    Back
                </button>
                <button type="submit" class="btn btn-success px-4">
                    Add Task
                </button>
            </div>
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

// Funkce pro návrat na předchozí stránku
const goBack = () => {
    router.back(); // Vrátí uživatele na předchozí stránku
};
</script>

<style>
.container {
    max-width: 800px;
    margin: 0 auto;
}

.border-primary {
    border: 2px solid #440868 !important;
    border-radius: 5px;

    &:focus {
        box-shadow: 0 0 5px rgba(68, 8, 104, 0.5);
        outline: none;
    }
}
</style>
