import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Automotive from '../views/Automotive.vue';

describe('Automotive', () => {
  it('renders correctly', () => {
    const wrapper = mount(Automotive);
    expect(wrapper.element).toMatchSnapshot();
  });
});