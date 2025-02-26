//
//  LaunchAtLogin.swift
//  Pods
//
//  Created by Thomas Lamars on 25/02/2025.
//
import ServiceManagement

@objc(LaunchAtLogin)
class LaunchAtLogin: NSObject {
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc(isSupported:rejecter:)
    func isSupported(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        if #available(macOS 13.0, *) {
            resolve(true)
        } else {
            resolve(false)
        }
    }
    
    @objc(isEnabled:rejecter:)
    func isEnabled(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        if #available(macOS 13.0, *) {
            let enabled = SMAppService.mainApp.status == .enabled
            resolve(enabled)
        } else {
            reject("UNSUPPORTED", "Launch at login requires macOS 13.0 or later", nil)
        }
    }
    
    @objc(setEnabled:resolver:rejecter:)
    func setEnabled(_ enabled: Bool, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        if #available(macOS 13.0, *) {
            do {
                if enabled {
                    try SMAppService.mainApp.register()
                } else {
                    try SMAppService.mainApp.unregister()
                }
                resolve(true)
            } catch {
                reject("ERROR", "Failed to \(enabled ? "enable" : "disable") launch at login: \(error.localizedDescription)", error)
            }
        } else {
            reject("UNSUPPORTED", "Launch at login requires macOS 13.0 or later", nil)
        }
    }
}
