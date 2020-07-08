({
    /*handleComponentEvent : function(component, event, helper) {
        
    },
    calculate : function(component, event, helper) {
        var searchParams = event.getParams('searchText');
        var action =  component.get('c.getPrice');
        var bitValue = component.find('bit').get('v.value')
        action.setParams({
            currencyName : searchParams,
            bitcoinAmount : bitValue
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESSS') {
                var value = response.getReturnValue();
                console.log(' responseValue ', value);
                component.set('v.calculatedAmount', value);
            }
            else {
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
     },*/
    
    init:function(component, event, helper){
        component.set("v.isProcessing", true);
        //component, method, params, onSuccess, onError
        helper.execute(component,"c.getBitcoinRates",{},function(response){
            component.set("v.isProcessing", false);
            component.set("v.options", [].concat(response)); // Concatenated response for picklist 
            console.log(v.options);
        },function(error){
            component.set("v.isProcessing", false);
        })
        
    },
    onCurrenyChange:function(component, event, helper){
        component.set("v.bitcoinConvertedAmount", 0);
        component.set("v.bitcoinAmount", 0);
    },
    onBitcoinAmountChange:function(component, event, helper){
        let enteredBitCoinAmount = component.get("v.bitcoinAmount");
        let rate = helper.getRateForSelectedCurrency(component);
        component.set("v.bitcoinConvertedAmount", enteredBitCoinAmount*rate);
    },
    onConvertedAmountChange:function(component, event, helper){
        let convertedAmount = component.get("v.bitcoinConvertedAmount");
        let rate = helper.getRateForSelectedCurrency(component);
        component.set("v.bitcoinAmount", convertedAmount/rate);
    }
})