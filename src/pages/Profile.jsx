import { SidebarDemo } from '@/components/UserProfile/ProfileSidebar';

export default function Profile() {
  return (
    <div className="min-h-screen overflow-auto scrollbar-hide">
      <SidebarDemo className="w-64 bg-sidebar p-4" />
    </div>
  );
}
