function LocalViewModel(app, dataModel) {
    var self = this;

    // HomeViewModel currently does not require data binding, so there are no visible members.
}

app.addViewModel({
    name: "Local",
    bindingMemberName: "local",
    factory: LocalViewModel
});
