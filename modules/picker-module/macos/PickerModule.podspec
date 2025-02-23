Pod::Spec.new do |s|
  s.name           = 'PickerModule'
  s.version        = '1.0.0'
  s.summary        = 'A picker component for macOS'
  s.description    = 'A picker component for macOS'
  s.author         = ''
  s.homepage       = 'https://lamars.io'
  s.platforms      = {
    :osx => '11.0'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
