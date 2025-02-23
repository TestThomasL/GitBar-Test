//
//  AppDelegate.swift
//  GitBar
//
//  Created by Thomas Lamars on 11/09/2024.
//

import Foundation
import Cocoa
import UserNotifications
import React

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate, UNUserNotificationCenterDelegate, RCTBridgeDelegate, NSPopoverDelegate {
  
  var bridge: RCTBridge!
  var statusItem: NSStatusItem!
  var popover: NSPopover!
  
  func applicationDidFinishLaunching(_ notification: Notification) {
    UNUserNotificationCenter.current().delegate = self
    setMMKVStorageLocation()

    bridge = RCTBridge(delegate: self, launchOptions: nil)
    
    statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
    if let button = statusItem.button {
      let image = NSImage(named: "PullRequest")
      image?.size = NSSize(width: 20, height: 20)
      image?.isTemplate = true
      image?.prefersColorMatch = true
      button.image = image
      button.action = #selector(onPressStatusItem(_:))
    }
    
    let rootView = RCTRootView(bridge: bridge, moduleName: "main", initialProperties: [:])
    let rootViewController = NSViewController()
    rootViewController.view = rootView
    
    popover = NSPopover()
    popover.contentSize = NSSize(width: 700, height: 500)
    popover.contentViewController = rootViewController
    popover.behavior = .transient
    popover.delegate = self
    
    popoverObservers()
    
    let em = NSAppleEventManager.shared()
    em.setEventHandler(self, andSelector: #selector(self.getUrl(_:withReplyEvent:)), forEventClass: AEEventClass(kInternetEventClass), andEventID: AEEventID(kAEGetURL))
  }
  
  func popoverDidClose(_ notification: Notification) {
    RNEventEmitter.emitter.sendEvent(withName: "onPopoverState", body: [
      "state": "Closed"
    ])
  }
  
  func popoverWillShow(_ notification: Notification) {
    RNEventEmitter.emitter.sendEvent(withName: "onPopoverState", body: [
      "state": "Opened"
    ])
  }
  
  @objc
  public func getUrl(_ event: NSAppleEventDescriptor, withReplyEvent reply: NSAppleEventDescriptor) -> Void {
    if let button = statusItem.button {
      popover.show(relativeTo: button.bounds, of: button, preferredEdge: NSRectEdge.minY)
    }
    return RCTLinkingManager.getUrlEventHandler(event, withReplyEvent: reply)
  }
  
  func sourceURL(for bridge: RCTBridge) -> URL? {
    #if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackExtension: nil)
    #else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
  
  @objc
  func openPopover() {
    popover.show(relativeTo: statusItem.button!.bounds, of: statusItem.button!, preferredEdge: .minY)
    popover.contentViewController?.view.window?.makeKey()
  }

  func closePopover() {
    popover.close()
  }
  
  func popoverObservers() {
    let notificationCenter = NotificationCenter.default
    notificationCenter.addObserver(forName: Notification.Name("GitBar-OpenPopover"), object: nil, queue: nil) { [weak self] _ in
      self?.openPopover()
    }
    notificationCenter.addObserver(forName: Notification.Name("GitBar-ClosePopover"), object: nil, queue: nil) { [weak self] _ in
      self?.closePopover()
    }
    notificationCenter.addObserver(self, selector: #selector(setPopoverAppearance(_:)), name: Notification.Name("GitBar-SetAppearance"), object: nil)
    notificationCenter.addObserver(self, selector: #selector(setStatusItemText(_:)), name: Notification.Name("GitBar-SetStatusItemText"), object: nil)
  }
  
  @objc
  func setPopoverAppearance(_ notification: NSNotification) {
      guard let userInfo = notification.userInfo as? [String: Any],
            let isDark = userInfo["isDark"] as? Bool else { return }

      popover.appearance = NSAppearance(named: isDark ? .darkAqua : .aqua)
  }
  
  @objc
  func setStatusItemText(_ notification: NSNotification) {
      guard let userInfo = notification.userInfo as? [String: Any],
            let text = userInfo["text"] as? String else { return }

    statusItem.button?.title = text
  }
  
  @objc 
  func onPressStatusItem(_ sender: Any?) {
    if popover.isShown {
      closePopover()
    } else {
      openPopover()
    }
  }
  
  func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    openPopover()
    completionHandler()
  }
}
