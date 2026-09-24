import { Injectable } from '@angular/core';

import { NavigationItem } from '../models/navigation-item.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly items: readonly NavigationItem[] = [
    { label: 'Dashboard', icon: 'grid', route: '/dashboard' },
    { label: 'Students', icon: 'students', route: '/students' },
    { label: 'Teachers', icon: 'teacher', route: '/teachers' },
    { label: 'Academic', icon: 'book', route: '/academics' },
    { label: 'Attendance', icon: 'calendar', route: '/attendance' },
    { label: 'Grades', icon: 'chart', route: '/grades' },
    { label: 'Finance', icon: 'wallet', route: '/finance' },
    { label: 'Reports', icon: 'report', route: '/reports' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];
}
