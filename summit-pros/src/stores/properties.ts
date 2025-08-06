import { defineStore } from "pinia"
import { Properties } from '../properties'
import { property } from "lodash"

interface PropertiesState {
    allProperties: Map<string, Properties>
}

interface PropertyAddress extends Omit<PropertiesState, 'propertyIds'> {
    propertyIds: string
}

export const usePropertiesStore = defineStore("properties", {
    state: (): PropertiesState => ({
        allProperties: new Map(),
    }),

    actions: {
        setProperties(data) {
            let ids: string[] = []
            let all = new Map<string, Properties>()
            for (const property of data) {
                ids.push(property.id)
                all.set(property.id, property)
            }
            this.allProperties = all
        },
    },

    getters: {
        ////GETTING PROPERTY, FILTERED BASED ON ID
        getFilteredProperty: (state) => {
            return (propertyId: number) => new Map(
                
                [...state.allProperties.entries()].filter(([key, value]) => value.id === propertyId
                ));
        }
    }
});