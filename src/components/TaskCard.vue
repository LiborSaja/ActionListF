<template>
    <div class="card shadow-lg p-4 mb-4 bg-white rounded">
        <div
            class="card-header text-center text-dark"
            :class="stateHeaderClass">
            <!-- Zobrazení nebo editace titulu -->
            <template v-if="!isEditing">
                <h3 class="card-title">{{ title }}</h3>
            </template>
            <template v-else>
                <input
                    type="text"
                    class="form-control"
                    v-model="editedTask.title"
                    ref="titleInput" />
            </template>
        </div>
        <div class="card-body">
            <!-- Stav -->
            <p class="mb-2">
                <strong>State:&nbsp;</strong>
                <template v-if="!isEditing">
                    <span class="badge bg-success" :class="stateBadgeClass">
                        {{ state }}
                    </span>
                </template>
                <template v-else>
                    <select class="form-select" v-model="editedTask.state">
                        <option value="open">Open</option>
                        <option value="inprogress">In Progress</option>
                        <option value="finished">Finished</option>
                    </select>
                </template>
            </p>
            <!-- Popis -->
            <div class="description-container">
                <p><strong>Description:</strong></p>
                <template v-if="!isEditing">
                    <p>{{ content }}</p>
                </template>
                <template v-else>
                    <textarea
                        class="form-control"
                        v-model="editedTask.content"
                        rows="3"></textarea>
                </template>
            </div>
            <p class="mt-3">
                <strong>ID:&nbsp;</strong>
                <span class="text-muted">{{ id }}</span>
            </p>
            <p>
                <strong>Created:&nbsp;</strong>
                <span class="text-muted">
                    {{ createdDate || "No date available" }}
                </span>
            </p>
        </div>
        <div
            class="card-footer d-flex justify-content-between bg-light rounded-bottom">
            <!-- Zobrazení -->
            <template v-if="!isEditing">
                <button class="btn btn-outline-primary" @click="startEdit">
                    Update
                </button>
                <button
                    class="btn btn-outline-danger"
                    @click="$emit('delete-task')">
                    Delete
                </button>
            </template>
            <!-- Editace -->
            <template v-else>
                <button class="btn btn-secondary" @click="cancelEdit">
                    Cancel
                </button>
                <button class="btn btn-success" @click="saveEdit">Save</button>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineProps } from "vue";

// Definování props
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
        required: true,
    },
});

// Emits
const emit = defineEmits(["delete-task", "update-task"]);
const titleInput = ref(null);
// Reaktivní stav
const isEditing = ref(false);
const editedTask = ref({});

// Funkce pro přepínání režimů
const startEdit = () => {
    isEditing.value = true;
    editedTask.value = {
        title: props.title,
        state: props.state, // Textová reprezentace (např. "Open")
        content: props.content,
        id: props.id,
    };
    // Po krátké prodlevě zaostřete na input
    setTimeout(() => {
        titleInput.value?.focus();
    }, 0);
};

const cancelEdit = () => {
    isEditing.value = false;
    editedTask.value = {};
};

const saveEdit = () => {
    emit("update-task", {
        ...editedTask.value,
        state: editedTask.value.state, // Textová reprezentace
    });
    isEditing.value = false; // Přepneme zpět na režim zobrazení
};

const stateHeaderClass = computed(() => {
    switch (props.state.toLowerCase()) {
        case "open":
            return "text-white bg-danger";
        case "inprogress":
            return "text-dark bg-warning";
        case "finished":
            return "text-white bg-success";
        default:
            return "bg-light";
    }
});

const stateBadgeClass = computed(() => {
    switch (props.state.toLowerCase()) {
        case "open":
            return "bg-danger";
        case "inprogress":
            return "bg-warning";
        case "finished":
            return "bg-success";
        default:
            return "bg-secondary";
    }
});
</script>

<style>
.card {
    width: 100%;
    max-width: 22rem;
    height: 33rem;
    border: 1px solid black;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .card-header {
        font-weight: bold;
    }

    .description-container {
        height: 9rem;
        overflow-y: auto;
        background-color: #f8f9fa;
        border: 1px solid #e0e0e0;
        padding: 10px;
        border-radius: 5px;
    }

    .card-footer {
        button {
            width: 48%;
        }
    }
}
</style>
