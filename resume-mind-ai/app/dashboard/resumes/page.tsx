import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import ComingSoonPage from "@/app/components/dashboard/ComingSoonPage";

export const metadata = {
  title: "My Resumes | ResumeMindAI",
};

export default async function ResumesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <ComingSoonPage
      title="My Resumes"
      description="Manage all your uploaded resumes, view extraction history, and organize your career documents."
      icon="description"
      features={[
        "View all uploaded resumes",
        "Track extraction status",
        "Compare resume versions",
        "Export to multiple formats",
      ]}
    />
  );
}
