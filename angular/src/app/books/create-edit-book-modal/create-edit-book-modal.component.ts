import { 
    Component, 
    EventEmitter,
    Injector, 
    OnInit, 
    Output 
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { 
    BookDto, 
    BookServiceProxy 
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: "create-edit-books-modal",
    templateUrl: "./create-edit-book-modal.component.html"
})

export class CreateEditBookModalComponent
    extends AppComponentBase
    implements OnInit
{
    saving = false;
    book = new BookDto();
    id: number =0;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public bsModalRef: BsModalRef,
        private _bookService: BookServiceProxy
    ){
        super(injector)
    }

    ngOnInit(): void {
        if (this.id){
            this._bookService.get(this.id).subscribe((res) => {
                this.book = res;
            });
        }
    }

    save(): void {
        this.saving = true;
        if (this.id !== 0) {
          this._bookService.update(this.book).subscribe(
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
          this._bookService.create(this.book).subscribe(
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