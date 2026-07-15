import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();
    
    render(
      <ConfirmDialog
        isOpen={false}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Deseja excluir?"
        message="Esta ação não pode ser desfeita."
      />
    );
    
    expect(screen.queryByText('Deseja excluir?')).not.toBeInTheDocument();
  });

  it('renders title, message, cancel and confirm buttons when isOpen is true', () => {
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();
    
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Deseja excluir?"
        message="Esta ação não pode ser desfeita."
        confirmText="Sim, excluir"
        cancelText="Não, voltar"
      />
    );
    
    expect(screen.getByText('Deseja excluir?')).toBeInTheDocument();
    expect(screen.getByText('Esta ação não pode ser desfeita.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Não, voltar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sim, excluir' })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();
    
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Deseja excluir?"
        message="Esta ação não pode ser desfeita."
      />
    );
    
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleConfirm).not.toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();
    
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Deseja excluir?"
        message="Esta ação não pode ser desfeita."
      />
    );
    
    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('shows loading state and disables buttons', () => {
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();
    
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Deseja excluir?"
        message="Esta ação não pode ser desfeita."
        isLoading={true}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Aguarde...' })).toBeDisabled();
  });
});
