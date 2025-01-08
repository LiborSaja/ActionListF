<template>
    <div class="card shadow p-3 mb-4">
        <h3 class="text-center">{{ title }}Do something!</h3>
        <p>
            <strong>State:</strong>
            {{ state }}Open
        </p>
        <p><strong>Description:</strong></p>
        <div class="description-container">
            <p>
                {{ content }} Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Blanditiis perferendis quibusdam inventore
                impedit necessitatibus quam ipsam cum mollitia quaerat
                perspiciatis, minus dolore molestias suscipit culpa odio modi
                iusto dolor provident saepe repudiandae vero. Inventore porro
                saepe, ea sit placeat nemo esse accusamus numquam possimus error
                maxime eos fuga blanditiis eaque?
            </p>
        </div>
        <p>
            <strong>ID:bd3e82ce-6643-4851-8755-324c4da7c680</strong>
            {{ id }}
        </p>
        <p>
            <strong>Created: 21-05-2024</strong>
            {{ createdDate }}
        </p>
        <div class="d-flex justify-content-between mt-3">
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
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 20em;
    background-color: #fff;
}

.description-container {
    max-height: 100px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 4px;
}
</style>
