
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
interface DashboardStat{readonly label:string;readonly value:string;readonly trend:string;readonly tone:string;}
@Component({
    selector: 'app-dashboard', imports: [RouterLink], templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent{
  readonly stats:readonly DashboardStat[]=[{label:'Total students',value:'1,248',trend:'+34 this term',tone:'teal'},{label:'Teaching staff',value:'86',trend:'94% attendance',tone:'blue'},{label:'Classes today',value:'42',trend:'8 in progress',tone:'gold'},{label:'Fee collection',value:'91.2%',trend:'+2.4% this month',tone:'green'}];
  readonly activities:readonly string[]=['Attendance submitted for Grade 8A','New student application received','Term report generated for Grade 10','Science lab schedule updated'];
}
