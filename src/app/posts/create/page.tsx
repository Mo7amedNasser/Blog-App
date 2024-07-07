import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PostForm from './PostForm';
import { verifyTokenForClient } from '@/utils/verifyToken';
// import { Category } from '@prisma/client';
// import { getCategories } from '@/server/APICalls';

const CreatePost = async () => {
  const token = cookies().get("_auth_token")?.value;
  if (!token) redirect("/posts");

  const payload = verifyTokenForClient(token);

  // const categories: Category[] = await getCategories();

  return (
    <PostForm authorId={payload?.id} />
  )
}

export default CreatePost
