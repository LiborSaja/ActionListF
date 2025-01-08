<template>
    <div class="container-fluid">
        <div class="row">
            <h1>Task Board</h1>
            <hr />
        </div>
        <div class="row align-items-center">
            <!-- Tlačítko -->
            <div class="col-auto">
                <button class="btn btn-success">Add new task +</button>
            </div>

            <!-- Vyhledávání -->
            <div class="col-auto position-relative">
                <label for="find-task" class="form-label mb-0 me-2">
                    Find task by ID:
                </label>
            </div>
            <div class="col">
                <div class="position-relative">
                    <input
                        type="text"
                        id="find-task"
                        class="form-control"
                        placeholder="Enter task ID"
                        v-model="searchQuery" />
                    <button
                        class="cross"
                        v-if="searchQuery"
                        @click="clearSearch">
                        X
                    </button>
                </div>
            </div>
            <!-- Filtrace -->
            <div class="col-auto ms-auto d-flex align-items-center">
                <span class="me-2">Filtered by:</span>
                <select name="status" id="status" class="form-select w-auto">
                    <option value="all" selected>All</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In progress</option>
                    <option value="finished">Finished</option>
                </select>
            </div>
        </div>

        <div class="row my-3">
            <TaskCard></TaskCard>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import TaskCard from "./TaskCard.vue";

// Reaktivní proměnná pro hodnotu inputu
const searchQuery = ref("");

// Funkce pro vyčištění inputu
const clearSearch = () => {
    searchQuery.value = "";
};
</script>

<style>
.cross {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 0;
    font-size: 16px;
    cursor: pointer;
}
</style>
