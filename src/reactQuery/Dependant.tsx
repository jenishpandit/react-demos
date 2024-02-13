
import { useQuery } from '@tanstack/react-query';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

const fetchPostById = async (postId: number) => {
    const data = await fetch(`https://dummyjson.com/posts/${postId}`).then((res) => res.json());
    return data;
};

const fetchCommentsByPostId = async (postId: any) => {
    const data = await fetch(`https://dummyjson.com/comments/post/${postId}`).then((res) =>
        res.json()
    );
    return data.comments;
};

const Dependant = () => {
    const { data: post, isLoading } = useQuery({
        queryKey: ['post'],
        queryFn: () => fetchPostById(2),
    });


    const postId = post?.id;

    const { data: comments, status } = useQuery({
        queryKey: ['comments', post?.id],
        queryFn: () => fetchCommentsByPostId(post.id),
        enabled: !!postId,
    });

    return (
        <div className="p-12">
            <h1 className="text-lg font-bold">Post:</h1>
            {isLoading ? <p>Loading the post</p> : <h2>{post?.title}</h2>}
            <br />
            <h1 className="text-lg font-bold">Comments: {status === "pending" && "pending"}</h1>

            <ul>
                {comments?.map((comment: { id: Key | null | undefined; body: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                    <p key={comment.id}>{comment.body}</p>
                ))}
            </ul>
        </div>
    );
};

export default Dependant