import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import GraphDocumentSelector from "./GraphDocumentSelector";

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

  return <GraphDocumentSelector user={user} />;
}
