({
	execute: function(component, method, params, onSuccess, onError){
        var action = component.get(method);
        action.setParams(params);
        action.setCallback(this,function(response){
            if(response.getState()=="SUCCESS"){
                var response = response.getReturnValue();
                if(response){
                    if(response.success){
                        onSuccess(response.data);
                    }else{
                        onError(response.message);
                    }
                }else{
                    onSuccess(response);
                }
            }else if(response.getState()=="ERROR"){
                var errors = response.getError();
                onError(errors[0].message);
            }
        });
        $A.enqueueAction(action);
    },
    getRateForSelectedCurrency:function(component){
        let selectedCurrency = component.get("v.options").find(rate => rate.name == component.get("v.selectedValue")); // Returns the entire object of the selected picklist value
        return parseFloat(selectedCurrency.rate);
    }
})