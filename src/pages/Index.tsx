import { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import OnboardingSlide1 from "@/components/onboarding/OnboardingSlide1";
import OnboardingSlide2 from "@/components/onboarding/OnboardingSlide2";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  useEffect(() => {
    // Debugging console log for background image
    console.log('Background Image URL:', '/lovable-uploads/backgroundImage.jpg');
    
    // Check if image loads
    const img = new Image();
    img.onload = () => console.log('Image loaded successfully');
    img.onerror = () => console.error('Image failed to load');
    img.src = '/lovable-uploads/backgroundImage.jpg';
  }, []);

  const handleFirstTimeUser = () => {
    setShowOnboarding(true);
  };
  
  const handleNextStep = () => {
    setOnboardingStep(2);
  };
  
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setOnboardingStep(1);
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/lovable-uploads/backgroundImage.jpg')", // Updated background image
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in">
          <img
            src="/lovable-uploads/f2835391-1035-4a3c-8f82-962b402f2b0e.png"
            alt="TUT Logo"
            className="mx-auto w-32 h-32 mb-4 drop-shadow-lg"
          />
          <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">TUT Connect</h1>
          <p className="text-xl text-white/90 drop-shadow-md">Your one-stop solution for campus services</p>
          <p className="text-sm text-white/80 mt-2 font-medium italic">We empower people</p>
        </div>
        
        {showOnboarding ? (
          onboardingStep === 1 ? (
            <OnboardingSlide1 onNext={handleNextStep} />
          ) : (
            <OnboardingSlide2 onComplete={handleCompleteOnboarding} />
          )
        ) : (
          <>
            <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-2xl border border-white/20">
              <AuthForm />
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="bg-white/90 text-campus-primary hover:bg-campus-secondary hover:text-white transition-all duration-300"
                  onClick={handleFirstTimeUser}
                >
                  First Time User? Register Here
                </Button>
              </div>
            </div>
            
            {/* <div className="mt-8 text-white text-sm text-center backdrop-blur-sm bg-black/30 p-4 rounded-lg">
              <p>For demo purposes, you can use any of the demo accounts</p>
              <p className="mt-1">Or use these formats with any password:</p>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="bg-white/10 rounded p-2 hover:bg-white/20 transition-colors">
                  <p className="font-semibold">Student</p>
                  <p className="text-xs">231967941@tut4life.ac.za</p>
                </div>
                <div className="bg-white/10 rounded p-2 hover:bg-white/20 transition-colors">
                  <p className="font-semibold">Lecturer</p>
                  <p className="text-xs">12345678@tut.ac.za</p>
                </div>
                <div className="bg-white/10 rounded p-2 hover:bg-white/20 transition-colors">
                  <p className="font-semibold">Admin</p>
                  <p className="text-xs">admin@tut.ac.za</p>
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
      
      <footer className="py-4 text-center text-white/60 text-sm backdrop-blur-sm bg-black/30">
        <p>&copy; {new Date().getFullYear()} TUT Connect</p>
      </footer>
    </div>
  );
};

export default Index;
