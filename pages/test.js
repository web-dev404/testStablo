export const getServerSideProps = async () => {
	const response = await fetch(
		"https://jsonplaceholder.typicode.com/posts"
	);

	const data = await response.json()

	if (!data) {
		return {
			notFound: true
		};
	}

	return {
		props: {testData: data}
	};
};

const Test = ({testData}) => {
	return (
		<div>
			{testData.map(item => (
				<p key={item.id}>{item.id}</p>
			))}
		</div>
	)
}

export default Test;