
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About ParkMate</h1>
            <p className="text-xl text-gray-600">
              We're on a mission to make parking simple and stress-free for everyone, everywhere.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-6">
              ParkMate was founded in 2022 with a simple idea: parking shouldn't be stressful. Our founders, tired of wasting time searching for parking spots in busy urban areas, set out to create a solution that would benefit both drivers and parking lot operators.
            </p>
            <p className="text-gray-700 mb-6">
              What started as a small project quickly grew into a comprehensive platform connecting drivers with available parking spaces across major cities. Today, ParkMate helps thousands of users find and reserve parking spots quickly and easily.
            </p>
            <p className="text-gray-700">
              Our platform is built on the principles of convenience, transparency, and reliability. We work with parking lot operators to ensure real-time availability information and seamless access, while providing drivers with a stress-free parking experience.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Mission */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At ParkMate, we're on a mission to transform the way people park. We believe that finding parking should be effortless, transparent, and efficient. Our goal is to eliminate the frustration and uncertainty that often comes with finding a parking spot.
            </p>
            <p className="text-gray-700">
              By connecting drivers with available parking spaces in real-time, we're not just saving time—we're reducing traffic congestion, lowering emissions from cars circling for parking, and helping cities become more livable and sustainable.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Rahul Sharma</h3>
              <p className="text-gray-600">CEO & Co-founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Priya Patel</h3>
              <p className="text-gray-600">CTO & Co-founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Arun Kumar</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact CTA */}
      <div className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have questions or want to partner with us? We'd love to hear from you!
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default About;
