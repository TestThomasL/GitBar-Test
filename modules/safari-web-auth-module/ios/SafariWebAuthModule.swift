import ExpoModulesCore

public class SafariWebAuthModule: Module {
    private var currentAuthSession: WebAuthSession?

    public func definition() -> ModuleDefinition {
        Name("SafariWebAuthModule")
        
        AsyncFunction("openAuthSessionAsync") { (authUrl: URL, redirectUrl: URL?, options: AuthSessionOptions, promise: Promise) throws in
            self.currentAuthSession = WebAuthSession(authUrl: authUrl, redirectUrl: redirectUrl, options: options)
            self.currentAuthSession?.open(promise)
        }
        .runOnQueue(.main)
        
        AsyncFunction("dismissAuthSession") {
            self.currentAuthSession?.dismiss()
            self.currentAuthSession = nil
        }
        .runOnQueue(.main)
    }
}
