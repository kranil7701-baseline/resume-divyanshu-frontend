// app/page.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Steps from '@/components/landing/Steps';
import CallToAction from '@/components/landing/CallToAction';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Steps />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}