import { Injectable, signal } from '@angular/core';

import { AttendanceCounts, AttendanceRecord, AttendanceSession, RosterStudent } from '../models/attendance.model';

const ROSTERS: Readonly<Record<string, readonly RosterStudent[]>> = {
  'Grade 7A': [
    { id: '7A-1', studentNumber: 'NST-2026-101', name: 'Ari Taylor' }, { id: '7A-2', studentNumber: 'NST-2026-102', name: 'Emma Wilson' }, { id: '7A-3', studentNumber: 'NST-2026-103', name: 'Leo Anderson' }, { id: '7A-4', studentNumber: 'NST-2026-104', name: 'Mia Thomas' }, { id: '7A-5', studentNumber: 'NST-2026-105', name: 'Owen Moore' }
  ],
  'Grade 8C': [
    { id: '8C-1', studentNumber: 'NST-2026-201', name: 'Ethan Patel' }, { id: '8C-2', studentNumber: 'NST-2026-202', name: 'Lily Walker' }, { id: '8C-3', studentNumber: 'NST-2026-203', name: 'James Hall' }, { id: '8C-4', studentNumber: 'NST-2026-204', name: 'Zoe Allen' }, { id: '8C-5', studentNumber: 'NST-2026-205', name: 'Henry Young' }
  ],
  'Grade 9A': [
    { id: '9A-1', studentNumber: 'NST-2026-301', name: 'Noah Williams' }, { id: '9A-2', studentNumber: 'NST-2026-302', name: 'Ella King' }, { id: '9A-3', studentNumber: 'NST-2026-303', name: 'Jack Wright' }, { id: '9A-4', studentNumber: 'NST-2026-304', name: 'Ruby Scott' }, { id: '9A-5', studentNumber: 'NST-2026-305', name: 'Finn Green' }
  ],
  'Grade 10A': [
    { id: '10A-1', studentNumber: 'NST-2026-001', name: 'Maya Chen' }, { id: '10A-2', studentNumber: 'NST-2026-005', name: 'Amelia Brooks' }, { id: '10A-3', studentNumber: 'NST-2026-401', name: 'Liam Clark' }, { id: '10A-4', studentNumber: 'NST-2026-402', name: 'Chloe Lewis' }, { id: '10A-5', studentNumber: 'NST-2026-403', name: 'Ben Harris' }
  ]
};

const TEACHERS: Readonly<Record<string, string>> = { 'Grade 7A': 'Nora Lee', 'Grade 8C': 'Marcus Rivera', 'Grade 9A': 'Grace Thompson', 'Grade 10A': 'Olivia Bennett' };

function recordsFor(className: string, statuses: readonly AttendanceRecord['status'][]): readonly AttendanceRecord[] {
  return (ROSTERS[className] ?? []).map((student, index) => ({ ...student, status: statuses[index] ?? 'Present', note: statuses[index] === 'Late' ? 'Arrived after first bell' : '' }));
}

const SESSIONS: readonly AttendanceSession[] = [
  { id: '1', date: '2026-09-25', className: 'Grade 7A', homeroomTeacher: 'Nora Lee', submittedAt: '07:58', records: recordsFor('Grade 7A', ['Present', 'Present', 'Late', 'Present', 'Present']) },
  { id: '2', date: '2026-09-25', className: 'Grade 8C', homeroomTeacher: 'Marcus Rivera', submittedAt: '08:04', records: recordsFor('Grade 8C', ['Present', 'Absent', 'Present', 'Present', 'Excused']) },
  { id: '3', date: '2026-09-25', className: 'Grade 10A', homeroomTeacher: 'Olivia Bennett', submittedAt: '08:01', records: recordsFor('Grade 10A', ['Present', 'Present', 'Present', 'Late', 'Present']) },
  { id: '4', date: '2026-09-24', className: 'Grade 9A', homeroomTeacher: 'Grace Thompson', submittedAt: '08:06', records: recordsFor('Grade 9A', ['Present', 'Present', 'Present', 'Present', 'Absent']) },
  { id: '5', date: '2026-09-24', className: 'Grade 10A', homeroomTeacher: 'Olivia Bennett', submittedAt: '08:02', records: recordsFor('Grade 10A', ['Present', 'Present', 'Late', 'Present', 'Present']) }
];

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly sessionsState = signal(SESSIONS);
  readonly sessions = this.sessionsState.asReadonly();
  readonly classes = Object.keys(ROSTERS);

  getRoster(className: string): readonly RosterStudent[] { return ROSTERS[className] ?? []; }
  getSession(date: string, className: string): AttendanceSession | undefined { return this.sessions().find((item) => item.date === date && item.className === className); }
  createDraft(date: string, className: string): AttendanceRecord[] { const existing = this.getSession(date, className); return existing ? existing.records.map((item) => ({ ...item })) : this.getRoster(className).map((student) => ({ ...student, status: 'Present', note: '' })); }

  saveSession(date: string, className: string, records: readonly AttendanceRecord[]): AttendanceSession {
    const existing = this.getSession(date, className);
    const session: AttendanceSession = { id: existing?.id ?? String(Math.max(0, ...this.sessions().map((item) => Number(item.id))) + 1), date, className, homeroomTeacher: TEACHERS[className] ?? 'Not assigned', submittedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }), records: records.map((item) => ({ ...item })) };
    this.sessionsState.update((items) => existing ? items.map((item) => item.id === existing.id ? session : item) : [session, ...items]);
    return session;
  }

  counts(records: readonly AttendanceRecord[]): AttendanceCounts {
    return { total: records.length, present: records.filter((item) => item.status === 'Present').length, late: records.filter((item) => item.status === 'Late').length, absent: records.filter((item) => item.status === 'Absent').length, excused: records.filter((item) => item.status === 'Excused').length };
  }
}
