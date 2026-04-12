export default function Button({
  children,
  variant = 'natural',
  loading = false,
  icon,
  disabled = false,
  ...props
}) {
  const isDisabled = disabled || loading;

  const baseStyle =
    'inline-flex items-center justify-center gap-2 py-3 px-3 rounded-lg transition-colors text-white';

  const variantStyle = {
    natural: isDisabled ? 'bg-base-300' : 'bg-base-200 hover:bg-base-100/80',
    primary: isDisabled ? 'bg-primary/50' : 'bg-primary/80 hover:bg-primary/95',
  };

  const disabledStyle = isDisabled
    ? 'cursor-not-allowed opacity-60'
    : 'cursor-pointer';

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]} ${disabledStyle}`}
      disabled={isDisabled}
      {...props}
    >
      <span>{children}</span>

      {icon && !loading && <span>{icon}</span>}

      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
    </button>
  );
}
