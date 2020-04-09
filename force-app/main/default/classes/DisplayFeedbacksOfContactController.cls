public with sharing class DisplayFeedbacksOfContactController {

    @AuraEnabled(cacheable=true)
    public static List<Response__c> getFeedbacks( Id contactId ) {
        return [ SELECT Id, Name, Template__r.Name
                        , ( SELECT Id, Value__c, Template_Line_Item__r.Question__c, Template_Line_Item__r.Name 
                            FROM Response_Line_Items__r ORDER BY Template_Line_Item__r.Name )
                    FROM Response__c 
                    WHERE Contact__c = :contactId ];
    }
}