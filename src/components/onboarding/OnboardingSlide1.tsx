
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface OnboardingSlide1Props {
  onNext: () => void;
}

const OnboardingSlide1 = ({ onNext }: OnboardingSlide1Props) => (
  <Card className="w-full max-w-md shadow-lg animate-fade-in">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-center text-campus-primary">Welcome to TUT Connect</CardTitle>
      <CardDescription className="text-center">
        Your one-stop solution for all campus services
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 text-center">
      <p>TUT Connect helps you manage your academic life efficiently:</p>
      <ul className="list-disc text-left pl-6 space-y-2">
        <li>Book study rooms and consultation appointments</li>
        <li>View your personalized class timetable</li>
        <li>Report maintenance issues around campus</li>
        <li>Receive important notifications</li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button 
        className="w-full bg-campus-primary hover:bg-campus-primary/90"
        onClick={onNext}
      >
        Next
      </Button>
    </CardFooter>
  </Card>
);

export default OnboardingSlide1;
