<template>
    <div class="container-fluid">
        <div class="row">
            <h1 class="text-center mt-2">Task Board</h1>
            <hr />
        </div>
        <div class="row g-3 align-items-center">
            <!-- tlačítko add -->
            <div class="col-4 col-md-2">
                <button
                    class="btn btn-success w-100"
                    @click="$router.push('/add-task')">
                    Add New Task +
                </button>
            </div>

            <!-- vyhledávání -->
            <div class="col-8 col-md-6">
                <div class="input-group">
                    <input
                        type="text"
                        id="find-task"
                        class="form-control"
                        placeholder="Enter task ID"
                        v-model="searchQuery" />
                    <button class="btn btn-primary" @click="findTaskById">
                        Search
                    </button>
                    <button
                        class="btn btn-outline-secondary"
                        v-if="searchQuery"
                        @click="clearSearch">
                        X
                    </button>
                </div>
            </div>

            <!-- filtrace -->
            <div class="col-12 col-md-4">
                <div
                    class="d-flex flex-column flex-md-row align-items-md-center">
                    <span class="me-md-2 mb-2 mb-md-0">Filtered by:</span>
                    <select
                        name="status"
                        id="status"
                        class="form-select w-100"
                        v-model="filterState"
                        @change="fetchTasks">
                        <option value="all" selected>All</option>
                        <option value="open">Open</option>
                        <option value="inprogress">In Progress</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>
            </div>
        </div>

        <hr />
        <!-- generování objektů -->
        <div class="row">
            <div
                v-if="errorMessage"
                class="alert alert-warning d-flex justify-content-between align-items-center">
                <span>{{ errorMessage }}</span>
                <button
                    class="btn btn-sm btn-secondary ms-3"
                    @click="clearSearch">
                    Reset
                </button>
            </div>
        </div>
        <div class="card-cont row">
            <div
                v-for="task in displayTasks"
                :key="task.id"
                class="col-12 col-md-6 col-lg-4 mb-4">
                <TaskCard
                    :title="task.title"
                    :state="task.state"
                    :content="task.content"
                    :id="task.id"
                    :createdDate="formatDate(task.created)"
                    @delete-task="confirmDelete(task.id)"
                    @update-task="updateTask" />
            </div>
        </div>

        <!-- modál konfirmační okno -->
        <ConfirmModal
            :isOpen="isModalOpen"
            title="Confirm Delete"
            message="Are you sure you want to delete this task?"
            @close="closeModal"
            @confirm="deleteTask" />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TaskCard from "./TaskCard.vue";
import TodoService from "../services/todoService.js";
import ConfirmModal from "../components/ConfirmModal.vue";

// reaktivní proměnné
const tasks = ref([]);
const filterState = ref("all");
const searchQuery = ref("");
const isModalOpen = ref(false); // Stav modálního okna
const taskIdToDelete = ref(null); // ID úkolu k odstranění
const errorMessage = ref(""); // Chybová zpráva
const loading = ref(false); // Stav načítání

const stateMap = {
    1: "Open",
    2: "InProgress",
    3: "Finished",
    open: "Open",
    inprogress: "InProgress",
    finished: "Finished",
};

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

        // Debugovací výpis odpovědi
        console.log("Response from backend:", response);

        // Zkontroluj odpověď
        if (response && response.length > 0) {
            tasks.value = response; // Pokud existují úkoly, ulož je
        } else {
            tasks.value = []; // Vyčisti seznam úkolů
            errorMessage.value = "No tasks found for the selected filter."; // Nastav zprávu
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);

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
    } finally {
        loading.value = false;
    }
};

// Vyčištění vyhledávacího pole
const clearSearch = () => {
    searchQuery.value = ""; // Vymazání vyhledávacího pole
    errorMessage.value = ""; // Vymazání chybové zprávy
    filterState.value = "all"; // Resetuje filtr na "all"
    fetchTasks(); // Obnovení celého seznamu úkolů
};

// Formátování data pro zobrazení
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    if (isNaN(date)) {
        return "Invalid Date"; // Vrátí zprávu, pokud je datum neplatné
    }
    const datePart = date.toLocaleDateString(); // Např. "9.1.2025"
    const timePart = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    }); // Např. "19:38"
    return `${datePart} ${timePart}`;
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

        // Pokud po odstranění není žádný úkol, nastavíme chybovou zprávu
        if (tasks.value.length === 0) {
            errorMessage.value = "No tasks found.";
        }

        closeModal(); // Zavření modálního okna
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

// Vyhledání úkolu podle ID
const findTaskById = async () => {
    if (!searchQuery.value) return; // Pokud není zadané ID, nedělej nic

    loading.value = true;
    errorMessage.value = ""; // Vymazání předchozí zprávy
    try {
        const task = await TodoService.getById(searchQuery.value);
        tasks.value = [task]; // Nahradí celý seznam pouze nalezeným úkolem
    } catch (error) {
        console.error("Error finding task:", error);
        if (
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.message
        ) {
            // Nastavení zprávy z backendu
            errorMessage.value = error.response.data.error.message;
        } else {
            // Obecná chyba
            errorMessage.value = "An unexpected error occurred.";
        }
        tasks.value = []; // Vyčistí seznam při chybě
    } finally {
        loading.value = false;
    }
};

// Výsledky k zobrazení
const displayTasks = computed(() => {
    return tasks.value; // Zobrazí všechny úkoly
});

const updateTask = async (updatedTask) => {
    try {
        const taskToUpdate = {
            ...updatedTask,
            state: updatedTask.state.toLowerCase(), // Převod state na text pro backend
        };

        const response = await TodoService.updateById(
            taskToUpdate.id,
            taskToUpdate
        );

        // Najdeme původní úkol, abychom zachovali hodnotu `created`
        const index = tasks.value.findIndex((task) => task.id === response.id);
        const originalTask = tasks.value[index];

        const updatedTaskWithTextState = {
            ...response,
            state: stateMap[response.state], // Mapování state zpět na text
            created: originalTask?.created || response.created, // Zachování původního created
        };

        if (index !== -1) {
            tasks.value[index] = updatedTaskWithTextState; // Aktualizace seznamu úkolů
        }
    } catch (error) {
        console.error("Chyba při aktualizaci úkolu:", error);
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
    height: 36em;
    overflow-y: auto;
}
</style>
