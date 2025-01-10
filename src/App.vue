<template>
    <div class="container-fluid vh-100">
        <div class="row h-100">
            <!-- Vertikální menu -->
            <nav
                class="col-3 col-md-2 mybg text-white d-flex flex-column align-items-center p-3">
                <h2 class="mb-4">ACTIONLIST</h2>
                <ul class="nav flex-column w-100">
                    <li class="nav-item mb-2">
                        <router-link
                            to="/about"
                            class="nav-link text-white"
                            active-class="active-link">
                            About
                        </router-link>
                    </li>
                    <li class="nav-item mb-2">
                        <router-link
                            to="/how-to-use"
                            class="nav-link text-white"
                            active-class="active-link">
                            How to use
                        </router-link>
                    </li>
                    <li class="nav-item mb-2">
                        <router-link
                            to="/task-board"
                            class="nav-link text-white"
                            active-class="active-link">
                            Task board
                        </router-link>
                    </li>
                </ul>
                <p class="mt-auto">&copy; Libor Šaja 2025</p>
            </nav>

            <!-- Obsah -->
            <main class="container-fluid col-9 col-md-10 bg-light">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
h2 {
    font-size: 2.8vw;
}

.mybg {
    background: linear-gradient(135deg, #501176, #a649c0);
}

.nav {
    width: 100%;

    .nav-item {
        margin-bottom: 10px;

        .nav-link {
            display: block;
            text-decoration: none;
            color: white;
            font-size: 1vw;
            padding: 10px 15px;
            border-radius: 5px;
            transition: all 0.3s ease;

            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }

    .active-link {
        background: #440868;
        color: white;
        font-size: 1.5vw;
        border-radius: 5px;
        padding: 10px 15px;
        text-decoration: none;

        &:hover {
            color: #4a148c;
        }
    }
}
</style>
