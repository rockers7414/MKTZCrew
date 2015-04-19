# -*- coding: utf-8 -*-
import status_code
from datetime import datetime, timedelta
from google.appengine.ext import db
import json

class Post(db.Model):
    Title = db.StringProperty(required=True)
    Date = db.DateTimeProperty(required=True)
    Content = db.TextProperty(required=True)
    Author = db.StringProperty(required=True)
    Hide = db.BooleanProperty(required=True)

class Reply(db.Model):
    Date = db.DateTimeProperty(required=True)
    Content = db.TextProperty(required=True)
    Author = db.StringProperty(required=True)
    FK = db.StringProperty(required=True)
    
class PostOperation(object):
    @staticmethod
    def GetPostList():
        posts = db.GqlQuery("SELECT * FROM Post ORDER BY Date DESC")
        result = []
        for post in posts:
            result.append({
                           'title': post.Title,
                           'date': post.Date.strftime("%Y-%m-%d %H:%M:%S"),
                           #'content': post.Content,
                           'author': post.Author,
                           'hide': post.Hide
            })
            
        return json.dumps(result)
    
    @staticmethod
    def CreatePost(title, content, author, hide=False):
        date = datetime.now() + timedelta(hours=8)
        post = Post(key_name = date.strftime("%Y-%m-%d %H:%M:%S"), Title = title, Content = content, Author = author, Date = date, Hide = hide)
        post.put()
        return status_code.CREATE_POST_SUCCESS
    
    @staticmethod
    def SetPost(content, date, author):
        post_key = db.Key.from_path('Post', date)
        post = db.get(post_key)
        if post is not None:
            if post.Author == author or author == "系統管理員" or author == "血盟管理員":
                post.Content = content
                post.put()
                return status_code.UPDATE_SUCCESS
            return status_code.ACCESS_DENY
        return status_code.CANNOT_FIND_ITEM

    @staticmethod
    def DelPost(date):
        post_key = db.Key.from_path('Post', date)
        post = db.get(post_key)
        
        replies = db.GqlQuery("SELECT * FROM Reply WHERE FK = :1", date)
        for reply in replies:
            reply.delete()
        
        post.delete()
        return status_code.DELETE_SUCCESS
    
    @staticmethod
    def CreateReply(content, author, fk):
        date = datetime.now() + timedelta(hours=8)
        reply = Reply(key_name = date.strftime("%Y-%m-%d %H:%M:%S"), Content = content, Author = author, FK = fk, Date = date)
        reply.put()
        return status_code.CREATE_REPLY_SUCCESS
    
    @staticmethod
    def SetReply(content, date, author):
        reply_key = db.Key.from_path('Reply', date)
        reply = db.get(reply_key)
        if reply is not None:
            if reply.Author == author or author == "系統管理員" or author == "血盟管理員":
                reply.Content = content
                reply.put()
                return status_code.UPDATE_SUCCESS
            return status_code.ACCESS_DENY
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def DelReply(date):
        reply_key = db.Key.from_path('Reply', date)
        reply = db.get(reply_key)
        reply.delete()
        return status_code.DELETE_SUCCESS
    
    @staticmethod
    def GetPostInfo(date, admin=False, author=""):
        post_key = db.Key.from_path('Post', date)
        post = db.get(post_key)
        
        if post is not None and post.Author == author:
            admin = True
        
        if post.Hide == True and admin == False:
            return status_code.ACCESS_DENY
        
        result = []
        if post is not None:
            result.append({
                           'post': [ post.Title, post.Content, post.Date.strftime("%Y-%m-%d %H:%M:%S"), post.Author, author ]
            })
            
            replies = db.GqlQuery("SELECT * FROM Reply WHERE FK = :1", date)
            for reply in replies:
                result.append({
                               'content': reply.Content,
                               'author': reply.Author,
                               'date': reply.Date.strftime("%Y-%m-%d %H:%M:%S"),
                               'memberName' : author
                })
            
            return json.dumps(result)
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def GetPost(date, author):
        post_key = db.Key.from_path('Post', date)
        post = db.get(post_key)
        
        if post is not None and post.Author == author or author == "系統管理員" or author == "血盟管理員":
            return json.dumps(post.Content)
        
    @staticmethod
    def GetReply(date, author):
        reply_key = db.Key.from_path('Reply', date)
        reply = db.get(reply_key)
        
        if reply is not None and reply.Author == author or author == "系統管理員" or author == "血盟管理員":
            return json.dumps(reply.Content)