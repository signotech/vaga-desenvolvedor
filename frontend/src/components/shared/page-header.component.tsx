type PageHeaderProps = {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function PageHeaderComponent({ title, subtitle, actionLabel, onAction }: PageHeaderProps) {
  return (
    <header className="page-header fade-up">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      {actionLabel && onAction ? (
        <button type="button" className="btn waves-effect waves-light accent-btn" onClick={onAction}>
          <i className="material-icons left">add</i>
          {actionLabel}
        </button>
      ) : null}
    </header>
  );
}
