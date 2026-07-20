import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../utils/cn';

export interface LikeButtonProps {
  /** Número inicial de curtidas */
  initialLikes?: number;
  /** Função assíncrona chamada para registrar a curtida e retornar a nova contagem */
  onLike: () => Promise<number>;
  /** Callback opcional chamado quando o like muda localmente */
  onLikeChange?: (newCount: number) => void;
  /** Tamanho do botão */
  size?: 'sm' | 'md' | 'lg';
  /** Se true, mostra apenas o ícone */
  iconOnly?: boolean;
  /** Se true, desabilita o botão */
  disabled?: boolean;
  /** Se true, utiliza ícones do Lucide (Heart) ao invés de emoji */
  useLucide?: boolean;
}

export const LikeButton = ({
  initialLikes = 0,
  onLike,
  onLikeChange,
  size = 'md',
  iconOnly = false,
  disabled = false,
  useLucide = true,
}: LikeButtonProps): JSX.Element => {
  const [likes, setLikes] = useState(initialLikes);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async (): Promise<void> => {
    if (disabled || isAnimating) return;

    const optimisticCount = likes + 1;
    setIsAnimating(true);
    setLikes(optimisticCount);
    onLikeChange?.(optimisticCount);

    try {
      const serverCount = await onLike();
      setLikes(serverCount);
      if (serverCount !== optimisticCount) {
        onLikeChange?.(serverCount);
      }
    } catch {
      // Reverte em caso de erro
      setLikes(likes);
      onLikeChange?.(likes);
    } finally {
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  // Size mapping
  const sizeClasses = {
    sm: "px-2 py-1 text-sm min-h-[32px]",
    md: "px-3 py-2 text-base min-h-[40px] sm:min-h-[44px]", // thumb-friendly min height on mobile
    lg: "px-4 py-3 text-lg min-h-[48px] sm:min-h-[52px]"
  };

  const iconSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl"
  };

  const lucideIconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const countSizes = {
    sm: "min-w-[16px] h-4 text-[10px] px-1",
    md: "min-w-[20px] h-5 text-xs px-1.5",
    lg: "min-w-[22px] h-[22px] text-xs px-2"
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-all duration-200 select-none rounded-lg border focus-visible:ring-3 focus-visible:ring-primary-300 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        "bg-primary-50 border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 active:scale-95",
        sizeClasses[size],
        isAnimating && "animate-heartBeat"
      )}
      onClick={handleLike}
      disabled={disabled}
      aria-label={'Curtir vídeo'}
      aria-pressed={true}
    >
      <span className="relative flex items-center justify-center leading-none flex-shrink-0">
        {useLucide ? (
          <Heart
            className={cn(
              "fill-rose-500 text-rose-500 transition-transform duration-150",
              isAnimating && "animate-iconPop"
            )}
            size={lucideIconSizes[size]}
          />
        ) : (
          <span className={cn("flex items-center justify-center transition-transform duration-150", isAnimating && "animate-iconPop")}>
            ❤️
          </span>
        )}
        {isAnimating && (
          <>
            {useLucide ? (
              <>
                <Heart className="absolute pointer-events-none opacity-0 animate-heartFloat1 fill-rose-500 text-rose-500" size={lucideIconSizes[size] - 4} />
                <Heart className="absolute pointer-events-none opacity-0 animate-heartFloat2 fill-rose-500 text-rose-500" size={lucideIconSizes[size] - 4} />
                <Heart className="absolute pointer-events-none opacity-0 animate-heartFloat3 fill-rose-500 text-rose-500" size={lucideIconSizes[size] - 4} />
              </>
            ) : (
              <>
                <span className={cn("absolute text-sm pointer-events-none opacity-0 animate-heartFloat1", iconSizes[size])}>❤️</span>
                <span className={cn("absolute text-sm pointer-events-none opacity-0 animate-heartFloat2", iconSizes[size])}>❤️</span>
                <span className={cn("absolute text-sm pointer-events-none opacity-0 animate-heartFloat3", iconSizes[size])}>❤️</span>
              </>
            )}
          </>
        )}
      </span>

      {!iconOnly && (
        <span className="flex items-center gap-1.5">
          <span className="whitespace-nowrap">Curtido</span>
          {likes > 0 && (
            <span className={cn(
              "inline-flex items-center justify-center rounded-full bg-primary-600 text-white font-bold transition-all duration-150 animate-countBounce",
              countSizes[size]
            )}>
              {likes}
            </span>
          )}
        </span>
      )}
    </button>
  );
};

export default LikeButton;
