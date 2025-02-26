//
//  AvailableInterfaces.m
//  GitBar
//
//  Created by Thomas Lamars on 28/09/2024.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(RNEventEmitter, RCTEventEmitter)
  RCT_EXTERN_METHOD(supportedEvents)
@end
