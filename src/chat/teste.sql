SELECT
    *
FROM
    (
        SELECT
            (
                CASE
                    WHEN user1 = $ 1 THEN user2
                    ELSE user1
                END
            ) AS other,
            id
        FROM
            chat
        WHERE
            user1 = $ 1
            OR user2 = $ 1
    ) AS chats
    LEFT JOIN (
        SELECT
            DISTINCT ON (chat_id) text,
            created_at,
            sender_id,
            chat_id
        FROM
            message
        ORDER BY
            chat_id,
            created_at DESC
    ) AS last_message ON last_message.chat_id = chats.id
    LEFT JOIN (
        SELECT
            id,
            name,
            image
        FROM
            "user"
    ) AS users ON users.id = chats.other