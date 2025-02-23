import ExpoModulesCore
import WebKit
import SwiftUI

struct PickerOption: Decodable {
    var label: String
    var value: String
}

class PickerViewModel : ObservableObject {
    @Published var options: [PickerOption] = []
    @Published var selectedValue: String = ""
}

class PickerModuleView: ExpoView {
    private let contentView: UIHostingController<PickerView>
    let viewModel = PickerViewModel()
    let onValueChange = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        contentView = UIHostingController(rootView: PickerView(viewModel: self.viewModel, onValueChange: self.onValueChange))
        
        super.init(appContext: appContext)
        
        clipsToBounds = true
        addSubview(contentView.view)
    }
    
    override func layoutSubviews() {
        contentView.view.frame = bounds
    }
}

struct PickerView: View {
    @StateObject var viewModel: PickerViewModel
    var onValueChange: EventDispatcher

    var body: some View {
        Picker("",
               selection: $viewModel.selectedValue) {
            ForEach(viewModel.options, id: \.value) { option in
                Text(option.label)
                    .tag(option.value)
                    .disabled(true)
            }
        }
               .labelsHidden()
               .onAppear {
                   // Provide a default selection if none exists
                   if viewModel.selectedValue.isEmpty, let defaultOption = viewModel.options.first {
                       viewModel.selectedValue = defaultOption.value
                   }
               }
               .onChange(of: viewModel.selectedValue) { newValue in
                   onValueChange.callAsFunction(["value": newValue])
               }
    }
}

