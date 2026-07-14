import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button 
            className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-dark-text bg-gray-100 hover:bg-gray-200 dark:bg-dark-surface-light dark:hover:bg-gray-700 rounded-lg transition-all disabled:opacity-50 cursor-pointer" 
            onClick={onClose} 
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button 
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer" 
            onClick={onConfirm} 
            disabled={isLoading}
          >
            {isLoading ? 'Aguarde...' : confirmText}
          </button>
        </>
      }
    >
      <div className="flex gap-4 items-start">
        <div className="p-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl">
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
        </div>
        <div>
          <p className="text-gray-600 dark:text-dark-text-muted mt-1 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
