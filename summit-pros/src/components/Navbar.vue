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
                <v-btn
                    to="/maintenance/properties">
                    Properties
                </v-btn>
                <v-btn
                    to="/posts/new">
                    New Posts
                </v-btn>
                <v-btn
                    @click="logout">
                    Log Out
                </v-btn>
            </div>

            <div 
                v-else
                class="buttons">
                <v-btn
                    id="sign-up"
                    @click="modal.showModal('signUp')">
                    Sign Up
                </v-btn>
                <v-btn
                    id="sign-in"
                    @click="modal.showModal('signIn')">
                    Sign In
                </v-btn>
            </div>
            
        </div>
    </div>

    <Teleport to="#modal">
        <component :is="modal.component.value" />
    </Teleport>
</template>