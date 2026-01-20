import SettingsComingSoon from "@/app/components/dashboard/settings/SettingsComingSoon";

export const metadata = {
  title: "Webhooks | ResumeMindAI",
};

export default function WebhooksPage() {
  return (
    <SettingsComingSoon
      title="Webhooks"
      description="Configure webhook endpoints for real-time notifications when resumes are processed."
      icon="webhook"
    />
  );
}
