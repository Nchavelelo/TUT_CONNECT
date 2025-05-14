// ManageNotification.tsx
import React from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

interface ManageNotificationProps {
  notifications: Notification[];
  onManageNotification: (id: string, action: string) => void;
  onMarkAllAsRead: () => void;
}

const ManageNotification: React.FC<ManageNotificationProps> = ({
  notifications,
  onManageNotification,
  onMarkAllAsRead,
}) => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Manage Notifications</h2>
        <button
          onClick={onMarkAllAsRead}
          className="text-sm text-blue-500 hover:underline"
        >
          Mark All as Read
        </button>
      </div>
      <ul className="space-y-2">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{notif.title}</p>
              <p className="text-sm text-gray-500">{notif.message}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onManageNotification(notif.id, "delete")}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
              {!notif.read && (
                <button
                  onClick={() => onManageNotification(notif.id, "read")}
                  className="text-green-500 hover:underline text-sm"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageNotification;
