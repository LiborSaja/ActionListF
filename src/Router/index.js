import { createRouter, createWebHistory } from "vue-router";
import AboutPage from "../components/AboutPage.vue";
import HowToUsePage from "../components/HowToUsePage.vue";
import TaskBoardPage from "../components/TaskBoardPage.vue";

const routes = [
    { path: "/", redirect: "/about" },
    { path: "/about", component: AboutPage },
    { path: "/how-to-use", component: HowToUsePage },
    { path: "/task-board", component: TaskBoardPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
