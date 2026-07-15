import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    icon: '⭐',
    ariaLabel: 'Star button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    icon: '⚙️',
    ariaLabel: 'Settings button',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    icon: '🗑️',
    ariaLabel: 'Delete button',
    variant: 'danger',
  },
};

export const Ghost: Story = {
  args: {
    icon: '🔍',
    ariaLabel: 'Search button',
    variant: 'ghost',
  },
};

export const Rounded: Story = {
  args: {
    icon: '➕',
    ariaLabel: 'Add button',
    variant: 'primary',
    rounded: true,
  },
};

export const Loading: Story = {
  args: {
    icon: '💾',
    ariaLabel: 'Save button',
    variant: 'primary',
    loading: true,
  },
};
