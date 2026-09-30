import { uiIcons, type UiIcon } from '@/lib/icons';

type Props = { name: UiIcon; size?: number; className?: string; label?: string };

export default function Icon({ name, size = 20, className, label }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: false })}
      dangerouslySetInnerHTML={{ __html: uiIcons[name] }}
    />
  );
}
