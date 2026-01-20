import SettingsComingSoon from "@/app/components/dashboard/settings/SettingsComingSoon";

export const metadata = {
  title: "API Keys | ResumeMindAI",
};

export default function APIKeysPage() {
  return (
    <SettingsComingSoon
      title="API Keys"
      description="Manage API keys for external integrations and programmatic access to ResumeMindAI."
      icon="key"
    />
  );
}
