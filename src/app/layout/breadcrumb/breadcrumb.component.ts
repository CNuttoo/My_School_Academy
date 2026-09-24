import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

interface Breadcrumb { readonly label:string; readonly url:string; }
@Component({
    selector: 'app-breadcrumb', imports: [AsyncPipe, RouterLink], templateUrl: './breadcrumb.component.html', styleUrls: ['./breadcrumb.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  readonly breadcrumbs$ = this.router.events.pipe(filter((event):event is NavigationEnd=>event instanceof NavigationEnd),startWith(null),map(()=>this.buildBreadcrumbs(this.route.root)));
  constructor(private readonly router:Router,private readonly route:ActivatedRoute) {}
  private buildBreadcrumbs(route:ActivatedRoute,url='',breadcrumbs:Breadcrumb[]=[]):Breadcrumb[] { const child=route.firstChild;if(!child)return breadcrumbs;const segment=child.snapshot.url.map((part)=>part.path).join('/');const nextUrl=segment?`${url}/${segment}`:url;const label=child.snapshot.data['breadcrumb'] as string|undefined;return this.buildBreadcrumbs(child,nextUrl,label?[...breadcrumbs,{label,url:nextUrl}]:breadcrumbs); }
}
