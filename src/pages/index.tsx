import { GetServerSideProps } from "next";
import { Button } from "@supabase/ui";
import Head from "next/head";
import { supabase } from "../../supabase/supabase";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const { replace } = useRouter();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const body = JSON.stringify({ event, session });
        await fetch("/api/auth", {
          method: "post",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body,
        });
        replace("/signin");
      }
    );
  });
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white  md:rounded-lg">
        <Button
          block
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          サインアウト
        </Button>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
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
