import { getManager } from 'typeorm';
import { UserId } from '../users/User';

export async function getUserContacts(userId:UserId) {
  const manager = getManager();
  return manager.query(`
select * from (
select distinct on (other_user_id) * from (
select owner_id as other_user_id, * from message where receiver_id = 1
union
select receiver_id as other_user_id, * from message where owner_id = 1 
)as coisa order by other_user_id, created_at desc
)as contacts order by created_at desc
  `);
}
