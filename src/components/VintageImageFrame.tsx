import React from 'react';

const snowflakeKeyframes = `
  @keyframes snowfall {
    0% {
      transform: translateY(-10px) translateX(0px);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      transform: translateY(40px) translateX(10px);
      opacity: 0;
    }
  }

  @keyframes gentleFloat {
    0%, 100% {
      transform: translateY(0px) rotate(-1deg);
    }
    50% {
      transform: translateY(-2px) rotate(1deg);
    }
  }

  @keyframes shimmer {
    0%, 100% {
      box-shadow: 0 4px 15px rgba(100, 116, 139, 0.15);
    }
    50% {
      box-shadow: 0 6px 20px rgba(100, 116, 139, 0.25);
    }
  }
`;

const polaroidStyle = {
  display: 'inline-block',
  background: '#f8fafc',
  padding: '16px 16px 60px 16px', // Más espacio abajo como polaroid
  boxShadow: '0 4px 15px rgba(100, 116, 139, 0.15)',
  borderRadius: '2px',
  maxWidth: '280px',
  position: 'relative',
  animation: 'gentleFloat 8s ease-in-out infinite, shimmer 6s ease-in-out infinite',
  transform: 'rotate(-1deg)',
  border: '1px solid #e2e8f0',
};

const imageStyle = {
  display: 'block',
  width: '100%',
  height: 'auto',
  filter: 'sepia(0.15) contrast(1.1) brightness(0.95) saturate(0.85)',
  borderRadius: '1px',
};

const captionStyle = {
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  right: '16px',
  textAlign: 'center',
  fontFamily: 'serif',
  fontSize: '14px',
  color: '#64748b',
  fontStyle: 'italic',
  letterSpacing: '0.5px',
};

const snowflakeStyle = {
  position: 'absolute',
  color: '#cbd5e1',
  fontSize: '10px',
  userSelect: 'none',
  pointerEvents: 'none',
  animation: 'snowfall 4s linear infinite',
};

const vintageCorner = {
  position: 'absolute',
  width: '0',
  height: '0',
  borderStyle: 'solid',
};

export default function VintageWinterFrame({ 
  src = "https://via.placeholder.com/250x180/e2e8f0/64748b?text=Foto+Vintage", 
  alt = "Imagen vintage invernal",
  caption = "08-08-24. No sabía lo que le esperaba.."
}) {
  return (
    <>
      <style>{snowflakeKeyframes}</style>
      <div style={polaroidStyle}>
        <img src={src} alt={alt} style={imageStyle} />
        
        {/* Texto al estilo polaroid */}
        <div style={captionStyle}>
          {caption}
        </div>
        
        {/* Esquinas dobladas vintage */}
        <div style={{
          ...vintageCorner,
          top: '0',
          right: '0',
          borderLeft: '12px solid transparent',
          borderTop: '12px solid #e2e8f0',
        }} />
        
        {/* Copos de nieve animados */}
        <div style={{
          ...snowflakeStyle,
          top: '8px',
          left: '15px',
          animationDelay: '0s',
        }}>❄</div>
        <div style={{
          ...snowflakeStyle,
          top: '12px',
          right: '25px',
          animationDelay: '1.5s',
        }}>❅</div>
        <div style={{
          ...snowflakeStyle,
          top: '5px',
          left: '65%',
          animationDelay: '2.5s',
        }}>❄</div>
        <div style={{
          ...snowflakeStyle,
          bottom: '70px',
          left: '20px',
          animationDelay: '3s',
        }}>❅</div>
      </div>
    </>
  );
}