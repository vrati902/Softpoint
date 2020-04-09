import { LightningElement, wire, api, track } from 'lwc';
//import { spinner } from '../first.component';
import getFeedbacks from '@salesforce/apex/DisplayFeedbacksOfContactController.getFeedbacks';

const columns = [
    {label: 'Order', fieldName: 'Template_Line_Item__r.Name', type: 'text'},
    {label: 'Order', fieldName: 'Template_Line_Item__r.Questions', type: 'text'}
]
export default class DisplayFeedbacksOfContact extends LightningElement {
    @api recordId;
    @track items;
    @track clickedButtonLabel;
    table;
    selectedOption;

    @track isOpenModal = false;
 
    handleOpenModal() {
        this.isOpenModal = true;
    }
   
    handleCloseModal() {
        this.isOpenModal = false;
    }

    handleCloseModalChange(event){
        this.isOpenModal = false;
    }

   // handleClick(event) {
        //this.clickedButtonLabel = event.target.label;
    //}   
    @wire( getFeedbacks, { contactId : "$recordId" } )
    wiredFeedbackRecords( { data, error } ) {
        if( data ) {
            this.generateAccordian( data );
        } else if( error ) {
            console.log( 'Error > ' + error );
        }
    }

    generateAccordian( data ) {
        this.items = [];
        this.table = {};
        for( let i = 0; i < data.length; i++ ) {
            this.table[ data[i].Id ] = data[i].Response_Line_Items__r;
            this.items.push(  { 
                name : data[i].Template__r.Name,
                id   : data[i].Id,
            });
        }
    }

    handleChange( event ) {
        this.selectedOption = event.detail.openSections;
    }

    get tableValues () {
        return this.table[ this.selectedOption ];
    }
}