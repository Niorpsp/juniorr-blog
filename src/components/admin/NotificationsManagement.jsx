import { useOutletContext } from "react-router-dom";
import { Bell, ArrowRight } from "lucide-react";

export default function NotificationsManagement() {
  const { notifications } = useOutletContext();

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm text-slate-500">Notification</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          Latest notifications
        </h2>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {notification.message}
                </p>
              </div>
              <span className="text-sm text-slate-500">
                {notification.date}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                <Bell size={16} /> {notification.type}
              </div>
              <a
                href={notification.target}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-slate-700"
              >
                View <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
