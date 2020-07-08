({
    /*
     * This finction defined column header
     * and calls getContacts helper method for column data
     * editable:'true' will make the column editable
     * */
    doInit : function(component, event, helper) {        
        component.set('v.columns', [
            {label: 'Name', fieldName: 'Id', type: 'url', sortable : true, typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
            {label: 'Phone', fieldName: 'Phone', type: 'integer', sortable : true},
            {label: 'Email', fieldName: 'Email', type: 'text', sortable : true}            
        ]);
        helper.getContacts(component, helper);
    },
    
    onNext : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber + 1);
        helper.buildData(component, helper);
    },
    
    onPrev : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber-1);
        helper.buildData(component, helper);
    },
    
    processMe : function(component, event, helper) {
        component.set("v.currentPageNumber", parseInt(event.target.name));
        helper.buildData(component, helper);
    },
    
    onFirst : function(component, event, helper) {        
        component.set("v.currentPageNumber", 1);
        helper.buildData(component, helper);
    },
    
    onLast : function(component, event, helper) {        
        component.set("v.currentPageNumber", component.get("v.totalPages"));
        helper.buildData(component, helper);
    },
    
    handleKeyUp: function (component, event, helper) {
        let searchFields = ['Name','Phone','Email'];
        var queryTerm = component.find('enter-search').get('v.value');
        if (queryTerm.trim().length) {
            var data = component.get("v.allData");
            var filteredData = data.filter(function(record){
                for(var i= 0 ; i < searchFields.length; i++){
                    var val = record;
                    val = val[searchFields[i]];
                    if(val && (val+'').toLowerCase().includes(queryTerm.toLowerCase())){
                        return true;
                    }
                }
            });
            component.set("v.currentPageNumber",1);
            component.set("v.totalPages", Math.ceil(filteredData.length/component.get("v.pageSize")));
            helper.buildData(component, helper, filteredData);
        }else{
            component.set("v.currentPageNumber",1);
            component.set("v.totalPages", Math.ceil(component.get("v.allData").length/component.get("v.pageSize")));
            helper.buildData(component, helper);
        }
    },
    handleSort: function(component, event, helper) {
        helper.handleSort(component, event);
    }
})