import Input from "@/app/components/inputs/Input";
import AuthForm from "./components/AuthForm";
// When navigating to '/' we will check if the user is logged in. If they are-> navigate to '/messages/me'
// If they are not logged in -> navigate to '/login'

// The main reason we want it this way is to prevent the user from seeing the login page if they are already logged in and to create a single layout for the app and only have 1 layout for the login page
export default async function Home() {
  return (
    <div className="home-page flex items-center justify-center h-full">
      <AuthForm />
    </div>
  );
}
