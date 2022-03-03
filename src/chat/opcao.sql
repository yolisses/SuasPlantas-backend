SELECT
    last_message.*,
    "user".name,
    "user".image
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
    created_at DESC