import ExpoModulesCore
import UserNotifications

public class NotificationsModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {

    Name("NotificationsModule")

    AsyncFunction("requestPermissions") { (promise: Promise) in
      let center = UNUserNotificationCenter.current()
      let options: UNAuthorizationOptions = [.alert, .sound, .badge]
      center.requestAuthorization(options: options) { granted, error in
        if let error = error {
            promise.reject(error)
          return
        }

          promise.resolve(granted)
        if !granted {
          NSLog("Notification permission denied")
        }
      }
    }

    AsyncFunction("getPermissions") { (promise: Promise) in
      let center = UNUserNotificationCenter.current()
      center.getNotificationSettings { settings in
        promise.resolve(settings.authorizationStatus.rawValue)
      }
    }

    Function("sendNotification") { (title: String, body: String) in
      let content = UNMutableNotificationContent()
      content.title = title
      content.body = body
      content.sound = .default
        
      // Add URL to notification
      content.userInfo = ["url": "gitbar://dashboard"]
        
      let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: nil)
      UNUserNotificationCenter.current().add(request) { error in
        if let error = error {
          NSLog("Error sending notification: \(error.localizedDescription)")
        }
      }
    }
  }
}
