import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATION_KEY = "MOBILEFLASHCARDS:NOTIFICATIONS";
import * as Notifications from "expo-notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
    .catch((err) => console.warn("Error cancelling Notifications", err));
}
export function createNotification() {
  return {
    title: "Your flashcard needs you.",
    body: "👋 Don't forget to log practice your flahcards for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: "false",
      vibrate: "true",
    },
  };
}
export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Notifications.requestPermissionsAsync()
          .then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync().catch(
                (err) => {
                  console.warn("cancelAllScheduledNotificationsAsync", err);
                }
              );
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);
              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: {
                  channelId: "default",
                  seconds: 86400,
                  repeats: true,
                },
              }).catch((err) => {
                console.warn("scheduleNotificationAsync", err);
              });
              AsyncStorage.setItem(
                NOTIFICATION_KEY,
                JSON.stringify(true)
              ).catch((err) => {
                console.warn("AsyncStorage set Item error");
              });
            }
          })
          .catch((err) => {
            console.warn("error requestPermissionsAsync");
          });
      }
    })
    .catch((err) => {
      console.warn("requestPermissionsAsync", err);
    });
};
