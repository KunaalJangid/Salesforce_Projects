({
	handleSubmit : function(component, event, helper) {
        if(component.get("v.accountToCreateOpps").length > 0){
            let allValid = component.find("inputFieldOpp").reduce(function (validSoFar, inputCmp) {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && inputCmp.get('v.validity').valid;
            }, true);
            if(!allValid){
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": "Invalid data!",
                    "message": "Please check all the field data and try again."
                });
                toastEvent.fire();
            }else{
                let accountList = component.get("v.allAccounts");
                let selectedAccountIds = component.get("v.accountToCreateOpps");
                let opportunityInput = component.get("v.record");////“New auto opportunity create for “ +Account name.
                let opportunitiesToCreate = [];
                selectedAccountIds.forEach(function(accountId){
                    const account = accountList.find(account=> account.Id == accountId);
                    opportunitiesToCreate.push(Object.assign({AccountId:account.Id, Name:"New auto opportunity create for " + account.Name, sobjectType:"Opportunity"}, opportunityInput));
                });
                console.log(opportunitiesToCreate);
                helper.showProcessing(component);
                helper.execute(component, "c.saveRecords" , {records:opportunitiesToCreate},function(response){
                    helper.hideProcessing(component);
                    let toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type":"success",
                        "title": "Opportunity Created",
                        "message": "Opportunity Created Successfully"
                    });
                    toastEvent.fire();
                },function(error){
                    helper.hideProcessing(component);
                    let toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type":"error",
                        "title": "Invalid data!",
                        "message": error
                    });
                    toastEvent.fire();
                });
            }
        }else{
            var toastEvent = $A.get("e.force:showToast");
            if(toastEvent){
                toastEvent.setParams({
                    "title": "Error",
                    "message": "You have not selected any account to create opportunity!",
                    "type":"error"
                });
            toastEvent.fire();
            }else{
                alert("Error : You have not selected any account to create opportunity!")
            }
        }
	}
})