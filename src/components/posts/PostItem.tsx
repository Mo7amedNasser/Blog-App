import { Post } from "@prisma/client";

interface PostItemProps {
  post: Post;
};

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="p-5 rounded-lg my-2 shadow-lg border-2 border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer">
      <h3 className="text-2xl font-bold text-gray-800 truncate">
        {post.title}
      </h3>
      <p className="mt-2 text-lg text-gray-600 truncate">
        {post.description}
      </p>
    </div>
  );
};

export default PostItem;
