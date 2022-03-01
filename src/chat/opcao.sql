SELECT
    u.id,
    name,
    text,
    image,
    sender_id,
    receiver_id last_message.created_at,
FROM
    (
        SELECT
            DISTINCT ON (user_id) *
        FROM
            (
                SELECT
                    (
                        CASE
                            WHEN sender_id = 1 THEN receiver_id
                            ELSE sender_id
                        END
                    ) AS user_id,
                    *
                FROM
                    message
                WHERE
                    sender_id = 1
                    OR receiver_id = 1
            ) AS all_messages
        ORDER BY
            user_id,
            created_at DESC
    ) AS last_message
    LEFT JOIN "user" u ON u.id = user_id
ORDER BY
    last_message.created_at DESC