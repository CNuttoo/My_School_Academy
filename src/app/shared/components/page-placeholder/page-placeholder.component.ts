import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({ selector:'app-page-placeholder', standalone:true, templateUrl:'./page-placeholder.component.html', styleUrls:['./page-placeholder.component.scss'], changeDetection:ChangeDetectionStrategy.OnPush })
export class PagePlaceholderComponent { readonly title=this.route.snapshot.data['title'] as string; readonly description=this.route.snapshot.data['description'] as string; constructor(private readonly route:ActivatedRoute){} }
