<template>
    <h1 class="text-center mt-3">How to not Use</h1>
    <hr />
    <div class="container-fluid">
        <div id="carouselExampleCaptions" class="carousel slide">
            <!-- obsah carouselu -->
            <div class="carousel-inner">
                <div
                    v-for="(slide, index) in slides"
                    :key="index"
                    class="carousel-item"
                    :class="{ active: index === 0 }"
                    :data-bs-slide-to="index">
                    <img
                        :src="slide.image"
                        class="d-block w-100"
                        :alt="slide.alt" />
                </div>
            </div>
            <!-- ovládací tlačítka -->
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <!-- text pod carouselem -->
        <div class="text-box mt-4 p-1 m-1">
            <h5 class="text-center text-light">{{ currentCaption }}</h5>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// data pro jednotlivé slidy
const slides = ref([
    {
        image: "/action.jpg",
        alt: "start",
        caption:
            "Welcome to the image guide of the application. In a few slides, you will learn the basics of using this application.",
    },
    {
        image: "/task_board.jpg",
        alt: "task_board",
        caption:
            "This is the main page where all interactions with the application are possible - Task Board. To get started, you can click on the 'Add new Task +' button.",
    },
    {
        image: "/add.jpg",
        alt: "add",
        caption:
            "You will be redirected to a form where you fill in the details - task title, task content, and select the task status. Then click 'Add task' and the task will be added to the database and displayed on the Task Board. Alternatively, you can go back.",
    },
    {
        image: "/search.jpg",
        alt: "search",
        caption:
            "To search for a task by ID, simply enter the ID in the search field and click the 'Search' button. To clear the search field, you can use the 'X', it will reset searching as well.",
    },
    {
        image: "/filter.jpg",
        alt: "filter",
        caption:
            "You can use the drop-down list to filter. You can filter by task statuses. The default value is 'All'.",
    },
    {
        image: "/update.jpg",
        alt: "update",
        caption:
            "If you need to edit a task, click the 'Update' button, this will change the task properties to an input field and a drop-down list. To save the changes, click 'Save'. Alternatively, you can cancel the changes.",
    },
    {
        image: "/delete.jpg",
        alt: "delete",
        caption:
            "To delete a task click on the 'Delete' button and confirm or cancel your action.",
    },
]);

// aktuální index a dynamický popis
const currentIndex = ref(0);
const currentCaption = computed(() => slides.value[currentIndex.value].caption);

// sledování aktuálního slidu pro aktualizaci popisku
onMounted(() => {
    const carousel = document.getElementById("carouselExampleCaptions");
    if (carousel) {
        carousel.addEventListener("slid.bs.carousel", updateCaption);
    }
});

// aktualizace aktuálního indexu při změně slidu
const updateCaption = (e) => {
    const activeElement = e.relatedTarget;
    const newIndex = Array.from(activeElement.parentNode.children).indexOf(
        activeElement
    );
    currentIndex.value = newIndex;
};
</script>

<style>
.carousel-inner {
    max-height: 33rem;

    img {
        object-fit: cover;
        height: 100%;
    }
}

.text-box {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    font-size: 1rem;
    text-align: center;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    filter: brightness(0) saturate(100%);
    width: 3rem;
    height: 3rem;
}

.carousel-control-prev {
    left: -3rem;
}

.carousel-control-next {
    right: -3rem;
}
</style>
