public with sharing class ControllerFeedbackSelectTemplate {
    @AuraEnabled(cacheable=true)
    public static List<Template__C> getTemplateList() {
      List<Template__C> templateList = new List<Template__C>( [ SELECT Id, Name FROM Template__C ] ); 
      return templateList;
    }
}