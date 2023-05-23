import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BorrowerDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-borrower-modal',
    templateUrl: './create-edit-borrower-modal.component.html'
})

export class CreateEditBorrowerModalComponent 
extends AppComponentBase 
implements OnInit {
    saving = false;
    borrower = new BorrowerDto();
    id: number =0;
    selectedBookCategories: number = null;

    @Output() onSave = new EventEmitter<any>();    
    
    constructor(
        injector: Injector,
        public bsModalRef: BsModalRef
    ){
        super(injector)
    }

    ngOnInit() { }
}