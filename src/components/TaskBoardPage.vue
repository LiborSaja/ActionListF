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

            <!-- Filtrace -->
            <div class="col-auto ms-auto">
                <div class="d-flex align-items-center">
                    <span class="me-2">Filtered by:</span>
                    <select
                        name="status"
                        id="status"
                        class="form-select w-auto">
                        <option value="all" selected>All</option>
                        <option value="open">Open</option>
                        <option value="in-progress">In progress</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="my-3">
            <TaskCard></TaskCard>
        </div>
    </div>
</template>

<script>
import TaskCard from "./TaskCard.vue";
export default {
    name: "TaskBoardPage",
    components: {
        TaskCard,
    },
};
</script>

<style></style>
