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
    hideProcessing:function(component){
        component.set("v.isProcessing", false);
    },
    showProcessing:function(component){
        component.set("v.isProcessing", true);
    }
})