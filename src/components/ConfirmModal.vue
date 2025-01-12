<template>
    <div v-if="isOpen" class="modal-overlay" tabindex="-1" role="dialog">
        <div class="modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <p class="text-center">{{ message }}</p>
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
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(["close", "confirm"]);

// props
defineProps({
    isOpen: Boolean,
    title: {
        type: String,
        default: "Confirm Action",
    },
    message: {
        type: String,
        default: "Are you sure you want to perform this action?",
    },
});

// metoda zavření okna
const closeModal = () => {
    emit("close");
};

// metoda potvrzení akce
const confirmAction = () => {
    emit("confirm");
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

    .modal-dialog-centered {
        background: white;
        border-radius: 8px;
        max-width: 400px;
        width: 100%;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        animation: fadeIn 0.3s ease-in-out;

        .modal-header {
            background-color: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-body {
            padding: 1.5rem;
            font-size: 1rem;
            color: #212529;
        }

        .modal-footer {
            background-color: #f8f9fa;
            border-top: 1px solid #dee2e6;
            padding: 1rem;
            display: flex;
            justify-content: space-between;

            button {
                min-width: 100px;
            }
        }
    }
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
