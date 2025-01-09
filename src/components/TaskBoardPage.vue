<template>
    <div class="container-fluid">
        <div class="row">
            <h1>Task Board</h1>
            <hr />
        </div>
        <div class="row align-items-center">
            <!-- Tlačítko -->
            <div class="col-auto">
                <button class="btn btn-success" @click="openAddModal">
                    Add new task +
                </button>
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
                <select
                    name="status"
                    id="status"
                    class="form-select w-auto"
                    v-model="filterState"
                    @change="fetchTasks">
                    <option value="all" selected>All</option>
                    <option value="open">Open</option>
                    <option value="inprogress">In Progress</option>
                    <option value="finished">Finished</option>
                </select>
            </div>
        </div>
        <hr />
        <!-- Generování karet -->
        <div class="row">
            <div v-if="errorMessage" class="alert alert-warning text-center">
                {{ errorMessage }}
            </div>
        </div>
        <div class="card-cont row my-3">
            <div class="col-md-4 mb-4" v-for="task in tasks" :key="task.id">
                <TaskCard
                    :title="task.title"
                    :state="task.state"
                    :content="task.content"
                    :id="task.id"
                    :createdDate="formatDate(task.created)"
                    @delete-task="confirmDelete(task.id)"
                    @edit-task="openUpdateModal(task)" />
            </div>
        </div>
        <!-- Modální okno -->
        <ConfirmModal
            :isOpen="isModalOpen"
            title="Confirm Delete"
            message="Are you sure you want to delete this task?"
            @close="closeModal"
            @confirm="deleteTask" />

        <!-- <AddUpdateModal
            :isOpen="isAddUpdateModalOpen"
            :initialTask="currentTask"
            @close="isAddUpdateModalOpen = false"
            @save="saveTask" /> -->
    </div>
</template>

<script setup>
import { ref } from "vue";
import TaskCard from "./TaskCard.vue";
import TodoService from "../services/todoService.js";
import ConfirmModal from "../components/ConfirmModal.vue";
import AddUpdateModal from "./AddUpdateModal.vue";

// Reaktivní proměnné
const tasks = ref([]);
const filterState = ref("all");
const searchQuery = ref("");
const isModalOpen = ref(false); // Stav modálního okna
const taskIdToDelete = ref(null); // ID úkolu k odstranění
const errorMessage = ref(""); // Chybová zpráva
const isAddUpdateModalOpen = ref(false);
const modalTitle = ref("Add/Update Task"); // Výchozí hodnota pro titulek
const confirmButtonText = ref("Save"); // Výchozí text pro tlačítko
const currentTask = ref({ title: "", content: "", state: "open" });
const isEditing = ref(false); // True = update, False = add

// Načtení dat z backendu
const fetchTasks = async () => {
    try {
        let response;

        // Vymazání chybové zprávy při každém volání
        errorMessage.value = "";

        if (filterState.value === "all") {
            response = await TodoService.getAll();
        } else {
            response = await TodoService.getFiltered(filterState.value);
        }

        // Zkontroluj odpověď
        if (response && response.length > 0) {
            tasks.value = response; // Pokud existují úkoly, ulož je
        } else {
            tasks.value = []; // Vyčisti seznam úkolů
            errorMessage.value = "No tasks found for the selected filter."; // Nastav zprávu
        }
    } catch (error) {
        // Zpracování chybové odpovědi z backendu
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            errorMessage.value = error.response.data.error.message; // Nastav zprávu z backendu
        } else {
            errorMessage.value = "An unexpected error occurred.";
        }

        // Vyčisti seznam úkolů
        tasks.value = [];
    }
};

const openAddModal = () => {
    currentTask.value = { title: "", content: "", state: "open" }; // Výchozí hodnoty nového úkolu
    isAddUpdateModalOpen.value = true; // Otevře modální okno
};

const openUpdateModal = (task) => {
    currentTask.value = { ...task };
    isEditing.value = true; // Úprava
    isAddUpdateModalOpen.value = true;
};

// Uložení nového nebo upraveného úkolu
const saveTask = async (task) => {
    try {
        await TodoService.create(task); // Odeslání na endpoint
        await fetchTasks(); // Aktualizace seznamu úkolů
        isAddUpdateModalOpen.value = false; // Zavření modálního okna
    } catch (error) {
        console.error("Error creating task:", error);
    }
};

// Vyčištění vyhledávání
const clearSearch = () => {
    searchQuery.value = "";
};

// Formátování data pro zobrazení
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const datePart = date.toLocaleDateString(); // Získá datum (např. "8.1.2025")
    const timePart = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    }); // Získá čas (např. "14:30")
    return `${datePart} ${timePart}`; // Spojení data a času
};

// Potvrzení odstranění
const confirmDelete = (id) => {
    taskIdToDelete.value = id;
    isModalOpen.value = true;
};

// Uzavření modálního okna
const closeModal = () => {
    isModalOpen.value = false;
    taskIdToDelete.value = null;
};

// Odstranění úkolu
const deleteTask = async () => {
    try {
        await TodoService.deleteById(taskIdToDelete.value); // Zavolání metody pro odstranění
        tasks.value = tasks.value.filter(
            (task) => task.id !== taskIdToDelete.value
        ); // Aktualizace seznamu
        closeModal(); // Zavření modálního okna
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

// Načti data při načtení komponenty
fetchTasks();
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

.card-cont {
    height: 32rem;
    overflow-y: auto;
}
</style>
