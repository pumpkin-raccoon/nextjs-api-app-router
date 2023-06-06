const getPost = async (postId: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
  return res.json();
}

const PostDetailPage = async ({
  params: { postId },
}: {
  params: { postId: string };
}) => {
  const post = await getPost(postId)

  return (
    <div>
      {post.title}
    </div>
  )
}

export default PostDetailPage
