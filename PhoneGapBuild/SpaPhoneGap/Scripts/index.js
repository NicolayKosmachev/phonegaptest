/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


function AppViewModel() {
    var self = this,
        //Routes
        hostUrl = 'http://10.10.4.147',
        getFilesUrl = /* hostUrl +*/ '/api/Files',
        loginUrl = "/Token";
    
    //properties
    self.files =  ko.mapping.fromJS([{name:"test",location:"testlocation"}]);
    

    function getSecurityHeaders() {
        var accessToken = sessionStorage["accessToken"] || localStorage["accessToken"];

        if (accessToken) {
            return { "Authorization": "Bearer " + accessToken };
        }

        return {};
    }

    self.setAccessToken = function (accessToken, persistent) {
        if (persistent) {
            localStorage["accessToken"] = accessToken;
        } else {
            sessionStorage["accessToken"] = accessToken;
        }
    };

    self.userName = ko.observable("KoKos");

    self.password = ko.observable("qweqwe");

    self.login = function() {
        self.postLoginData({
            grant_type: "password",
            username: self.userName(),
            password: self.password()
        }).done(function(data) {
            if (data.userName && data.access_token) {
                self.setAccessToken(data.access_token);
            }
        });
    };

    //methods
    self.initialize = function() {
        self.bindEvents();
    };

    self.bindEvents = function () {
        document.addEventListener("deviceready", self.onDeviceReady, false);
    };

    self.onDeviceReady = function() {
        self.updateFiles();
    };

    self.updateFiles = function() {
        self.files.removeAll();

        self.getFiles().done(function(data) {
            //alert(data);
            ko.mapping.fromJS(data, self.files);

            //$.each(data, function (index, item) {
            //    self.files.push({name : item.name,location:item.location});
            //});

        });
    };

    //data access
    
    self.getFiles = function (data) {
        return $.ajax(getFilesUrl, {
            data: data,
            headers : getSecurityHeaders()
        });
    };
    
    self.postLoginData = function (data) {
        return $.ajax(loginUrl, {
            type: "POST",
            data: data
        });
    };
    
}



