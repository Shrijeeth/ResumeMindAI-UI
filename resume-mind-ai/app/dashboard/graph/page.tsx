import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import GraphPageContent from "./GraphPageContent";

export const metadata = {
  title: "Knowledge Graph | ResumeMindAI",
};

export default async function GraphPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <GraphPageContent user={user} />;
}
