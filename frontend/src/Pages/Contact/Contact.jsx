import { useEffect, useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import Footer from "../../Components/Footer/Footer";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200); // Delayed visibility for a smooth effect
  }, []);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_teplr6s', 'template_v3w0alt', form.current, {
        publicKey: 'nwb4qAJ_cmBvxi6v6',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-100 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      
      {/* Contact Banner */}
      <div className="relative text-center py-20 bg-gray-200 clip-curve transition-all duration-700 ease-in-out transform"
           style={{
             background: "url('https://img.freepik.com/premium-photo/green-flowers-with-water-drops-petals_1361981-4624.jpg') no-repeat center center/cover",
             clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)", height: "350px"
           }}>
          <h1 className="text-4xl font-bold text-white animate-fadeIn">Let's Connect</h1>
          <p className="text-white mt-2 max-w-2xl mx-auto italic animate-fadeIn"> "Bridging conversations, one message at a time."</p>
      </div>
      
      {/* Contact Details & Form */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-700 ease-in-out transform">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 flex items-center transition-all duration-500">Get In Touch 🌿</h2>
          <p className="text-gray-500 mt-2">We'd love to hear from you! Reach out via the details below or send us a message.</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center text-green-700 transition-all duration-300 hover:scale-105 cursor-pointer">
              <MdLocationOn className="text-green-700 text-2xl mr-3" />
              <span>123 Green Haven Street, Lahore, Pakistan</span>
            </div>
            <div className="flex items-center text-green-700 transition-all duration-300 hover:scale-105 cursor-pointer">
              <MdPhone className="text-green-700 text-2xl mr-3" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center text-green-700 transition-all duration-300 hover:scale-105 cursor-pointer">
              <MdEmail className="text-green-700 text-2xl mr-3" />
              <span>contact@greenheaven.com</span>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md transition-all duration-700 ease-in-out transform hover:shadow-lg">
          <h2 className="text-2xl font-bold text-green-700 text-center shadow-md">We Are Here To Help You!</h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-4 mt-4">
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input type="text" placeholder="Enter your name" className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-green-500" name="from_name" />
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-green-500" name="from_email" />
            <label className="block text-sm font-medium text-gray-600">Message</label>
            <textarea placeholder="Write your message" className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-green-500" rows="4" name="message"></textarea>
            <button className="bg-green-600 text-white py-3 px-6 rounded-md w-full shadow-md transition-all duration-300 hover:bg-green-700 hover:scale-105">Send Request</button>
          </form>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="w-full h-80 transition-opacity duration-1000">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4 shadow-md">Find Us Here 📍</h2>
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.566972147025!2d74.35874751540256!3d31.52036905589152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919038355c5aa9d%3A0x906d27a5f8be6d1b!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1688555555555!5m2!1sen!2s"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
    
  );
};

export default Contact;
