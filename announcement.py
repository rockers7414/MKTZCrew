import status_code
from datetime import datetime, timedelta
from google.appengine.ext import db
import json

class Announcement(db.Model):
    Date = db.DateTimeProperty(required=True)
    UDate = db.DateTimeProperty(required=True)
    Title = db.StringProperty(required=True)
    Content = db.TextProperty(required=True)
    
class AnnouncementOperation(object):
    @staticmethod
    def CreateAnnouncement(title, content):
        date = datetime.now() + timedelta(hours=8)
        
        announcement = Announcement(key_name = date.strftime("%Y-%m-%d %H:%M:%S"), Title = title, Content = content, Date = date, UDate = date)
        announcement.put()
        
        return status_code.CREATE_ANNOUNCEMENT_SUCCESS
    
    @staticmethod
    def GetAnnouncementList():
        announcements = db.GqlQuery("SELECT * FROM Announcement ORDER BY UDate DESC")
        result = []
        for announcement in announcements:
            result.append({
                           'title': announcement.Title,
                           'content': announcement.Content,
                           'udate': announcement.UDate.strftime("%Y-%m-%d %H:%M:%S"),
                           'date': announcement.Date.strftime("%Y-%m-%d %H:%M:%S"),
            })
            
        return json.dumps(result)
    
    @staticmethod
    def GetAnnouncement(date):
        announcement_key = db.Key.from_path('Announcement', date)
        announcement = db.get(announcement_key)
        if announcement is not None:
            result = [ announcement.Title, announcement.Content ]
            return json.dumps(result)
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def SetAnnouncement(title, content, date):
        announcement_key = db.Key.from_path('Announcement', date)
        announcement = db.get(announcement_key)
        if announcement is not None:
            announcement.Title = title
            announcement.Content = content
            announcement.UDate = datetime.now() + timedelta(hours=8)
            announcement.put()
            return status_code.UPDATE_SUCCESS
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def DelAnnouncement(date):
        announcement_key = db.Key.from_path('Announcement', date)
        announcement = db.get(announcement_key)
        announcement.delete()
        return status_code.DELETE_SUCCESS
        