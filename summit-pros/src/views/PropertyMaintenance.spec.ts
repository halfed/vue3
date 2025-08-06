import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PropertyMaintenance from './PropertyMaintenance.vue';

describe('PropertyMaintenance', () => {
     it('renders correctly', () => {
        const wrapper = mount(PropertyMaintenance);
        expect(wrapper.element).toMatchSnapshot();
      });
});