import { BlogPost } from "./../../models/blogpost";
import { BlogPostService } from "./../blog-post.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-blog-post-add-edit",
  templateUrl: "./blog-post-add-edit.component.html",
  styleUrls: ["./blog-post-add-edit.component.css"]
})
export class BlogPostAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  postId: number;
  errorMessage: any;
  existingBlogPost: BlogPost;

  constructor(
    private blogPostService: BlogPostService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router
  ) {
    const idParam = "id";
    this.actionType = "Add";
    this.formTitle = "title";
    this.formBody = "body";
    if (this.avRoute.snapshot.params[idParam]) {
      this.postId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group({
      postId: 0,
      title: ["", [Validators.required]],
      body: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.postId > 0) {
      this.actionType = "Edit";
      this.blogPostService
        .getBlogPost(this.postId)
        .subscribe(
          data => (
            (this.existingBlogPost = data),
            this.form.controls[this.formTitle].setValue(data.title),
            this.form.controls[this.formBody].setValue(data.body)
          )
        );
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === "Add") {
      let blogPost: BlogPost = {
        dt: new Date(),
        creator: "Martin",
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };

      this.blogPostService.saveBlogPost(blogPost).subscribe(data => {
        // this.router.navigate(["/blogpost", data.postId]);
        this.router.navigate(["/"]);
      });
    }

    if (this.actionType === "Edit") {
      let blogPost: BlogPost = {
        postId: this.existingBlogPost.postId,
        dt: this.existingBlogPost.dt,
        creator: this.existingBlogPost.creator,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };
      this.blogPostService
        .updateBlogPost(blogPost.postId, blogPost)
        .subscribe(data => {
          // this.router.navigate([this.router.url]);
          this.router.navigate(["/"]);
        });
    }
  }

  cancel() {
    this.router.navigate(["/"]);
  }

  get title() {
    return this.form.get(this.formTitle);
  }
  get body() {
    return this.form.get(this.formBody);
  }
}
