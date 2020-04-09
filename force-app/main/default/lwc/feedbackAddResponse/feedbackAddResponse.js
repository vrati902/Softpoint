import { LightningElement, wire, api, track } from 'lwc';

import fetchData from '@salesforce/apex/DisplayFeedbacksOfContactController.getFeedbacks';

const columns = [
    {label: 'Order', fieldName: 'Template_Line_Item__r.Name', type: 'text'}
]
export default class feedbackAddResponse extends LightningElement {
    @api recordId;
    @track items;
    table;
    selectedOption;

    @wire( fetchData, { template__cId : "$recordId" } )
    wiredFeedbackRecords( { data, error } ) {
        if( data ) {
            this.tableCreate( data );
        } else if( error ) {
            console.log( 'Error > ' + error );
        }
    }
     tableCreate( data ) {
     this.items = [];
        this.table = {};
        for( let i = 0; i < data.length; i++ ) {
            this.table[ data[i].Id ] = data[i].Template_Line_Item__r;
            this.items.push(  { 
                name : data[i].Template__r.Name,
                id   : data[i].Id,
            });
        }
    }

            get tableValues () {
                return this.table[ this.selectedOption ];
            }
        }