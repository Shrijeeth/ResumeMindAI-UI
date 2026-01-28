import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

interface GraphDocumentPageProps {
  params: Promise<{ documentId: string }>;
}

export async function generateMetadata({ params }: GraphDocumentPageProps) {
  const { documentId } = await params;
  return {
    title: `Knowledge Graph - ${documentId} | ResumeMindAI`,
  };
}

export default async function GraphDocumentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Redirect to main user-level graph page
  redirect("/dashboard/graph");
}
