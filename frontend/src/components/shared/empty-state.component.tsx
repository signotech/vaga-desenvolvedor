type EmptyStateProps = {
  icon?: string;
  message: string;
};

export function EmptyStateComponent({ icon = 'inbox', message }: EmptyStateProps) {
  return (
    <div className="empty-state fade-up">
      <i className="material-icons">{icon}</i>
      <p>{message}</p>
    </div>
  );
}
