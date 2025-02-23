//
//  MMKV.swift
//  GitBar
//
//  Created by Thomas Lamars on 12/09/2024.
//

import Foundation

func setMMKVStorageLocation() -> Void {
    // Get the bundle identifier
    guard let bundleIdentifier = Bundle.main.bundleIdentifier else {
        fatalError("Unable to retrieve bundle identifier")
    }

    // Get the Application Support directory path
    let paths = NSSearchPathForDirectoriesInDomains(.applicationSupportDirectory, .userDomainMask, true)
    guard let applicationSupportDirectory = paths.first else {
        fatalError("Unable to locate Application Support directory")
    }
    
    // Create a folder for your app within Application Support
    let appSupportSubfolder = (applicationSupportDirectory as NSString).appendingPathComponent(bundleIdentifier)

    // Ensure the directory exists
    let fileManager = FileManager.default
    if !fileManager.fileExists(atPath: appSupportSubfolder) {
        try? fileManager.createDirectory(atPath: appSupportSubfolder, withIntermediateDirectories: true, attributes: nil)
    }

    // Initialize MMKV with custom storage path
    let storagePath = (appSupportSubfolder as NSString).appendingPathComponent("mmkv")
    MMKV.initialize(rootDir: storagePath)
  }
