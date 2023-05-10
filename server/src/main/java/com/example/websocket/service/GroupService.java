/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.example.websocket.service;

import com.example.websocket.model.Group;
import com.example.websocket.model.User;
import com.example.websocket.repository.GroupRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;
    private Group group;
    public Group getGroupById(Long id){
        return groupRepository.findById(id).orElse(null);
    }
    public Group createGroup(String groupName,List<User> listUser) throws Exception{
        group = new Group();
        group.setUsers(listUser);
        group.setGroupName(groupName);
        group = groupRepository.save(group);
        return group;
    }
    public Group addUserGroup(Long id, User user) throws Exception{
        group = groupRepository.findById(id).orElse(null);
        if(group != null){
            group.getUsers().add(user);
            group = groupRepository.save(group);
        }
        return group;
    }
    public Group removeUserGroup(Long id, User user) throws Exception{
        group = groupRepository.findById(id).orElse(null);
        if(group != null){
            if(group.getUsers().contains(user)){
                group.getUsers().add(user);
                group = groupRepository.save(group);
            }
            else{
                group = null;
            }
        }
        return group;
    }
}
