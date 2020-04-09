import { LightningElement, wire, track } from 'lwc';
import getTemplateList from '@salesforce/apex/ControllerFeedbackSelectTemplate.getTemplateList';

export default class SelectTemplate extends LightningElement {
    @wire(getTemplateList)
    templatesList;
    @track templateName = '';
    
    get templateOptions() {
        var returnOptions = [];
        if(this.templatesList.data){
            this.templatesList.data.forEach(tem =>{
                returnOptions.push({label:tem.Name , value:tem.Name});
            }); 
        }
        console.log(JSON.stringify(returnOptions));
        return returnOptions;
    }
    
     handleTemplateMgrChange(template) {
        this.value = template.detail.value;
        this.templateName = template.detail.value;
        this.valueText = "Template Selected";        
     }
     get hasResults() {
        return (this.templatesList.data.length > 0);
     }

     @track isNextModal = false;
 
    handleNextModal() {
        this.isNextModal = true;
    }
   
    handleCloseModal(event) {
        // Creates the event with the data.
        const selectedEvent = new CustomEvent("modalchange", {
            detail: false
        });
    
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    handleFeedbackForm(){
        if(this.templateName=='' || this.templateName==null){
            alert('Please select a Template.');
        }else{
            this.isNextModal = true;
        }
    }  
    }