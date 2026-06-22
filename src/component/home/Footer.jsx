import React from 'react';
import { 
  FaGithub, FaTwitter, FaEnvelope, FaMoon, 
  FaHeart, FaUserFriends, FaMapMarkerAlt, FaHospital, 
  FaQuestionCircle, FaBook, FaHeadset 
} from 'react-icons/fa';
import Logo from '../Logo';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className='mb-2'>
                <Logo></Logo>
            </div>
            <p className="text-gray-600 mb-4 max-w-xs">
              Start your journey to save lives. Join our community of donors and make a difference.
            </p>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-red-600"><FaGithub /></a>
              <a href="#" className="hover:text-red-600"><FaTwitter /></a>
              <a href="#" className="hover:text-red-600"><FaEnvelope /></a>
            </div>
            
            <div className="mt-6 inline-block bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg">
              <p className="text-xs text-gray-500">Monthly Top Donor</p>
              <p className="font-bold text-sm">BLOOD HERO #1</p>
            </div>
          </div>

          {/* Links Sections */}
          {[
            { 
              title: 'PRODUCT', 
              links: [
                { name: 'Donor List', icon: <FaUserFriends /> },
                { name: 'Campaigns', icon: <FaHeart /> },
                { name: 'Pricing', icon: <FaEnvelope /> }
              ] 
            },
            { 
              title: 'EXPLORE', 
              links: [
                { name: 'Category', icon: <FaBook /> },
                { name: 'Hospitals', icon: <FaHospital /> },
                { name: 'Map', icon: <FaMapMarkerAlt /> }
              ] 
            },
            { 
              title: 'SUPPORT', 
              links: [
                { name: 'FAQ', icon: <FaQuestionCircle /> },
                { name: 'Guidelines', icon: <FaBook /> },
                { name: 'Help Desk', icon: <FaHeadset /> }
              ] 
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold mb-4 text-gray-900 text-sm">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href="#" className="text-gray-600 hover:text-red-600 transition flex items-center gap-2">
                      {link.icon} {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="flex items-center gap-1">Made with <FaHeart className="text-red-500"/> by BloodLife Team | © 2026 All Rights Reserved.</p>
          <button className="mt-4 md:mt-0 hover:text-black">
            <FaMoon />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;