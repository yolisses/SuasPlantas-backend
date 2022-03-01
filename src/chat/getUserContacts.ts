import { getManager } from 'typeorm';
import { UserId } from '../users/User';

export async function getUserContacts(userId:UserId) {
  const manager = getManager();
  return manager.query(`
  select other_user_id as "otherUserId", image, owner_id as "ownerId", text, last_message.created_at from (
    select * from (
      select distinct on (other_user_id) * from (
        select 
          (case when owner_id = $1 then receiver_id else owner_id end) as other_user_id, * 
        from message where receiver_id = $1 or owner_id = $1
      )as messages order by other_user_id, created_at desc
    )as contact order by created_at desc
  )as last_message
  left join "user" on 
   "user".id = last_message.other_user_id
  `, [userId]);
}
