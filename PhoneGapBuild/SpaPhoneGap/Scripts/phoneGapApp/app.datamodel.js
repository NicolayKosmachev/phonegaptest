﻿function AppDataModel() {
    var self = this,
        // Routes
        hostUrl = "http://192.168.1.2/",
        addExternalLoginUrl = hostUrl + "/api/Account/AddExternalLogin",
        changePasswordUrl = hostUrl + "/api/Account/changePassword",
        loginUrl = hostUrl + "/Token",
        logoutUrl = hostUrl + "/api/Account/Logout",
        registerUrl =hostUrl + "/api/Account/Register",
        registerExternalUrl =hostUrl + "/api/Account/RegisterExternal",
        removeLoginUrl =hostUrl + "/api/Account/RemoveLogin",
        setPasswordUrl =hostUrl + "/api/Account/setPassword",
        siteUrl = "/access_token.html",
        userInfoUrl = hostUrl + "/api/Account/UserInfo",
        getRemoteFilesUrl = hostUrl + "/api/Files/GetFiles";

    // Route operations
    function externalLoginsUrl(returnUrl, generateState) {
        return hostUrl + "/api/Account/ExternalLogins?returnUrl=" + (encodeURIComponent(returnUrl)) +
            "&generateState=" + (generateState ? "true" : "false");
    }

    function manageInfoUrl(returnUrl, generateState) {
        return "/api/Account/ManageInfo?returnUrl=" + (encodeURIComponent(returnUrl)) +
            "&generateState=" + (generateState ? "true" : "false");
    }

    // Other private operations
    function getSecurityHeaders() {
        var accessToken = sessionStorage["accessToken"] || localStorage["accessToken"];

        if (accessToken) {
            return { "Authorization": "Bearer " + accessToken };
        }

        return {};
    }

    // Operations
    self.clearAccessToken = function () {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
    };

    self.setAccessToken = function (accessToken, persistent) {
        if (persistent) {
            localStorage["accessToken"] = accessToken;
        } else {
            sessionStorage["accessToken"] = accessToken;
        }
    };

    self.toErrorsArray = function (data) {
        var errors = new Array(),
            items;

        if (!data || !data.message) {
            return null;
        }

        if (data.modelState) {
            for (var key in data.modelState) {
                items = data.modelState[key];

                if (items.length) {
                    for (var i = 0; i < items.length; i++) {
                        errors.push(items[i]);
                    }
                }
            }
        }

        if (errors.length === 0) {
            errors.push(data.message);
        }

        return errors;
    };

    // Data
    self.returnUrl = siteUrl;

    // Data access operations
    self.addExternalLogin = function (data) {
        return $.ajax(addExternalLoginUrl, {
            type: "POST",
            data: data,
            headers: getSecurityHeaders()
        });
    };

    self.changePassword = function (data) {
        return $.ajax(changePasswordUrl, {
            type: "POST",
            data: data,
            headers: getSecurityHeaders()
        });
    };

    self.getExternalLogins = function (returnUrl, generateState) {
        return $.ajax(externalLoginsUrl(returnUrl, generateState), {
            cache: false,
            headers: getSecurityHeaders()
        });
    };

    self.getManageInfo = function (returnUrl, generateState) {
        return $.ajax(manageInfoUrl(returnUrl, generateState), {
            cache: false,
            headers: getSecurityHeaders()
        });
    };

    self.getUserInfo = function (accessToken) {
        var headers;

        if (typeof (accessToken) !== "undefined") {
            headers = {
                "Authorization": "Bearer " + accessToken
            };
        } else {
            headers = getSecurityHeaders();
        }

        return $.ajax(userInfoUrl, {
            cache: false,
            headers: headers
        });
    };

    self.login = function (data) {
        return $.ajax(loginUrl, {
            type: "POST",
            data: data
        });
    };

    self.logout = function () {
        return $.ajax(logoutUrl, {
            type: "POST",
            headers: getSecurityHeaders()
        });
    };

    self.register = function (data) {
        return $.ajax(registerUrl, {
            type: "POST",
            data: data
        });
    };

    self.registerExternal = function (accessToken, data) {
        return $.ajax(registerExternalUrl, {
            type: "POST",
            data: data,
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        });
    };

    self.removeLogin = function (data) {
        return $.ajax(removeLoginUrl, {
            type: "POST",
            data: data,
            headers: getSecurityHeaders()
        });
    };

    self.setPassword = function (data) {
        return $.ajax(setPasswordUrl, {
            type: "POST",
            data: data,
            headers: getSecurityHeaders()
        });
    };

    self.getRemoteFiles = function(data) {
        return $.ajax(getRemoteFilesUrl, {
            type: "GET",
            data: data,
            headers: getSecurityHeaders()
        });
    };
}
