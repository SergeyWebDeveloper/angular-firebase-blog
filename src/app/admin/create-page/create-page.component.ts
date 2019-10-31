import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPost} from '../../shared/interfaces';
import {PostsServices} from '../../shared/posts.services';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;

  constructor(private postsService: PostsServices) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
    });
  }

  get title() {
    return this.form.get('title');
  }

  get author() {
    return this.form.get('author');
  }


  submit() {
    const post: IPost = {
      ...this.form.value,
      date: new Date()
    };
    this.postsService.create(post).subscribe(() => this.form.reset());
  }
}
