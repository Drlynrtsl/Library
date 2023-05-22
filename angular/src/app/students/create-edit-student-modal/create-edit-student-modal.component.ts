import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  DepartmentDto,
  DepartmentServiceProxy,
  StudentDto,
  StudentServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-student-modal",
  templateUrl: "./create-edit-student-modal.component.html",
})
export class CreateEditStudentModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  student: StudentDto = new StudentDto();
  departments: DepartmentDto[] = [];
  id: number = 0;
  selectedDepartment: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _studentService: StudentServiceProxy,
    private _departmentService: DepartmentServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._studentService.get(this.id).subscribe((res) => {
        this.student = res;
        this.selectedDepartment = this.student.departmentId;
      });
    }
    this._departmentService.getAllDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  save() {
    this.saving = true;
    this.student.departmentId = this.selectedDepartment;
    if (this.id !== 0) {
      this._studentService.update(this.student).subscribe(
        () => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    } else {
      this._studentService.create(this.student).subscribe(
        () => {
          this.notify.info(this.l("SavedSuccessfully"));
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
