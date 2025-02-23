import ExpoModulesCore



public class PickerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("PickerModule")

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(PickerModuleView.self) {
        Events("onValueChange")

        Prop("selectedValue") { (view: PickerModuleView, selectedValue: String) in
            view.viewModel.selectedValue = selectedValue
        }
        
        Prop("options") { (view: PickerModuleView, optionsData: [Any]) in
            do {
                // Convert [Any] to Data using JSONSerialization
                let data = try JSONSerialization.data(withJSONObject: optionsData, options: [])
                // Decode the data into [PickerOption]
                let options = try JSONDecoder().decode([PickerOption].self, from: data)
                view.viewModel.options = options
            } catch {
                print("Failed to decode options:", error)
            }
        }
    }
  }
}
