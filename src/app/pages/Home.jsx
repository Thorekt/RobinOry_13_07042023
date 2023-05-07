import React from 'react';
import iconChat from '../img/icon-chat.png';
import iconMoney from '../img/icon-money.png';
import iconSecurity from '../img/icon-security.png';
import FeatureItem from '../components/FeatureItem';

const features = [
  {
    icon: iconChat,
    title: 'You are our #1 priority',
    text:
      'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    alt: 'Chat Icon',
  },
  {
    icon: iconMoney,
    title: 'More savings means higher rates',
    text:
      'The more you save with us, the higher your interest rate will be!',
    alt: 'Money Icon',
  },
  {
    icon: iconSecurity,
    title: 'Security you can trust',
    text:
      'We use top of the line encryption to make sure your data and money is always safe.',
    alt: 'Security Icon',
  },
];

export default function Home() {
  document.title = 'Argent Bank - Home';

  return (
    <main>
      <div className='hero'>
        <section className='hero-content'>
          <h2 className='sr-only'>Promoted Content</h2>
          <p className='subtitle'>No fees.</p>
          <p className='subtitle'>No minimum deposit.</p>
          <p className='subtitle'>High interest rates.</p>
          <p className='text'>Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className='features'>
        <h2 className='sr-only'>Features</h2>
        { features.map((feature, index) => (
            <FeatureItem
            icon={feature.icon}
            title={feature.title}
            text={feature.text}
            alt={feature.alt}
            key={index}
          />
        ))}
      </section>
    </main>
  );
}
