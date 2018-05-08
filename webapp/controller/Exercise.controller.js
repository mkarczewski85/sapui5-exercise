sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"Exercise1/model/formatter",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, formatter, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("Exercise1.controller.Exercise", {

		formatter: formatter,

		onInit: function() {
			var oDate = new Date();
			var counter = {
				time: oDate,
				counter: 0,
				currentNote: "",
				entries: [{
					time: oDate,
					number: 0,
					note: "Initial note"
				}]
			};
			var oCounterModel = new sap.ui.model.json.JSONModel();
			oCounterModel.setData(counter);
			this.getView().setModel(oCounterModel, "count");

		},

		onPressButton: function() {
			
			var oCounterModel = this.getView().getModel("count");
			var aEntries = oCounterModel.getProperty("/entries");
			
			if (oCounterModel.getProperty("/currentNote").trim() === "") {
				this._showAlertMessage();
				oCounterModel.setProperty("/currentNote", "");
				return;
			}

			oCounterModel.setProperty("/counter", oCounterModel.getProperty("/counter") + 1);

			var oDate = new Date();
			var nCounter = oCounterModel.getProperty("/counter");
			var sNote = oCounterModel.getProperty("/currentNote");

			var oEntry = {
				number: nCounter,
				note: sNote,
				time: oDate
			};
			
			aEntries.push(oEntry);
			oCounterModel.setProperty("/entries", aEntries);
			oCounterModel.setProperty("/currentNote", "");
			this._showSuccesToastMessage(nCounter);

		},

		_showAlertMessage: function() {
			var msg = this.getView().getModel("i18n").getResourceBundle().getText("alertMessage");
			MessageBox.alert(msg);
		},
		
		_showSuccesToastMessage: function(nCounter) {
			var msg = this.getView().getModel("i18n").getResourceBundle().getText("toastMessage", [nCounter]);
			MessageToast.show(msg);                         
		}

	});
});