<template>
    <div class="card shadow-lg p-4 mb-4 bg-white rounded">
        <div class="card-header text-center text-dark bg-warning">
            <h3 class="card-title">{{ title }}</h3>
        </div>
        <div class="card-body">
            <p class="mb-2">
                <strong>State:&nbsp;</strong>
                <span class="badge bg-success">{{ state }}</span>
            </p>
            <div class="description-container">
                <p><strong>Description:</strong></p>
                <p>
                    {{ content }}
                </p>
            </div>
            <p class="mt-3">
                <strong>ID:&nbsp;</strong>
                <span class="text-muted">
                    {{ id }}
                </span>
            </p>
            <p>
                <strong>Created:&nbsp;</strong>
                <span class="text-muted">{{ createdDate }}</span>
            </p>
        </div>
        <div
            class="card-footer d-flex justify-content-between bg-light rounded-bottom">
            <button
                class="btn btn-primary"
                @click="$emit('edit-task', { id, title, content, state })">
                Update
            </button>
            <button class="btn btn-danger" @click="$emit('delete-task')">
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

// Definování props
defineProps({
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
</script>

<style>
.card {
    max-width: 22rem;
    height: 29rem; /* Minimální výška karty pro jednotný vzhled */
    border: 1px solid black;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
    font-weight: bold;
}

.description-container {
    height: 8rem; /* Maximální výška popisu */
    overflow-y: auto; /* Rolování při překročení výšky */
    background-color: #f8f9fa;
    border: 1px solid #e0e0e0;
    padding: 10px;
    border-radius: 5px;
}

.description-container p {
    margin: 0; /* Odstranění zbytečného odsazení */
}

.card-footer button {
    width: 48%;
}

.card-footer {
    border-top: 1px solid #e0e0e0;
}
</style>
