public class DatabaseResult {
    
    @AuraEnabled
    public Boolean success;
    
    @AuraEnabled
    public Object data;
    
    @AuraEnabled
    public String message;
    
    public DatabaseResult(Object data){
        this.success = true;
        this.message = '';
        this.data = data;
    }
    public DatabaseResult(Boolean success, Object data, String message){
        this.success = success;
        this.message = message;
        this.data = data;
    }
    public DatabaseResult(Exception ex){
        this.success = false;
        this.message = ex.getMessage();
        this.data = null;
    }
}