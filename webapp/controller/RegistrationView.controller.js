sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library",
  "sap/ui/core/UIComponent",
  "sap/ui/model/resource/ResourceModel"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary, UIComponent, ResourceModel) {
  "use strict";

  // Shortcut for sap.ui.core.MessageType
  var MessageType = coreLibrary.MessageType;

  return Controller.extend("converted.registrationview.controller.RegistrationView", {

    onInit: function () {
      // Initialize data model
      var oRegistrationData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        countryKey: "US"
      };

      var oModel = new JSONModel(oRegistrationData);
      this.getView().setModel(oModel);

      // Initialize country model
      var oCountryData = {
        countries: [
          { key: "US", text: "United States" },
          { key: "CA", text: "Canada" },
          { key: "UK", text: "United Kingdom" }
        ]
      };
      var oCountryModel = new JSONModel(oCountryData);
      this.getView().setModel(oCountryModel, "countries");

      // Initialize message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [
          {
            type: MessageType.Success,
            title: "System Information",
            description: "Application converted successfully, Use AI optimize for better result",
            subtitle: "Conversion complete",
            counter: 1
          }
        ]
      });
      this.getView().setModel(oMessageModel, "messages");

      // Load customer data from mock data
      var oCustomerModel = new JSONModel();
      oCustomerModel.loadData("model/mockData/customers.json");
      this.getView().setModel(oCustomerModel, "customers");

      // Load product data from mock data
      var oProductModel = new JSONModel();
      oProductModel.loadData("model/mockData/products.json");
      this.getView().setModel(oProductModel, "products");

      // Load any additional mock data as needed
      var oOrderModel = new JSONModel();
      oOrderModel.loadData("model/mockData/orders.json");
      this.getView().setModel(oOrderModel, "orders");
    },

    /**
     * Handles the submit button press.
     */
    onSubmit: function () {
      var oModel = this.getView().getModel();
      var oData = oModel.getData();

      // Validate input fields (example)
      if (!oData.firstName || oData.firstName === "") {
        MessageBox.error("Please enter your first name.");
        return;
      }

      // Save data (replace with your actual save logic)
      // ... save data to backend ...

      MessageBox.success("Registration successful!");

      // Clear the form
      oModel.setData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        countryKey: "US"
      });
    },

    /**
     * Opens message popover.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    handleMessagePopoverPress: function (oEvent) {
      if (!this._messagePopover) {
        this._messagePopover = new MessagePopover({
          items: {
            path: "messages>/messages",
            template: new MessageItem({
              type: "{messages>type}",
              title: "{messages>title}",
              description: "{messages>description}",
              subtitle: "{messages>subtitle}",
              counter: "{messages>counter}"
            })
          }
        });
        this.getView().addDependent(this._messagePopover);
      }
      this._messagePopover.toggle(oEvent.getSource());
    },

    /**
     * Navigates to the second view.
     */
    onNextPress: function () {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("second");
    }
  });
});
