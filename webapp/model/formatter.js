sap.ui.define([], function() {
	"use strict";

	return {
		evenParity: function(nCounter) {
			try {
				var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
				var sEven = resourceBundle.getText("evenFormatterName");
				var sOdd = resourceBundle.getText("oddFormatterName");
			} catch (e) {
				console.log(e.message);
				return "Even";
			}
			
			return (nCounter % 2 === 0) ? sEven : sOdd;
		}

	};

});