//
//  LaunchAtLogin.swift
//  GitBar
//
//  Created by Thomas Lamars on 28/09/2024.
//

import Foundation
import LaunchAtLogin
@objc(LaunchAtLoginModule)
class LaunchAtLoginModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    false
  }
  @objc
  func checkStatus(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    resolve(LaunchAtLogin.isEnabled)
  }
  @objc
  func setStatus(_ isEnabled: Bool) {
    LaunchAtLogin.isEnabled = isEnabled
  }
}
