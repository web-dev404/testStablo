export const getServerSideProps = async () => {
  
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/article`
    );
    
    const data = await response.json();
    
    return {
      props: { testData: data }
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
};

const Test = ({ testData }) => {
  return (
    <>
      {testData && (
        <div>
          {testData.result.map(item => (
            <p key={item.id}>{item.id}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default Test;