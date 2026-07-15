import type { Meta, StoryObj } from '@storybook/react';
import ConfirmDialog from './ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
    confirmText: {
      control: 'text',
    },
    cancelText: {
      control: 'text',
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Excluir Item',
    message: 'Tem certeza de que deseja excluir este item permanentemente? Esta ação não poderá ser desfeita.',
    confirmText: 'Excluir',
    cancelText: 'Cancelar',
    onClose: () => alert('Closed clicked'),
    onConfirm: () => alert('Confirm clicked'),
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};
