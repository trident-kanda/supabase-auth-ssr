import Layout from "../components/Layout";
import Link from "next/link";
import { Button, IconKey, IconMail, Input } from "@supabase/ui";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { replace } = useRouter();

  const inputEmail = useCallback(
    (mail: string) => {
      setEmail(mail);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (pass: string) => {
      setPassword(pass);
    },
    [setPassword]
  );

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
        replace("/");
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  });
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white  md:rounded-lg p-4">
        <Input
          icon={<IconMail />}
          label="Email"
          type="email"
          onChange={(e) => {
            inputEmail(e.target.value);
          }}
        />
        <Input
          icon={<IconKey />}
          label="Password"
          type="password"
          onChange={(e) => {
            inputPassword(e.target.value);
          }}
        />
        <div className="h-6" />
        <Button
          block
          onClick={async () => {
            await supabase.auth.signIn({
              email,
              password,
            });
          }}
        >
          サインイン
        </Button>
        <div className="h-6" />
        <Link href="/signup">
          <a className="hover:text-gray-500">サインアップへ</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Signin;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
  return {
    props: {
      user,
    },
  };
};
