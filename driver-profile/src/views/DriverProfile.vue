<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import FormInput from "../components/FormInput.vue";
import { requiredInput, length, validate } from "../validation";
import { NewDriver } from "../driver";
import { driver } from "../stores/driver";
import counter from "../composables/useCounter";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from '@vuelidate/core'
 
const { increment, count } = counter();
const driverStore = driver();
console.log('driver', driverStore.firstName)


const emit = defineEmits < {
    (event: 'submit', payload: NewDriver): void
}>()

const firstname = ref<string>('');
const lastname = ref('');
const middlename = ref('');
const dob = ref('');
const startdate = ref('');
const custompersonid = ref('');
const eventid = ref('');
const emailaddress = ref('');

const firstnameStatus = computed(() => {
        return validate(firstname.value, [requiredInput])
});

const LastnameStatus = computed(() => {
        return validate(lastname.value, [requiredInput])
});

const state = reactive({
    email: ''
});

const rules = {
    email: { required, email } // Matches state.contact.email
}

const v$ = useVuelidate(rules, state)
console.log('$ is ', v$);

function handleSubmit() {
    const driver: NewDriver = {
        firstName: firstname.value,
        lastName: lastname.value,
        middleName: middlename.value,
        dob: dob.value,
        startDate: startdate.value,
        customPersonId: custompersonid.value,
        eventId: eventid.value,
        email: emailaddress.value,
    }

    try {
        emit('submit', driver);
        driverStore.createDriver(driver);
        increment();
        console.log(count.value)
    } catch (e) {

    }
}

</script>

<template>
    <h1 class="text-center">Driver Profile</h1>
        <div class="box-container fixed-grid has-3-cols">
            <form class="form driver-form" @submit.prevent="handleSubmit">
                <div class="columns">
                    <div class="column">
                        <div class="grid">
                            <div class="cell">
                            <FormInput 
                            data-testid="firstname" 
                            name="First Name" 
                            type="text" 
                            v-model="firstname" 
                            :status="firstnameStatus"/></div>
                            <div class="cell">
                                <FormInput 
                                data-testid="middlename" 
                                name="Middle Name" 
                                type="text" 
                                v-model="middlename"/>
                            </div>
                            <div class="cell">
                                <FormInput 
                                data-testid="lastname" 
                                name="Last Name" 
                                type="text" 
                                v-model="lastname" 
                                :status="LastnameStatus"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="cell is-col-span-2">
                                <FormInput 
                                data-testid="email"
                                name="Email"
                                type="email"
                                v-model="emailaddress"
                                />
                            </div>
                            <div class="cell">
                                <div :class="{ error: v$.email.er.email.$errors.length }">
                                    <label for="email" type="email">Emails</label>
                                    <input class="input" v-model="state.email" />
                                    <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <FormInput 
                                data-testid="startdate" 
                                name="Start Date" 
                                type="text" 
                                v-model="startdate"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="cell is-col-span-2">
                                <FormInput 
                                data-testid="custompersonid" 
                                name="Custom Person Id" 
                                type="text" 
                                v-model="custompersonid"/>
                            </div>
                            <div class="cell">
                                <FormInput 
                                data-testid="eventid" 
                                name="Event Id" 
                                type="text" 
                                v-model="eventid"/>
                            </div>
                        </div>
                    </div>
                    <div class="column driver-data">
                        <h2>Driver:</h2>
                        <div class="driver-data__info">
                            <ul>
                                <li>First Name:</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="center">
                    <button
                    id="saveDriver" 
                    class="button is-medium"
                    :disabled="false"
                    >Save</button>
                </div>
            </form>
        </div>
    <div>
        <div class="box-container cell"></div>
    </div>
</template>

<style>
    .driver-data {
        h2 {
            text-align: center;
        }
    }

    .driver-data.column {
        padding-left: 50px;
    }

    .text-center {
        text-align: center;
    } 

    .box-container {
        border: 1px solid #000;
        width: 100%;
        height: 500px;
        padding: 20px;
    }

    .button {
        margin-top: 20px;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;  
    }
</style>