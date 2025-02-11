<script setup lang="ts">
import { useRouter } from "vue-router";
import { useModal } from "../composables/modal";
import { useUsers } from "../stores/users";
import SignupForm from "./UserForm.vue";


const modal = useModal();
const usersStore = useUsers();
const router = useRouter();

async function logout() {
    await usersStore.logout();
    router.push({ path: "/" });
}
</script>

<template>
    <div class="navbar">
        <div class="navbar-end">
            <div
                v-if="usersStore.currentUserId" 
                class="buttons">
                <RouterLink to="/driver-profile" class="button">Driver</RouterLink>
                <RouterLink to="/posts/new" class="button">New Post</RouterLink>
                <button 
                id="logout"
                class="button is-light"
                @click="logout()"
                >Log Out</button>
            </div>

            <div 
                v-else
                class="buttons">
                <button 
                id="sign-up"
                class="button is-light is-normal"
                @click="modal.showModal('signUp')"
                >Sign Up</button>
                <button 
                data-testid="sign-in"
                class="button is-light is-normal"
                @click="modal.showModal('signIn')"
                >Sign In</button>
            </div>
        </div>
    </div>

    <Teleport to="#modal">
        <component :is="modal.component.value" />
    </Teleport>
</template>