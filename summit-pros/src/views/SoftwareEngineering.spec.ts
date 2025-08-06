import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SoftwareEngineering from './SoftwareEngineering.vue';

describe('SoftwareEngineering', () => {
     it('renders correctly', () => {
        const wrapper = mount(SoftwareEngineering);
        expect(wrapper.element).toMatchSnapshot();
      });
});