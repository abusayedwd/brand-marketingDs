import React from "react";
import { Button, Empty, Tag } from "antd";
import {
  useGetAdminNotificationsQuery,
  useMarkAdminNotificationReadMutation,
} from "../../../redux/features/notification/notifications";

const Notification = () => {
  const { data, isLoading } = useGetAdminNotificationsQuery();
  const [markRead] = useMarkAdminNotificationReadMutation();
  const items = data?.data?.attributes?.results || [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="page-title">Notifications</h1>
        <p className="page-subtitle">System alerts for your admin account.</p>
      </div>

      <div className="space-y-3">
        {isLoading && <div className="panel">Loading…</div>}
        {!isLoading && items.length === 0 && (
          <div className="panel">
            <Empty description="No notifications yet" />
          </div>
        )}
        {items.map((n) => (
          <div
            key={n.id}
            className={`panel flex items-start justify-between gap-4 ${n.isRead ? "opacity-70" : ""}`}
          >
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-display font-semibold text-ink-900">{n.title}</h3>
                <Tag>{n.type}</Tag>
                {!n.isRead && <Tag color="green">New</Tag>}
              </div>
              <p className="text-sm text-slate-600">{n.message}</p>
            </div>
            {!n.isRead && (
              <Button size="small" onClick={() => markRead(n.id)}>
                Mark read
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
