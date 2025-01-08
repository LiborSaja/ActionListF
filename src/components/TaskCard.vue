<template>
    <div class="card shadow-lg p-4 mb-4 bg-white rounded">
        <div class="card-header text-center text-dark bg-warning">
            <h3 class="card-title">{{ title }}Do something</h3>
        </div>
        <div class="card-body">
            <p class="mb-2">
                <strong>State:</strong>
                <span class="badge bg-success">{{ state }} Finished</span>
            </p>
            <p><strong>Description:</strong></p>
            <div class="description-container">
                <p>
                    {{ content }} Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Asperiores, dicta aliquam, quaerat nam
                    autem exercitationem saepe laborum id officia, fuga illum
                    aliquid expedita dolorem possimus itaque! Neque, ullam
                    voluptates. Fuga dolore hic maxime accusantium eos
                    laudantium expedita cum error quo tenetur quibusdam omnis
                    obcaecati eaque quidem, vel rem repellendus maiores.
                </p>
            </div>
            <p class="mt-3">
                <strong>ID:</strong>
                <span class="text-muted">
                    {{ id }} bd3e82ce-6643-4851-8755-324c4da7c680
                </span>
            </p>
            <p>
                <strong>Created:</strong>
                <span class="text-muted">{{ createdDate }} 21-05-2024</span>
            </p>
        </div>
        <div
            class="card-footer d-flex justify-content-between bg-light rounded-bottom">
            <button class="btn btn-primary">Update</button>
            <button class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardComponent",
    props: {
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
    },
};
</script>

<style>
.card {
    max-width: 22rem;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
    font-weight: bold;
}

.description-container {
    max-height: 10em;
    overflow-y: auto;
    background-color: #f8f9fa;
    border: 1px solid #e0e0e0;
    padding: 10px;
    border-radius: 5px;
}

.card-footer button {
    width: 48%;
}

.card-footer {
    border-top: 1px solid #e0e0e0;
}
</style>
