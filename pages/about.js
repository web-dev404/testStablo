import Container from "@components/container";
import Layout from "@components/layout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function About({ authors, siteconfig }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        "https://promo.productlab.pro/api/users",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Token: "fd367175c6fe85c5eea6cc86882acee4"
          },
          method: "GET"
        }
      );

      setUsers(await response.json());
    };

    getUsers();
  }, []);

  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <div className="text-center">
          <p className="text-lg">We are a small passionate team.</p>
        </div>
  
        {users && (
          <div className="users-wrapper">
            {users.result.map(user => (
              <div key={user.id}>
                <div
                  key={user.id}
                  className="relative overflow-hidden rounded-md aspect-square">
                  <img className="object-cover" src={`${process.env.BASE_URL}${user.profile_pic}` || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt={user.name || ' '} />
                </div>
                <p
                  className={
                    "text-center text-[18px] font-medium mt-1"
                  }>
                  {user.name}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          <p>
            We provide real-time connectivity to enable software
            providers and financial institutions to build integrated
            products for their small business customers.
          </p>
          <p>
            Our API infrastructure is leveraged by clients ranging
            from lenders to corporate card providers and business
            forecasting tools, with use cases including automatic
            reconciliation, business dashboarding, and loan
            decisioning.
          </p>
          <p>
            <Link href="/contact">Get in touch</Link>
          </p>
        </div>
      </Container>
    </Layout>
  );
}

// export async function getStaticProps({ params, preview = false }) {
//   //console.log(params);
//   const authors = await getClient(preview).fetch(authorsquery);
//   const config = await getClient(preview).fetch(configQuery);
//   return {
//     props: {
//       authors: authors,
//       siteconfig: { ...config },
//       preview
//     },
//     revalidate: 100
//   };
// }
