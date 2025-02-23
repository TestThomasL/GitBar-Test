Pod::Spec.new do |s|
  s.name           = 'NotificationsModule'
  s.version        = '1.0.0'
  s.summary        = 'NotificationsModule'
  s.description    = 'NotificationsModule'
  s.author         = 'Thomas Lamars'
  s.homepage       = 'https://lamars.io'
  s.platforms      = { :osx => '11' }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
