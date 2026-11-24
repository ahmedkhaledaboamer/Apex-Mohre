import { cn } from '../../utils/cn';
import { useI18n } from '../../hooks/useI18n';

/** Official UAE flag colours. */
export const UAE = { red: '#EF3340', green: '#00843D', white: '#FFFFFF', black: '#000000' };

/** Apex Aora brand colours, sampled from the logo artwork. */
export const BRAND = { violet: '#7A1FD1', blue: '#0A78F0', navy: '#0A1A45', gold: '#C9962E' };

/**
 * Apex Aora mark: the violet→blue infinity with the UAE flag ribbon, set in a white rounded tile
 * so its dark-blue strokes stay legible on the navy sidebar.
 */
export function LogoMark({ size = 40, className }: {size?: number;className?: string;}) {
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center rounded-[28%] bg-white ring-1 ring-[#D7DEE6]', className)}
      style={{ width: size, height: size, padding: size * 0.1 }}>
      <img src="/apex-aora-mark-wide.png" alt="Apex Aora" className="h-full w-full object-contain" draggable={false} />
    </span>);

}

/** The complete logo artwork (mark + APEXAORA wordmark). For light backgrounds only. */
export function LogoFull({ height = 48, className }: {height?: number;className?: string;}) {
  return <img src="/apex-aora-logo.png" alt="Apex Aora" style={{ height }} className={cn('w-auto shrink-0', className)} draggable={false} />;
}

/** Thin violet→blue ribbon used as a brand accent. */
export function BrandStripe({ className }: {className?: string;}) {
  return (
    <div
      className={cn('h-1 w-full', className)}
      style={{ background: `linear-gradient(90deg, ${BRAND.violet}, ${BRAND.blue})` }}
      dir="ltr"
      aria-hidden />);

}

/** Full logo: mark + bilingual wordmark. `tone="light"` for dark backgrounds. */
export function Logo({ size = 40, tone = 'dark', compact, className }: {size?: number;tone?: 'dark' | 'light';compact?: boolean;className?: string;}) {
  const { t } = useI18n();
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={size} />
      {!compact &&
      <span className="min-w-0 leading-tight">
          <span className={cn('block truncate font-extrabold tracking-tight', tone === 'light' ? 'text-white' : 'text-navy')} style={{ fontSize: size * 0.48 }}>
            {t('app.name')}
          </span>
          <span className={cn('block truncate', tone === 'light' ? 'text-white/55' : 'text-muted')} style={{ fontSize: Math.max(10, size * 0.27) }}>
            {t('app.tagline')}
          </span>
        </span>
      }
    </span>);

}
