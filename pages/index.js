import Container from "@components/container";
import Layout from "@components/layout";
import PostList from "@components/postlist";
import axios from "axios";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// export const getServerSideProps = async (context) => {
// 	const response = await fetch(
// 		"https://promo.productlab.pro/api/article?limit=14"
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
// 		props: {responseArticles: data}
// 	};
// };

export default function Post() {
	const siteConfig = {
		title: 'Разработка и упаковка современных продуктов от Productlab.pro',
		first_sentence: 'Упаковка и консалтинг всех бизнес-процессов для современных и технологичных компаний.',
		header_pic: 'https://promo.productlab.pro/api/images/header_pic/10.jpg'
	}
	
	const router = useRouter();
	const [hasMore, setHasMore] = useState(true);
	const [articles, setArticles] = useState();
	
	useEffect(() => {
		axios
			.get("https://promo.productlab.pro/api/article?limit=14")
			.then(function (response) {
				setArticles(response.data.result);
			});
	}, []);
	
	const getMoreArticles = async () => {
		const response = await axios.get(
			`https://promo.productlab.pro/api/article?limit=14&offset=${articles.length}`
		);
		
		if (response.data.result.length == 0) {
			setHasMore(false);
		}
		setArticles(article => [...article, ...response.data.result]);
	};
	
	
	return (
		<>
			{articles && (
				<Layout post={siteConfig}>
					<NextSeo
						title={`productlab.pro - ${siteConfig.title}`}
						description={siteConfig.first_sentence || ""}
						canonical={`productlab.pro`}
						openGraph={{
							url: `productlab.pro`,
							type: 'website',
							title: `productlab.pro - ${siteConfig.title}`,
							description: siteConfig.first_sentence || "",
							images: [
								{
									url: siteConfig?.header_pic || siteConfig?.main_pic || "",
									width: 800,
									height: 600,
									alt: ""
								}
							],
							site_name: 'Productlab',
						}}
						twitter={{
							cardType: "summary_large_image",
							image: siteConfig?.header_pic || siteConfig?.main_pic || "",
						}}
					/>
					
					<Container>
						<InfiniteScroll
							dataLength={articles.length}
							next={getMoreArticles}
							hasMore={hasMore}
							loader={<h3> Loading...</h3>}
							style={{overflow: "unset"}}>
							<div className="grid gap-10 lg:gap-10 md:grid-cols-2">
								{articles.slice(0, 2).map(post => (
									<PostList
										key={post.id}
										post={post}
										aspect="landscape"
										author={post.owner}
									/>
								))}
							</div>
							<div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
								{articles.slice(2).map(post => (
									<PostList
										key={post.id}
										post={post}
										aspect="square"
										author={post.owner}
									/>
								))}
							</div>
						</InfiniteScroll>
					</Container>
				</Layout>
			)}
		</>
	);
}

// export async function getStaticProps({ params, preview = false }) {
//   const post = await getClient(preview).fetch(postquery);
//   const config = await getClient(preview).fetch(configQuery);
//
//   // const categories = (await client.fetch(catquery)) || null;
//
//   return {
//     props: {
//       postdata: post,
//       // categories: categories,
//       siteconfig: { ...config },
//       preview
//     },
//     revalidate: 10
//   };
// }
