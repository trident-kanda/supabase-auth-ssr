import Layout from "../components/Layout";
import Link from "next/link";
import { Button, IconKey, IconMail, Input } from "@supabase/ui";
const Signin = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white  md:rounded-lg p-4">
        <Input icon={<IconMail />} label="Email" type="email" />
        <Input icon={<IconKey />} label="Password" type="password" />
        <div className="h-6" />
        <Button block>サインイン</Button>
        <div className="h-6" />
        <Link href="/signup">
          <a className="hover:text-gray-500">サインアップへ</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Signin;
