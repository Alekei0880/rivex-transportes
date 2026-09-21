import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [{
    name: 'Inicio',
    path: '/'
  }, {
    name: 'Servicios',
    path: '/servicios'
  }, {
    name: 'Acerca de',
    path: '/acerca-de'
  }];
  return <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/images/logo_blanco.png" alt="RIVEX TRANSPORTES" className="w-full max-w-[50px] sm:max-w-[100px] md:max-w-[80px] h-auto object-contain drop-shadow-2xl" />
            <p className="text-gray-400 text-sm">Transporte multicarga confiable y seguro a todo México. Innovación y profesionalismo en cada envío.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-sm">México</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-500" />
                <div className="flex flex-col">
                  <a href="https://wa.me/523121434919" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm">
                     +52 312 143 4919
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-500" />
                <a href="mailto:comercial@rivextransportes.com" className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm">
                  comercial@rivextransportes.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} RIVEX TRANSPORTES. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;