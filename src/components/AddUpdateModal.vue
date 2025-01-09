<template>
    <div v-show="isOpen" class="modal-overlay" tabindex="-1" role="dialog">
        <div class="modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Action</h5>
                    <!-- Univerzální název -->
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="closeModal">
                        ✖
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="task-title" class="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                id="task-title"
                                class="form-control"
                                v-model="task.title"
                                placeholder="Enter task title"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="task-content" class="form-label">
                                Content
                            </label>
                            <textarea
                                id="task-content"
                                class="form-control"
                                v-model="task.content"
                                rows="3"
                                placeholder="Enter task description"
                                required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="task-state" class="form-label">
                                State
                            </label>
                            <select
                                id="task-state"
                                class="form-select"
                                v-model="task.state"
                                required>
                                <option value="open">Open</option>
                                <option value="inprogress">In Progress</option>
                                <option value="finished">Finished</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="closeModal">
                        Cancel
                    </button>
                    <button
                        type="button"
                        class="btn btn-success"
                        @click="confirmAction">
                        Confirm
                        <!-- Univerzální tlačítko -->
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from "vue";

// Props
defineProps({
    isOpen: {
        type: Boolean,
        default: false, // Výchozí hodnota pro zamezení problémů
    },
    initialTask: {
        type: Object,
        default: () => ({ title: "", content: "", state: "open" }), // Výchozí hodnoty
    },
});

// Emits
const emit = defineEmits(["close", "save"]);

// Reaktivní kopie úkolu
//const task = reactive({ ...initialTask });
const task = reactive({
    title: "",
    content: "",
    state: "open",
});

// Sleduj změny v `initialTask` a synchronizuj s `task`
watch(
    () => initialTask,
    (newTask) => {
        console.log("Updated initialTask in AddUpdateModal:", newTask);
        Object.assign(task, newTask);
    },
    { deep: true }
);

// Uzavření modálního okna
const closeModal = () => {
    emit("close");
};

// Uložení úkolu
const confirmAction = () => {
    emit("save", { ...task });
    closeModal();
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
}

.modal-dialog-centered {
    background: white;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    animation: fadeIn 0.3s ease-in-out;
}

.modal-header,
.modal-footer {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    padding: 1.5rem;
}

.modal-footer button {
    min-width: 100px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
