import { GetServerSideProps } from "next";
import Head from "next/head";
import { supabase } from "../../supabase/supabase";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white h-96 md:rounded-lg"></div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  console.log(user);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }
  return {
    props: {
      user,
    },
  };
};
