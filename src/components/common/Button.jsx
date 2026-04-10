export default function Button({
  children,
  variant = 'natural', // 'natural' | 'primary'
  loading = false,
  icon,
  ...props
}) {
  const baseStyle =
    'inline-flex items-center justify-center gap-2 py-3 px-3 rounded-lg transition-colors text-white';

  const variantStyle = {
    natural: loading ? 'bg-base-300' : 'bg-base-200 hover:bg-base-100/80',
    primary: loading ? 'bg-primary/50' : 'bg-primary/80 hover:bg-primary/95',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]}`}
      disabled={loading}
      {...props}
    >
      {/* 텍스트 */}
      <span>{children}</span>

      {/* 오른쪽 아이콘 */}
      {icon && !loading && <span>{icon}</span>}

      {/* 로딩 상태 */}
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
    </button>
  );
}
