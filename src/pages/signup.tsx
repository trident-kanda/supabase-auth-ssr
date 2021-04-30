import Layout from "../components/Layout";
import { Button, IconKey, IconMail, Input } from "@supabase/ui";
import Link from "next/link";
const Signup = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white  md:rounded-lg p-4">
        <Input icon={<IconMail />} label="Email" type="email" />
        <Input icon={<IconKey />} label="Password" type="password" />
        <Input icon={<IconKey />} label="ConfirmPassword" type="password" />
        <div className="h-6" />
        <Button block>サインイン</Button>
        <div className="h-6" />
        <Link href="/signin">
          <a className="hover:text-gray-500">サインアップ</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Signup;
