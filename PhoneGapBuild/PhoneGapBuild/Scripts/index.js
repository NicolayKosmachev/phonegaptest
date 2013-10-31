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
    hostUrl = 'http://localhost:7768',

    getFilesUrl = hostUrl + '/api/Files';
    
    //properties
    self.files =  ko.mapping.fromJS([{name:"test",location:"testlocation"}]);
    

    //methods
    self.initialize = function() {
        self.bindEvents();
    };

    self.bindEvents = function() {
        $(document).bind("deviceready", self.onDeviceReady, false);
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
        });
    };
    
}



