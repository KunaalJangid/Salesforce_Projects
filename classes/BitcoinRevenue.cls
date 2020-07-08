public class BitcoinRevenue {
    
    public BitcoinRevenue(){
        calculate();
    }
    
    public class JsonStructure {
        public String code;
        public String name;
        public Decimal rate;
    }
    
    @future(callout=true)
    public static void calculate() {
        
        Decimal ValueOfOneBitcoinInEUR = 0.0;
        Decimal d = 0.0;
        try{
            Http http = new Http();
            HttpRequest req = new HttpRequest();
            
            req.setEndpoint('https://bitpay.com/api/rates/');
            req.setHeader('Content-type', 'application-json');
            req.setMethod('GET');
            
            HttpResponse res = http.send(req);        
            
            List<JsonStructure> jsonBody = (List<JsonStructure>)JSON.deserialize(res.getBody(), List<JsonStructure>.class);
            System.debug(jsonBody);
            
            for(Integer i=0; i<jsonBody.size();i++) {
                if(jsonBody[i].code=='EUR' && jsonBody[i].name=='Eurozone Euro') {
                    ValueOfOneBitcoinInEUR = jsonBody[i].rate;
                }
            }
            System.debug('Value for One Bitcoin in Euro :'+ValueOfOneBitcoinInEUR);
            
            List<Account> accounts = [SELECT Id, Name, AnnualRevenue, Annual_Revenue_in_Bitcoin__c FROM Account WHERE AnnualRevenue!=null];
            for(Account acc : accounts) {
                    acc.Annual_Revenue_in_Bitcoin__c = acc.AnnualRevenue / ValueOfOneBitcoinInEUR; 
            }
            update accounts;
        }
        catch(System.CalloutException e){
            System.debug('Error-' + e.getMessage());   
        }
    }
}