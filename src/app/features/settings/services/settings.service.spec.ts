import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  beforeEach(() => { service = new SettingsService(); });

  it('updates the school profile', () => {
    service.updateSchool({ ...service.school(), currentTerm: 'Term 2' });
    expect(service.school().currentTerm).toBe('Term 2');
  });

  it('creates a custom role with safe default access', () => {
    const role = service.addRole({ name: 'Counselor', description: 'Student wellbeing support.' });
    expect(role.system).toBeFalse(); expect(role.permissions).toEqual(['students.view']);
  });

  it('toggles role permissions', () => {
    service.togglePermission('2', 'teachers.manage'); expect(service.roles().find((role) => role.id === '2')?.permissions).toContain('teachers.manage');
    service.togglePermission('2', 'teachers.manage'); expect(service.roles().find((role) => role.id === '2')?.permissions).not.toContain('teachers.manage');
  });

  it('adds a user and updates account access', () => {
    const user = service.addUser({ name: 'Nora Lee', email: 'nora.lee@northstar.edu', roleId: '2' });
    service.updateUserStatus(user.id, 'Suspended'); service.updateUserRole(user.id, '4');
    expect(service.users().find((item) => item.id === user.id)).toEqual(jasmine.objectContaining({ status: 'Suspended', roleId: '4' }));
  });
});
