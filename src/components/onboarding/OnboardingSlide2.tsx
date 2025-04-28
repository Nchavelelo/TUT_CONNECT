
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface OnboardingSlide2Props {
  onComplete: () => void;
}

const OnboardingSlide2 = ({ onComplete }: OnboardingSlide2Props) => {
  const [studentNumber, setStudentNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [campus, setCampus] = useState("");
  const [faculty, setFaculty] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    localStorage.setItem("tutConnectUserDetails", JSON.stringify({
      studentNumber,
      firstName,
      lastName,
      campus,
      faculty,
      profilePicture,
      password: password || '12345'
    }));
    
    onComplete();
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-campus-primary">Complete Your Profile</CardTitle>
        <CardDescription className="text-center">
          Please provide your details to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="picture" className="cursor-pointer">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  {profilePicture ? (
                    <AvatarImage src={profilePicture} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-campus-primary text-white text-2xl flex items-center justify-center">
                      <Upload className="w-8 h-8" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <span className="text-sm text-muted-foreground mt-2 block text-center">
                Upload Profile Picture
              </span>
            </Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentNumber">Student Number</Label>
            <Input
              id="studentNumber"
              placeholder="e.g. 231967941"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              required
              pattern="\d{9}"
              title="Please enter a valid 9-digit student number"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password (default: 12345)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to use default password: 12345
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="campus">Campus</Label>
            <Select value={campus} onValueChange={setCampus} required>
              <SelectTrigger id="campus">
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pretoria">Pretoria</SelectItem>
                <SelectItem value="soshanguve">Soshanguve</SelectItem>
                <SelectItem value="arcadia">Arcadia</SelectItem>
                <SelectItem value="emalahleni">eMalahleni</SelectItem>
                <SelectItem value="mbombela">Mbombela</SelectItem>
                <SelectItem value="polokwane">Polokwane</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="faculty">Faculty</Label>
            <Select value={faculty} onValueChange={setFaculty} required>
              <SelectTrigger id="faculty">
                <SelectValue placeholder="Select faculty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ict">Information & Communication Technology</SelectItem>
                <SelectItem value="engineering">Engineering & Built Environment</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="humanities">Humanities</SelectItem>
                <SelectItem value="economics">Economics & Finance</SelectItem>
                <SelectItem value="arts">Arts & Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-campus-primary hover:bg-campus-primary/90"
          >
            Complete Registration
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OnboardingSlide2;
