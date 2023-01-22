import CategoryLabel from "@components/blog/category";
import Container from "@components/container";
import Layout from "@components/layout";
import PostList from "@components/postlist";
import Label from "@components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Category = () => {
  const router = useRouter();
  const baseUrl =
    "https://promo.productlab.pro/api/article?categories_ids=";
  const id = router.query.id;
  const [authorPosts, setAuthorPosts] = useState();
  
  useEffect(() => {
    if (!id) {
      return;
    }
    
    const updateGames = async () => {
      axios.get(`${baseUrl}${id}`).then(function(response) {
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
            <div className={"flex flex-col items-center"}>
              <div>
                <div className={"flex items-center gap-2"}>
                  {authorPosts[0].category?.length &&
                    authorPosts[0].category.slice(0).map((categoryItem) => (
                      <p key={categoryItem.id} className={'text-3xl font-semibold tracking-tight lg:leading-tight text-brand-primary lg:text-5xl dark:text-white'}>{categoryItem.name}</p>
                    ))}
                </div>
              </div>
              
              <p
                className={"mt-1 text-gray-600 text-xl"}>Количество
                статей: {authorPosts.length}</p>
            </div>
            
            <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              {authorPosts.map(post => (
                <PostList key={post.id} post={post} author={post.owner} aspect="square" />
              ))}
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Category;
