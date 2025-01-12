<template>
    <div class="container my-5">
        <h1 class="text-center text-dark mb-4">Add New Task</h1>
        <form @submit.prevent="submitForm" class="p-3">
            <!-- input pro vlastnost title -->
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

            <!-- input pro vlastnost content -->
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

            <!-- rozevírací seznam pro vlastnost state -->
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

            <!-- tlačítka pro přidání objektu, nebo návrat zpět -->
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
import { useRouter } from "vue-router"; 
import TodoService from "../services/todoService.js";

const router = useRouter();
const task = ref({
    title: "",
    content: "",
    state: "open",
});

// metoda pro přidání nového objektu do DB
const submitForm = async () => {
    try {
        await TodoService.create(task.value);
        alert("Task added successfully!");
        router.push("/task-board");
    } catch (error) {
        console.error("Error adding task:", error);
        alert("Failed to add task. Check console for details.");
    }
};

// metoda pro návrat na předchozí stránku
const goBack = () => {
    router.back(); 
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
