if (typeof (PcfAcademy) === "undefined") { PcfAcademy = {}; }

PcfAcademy.Incident = {

    formContext: {},

    OnLoad: function (executionContext) {
        "use strict"
        PcfAcademy.Incident.formContext = executionContext.getFormContext();
        PcfAcademy.Incident.OnChange();

    },

    OnChange: function () {
        "use strict"
        PcfAcademy.Incident.formContext.getAttribute("customerid").addOnChange(PcfAcademy.Incident.fillFieldCustomer);
        PcfAcademy.Incident.formContext.getControl("academy_positiveconfimationok").addOnOutputChange(PcfAcademy.Incident.showDetailsPositiveConfirmationSuccess);

    },

    OnSave: function (executionContext) {

    },

    fillFieldCustomer: () => {
        "use strict"

        const customerLookup = PcfAcademy.Incident.formContext.getAttribute("customerid").getValue();
        if (!customerLookup) return;
        PcfAcademy.Incident.formContext.getAttribute("academy_customer_id_string").setValue(customerLookup[0].id);
    },

    showDetailsPositiveConfirmationSuccess: () => {
        "use strict"
        const outputs = PcfAcademy.Incident.formContext.getControl("academy_positiveconfimationok").getOutputs();
        let valueOutput = outputs["academy_positiveconfimationok.fieldControl.isSucess"].value;

        PcfAcademy.Incident.formContext.ui.tabs.get("CASERELATIONSHIP_TAB").setVisible(valueOutput);
    }
};