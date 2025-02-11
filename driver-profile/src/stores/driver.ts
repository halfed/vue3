import { defineStore } from "pinia";
import { NewDriver } from "../driver";

interface DriverState {
    driverId?: number;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dob?: string;
    startDate?: string;
    customPersonId?: string;
    eventId?: string;
    email?: string;

}

export const driver = defineStore("driver", {
    state: (): DriverState => ({
        driverId: undefined,
        firstName: undefined,
        lastName: undefined,
        middleName: undefined,
        dob: undefined,
        startDate: undefined,
        customPersonId: undefined,
        eventId: undefined,
        email: undefined,
    }),

    actions: {
        async createDriver(newDriver: NewDriver) {
            console.log("the store", newDriver);
            this.firstName = newDriver.firstName;
            this.lastName = newDriver.lastName;
            this.email = newDriver.email;

        }
    }
}); 