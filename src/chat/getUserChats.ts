import { getManager } from 'typeorm';
import { UserId } from '../users/User';

export async function getUserChats(userId:UserId) {
  return getManager().query(`  
SELECT
    chats.id AS id,
    users.id AS "userId",
    users.name AS "name",
    users.image AS "image",
    last_message.text AS "lastText",
    last_message.sender_id AS "lastUserId",
    last_message.created_at AS "lastTime"
FROM
    (
        SELECT
            (
                CASE
                    WHEN user1 = $1 THEN user2
                    ELSE user1
                END
            ) AS other,
            *
        FROM
            chat
        WHERE
            user1 = $1
            OR user2 = $1
    ) AS chats
    LEFT JOIN (
        SELECT
            DISTINCT ON (chat_id) *
        FROM
            message
        ORDER BY
            chat_id,
            created_at DESC
    ) AS last_message ON last_message.chat_id = chats.id
    LEFT JOIN (
        SELECT
            *
        FROM
            "user"
    ) AS users ON users.id = chats.other
ORDER BY
    "lastTime" DESC
`, [userId]);
}
