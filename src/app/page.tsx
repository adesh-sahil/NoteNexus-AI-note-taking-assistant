"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import TypewriterTitle from "@/components/ui/TypeWriterTitle";
import Lottie from 'react-lottie-player';
import createAnimation from "@/components/lottie/createAnimation2.json";
import accessAnimation from "@/components/lottie/accessAnimation2.json";
import organizeAnimation from "@/components/lottie/organizeAnimation.json";
import organizeAnimation2 from "@/components/lottie/organizeAnimation2.json";
import shareAnimation from "@/components/lottie/shareAnimation.json";
import AIPoweredAnimation from "@/components/lottie/AIAnimation.json";
import userA from "@/components/lottie/userA.json";
import userB from "@/components/lottie/userB.json";
import ReadyToStart from "@/components/lottie/ReadyToStart.json";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] space-y-8">
        <h1 className="text-5xl font-bold text-center">
          Welcome to <span className="text-blue-400">NoteNexus</span>
        </h1>
        <h2 className="text-lg max-w-3xl mb-8 text-gray-400 text-center">
          Your AI-powered assistant for 
          <span>
            <h2 className="text-blue-300 semi-bold text-3xl">
              <TypewriterTitle />
            </h2>
          </span>
        </h2>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleGetStarted}>
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose NoteNexus?</h2>
          <div className="grid gap-10 md:grid-cols-3">

            <div className="feature-card transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={AIPoweredAnimation}
                  play
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mt-4">AI-Powered</h3>
              <p className="text-gray-400 mt-2">Leverage the power of AI to enhance your note-taking experience.</p>
            </div>
            <div className="feature-card transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={organizeAnimation2}
                  play
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mt-4">Organize Efficiently</h3>
              <p className="text-gray-400 mt-2">Easily organize your notes with intuitive categories and tags.</p>
            </div>
            <div className="feature-card transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={accessAnimation}
                  play
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mt-4">Access Anywhere</h3>
              <p className="text-gray-400 mt-2">Access your notes from any device, anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="testimonial-card p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={userA}
                  play
                  style={{ width: 180, height: 180 }}
                />
              </div>
              <p className="text-gray-400 mb-4">"NoteNexus has transformed the way I take notes. The AI features are incredibly helpful!"</p>
              <h3 className="text-xl font-semibold">- User A</h3>
            </div>
            <div className="testimonial-card p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={userB}
                  play
                  style={{ width: 180, height: 180 }}
                />
              </div>
              <p className="text-gray-400 mb-4">"I love how organized my notes are now. NoteNexus makes everything so easy!"</p>
              <h3 className="text-xl font-semibold">- User B</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="grid gap-10 md:grid-cols-3">
          <div className="how-it-works-card transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={createAnimation}
                  play
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mt-4">Create</h3>
              <p className="text-gray-400 mt-2">Start by creating a new note. Use the AI-powered suggestions to enhance your content.</p>
            </div>
            <div className="how-it-works-card transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={organizeAnimation}
                  play
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mt-4">Organize</h3>
              <p className="text-gray-400 mt-2">Organize your notes into categories and tags for easy access and retrieval.</p>
            </div>
            <div className="how-it-works-card transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={shareAnimation}
                  play
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mt-4">Share</h3>
              <p className="text-gray-400 mt-2">Share your notes with others or keep them private. Access them anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 via-gray-700  to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">So Ready to Get Started?</h2>
          <div className=" flex justify-center">
                <Lottie
                  loop
                  animationData={ReadyToStart}
                  play
                  style={{ width: 200, height: 200 }}
                />
          </div>
          
          <Button className="bg-green-600 text-lg px-8 py-3 mt-5 rounded-full" onClick={handleGetStarted}>
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} NoteNexus. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
