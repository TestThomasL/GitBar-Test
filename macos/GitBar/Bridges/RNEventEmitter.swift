//
//  PopoverEventEmitter.swift
//  GitBar
//
//  Created by Thomas Lamars on 06/12/2024.
//

import React

@objc(RNEventEmitter)
open class RNEventEmitter: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    RNEventEmitter.emitter = self
  }

  open override func supportedEvents() -> [String] {
    ["onPopoverState"]
  }
}
