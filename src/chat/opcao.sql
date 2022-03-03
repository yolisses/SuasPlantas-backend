SELECT
    last_message.text,
    "user".name AS name,
    "user".image AS image,
    last_message.user_id AS "userId",
    last_message.sender_id AS "senderId",
    last_message.created_at AS "lastTime",
    last_message.receiver_id AS "receiverId"
FROM
    (
        SELECT
            DISTINCT ON (user_id) *,
            (
                CASE
                    WHEN sender_id = 1 THEN receiver_id
                    ELSE sender_id
                END
            ) AS user_id
        FROM
            message
        WHERE
            sender_id = 1
            OR receiver_id = 1
        ORDER BY
            user_id,
            created_at DESC
    ) AS last_message
    LEFT JOIN "user" ON "user".id = user_id
ORDER BY
    last_message.created_at DESC