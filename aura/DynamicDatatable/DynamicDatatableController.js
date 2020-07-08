({
    init: function(component, event, helper){
        if(component.get("v.sObjectName") && component.get("v.fieldsToQuery")){
            helper.showProcessing(component);
            let params = {sObjectName:component.get("v.sObjectName"), fieldsToQuery:component.get("v.fieldsToQuery")};
            helper.execute(component, "c.getRecords", params, function(response){
                component.set("v.data", response);
                helper.generatePagination(component, event, helper);
                helper.hideProcessing(component);
            }, function(error){
                helper.hideProcessing(component);
                alert('Somethig went wrong : ' + error);
            })
        }
    },
    handleSort: function(component, event, helper) {
        //helper.handleSort(component, event);
    },
    onFirst:function(component, event, helper){
        component.set("v.currentPage", 1);
        component.set("v.hasPageChanged", true);
        helper.generatePagination(component, event, helper);
    },
    onNext:function(component, event, helper){
        component.set("v.currentPage", component.get("v.currentPage") + 1);
        component.set("v.hasPageChanged", true);
        helper.generatePagination(component, event, helper);
    },
    onPrev:function(component, event, helper){
        component.set("v.currentPage", component.get("v.currentPage") - 1);
        component.set("v.hasPageChanged", true);
        helper.generatePagination(component, event, helper);
    },
    onLast:function(component, event, helper){ 
        component.set("v.currentPage", component.get("v.totalPages").length);
        component.set("v.hasPageChanged", true);
        helper.generatePagination(component, event, helper);
    },
    onPageChange:function(component, event, helper){
        component.set("v.currentPage", parseInt(event.getSource().get("v.value")));
        component.set("v.hasPageChanged", true);
        helper.generatePagination(component, event, helper);
    },
    onRowSelection:function(component, event, helper){
        // Avoid any operation if page has changed
        // as this event will be fired when new data will be loaded in page 
        // after clicking on next or prev page
        if(!component.get("v.hasPageChanged") || component.get("v.initialLoad")){
            //set initial load to false
            component.set("v.initialLoad", false);
            //Get currently select rows, This will only give the rows available on current page
            var selectedRows = event.getParam('selectedRows');
            //Get all selected rows from datatable, this will give all the selected data from all the pages
            var allSelectedRows = component.get("v.selectedRecords");
            
            //Get current page number
            var currentPageNumber = component.get("v.currentPage");
            
            //Process the rows now
            //Condition 1 -> If any new row selected, add to our allSelectedRows attribute
            //Condition 2 -> If any row is deselected, remove from allSelectedRows attribute
            //Solution - Remove all rows from current page from allSelectedRows attribute and then add again
            
            //Removing all rows coming from curent page from allSelectedRows
            var i = allSelectedRows.length;
            while (i--) {
                var pageNumber = allSelectedRows[i].split("-")[1];
                if (pageNumber && pageNumber == currentPageNumber) { 
                    allSelectedRows.splice(i, 1);
                } 
            }
            
            //Adding all the new selected rows in allSelectedRows
            selectedRows.forEach(function(row) {
                allSelectedRows.push(row.Id);
            });
            //Setting new value in selection attribute
            component.set("v.selectedRecords", allSelectedRows);
            let selectedData = [];
            allSelectedRows.forEach(function(selectedRow){
                selectedData.push(selectedRow.split("-")[0]);
            });
            component.set("v.selectedRows", selectedData);
        } else{
            component.set("v.hasPageChanged", false);
        }
    }
})