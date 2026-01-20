import { redirect } from "next/navigation";

export const metadata = {
  title: "Settings | ResumeMindAI",
};

export default function SettingsPage() {
  redirect("/dashboard/settings/llm-providers");
}
