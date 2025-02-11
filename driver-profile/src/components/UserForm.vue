<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FormInput from "./FormInput.vue";
import { validate, length, requiredInput } from "../validation";
import { NewUser } from "../users"

const props = defineProps < {
    error?: string;
    showRequired?: boolean;
}>()

const emit = defineEmits < {
    (event: 'submit', payload: NewUser): void
}>()

const username = ref('');

let showErrors: boolean = false;

watch(username, async (newval, oldval) => {
    if (newval && !oldval) {
        showErrors = true;
    } else {
        showErrors = false;
    }

})



const usernameStatus = computed(() => {
    if (props.showRequired) {
        return validate(username.value, [requiredInput, length({ min: 5, max: 10 })])
    } else {
        return validate(username.value, [length({ min: 5, max: 10 })])
    }
});

const password = ref('');

const passwordStatus = computed(() => {
    if (props.showRequired) {
        return validate(password.value, [requiredInput, length({ min: 10, max: 40 })])
    } else {
        return validate(password.value, [length({ min: 10, max: 40 })])
    }
});

const isInvalid = computed(() => {
    return (!usernameStatus.value.valid || !passwordStatus.value.valid)
});

async function handleSubmit() {
    console.log('handleSubmit called for userForm');
    if (isInvalid.value) {
        usernameStatus;
        return;
    }

    const newUser: NewUser = {
        username: username.value,
        password: password.value,
    }

    try {
        emit('submit', newUser);
    } catch (e) {

    }
}
</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
        <FormInput data-testid="username" name="Username" type="text" v-model="username" :status="usernameStatus"/>
        <FormInput data-testid="password" name="Password" type="password" v-model="password" :status="passwordStatus" />
        <div v-if="error" class="is-danger help">
            {{ error }}
        </div>
        <button class="button" :disabled="isInvalid">
            Submit
        </button>    
    </form>
</template>

<style scoped>
    .form {
        background: #FFF;
        padding: 30px;
        margin-top: 50px;
    }
</style>
