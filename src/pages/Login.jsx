import mount from "@/assets/mount.jpg";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[100dvh] flex items-center justify-center">
      <Card className="w-[45rem] z-10 border-none">
        <CardHeader>
          <Button onClick={() => navigate(-1)} size="icon" variant="ghost">
            <MoveLeft className="h-6 w-6" />
          </Button>
          <CardTitle>Login into your account</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <img src={mount} className="absolute w-full h-full z-0" alt="" />
    </div>
  );
};

export default Login;
