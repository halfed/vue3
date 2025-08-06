import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import About from '../views/About.vue';

describe('About', () => {
  it('renders correctly', () => {
    const wrapper = mount(About);
    expect(wrapper.element).toMatchSnapshot();
  });
});