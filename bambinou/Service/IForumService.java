package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Forum;

import java.util.List;

public interface IForumService {
    public List<Forum> retrieveAllForums();
    public Forum retrieveForum(Long forumId);
    public Forum addForum(Forum forum);
    public void removeForum(Long forumId);
    public Forum modifyForum(Forum forum);
}