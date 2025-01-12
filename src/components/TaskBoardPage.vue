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
const isModalOpen = ref(false);
const taskIdToDelete = ref(null);
const errorMessage = ref("");
const loading = ref(false);
const stateMap = {
    1: "Open",
    2: "InProgress",
    3: "Finished",
    open: "Open",
    inprogress: "InProgress",
    finished: "Finished",
};

// asynchronní načítání objektů na základě aktuálního filtru
const fetchTasks = async () => {
    try {
        errorMessage.value = "";
        const response =
            filterState.value === "all"
                ? await TodoService.getAll()
                : await TodoService.getFiltered(filterState.value);
        tasks.value = response;
    } catch (error) {
        errorMessage.value = handleAxiosError(error);
        tasks.value = [];
    } finally {
        loading.value = false;
    }
};

// zpracování chyb přicházejících z backendu
const handleAxiosError = (error) => {
    if (error.response?.data?.error) {
        return `${error.response.data.error.code}: ${error.response.data.error.message}`;
    }
    return error.message || "An unexpected error occurred.";
};

// vyčištění vyhledávacího pole
const clearSearch = () => {
    searchQuery.value = "";
    errorMessage.value = "";
    filterState.value = "all";
    fetchTasks();
};

// formát data na ISO
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return isNaN(date)
        ? "Invalid Date"
        : `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })}`;
};

// potvrzení odstranění objektu
const confirmDelete = (id) => {
    taskIdToDelete.value = id;
    isModalOpen.value = true;
};

// uzavření modálního okna
const closeModal = () => {
    isModalOpen.value = false;
    taskIdToDelete.value = null;
};

// odstranění úkolu dle id
const deleteTask = async () => {
    try {
        await TodoService.deleteById(taskIdToDelete.value);
        tasks.value = tasks.value.filter(
            (task) => task.id !== taskIdToDelete.value
        );
        errorMessage.value =
            tasks.value.length === 0
                ? "404002: No tasks found in the database."
                : "";
    } finally {
        closeModal();
    }
};

// vyhledání úkolu podle ID
const findTaskById = async () => {
    if (!searchQuery.value) return;
    loading.value = true;
    errorMessage.value = "";
    try {
        const task = await TodoService.getById(searchQuery.value);
        tasks.value = [task];
    } catch (error) {
        errorMessage.value = handleAxiosError(error);
        tasks.value = [];
    } finally {
        loading.value = false;
    }
};

// vrací aktuální seznam úkolů, computed -> automatická aktualizace
const displayTasks = computed(() => {
    return tasks.value;
});

// úparava objektu dle id
const updateTask = async (updatedTask) => {
    try {
        const taskToUpdate = {
            ...updatedTask,
            state: updatedTask.state.toLowerCase(),
        };

        const response = await TodoService.updateById(
            taskToUpdate.id,
            taskToUpdate
        );

        const index = tasks.value.findIndex((task) => task.id === response.id);
        if (index !== -1) {
            tasks.value[index] = {
                ...response,
                state: stateMap[response.state],
                created: tasks.value[index].created, // Zachování původního `created`
            };
        }
    } catch (error) {
        if (error.response?.data?.error?.details) {
            errorMessage.value = error.response.data.error.details.join("\n");
        } else {
            errorMessage.value = handleAxiosError(error);
        }
    }
};

// načte objekty při načtení komponenty
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
