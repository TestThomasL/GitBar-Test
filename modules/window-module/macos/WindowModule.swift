import ExpoModulesCore
import React

public class WindowModule: Module {
    
    private var windowsMap = [String: NSWindow]()
    private var bridge: RCTBridge!

    public func definition() -> ModuleDefinition {
        Name("WindowModule")
        
        Constants([
            "STYLE_MASK_BORDERLESS": NSWindow.StyleMask.borderless.rawValue,
            "STYLE_MASK_TITLED": NSWindow.StyleMask.titled.rawValue,
            "STYLE_MASK_CLOSABLE": NSWindow.StyleMask.closable.rawValue,
            "STYLE_MASK_MINIATURIZABLE": NSWindow.StyleMask.miniaturizable.rawValue,
            "STYLE_MASK_RESIZABLE": NSWindow.StyleMask.resizable.rawValue,
            "STYLE_MASK_UNIFIED_TITLE_AND_TOOLBAR": NSWindow.StyleMask.unifiedTitleAndToolbar.rawValue,
            "STYLE_MASK_FULL_SCREEN": NSWindow.StyleMask.fullScreen.rawValue,
            "STYLE_MASK_FULL_SIZE_CONTENT_VIEW": NSWindow.StyleMask.fullSizeContentView.rawValue,
            "STYLE_MASK_UTILITY_WINDOW": NSWindow.StyleMask.utilityWindow.rawValue,
            "STYLE_MASK_DOC_MODAL_WINDOW": NSWindow.StyleMask.docModalWindow.rawValue,
            "STYLE_MASK_NONACTIVATING_PANEL": NSWindow.StyleMask.nonactivatingPanel.rawValue
        ])
        
        OnCreate {
            // Get Bridge from RCTBridge -> is also in Appdelegate, but how do we type it
            // let appDelegate = NSApp.delegate
            bridge = RCTBridge.current()
        }
        
        AsyncFunction("openWindow") { (moduleName: String, options: [String: Any]) in
            // Check if the window for the module already exists
            if let existingWindow = windowsMap[moduleName] {
                // If the window exists, bring it to the front
                bringWindowToFront(window: existingWindow)
                return
            }
            
            // Window does not exist, create a new one
            let title = options["title"] as? String ?? moduleName
            let windowStyle = options["windowStyle"] as? [String: Any]
            let windowStyleMask: NSWindow.StyleMask = {
                if let mask = windowStyle?["mask"] as? UInt {
                    return NSWindow.StyleMask(rawValue: mask)
                } else {
                    return [.titled, .closable, .resizable]
                }
            }()
            
            let width = windowStyle?["width"] as? CGFloat ?? 400
            let height = windowStyle?["height"] as? CGFloat ?? 300
            let titlebarAppearsTransparent = windowStyle?["titlebarAppearsTransparent"] as? Bool ?? false
            let screenRect = NSScreen.main?.visibleFrame ?? NSRect.zero
            let originX = (screenRect.width - width) / 2.0
            let originY = (screenRect.height - height) / 2.0

            // Create and configure the new window
            let windowFrame = NSRect(x: originX, y: originY, width: width, height: height)
            let newWindow = NSWindow(contentRect: windowFrame, styleMask: windowStyleMask, backing: .buffered, defer: false)
            
            let rootView = RCTRootView(bridge: self.bridge, moduleName: moduleName, initialProperties: nil)
            newWindow.contentView = rootView
            windowsMap[moduleName] = newWindow
            
            newWindow.titlebarAppearsTransparent = titlebarAppearsTransparent
            newWindow.title = title
            updateWindowAppearance(window: newWindow, styleMask: windowStyleMask)
            
            bringWindowToFront(window: newWindow)
        }.runOnQueue(.main)
        
        AsyncFunction("closeWindow") { (moduleName: String) in
            if let window = self.windowsMap[moduleName] {
                window.close()
            }
        }.runOnQueue(.main)
    }
    
    private func bringWindowToFront(window: NSWindow?) {
        NSApp.activate(ignoringOtherApps: true)
        if !(window?.isKeyWindow ?? false) {
            window?.makeKeyAndOrderFront(nil)
        }
    }
    
    private func updateWindowAppearance(window: NSWindow?, styleMask: NSWindow.StyleMask) {
        if window?.styleMask != styleMask {
            window?.styleMask = styleMask
            window?.display()
        }
    }
}
