import { BlogPostAddEditComponent } from "./blog-post-add-edit/blog-post-add-edit.component";
import { BlogPostsComponent } from "./blog-posts/blog-posts.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: BlogPostsComponent, pathMatch: "full" },
  { path: "blogpost/:id", component: BlogPostsComponent },
  { path: "add", component: BlogPostAddEditComponent },
  { path: "blogpost/edit/:id", component: BlogPostAddEditComponent },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
