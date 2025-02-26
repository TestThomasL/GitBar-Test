import ExpoModulesCore
import ServiceManagement

// custom error
enum AppError: Error {
  case failedToSetLaunchAtLogin
}

enum MacStateChange: String {
  case Locked = "Locked"
  case Unlocked = "Unlocked"
}

let APP_ON_MAC_STATE_CHANGE = "onMacStateChange"

public class AppModule: Module {

  public func definition() -> ModuleDefinition {

    Name("AppModule")

    Events(APP_ON_MAC_STATE_CHANGE)

    OnStartObserving {
      DistributedNotificationCenter.default().addObserver(self, selector: #selector(self.handleScreenLocked), name: NSNotification.Name("com.apple.screenIsLocked"), object: nil)
      DistributedNotificationCenter.default().addObserver(self, selector: #selector(self.handleScreenUnlocked), name: NSNotification.Name("com.apple.screenIsUnlocked"), object: nil)
    }

    OnStopObserving {
      DistributedNotificationCenter.default().removeObserver(self, name: NSNotification.Name("com.apple.screenIsLocked"), object: nil)
      DistributedNotificationCenter.default().removeObserver(self, name: NSNotification.Name("com.apple.screenIsUnlocked"), object: nil)
    }

    Function("closeApp") {
      exit(0)
    }

    // Launch at login functions
    AsyncFunction("isLaunchAtLoginSupported") { () -> Bool in
      if #available(macOS 13.0, *) {
        return true
      }
      return false
    }

    AsyncFunction("isLaunchAtLoginEnabled") { () -> Bool in
      if #available(macOS 13.0, *) {
        return SMAppService.mainApp.status == .enabled
      }
      throw AppError.failedToSetLaunchAtLogin
    }

    AsyncFunction("setLaunchAtLoginEnabled") { (enabled: Bool) in
      if #available(macOS 13.0, *) {
        do {
          if enabled {
            try SMAppService.mainApp.register()
          } else {
            try SMAppService.mainApp.unregister()
          }
        } catch {
          throw AppError.failedToSetLaunchAtLogin
        }
      } else {
        throw AppError.failedToSetLaunchAtLogin
      }
    }
  }

  @objc 
  private func handleScreenLocked() {
    sendEvent("onMacStateChange", ["state": MacStateChange.Locked.rawValue])
  }

  @objc 
  private func handleScreenUnlocked() {
    sendEvent("onMacStateChange", ["state": MacStateChange.Unlocked.rawValue])
  }
}
