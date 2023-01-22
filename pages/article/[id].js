import AuthorCard from "@components/blog/authorCard";
import CategoryLabel from "@components/blog/category";
import Container from "@components/container";
import Layout from "@components/layout";
import {PhotographIcon} from "@heroicons/react/outline";
import axios from "axios";
import {format, parseISO} from "date-fns";
import parse from "html-react-parser";
import Link from "next/link";
import {NextSeo} from 'next-seo';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

// export const getServerSideProps = async context => {
// 	const {id} = context.params;
//
// 	const response = await fetch(
// 		`${process.env.BASE_URL}article/${id}`
// 	);
//
// 	const data = await response.json()
//
// 	if (!data) {
// 		return {
// 			notFound: true
// 		};
// 	}
//
// 	return {
// 		props: {currentPost: data}
// 	};
// };

export default function Article() {
	const router = useRouter();
	const id = router.query.id;
	const [currentPost, setCurrentPost] = useState();
	
	useEffect(() => {
		if (!id) {
			return;
		}
		
		const updateGames = async () => {
			axios
				.get(`https://promo.productlab.pro/api/article/${id}`)
				.then(function (response) {
					setCurrentPost(response.data);
				});
		};
		
		updateGames();
	}, [id]);
	
	useEffect(() => {
		console.log(currentPost);
	}, currentPost);
	
	return (
		<>
			{currentPost && (
				<Layout post={currentPost}>
					<NextSeo
						title={`productlab.pro - ${currentPost.title}`}
						description={currentPost.first_sentence || ""}
						canonical={`productlab.pro`}
						openGraph={{
							url: `productlab.pro`,
							title: `productlab.pro - ${currentPost.title}`,
							description: currentPost.first_sentence || "",
							images: [
								{
									url: `${process.env.BASE_URL}${currentPost?.header_pic}` || `${process.env.BASE_URL}${currentPost?.main_pic}` || "",
									width: 800,
									height: 600,
									alt: ""
								}
							],
							site_name: 'productlab.pro'
						}}
						twitter={{
							cardType: "summary_large_image",
							image: `${process.env.BASE_URL}${currentPost?.header_pic}` || `${process.env.BASE_URL}${currentPost?.main_pic}` || "",
						}}
					/>
					
					{/*
          <div className="relative bg-white/20">
            <div className="absolute w-full h-full -z-10">
              {article?.mainImage && (
                <Image
                  {...GetImage(article.mainImage)}
                  alt={article.mainImage?.alt || "Thumbnail"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <Container className="py-48">
              <h1 className="relative max-w-3xl mx-auto mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl after:absolute after:w-full after:h-full after:bg-white after:inset-0 after:-z-10 after:blur-2xl after:scale-150">
                {article.title}
              </h1>
            </Container>
          </div> */}
					
					<Container className="!pt-0">
						<div className="max-w-screen-md mx-auto ">
							<div className="text-center">
								<CategoryLabel categories={currentPost.categories}/>
							</div>
							
							<h1
								className="article__title tracking-tight lg:leading-snug text-brand-primary text-2xl sm:text-4xl dark:text-white">
								{currentPost.title}
							</h1>
							
							<div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
								<div className="flex items-center gap-3">
									<div className="relative flex-shrink-0 author-img">
										{currentPost?.owner?.profile_pic && (
											<img className={'rounded-full object-cover'}
											     src={`${process.env.BASE_URL}${currentPost.owner.profile_pic}` || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
											     alt={currentPost?.owner?.name}/>
										)}
									</div>
									<div>
										<p className="text-gray-800 dark:text-gray-400">
											{currentPost.owner.name}
										</p>
										<div className="flex items-center space-x-2 text-sm">
											<time
												className="text-gray-500 dark:text-gray-400"
												dateTime={
													currentPost?.time_created || post._createdAt
												}>
												{format(
													parseISO(
														currentPost?.time_created ||
														post._createdAt
													),
													"MMMM dd, yyyy"
												)}
											</time>
											<span>
                        · {currentPost.estReadingTime || "5"} min read
                      </span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Container>
					
					<div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
						{(currentPost?.main_pic || currentPost?.header_pic) ? (
							<img className={' object-cover'}
							     src={`${process.env.BASE_URL}${currentPost.main_pic}` || `${process.env.BASE_URL}${post.header_pic}`}
							     alt={currentPost.name || "Thumbnail"}/>
						) : (
							<span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <PhotographIcon/>
              </span>
						)}
					</div>
					
					<Container>
						<article className="max-w-screen-md mx-auto ">
							<div
								className="post__content mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500 break-words">
								{parse(currentPost.content)}
							</div>
							<div className="allPostsBtn mt-7 mb-7">
								<Link href="/">
									<a className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
										← View all posts
									</a>
								</Link>
							</div>
							{currentPost.owner.name && (
								<AuthorCard
									author={currentPost.owner}
									performer={currentPost.owner}
								/>
							)}
						</article>
					</Container>
				</Layout>
			)}
		</>
	);
}
