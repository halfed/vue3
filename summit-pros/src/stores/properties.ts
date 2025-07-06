import { defineStore } from "pinia"
import { Properties } from '../properties'
import { property } from "lodash"

interface PropertiesState {
    //propertyIds: string[]
    allProperties: Map<string, Properties>
}

interface PropertyAddress extends Omit<PropertiesState, 'propertyIds'> {
    propertyIds: string
}

export const propertiesStore = defineStore("properties", {
    state: (): PropertiesState => ({
        //propertyIds: [],
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

            //this.propertyIds = ids
            this.allProperties = all
        },
        async fetchItemDetails(propertyId) {
          // Simulate an API call or data retrieval based on the ID
          return new Map(
                
                [...this.allProperties.entries()].filter(([key, value]) => value.id === propertyId
                ));
          // In a real application, you would make an API call here:
          // const response = await fetch(`/api/items/${id}`);
          // this.itemDetails = await response.json();
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