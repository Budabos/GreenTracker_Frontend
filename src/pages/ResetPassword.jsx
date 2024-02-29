import mount from "@/assets/mount.jpg";
import ForgotPassForm from "@/components/ForgotPassForm";
import ResetPassForm from "@/components/ResetPassForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { token } = useParams();
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  return (
    <div className="relative h-[100dvh] flex items-center justify-center">
      <Card className="w-[45rem] z-10 border-none">
        <CardHeader>
          <Button onClick={() => navigate(-1)} size="icon" variant="ghost">
            <MoveLeft className="h-6 w-6" />
          </Button>
          <CardTitle>Reset password for {decodedToken.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResetPassForm />
        </CardContent>
      </Card>
      <img src={mount} className="absolute w-full h-full z-0" alt="" />
    </div>
  );
};

export default ResetPassword;
