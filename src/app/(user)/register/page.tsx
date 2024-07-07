import RegisterForm from './registerForm';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const page = () => {
  const token = cookies().get("_auth_token")?.value;
  if (token) redirect('/');

  return (
    <RegisterForm />
  );
};

export default page;