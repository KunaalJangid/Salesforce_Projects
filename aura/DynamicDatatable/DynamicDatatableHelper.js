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
    },
    generatePagination:function(component, event, helper){
        let totalPages = Math.ceil(component.get("v.data").length/component.get("v.pageSize"));
        let pagePicklist = [];
        for(var pageNumber = 1 ; pageNumber <= totalPages ; pageNumber ++){
            pagePicklist.push(pageNumber);
        }
        component.set("v.totalPages", pagePicklist);
        //To remove the reference of the actual attribute i.e. "v.data"
        let data = JSON.parse(JSON.stringify(component.get("v.data")));
        let fromIndex = (component.get("v.currentPage") - 1 ) * component.get("v.pageSize");
        let uptoIndex = component.get("v.currentPage") * component.get("v.pageSize");
        let filteredData = data.slice(fromIndex, uptoIndex);
        filteredData.forEach(function(record){
            record.Id = record.Id + '-' + component.get("v.currentPage");
        });
        component.set("v.filteredRecords", filteredData);
        component.find("dynamicDataTable").set("v.selectedRows", component.get("v.selectedRecords"));
    }
})