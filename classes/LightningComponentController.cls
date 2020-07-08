public class LightningComponentController {
    
    @AuraEnabled
    public static DatabaseResult getRecords(String sObjectName, List<String> fieldsToQuery){
        String query = 'SELECT Id,'+ String.join(fieldsToQuery, ',');
        query += ' FROM ' + sObjectName + ' LIMIT 2000';
        return new DatabaseResult(Database.query(query));
    }
    
    @AuraEnabled
    public static DatabaseResult saveRecords(List<sObject> records) {
        try{
            List<sObject> lstInsert = new List<sObject>();
            List<sObject> lstUpdate = new List<sObject>();
            for(sObject record : records){
                if(String.isBlank(record.Id))
                    lstInsert.add(record);
                else
                    lstUpdate.add(record);
            }
            Map<String,Object> response = new Map<String,Object>();
            response.put('insertedRecords', Database.insert(lstInsert));
            response.put('updatedRecords', Database.update(lstUpdate));
            DatabaseResult result = new DatabaseResult(JSON.serialize(response));
            return result;
        }catch(Exception pEx){
            return (new DatabaseResult(pEx));
        }
    }
}