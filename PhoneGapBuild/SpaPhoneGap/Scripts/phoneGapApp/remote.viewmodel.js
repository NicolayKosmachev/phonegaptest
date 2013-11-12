function RemoteViewModel(app, dataModel) {

    var self = this;

    function initialize() {
        dataModel.getRemoteFiles()
            .done(
                function(data) {
                    $.each(data, function(index, item) {
                        self.remoteFiles.push(new RemoteFileViewModel(app, dataModel, item));
                    });
                }
            );
    }
    
    self.remoteFiles = ko.observableArray();

    initialize();
}


function RemoteFileViewModel(app, dataModel,data) {

    var self = this;

    //data
    self.name = ko.observable(data.name);

    self.date = ko.observable(data.date);

    //operations
    self.download = function () {
        alert(self.name());
    };
}

app.addViewModel({
    name: "Remote",
    bindingMemberName: "remote",
    factory: RemoteViewModel
});
