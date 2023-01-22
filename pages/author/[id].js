import Container from "@components/container";
import Layout from "@components/layout";
import PostList from "@components/postlist";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Author = () => {
  const router = useRouter();
  const baseUrl = "https://promo.productlab.pro/api/article?performers_ids=";
  const id = router.query.id;
  const [authorPosts, setAuthorPosts] = useState();
  
  useEffect(() => {
    if (!id) {
      return;
    }
    
    const updateGames = async () => {
      axios
        .get(`${baseUrl}${id}`)
        .then(function(response) {
          setAuthorPosts(response.data.result);
        });
    };
    
    updateGames();
  }, [id]);
  
  return (
    <Layout>
      <Container className="!pt-0">
        {authorPosts && (
          <>
            <div className={'flex flex-col items-center'}>
              {authorPosts[0].performer.profile_pic && (
                <img className={'rounded-full w-20 h-20'} src={`${process.env.BASE_URL}${authorPosts[0].performer.profile_pic}` || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt={authorPosts[0]?.performer?.name || "Thumbnail"} />
              )}
              
              <p className={'mt-2 text-3xl font-semibold tracking-tight lg:leading-tight text-brand-primary lg:text-3xl dark:text-white'}>{authorPosts[0]?.owner?.name}</p>
  
              <p
                className={"mt-1 text-gray-600 text-xl"}>Количество
                статей: {authorPosts.length}</p>
            </div>
            <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              {authorPosts.map(post => (
                <PostList key={post.id} post={post} author={post.performer} aspect="square" />
              ))}
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Author;
