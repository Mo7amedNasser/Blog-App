import React from 'react';
import { Post } from '@prisma/client';
import { getPosts } from '@/server/APICalls';
import PostItem from '@/components/posts/PostItem';

const GetPosts = async () => {
  const posts: Post[] = await getPosts();

  return (
    <div className="container mx-auto p-4">
      {posts.length >= 1 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No Posts Yet!
        </div>
      )}
    </div>
  );
};

export default GetPosts;
