<script setup lang="ts">
import { Status } from '../validation';

    defineProps<{
        name: string
        modelValue: string
        status?: Status
        type: string
    }>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()

function handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value
    emit('update:modelValue', value)
}
</script>

<template>
    <div class="field">
        <label class="label" for="name">{{ name }}</label>
        <div class="control">
            <input 
            class="input" 
            :type="type" 
            :id="name" 
            :value="modelValue"
            @input="handleInput"
            />
        </div>
        
        <p class="is-danger help" v-if="!status?.valid">
            {{ status?.message }}
        </p>
    </div>
</template>