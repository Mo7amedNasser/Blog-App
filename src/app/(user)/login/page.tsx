import React from 'react';
import LoginForm from './loginForm';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const page = () => {
  const token = cookies().get("_auth_token")?.value;
  if (token) redirect("/");

  return (
    <LoginForm />
  )
}

export default page;