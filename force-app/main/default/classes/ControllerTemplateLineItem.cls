public  with sharing class ControllerTemplateLineItem {
    @AuraEnabled(cacheable=true)
    public static List<Template_Line_Item__C> getTemplateLineItemList() {
      List<Template_Line_Item__C> tLIList = new List<Template_Line_Item__C>( [ SELECT Id, Name, Template__c, Question__c
                                                                              FROM Template_Line_Item__C ] );
        return tLIList;
    }
}