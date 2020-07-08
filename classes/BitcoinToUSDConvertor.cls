public class BitcoinToUSDConvertor{
    
    @TestVisible private Decimal ValueOfOneBitcoinInUSD;
    
    public BitcoinToUSDConvertor(){
        
        getTheValueOfOneBitcoinInUSD();
    }
    
    // Wrapper Class to map the API Json values into a list of Wrapper type
    public class JsonStructure {
        public String code;
        public String name;
        public Decimal rate;
    }
    
    private void getTheValueOfOneBitcoinInUSD(){
        
        if(Test.isRunningTest()) {
            ValueOfOneBitcoinInUSD = 246.4867;
        } else{
            
            Http http = new Http();
            HttpRequest req = new HttpRequest();
            
            req.setEndpoint('https://bitpay.com/api/rates/');
            req.setHeader('Content-type', 'application-json');
            req.setMethod('GET');
            
            HttpResponse res = http.send(req);        
            
            List<JsonStructure> jsonBody = (List<JsonStructure>)JSON.deserialize(res.getBody(), List<JsonStructure>.class);
            for(Integer i=0; i<jsonBody.size();i++) {
                if(jsonBody[i].code == 'USD' && jsonBody[i].name == 'US Dollar') {
                    ValueOfOneBitcoinInUSD = jsonBody[i].rate;
                }            
            }
            System.debug('Bitcoin Value :'+ValueOfOneBitcoinInUSD);
        }
    }
}    
    /*
    @AuraEnabled
    public static Decimal getPrice(String currencyName, Decimal bitcoinAmount) {
        
        //  List<String> currencyNames = new List<String>(); 
        
        Decimal price = 0.0;
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        
        req.setEndpoint('https://bitpay.com/api/rates/');
        req.setHeader('Content-type', 'application-json');
        req.setMethod('GET');
        
        HttpResponse res = http.send(req);        
        
        List<JsonStructure> jsonBody = (List<JsonStructure>)JSON.deserialize(res.getBody(), List<JsonStructure>.class);
        
        for(Integer i=0; i<jsonBody.size();i++) {
            
            // currencyNames.add(jsonBody[i].name); // Adding currency names to List
            
            if(currencyName==jsonBody[i].name) { // Displaying the corresponding rate for the selected currency name
                price = jsonBody[i].rate;
            }
        }
        System.debug(bitcoinAmount*price);
        
        return bitcoinAmount*price;
    }
    
    @AuraEnabled
    public static List<String> currencyList() {
        List<String> currencyNames = new List<String>();
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        
        req.setEndpoint('https://bitpay.com/api/rates/');
        req.setHeader('Content-type', 'application-json');
        req.setMethod('GET');
        
        HttpResponse res = http.send(req);        
        
        List<JsonStructure> jsonBody = (List<JsonStructure>)JSON.deserialize(res.getBody(), List<JsonStructure>.class);
        
        for(Integer i=0; i<jsonBody.size();i++) {
            
            currencyNames.add(jsonBody[i].name);
        }
        System.debug(currencyNames);
        return currencyNames;
    }
}
*/