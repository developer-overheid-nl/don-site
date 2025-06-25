import React from 'react';
import Layout from '@theme/Layout';

export default function NotFound(): React.JSX.Element {
  return (
    <Layout title="Pagina niet gevonden">
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h1>404 – Pagina niet gevonden</h1>
        <p>De pagina die je zoekt bestaat niet (meer).</p>
        <a href="/" style={{ textDecoration: 'underline' }}>← Terug naar de homepage</a>
      </div>
    </Layout>
  );
}
