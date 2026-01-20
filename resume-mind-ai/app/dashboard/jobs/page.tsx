import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import ComingSoonPage from "@/app/components/dashboard/ComingSoonPage";

export const metadata = {
  title: "Job Matches | ResumeMindAI",
};

export default async function JobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <ComingSoonPage
      title="Job Matches"
      description="Find job opportunities that match your skills and experience. AI-powered job recommendations based on your knowledge graph."
      icon="work"
      features={[
        "AI-powered job matching",
        "Skill gap analysis per job",
        "Application tracking",
        "Interview preparation tips",
      ]}
    />
  );
}
