public class BitCoinAPIController {
    @AuraEnabled
    public Static DatabaseResult getBitcoinRates(){
        DatabaseResult response;
        List<Map<String, String>> lstBitCoinRates = new List<Map<String, String>>();
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        
        req.setEndpoint('https://bitpay.com/api/rates/');
        req.setHeader('Content-type', 'application-json');
        req.setMethod('GET');
        
        HttpResponse res = http.send(req);
        if(res.getStatusCode() == 200){
            lstBitCoinRates = (List<Map<String, String>>)JSON.deserialize(res.getBody(), List<Map<String, String>>.class);
            response = new DatabaseResult(lstBitCoinRates);
        }else{
            response = new DatabaseResult(false, null, 'No/Bad Response from API');
        }
        return response;
    }
}