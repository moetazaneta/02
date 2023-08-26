import { Activity } from '../../types/index.js';
import { client } from '../client.js';

/**
 * @returns Unsubscribe function.
 */
export async function subscribeToActivitiesChanges(callback: (payload: Activity) => void) {
  const activities = client
    .channel('activity-insert-channel')
    .on<Activity>(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'activities' },
      payload => callback(payload.new)
    )
    .subscribe();

  return () => activities.unsubscribe();
}
