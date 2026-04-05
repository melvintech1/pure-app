import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Activity, Calculator, ShieldCheck, ArrowRight, Instagram, Twitter, Facebook, Github } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-2xl font-bold text-emerald-600">
          <Leaf className="w-8 h-8" />
          <span>PURE</span>
        </div>
        <div className="space-x-4">
          <Link title="Masuk ke Akun" to="/login" className="px-6 py-2 text-gray-600 hover:text-emerald-600 font-medium transition">Masuk</Link>
          <Link title="Daftar Baru" to="/register" className="px-6 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
            Daftar Sekarang
          </Link>
        </div>
      </nav>

      <section className="px-8 py-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Mulai Hidup Lebih <span className="text-emerald-600">Sehat</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
            PURE adalah aplikasi cerdas yang membantu kamu melacak waktu layar, melakukan detoksifikasi digital, dan mengembalikan keseimbangan kesehatan fisik serta mentalmu secara terstruktur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#0a1715] text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition">
              Mulai Perjalanan Detoks <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-md lg:max-w-none mx-auto">
          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 shadow-2xl rotate-2 hover:rotate-0 transition duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                <p className="text-xs text-gray-400">BMI Kamu</p>
                <p className="text-2xl font-bold text-emerald-600">19.5</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                <p className="text-xs text-gray-400">Air Minum</p>
                <p className="text-2xl font-bold text-blue-500">2L</p>
              </div>
            </div>
            <div className="mt-4 bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
               <div className="h-24 w-full bg-emerald-50 rounded-lg flex items-end justify-between p-2 gap-1">
                 {[40, 70, 45, 90, 65, 80].map((h, i) => (
                   <div key={i} className="bg-emerald-400 w-full rounded-t-sm" style={{ height: `${h}%` }}></div>
                 ))}
               </div>
               <p className="text-xs text-center mt-2 text-gray-400">Statistik Mingguan</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Kenapa Memilih PURE?</h2>
          <p className="text-gray-500">Semua yang kamu butuhkan untuk gaya hidup sehat.</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Calculator className="w-6 h-6 text-emerald-600" />}
            title="Smart Calculator"
            desc="Hitung BMI, BMR, dan kebutuhan air harian dengan sangat akurat."
          />
          <FeatureCard 
            icon={<Activity className="w-6 h-6 text-emerald-600" />}
            title="Digital Detox"
            desc="Pantau screen time kamu dan mulai batasi penggunaan gadget berlebih."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />}
            title="Data Aman"
            desc="Data kesehatanmu tersimpan aman dan hanya bisa diakses oleh kamu."
          />
        </div>
      </section>

      <footer className="bg-[#0a1715] text-gray-400 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-2xl font-bold text-emerald-500 mb-6">
              <Leaf className="w-7 h-7" />
              <span className="text-white tracking-wide">PURE</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed mb-8">
              Aplikasi cerdas untuk melacak kesehatan fisik dan mentalmu. Mulai perjalanan detoks digital dan temukan keseimbangan hidup bersama PURE.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Akses Cepat</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/login" className="hover:text-emerald-400 transition">Masuk ke Akun</Link></li>
              <li><Link to="/register" className="hover:text-emerald-400 transition">Daftar Baru</Link></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Tentang Kami</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Bantuan & Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Syarat & Ketentuan</a></li>
              <li className="pt-2 text-emerald-500">support@pureapp.id</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} PURE Team. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition group">
    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default Index;