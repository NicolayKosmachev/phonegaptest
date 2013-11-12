$(function () {
    //app.initialize();

    app.initDevice();

   // $("#loginPage").load("login.html");

    // Activate Knockout
    ko.validation.init({ grouping: { observable: false } });
    ko.applyBindings(app);
});
