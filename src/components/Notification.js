import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function Notification({
  setnotificationBadge,
  getNotifications,
  MarkNotificationASRead,
  notifications,
}) {
  useEffect(() => {
    getNotifications();

    if (notifications === null || notifications === undefined) {
      setnotificationBadge(false);
    }
  }, []);

  return notifications !== null && notifications !== undefined ? (
    <div>
      {notifications.map((value, index) => {
        return (
          <div
            key={index}
            class="bg-rose-600 text-sm px-4 py-3 text-white sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          >
            <p class="text-center font-medium sm:text-left">
              "{value.proptitle}" - Property was sold
              <br class="sm:hidden" /> on {value.datee} at{" "}
              {value.timee.substring(0, 5)}
            </p>

            <button
              onClick={() => {
                MarkNotificationASRead(value.notid);
              }}
              class="mt-4 block rounded-lg bg-white px-5 py-3 text-center text-sm font-medium text-white-600 transition hover:bg-white/90 focus:outline-none focus:ring active:text-indigo-500 sm:mt-0"
            >
              Mark as Read
            </button>
          </div>
        );
      })}
    </div>
  ) : (
    <div>No notification's at the moment.</div>
  );
}

export default Notification;
