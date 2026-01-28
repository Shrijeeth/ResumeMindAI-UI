import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import GraphPageContent from "../GraphPageContent";

interface GraphDocumentPageProps {
  params: Promise<{ documentId: string }>;
}

export async function generateMetadata({ params }: GraphDocumentPageProps) {
  const { documentId } = await params;
  return {
    title: `Knowledge Graph - ${documentId} | ResumeMindAI`,
  };
}

export default async function GraphDocumentPage({
  params,
}: GraphDocumentPageProps) {
  const { documentId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <GraphPageContent user={user} documentId={documentId} />;
}
