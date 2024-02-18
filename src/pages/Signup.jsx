import mount from "@/assets/mount.jpg";
import SignupForm from "@/components/SignupForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const { token } = useAuth();
  console.log(token, BASE_URL);

  return (
    <div className="relative h-[100vh] flex items-center justify-center">
      <Card className="w-[45rem] z-10 border-none">
        <CardHeader>
          <Button onClick={() => navigate(-1)} size="icon" variant="ghost">
            <MoveLeft className="h-6 w-6" />
          </Button>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
      <img src={mount} className="absolute w-full h-full z-0" alt="" />
    </div>
  );
};

export default Signup;
