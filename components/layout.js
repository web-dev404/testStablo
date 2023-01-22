// import defaultOG from "../public/img/og-default.jpg";
import Footer from "@components/footer";
import Navbar from "@components/navbar";
import { NextSeo } from "next-seo";
import Script from "next/script";
import React from "react";
// import PopupWidget from "../components/popupWidget";

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      <NextSeo
        title={`productlab.pro - ${props.title}`}
        description={props.first_sentence || ""}
        canonical={`productlab.pro`}
        openGraph={{
          url: `productlab.pro`,
          type: 'website',
          title: `productlab.pro - ${props.title}`,
          description: props.first_sentence || "",
          images: [
            {
              url: `${process.env.BASE_URL}${props?.header_pic}` || `${process.env.BASE_URL}${props?.main_pic}` || "",
              width: 800,
              height: 600,
              alt: ""
            }
          ],
          site_name: 'productlab.pro'
        }}
        twitter={{
          cardType: "summary_large_image",
          image: `${process.env.BASE_URL}${props?.header_pic}` || `${process.env.BASE_URL}${props?.main_pic}` || "",
        }}
      />

      <div className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Navbar {...props} />
        
        <div>{children}</div>

        <Footer {...props} />
      </div>
  
      {/*User.Agent counter*/}
      <script src="https://user-agent.cc/cdn/uainit.js?code=539_zwwJarCkVTsC"></script>
      {/* /User.Agent counter */}
  
      {/*<Script src={'/yandex.js'} />*/}
      {/*<noscript><div><img src="https://mc.yandex.ru/watch/56388640" style="position:absolute; left:-9999px;" alt="" /></div></noscript>*/}
    </>
  );
}
