import { defineStore } from "pinia"
import { Properties } from '../properties'
import { property } from "lodash"

interface PropertiesState {
    propertyIds: string[]
    allProperties: Map<string, Properties>
}

interface PropertyAddress extends Omit<PropertiesState, 'propertyIds'> {
    propertyIds: string
}

export const propertiesStore = defineStore("properties", {
    state: (): PropertiesState => ({
        propertyIds: [],
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

            this.propertyIds = ids
            this.allProperties = all
        }
    },

    getters: {
        
        ////GETTING PROPERTY, FILTERED BASED ON ID
        getFilteredProperty: (state) => {
            // let propertyAddress: any = undefined;
            // return (propertyId) => state.allProperties.forEach((value, key) => {
            //     if (value.id === propertyId) {
            //         propertyAddress = value;
            //     }
            // });
            return (propertyId: number) => new Map(
                [...state.allProperties.entries()].filter(([key, value]) => value.id === propertyId
                ));
            
            // return filteredMap;
        }
    }
});