import ChangeDetailsForm from "@/components/ChangeDetailsForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { getUser, userCred } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  if (!user || !userCred) {
    navigate("/login");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {user && (
        <div className="cursor-pointer">
          <div className="bg-gray-100 p-4 rounded-lg">
            <Tabs defaultValue="user information">
              <TabsList>
                <TabsTrigger
                  value="user information"
                  className="text-xl font-bold mb-2"
                >
                  User information
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="text-xl font-bold mb-2"
                >
                  Password
                </TabsTrigger>
              </TabsList>
              <TabsContent value="user information">
                <p className="font-medium my-3">
                  Make changes to your account here.
                </p>
                <ChangeDetailsForm />
              </TabsContent>
              <TabsContent value="password">
                <p className="font-medium my-3">Change your password here.</p>
                <ChangePasswordForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
