import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-prod-cat',
  templateUrl: './prod-cat.component.html',
  styleUrls: ['./prod-cat.component.scss']
})

export class ProdCatComponent implements OnInit {

  @Input()formType:any;

  selectedPicture: ImageSnippet | undefined;
  profileImage:string="";
  catForm: FormGroup;
  prodForm: FormGroup;
  prodFormSubmitted: boolean = false;
  catFormSubmitted: boolean = false;
  isUploadFile:boolean=true;
  categoires:any[]=[];

  @Output() onCatFormSubmit= new EventEmitter<any>()
  /**
   *
   */
  constructor(
    private formBuilder: FormBuilder,
    private catService:CategoryService
  ) {

    this.catForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required]
    });

    this.prodForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', Validators.required],
      imageUrl: ['', Validators.required],
      imageType: ['1', Validators.required],
      categoryId:['', Validators.required],
      quantity:['',Validators.required],
      description:['',Validators.required]
    });
  }

  submitCatForm(){
    this.catFormSubmitted=true;
    if(this.catForm.valid){
      this.onCatFormSubmit.emit(this.catForm.value);
      this.catForm.reset();
      this.catFormSubmitted=false
    }
  }

  onImageTypeChange(){
    if(this.prodForm.get('imageType')?.value=="1"){
      this.isUploadFile=true;
    }else{
      this.isUploadFile=false;
    }
  }

  submitProdForm(){
    this.prodFormSubmitted=true;
    if(this.prodForm.valid){
      this.onCatFormSubmit.emit(this.prodForm.value);
      this.prodForm.reset();
      this.profileImage="";
      this.selectedPicture=undefined;
      this.prodFormSubmitted=false;
    }
  }

  onDpSelect(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedPicture = new ImageSnippet(
        event.target.result,
        file
      );
      reader.onloadend=()=>{
        const base64String=reader.result as string;
        this.profileImage=base64String;
        this.prodForm.get('imageUrl')?.setValue(this.profileImage);
      }
    });

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.getAllCats();
  }

  getAllCats(){
    this.catService.getAllCategory().subscribe((res:any)=>{
      if(res.status==1){
        this.categoires=res.data;
      }
    })
  }

}
