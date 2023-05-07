import React from 'react';

export default function FeatureItem({ icon, title, text, alt, index  }) {
  return (
    <div key={index} className='feature-item'>
      <img src={icon} alt={alt} className='feature-icon' />
      <h3 className='feature-item-title'>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
