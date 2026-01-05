import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5', // Facebook background grey
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '4em',
          color: '#1c1e21', // Facebook dark text
          marginBottom: '10px',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: '2em',
          color: '#1c1e21',
          marginBottom: '20px',
          fontWeight: '600',
        }}
      >
        الصفحة غير موجودة
      </h2>
      <p
        style={{
          fontSize: '1.1em',
          color: '#606770', // Facebook secondary text
          marginBottom: '30px',
          maxWidth: '500px',
        }}
      >
        عذراً، لم نتمكن من العثور على الصفحة التي طلبتها. ربما تكون قد حُذفت أو نُقلت.
      </p>
      <Link
        to="/"
        style={{
          backgroundColor: '#1877f2', // Facebook blue button
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '1em',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#166fe5')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1877f2')}
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFoundPage;