public with sharing class RetreiveContacts {
    
    /*@AuraEnabled
    public static List<Contact> getContacts(Id accountId, String pageSize, String pageNumber){
        List<Contact> contactList = new List<Contact>();
        ApexPages.StandardSetController ssc = new ApexPages.StandardSetController(Database.getQueryLocator('SELECT Id, Name, FirstName, LastName, Email, Phone, Birthdate FROM Contact WHERE AccountId =:accountId ORDER BY Name DESC'));
        ssc.setpagesize(Integer.valueOf(pageSize));
        ssc.setPageNumber(Integer.valueOf(pageNumber));
        contactList = (List<Contact>)ssc.getRecords();
        System.debug(contactList.size());
        return contactList;
    }
    
    @AuraEnabled
    public static Integer getListSize(Id accountId) {
        List<Contact> contacts = [SELECT Id, Name, FirstName, LastName, Email, Phone, Birthdate FROM Contact WHERE AccountId =:accountId ORDER BY Name DESC];
        return contacts.size();
    }*/
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accountId){
        List<Contact> lstContact = [SELECT Id, Name, FirstName, LastName, Email, Phone, Birthdate FROM Contact WHERE AccountId =:accountId ORDER BY Name DESC LIMIT 2000];
        return lstContact;
    }
}