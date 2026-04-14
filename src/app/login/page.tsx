import { signIn } from '@/auth';

export default function LoginPage() {
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
        {/* UNT Green */}
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🦅</div>
        <h1 style={{ color: '#00853E', marginBottom: '8px' }}>UNT Professor Index</h1>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '14px' }}>
          Sign in with your UNT account<br />
          <strong>(@my.unt.edu only)</strong>
        </p>

        <form
          action={async () => {
            'use server';
            await signIn('microsoft-entra-id', { redirectTo: '/' });
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: '#00853E',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Sign in with Microsoft
          </button>
        </form>
      </div>
    </main>
  );
}
