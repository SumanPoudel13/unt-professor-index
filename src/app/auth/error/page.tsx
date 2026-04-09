export default function AuthErrorPage() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '48px',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🚫</div>
        <h1 style={{ color: '#c0392b', marginBottom: '8px' }}>Access Denied</h1>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '14px' }}>
          Only <strong>@my.unt.edu</strong> email addresses are allowed.<br /><br />
          Please sign in with your UNT student account.
        </p>
        <a
          href="/login"
          style={{
            backgroundColor: '#00853E',
            color: 'white',
            padding: '12px 32px',
            borderRadius: '8px',
            fontSize: '16px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          ← Back to Login
        </a>
      </div>
    </main>
  );
}
