<script setup lang="ts">
import { ref } from 'vue';
import { useModal } from '../composables/modal';
import { useUsers } from '../stores/users';
import { NewUser } from '../users';
import UserForm from './UserForm.vue';

const usersStore = useUsers();
const modal = useModal();
const showError = ref(true);


async function handleSignUp(newUser: NewUser) {
    await usersStore.createUser(newUser);
    modal.hideModal();
}
    
</script>

<template>
    <UserForm @submit="handleSignUp" :show-required="showError" />
</template>