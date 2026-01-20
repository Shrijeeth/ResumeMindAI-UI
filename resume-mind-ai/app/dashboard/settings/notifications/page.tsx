import SettingsComingSoon from "@/app/components/dashboard/settings/SettingsComingSoon";

export const metadata = {
  title: "Notifications | ResumeMindAI",
};

export default function NotificationsPage() {
  return (
    <SettingsComingSoon
      title="Notifications"
      description="Customize your notification preferences for email alerts and in-app notifications."
      icon="notifications"
    />
  );
}
