export function LoadingStateComponent() {
  return (
    <div className="loading-state">
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-brand-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
      <p style={{ marginTop: '1rem' }}>Carregando…</p>
    </div>
  );
}
