import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentDto, StudentServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-student-modal',
    templateUrl: './create-edit-student-modal.component.html'
  })

  export class CreateStudentModalComponent extends AppComponentBase implements OnInit{
    saving = false;
    student: StudentDto = new StudentDto();
    id:number = 0;
    @Output() onSave = new EventEmitter<any>();
    constructor(
      injector: Injector,
      public bsModalRef: BsModalRef,
      private _studentService: StudentServiceProxy
    )
    {
      super(injector);
    }

  ngOnInit(): void {
    if(this.id){
      this. _studentService.get(this.id).subscribe((res) =>{
        this.student = res;
      })
    }
  }
  save(){
    this.saving = true;
    if(this.id != 0){
      this. _studentService.update(this.student).subscribe((res) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
      );
    }else{
      this. _studentService.create(this.student).subscribe((res) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
      );
    }
  }

}
