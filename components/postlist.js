import CategoryLabel from "@components/blog/category";
import {PhotographIcon} from "@heroicons/react/outline";
import {cx} from "@utils/all";
import {format, parseISO} from "date-fns";
import Link from "next/link";

export default function PostList({post, aspect, author}) {
	return (
		<>
			<div className="cursor-pointer link-effect basis-1/2 max-w-full overflow-hidden">
				<div
					className={cx(
						"relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105",
						aspect === "landscape" ? "aspect-video" : "aspect-square"
					)}>
					<Link href={`/article/${post.id}`}>
						<a>
							{(post?.header_pic || post?.main_pic) ? (
								<img className={'transition-all object-cover h-full w-full'}
								     src={`${process.env.BASE_URL}${post.header_pic}` || `${process.env.BASE_URL}${post.main_pic}`}
								     alt={post.first_sentence || "Thumbnail"}/>
							) : (
								<span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <PhotographIcon/>
              </span>
							)}
						</a>
					</Link>
				</div>
				{post.category[0] && (
					<CategoryLabel category={post.category}/>
				)}
				<h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
					<Link href={`/article/${post.id}`}>
						<a>
               <span className="link-underline link-underline-blue">
              {post?.title || 'Название статьи'}
            </span>
						</a>
					</Link>
				</h2>
				
				<Link href={`/author/${author.id}`}>
					<a>
						<div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
							<div className="flex items-center gap-3">
								<div className="relative flex-shrink-0 w-5 h-5">
									{author.profile_pic && (
										<img className={'rounded-full'}
										     src={`${process.env.BASE_URL}${author.profile_pic}` || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
										     alt={post?.owner?.name || "Thumbnail"}/>
									)}
								</div>
								<span className="text-sm">{author.name}</span>
							</div>
							<span className="text-xs text-gray-300 dark:text-gray-600">
              &bull;
            </span>
							<time
								className="text-sm"
								dateTime={post?.time_created || post._createdAt}>
								{format(
									parseISO(post?.time_created || post._createdAt),
									"MMMM dd, yyyy"
								)}
							</time>
						</div>
					</a>
				</Link>
			</div>
		</>
	);
}
