/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.example.websocket.repository;

import com.example.websocket.model.Message;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Admin
 */
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query(
            value = "SELECT * FROM `messages` WHERE (receiver_id =?1 AND sender_id = ?2) OR (receiver_id =?2 AND sender_id = ?1) ORDER BY timestamp ASC",
            nativeQuery = true)
    List<Message> findAllMessageBySenderAndReciever(Long id1, Long id2);

    @Query(
            value = "SELECT `message_id`,`content`,`type`,`receiver_id`,`sender_id`,last_message_time AS timestamp\n" +
"FROM messages\n" +
"INNER JOIN (\n" +
"  SELECT \n" +
"    CASE\n" +
"      WHEN sender_id =?1 THEN receiver_id\n" +
"      ELSE sender_id\n" +
"    END AS chat_partner,\n" +
"    MAX(timestamp) AS last_message_time\n" +
"  FROM messages\n" +
"  WHERE sender_id =?1 OR receiver_id =?1\n" +
"  GROUP BY chat_partner\n" +
") AS last_message\n" +
"ON (\n" +
"  (messages.sender_id =?1 AND messages.receiver_id = last_message.chat_partner)\n" +
"  OR (messages.sender_id = last_message.chat_partner AND messages.receiver_id =?1)\n" +
")\n" +
"AND messages.timestamp = last_message.last_message_time\n" +
"ORDER BY messages.timestamp DESC",
            nativeQuery = true)
    List<Message> findListBoxChatByUserId(Long id);
}
