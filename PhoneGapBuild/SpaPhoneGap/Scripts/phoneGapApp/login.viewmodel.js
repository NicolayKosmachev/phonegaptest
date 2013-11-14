function LoginViewModel(app, dataModel) {
    // Private state
    var self = this,
        validationTriggered = ko.observable(false);

    // Private operations
    function initialize() {
        dataModel.getExternalLogins(dataModel.returnUrl, true /* generateState */)
            .done(function (data) {
                self.loadingExternalLogin(false);
                if (typeof (data) === "object") {
                    for (var i = 0; i < data.length; i++) {
                        self.externalLoginProviders.push(new ExternalLoginProviderViewModel(app, data[i]));
                    }
                } else {
                    self.errors.push("An unknown error occurred.");
                }
            }).fail(function () {
                self.loadingExternalLogin(false);
                self.errors.push("An unknown error occurred.");
            });
    }

    // Data
    self.userName = ko.observable("").extend({ required: true });
    self.password = ko.observable("").extend({ required: true });
    self.rememberMe = ko.observable(false);
    self.externalLoginProviders = ko.observableArray();
    self.validationErrors = ko.validation.group([self.userName, self.password]);

    // Other UI state
    self.errors = ko.observableArray();
    self.loadingExternalLogin = ko.observable(true);
    self.loggingIn = ko.observable(false);

    self.hasExternalLogin = ko.computed(function () {
        return self.externalLoginProviders().length > 0;
    });

    // Operations
    self.login = function () {
        self.errors.removeAll();

        if (self.validationErrors().length > 0) {
            self.validationErrors.showAllMessages();
            return;
        }

        self.loggingIn(true);

        dataModel.login({
            grant_type: "password",
            username: self.userName(),
            password: self.password()
        }).done(function (data) {
            self.loggingIn(false);

            if (data.userName && data.access_token) {
                app.navigateToLoggedIn(data.userName, data.access_token, self.rememberMe());
            } else {
                self.errors.push("An unknown error occurred.");
            }
        }).failJSON(function (data) {
            self.loggingIn(false);

            if (data && data.error_description) {
                self.errors.push(data.error_description);
            } else {
                self.errors.push("An unknown error occurred.");
            }
        });
    };

    self.register = function () {
        app.navigateToRegister();
    };

    initialize();
}

function ExternalLoginProviderViewModel(app, data) {
    var self = this;

    // Data
    self.name = ko.observable(data.name);


    self.checkAccessToken = function(url, ref) {

        var search = "access_token.html";

        var length = search.length();

        var startIndex = url.indexOf("access_token.html", 0);
            
        if (startIndex > 0) {

            var hashIndex = startIndex + length;

            alert("calculatedindex:" + hashIndex);

            alert("realIndex:" + url.indexOf("#"));
            
            if (url.indexOf("#") == hashIndex) {
                var fragment = app.parseQueryString(url.substr(hashIndex + 1));

                alert(fragment);

                if (typeof (fragment.access_token) !== "undefined") {
                    ref.close();
                    alert(window.location);
                    window.location = window.location + "#access_token=" + fragment.access_token;
                }
            }
        }
    };

    // Operations
    self.login = function () {
        sessionStorage["state"] = data.state;
        sessionStorage["loginUrl"] = data.url;
        // IE doesn't reliably persist sessionStorage when navigating to another URL. Move sessionStorage temporarily
        // to localStorage to work around this problem.
        app.archiveSessionStorageToLocalStorage();
        //window.location = data.url;
        
        var ref = window.open(data.url, '_blank', 'location=yes');
        ref.addEventListener('loadstart', function (event) { alert('start: ' + event.url); });
        ref.addEventListener('loadstop', function (event) { self.checkAccessToken(event.url, ref); });
        ref.addEventListener('loaderror', function (event) { alert('error: ' + event.message); });
        ref.addEventListener('exit', function (event) { alert(event.type); });
    };
}

app.addViewModel({
    name: "Login",
    bindingMemberName: "login",
    factory: LoginViewModel,
    navigatorFactory: function (app) {
        return function () {
            app.errors.removeAll();
            app.user(null);
            app.view(app.Views.Login);
        };
    }
});
