import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetPostsById } from '@/lib/posts/useGetPostsById';
import { usePostsStore } from '@/store/postsStore';

const PostAddEdit = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const postId = searchParams.get('postId');
    const { postsById, postsByIdPending } = useGetPostsById(postId)
    const addPost = usePostsStore((state) => state.addPost);

    useEffect(() => {
        if (!postId || postsByIdPending || !postsById) return;
        console.log(postsById)
        const posts = usePostsStore.getState().posts;
        const exists = posts.find((p) => p.postId.toString() === postId);

        if (!exists) {
            addPost({
                postId: postsById.postId || postId,
                title: postsById.title || '',
                text: postsById.text || '',
                summary: postsById.summary || '',
                images: postsById.images || [],
                time: postsById.time || null,
                url: postsById.url,
                placeholder: "Новый пост",
                progress: `${postsById.text?.length || 0} / 1024`,
            });
        }

        navigate('/', { state: { openPostPopup: true, postId }, replace: true });
    }, [postId, postsById, postsByIdPending]);
    
    return (
        <p>Загрузка...</p>
    );
}

export default PostAddEdit
