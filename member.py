import status_code
from datetime import datetime, timedelta
from google.appengine.ext import db
import json

class Member(db.Model):
    Account = db.StringProperty(required=True)
    Password = db.StringProperty(required=True)
    MacAddress = db.StringProperty()
    Job = db.StringProperty(choices=set(["ro", "kn", "ef", "ma", "de", "dk", "il"]))
    Level = db.IntegerProperty()
    Date_Level = db.DateTimeProperty()
    Validation = db.BooleanProperty()
    EnableTools = db.BooleanProperty()
    ForumAccount = db.StringProperty()
    ForumPassword = db.StringProperty()
    PostContent = db.StringListProperty()
    
class MemberOperation(object):
    @staticmethod
    def CreateMember(account, password, validation = False):
        member_key = db.Key.from_path('Member', account)
        
        if db.get(member_key) is not None:
            return status_code.ACCOUNT_DUPLICATE
        
        member = Member(key_name = account, Account = account, Password = password, Validation = validation, EnalbeTools = False)
        member.put()
        return status_code.ACCOUNT_REGEIST_SUCCESS
    
    @staticmethod
    def IsMember(account, password):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        if member is not None:
            if member.Account == account and member.Password == password:
                return True
        return False;
    
    @staticmethod
    def IsValidation(account):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
         
        if member is not None:
            return member.Validation
        return False
    
    @staticmethod
    def IsEnableTools(account):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
         
        if member is not None:
            return member.EnableTools
        return False
    
    @staticmethod
    def GetMemberList(job, admin = False, systemadmin = False):
        if job == "":
            members = db.GqlQuery("SELECT * FROM Member ORDER BY Level DESC")
        else:
            members = db.GqlQuery("SELECT * FROM Member WHERE Job = :1 ORDER BY Level DESC", job)
            
        result = []
        
        for member in members:
            rowData = {
                       'ID': member.Account,
                       'Job': member.Job,
                       'Level': int(member.Level) if member.Level is not None else "null",
                       'Date_level': member.Date_Level.strftime("%Y-%m-%d %H:%M:%S") if member.Date_Level is not None else "null"
            }
            
            if admin or systemadmin:
                rowData['Validation'] = member.Validation
            if systemadmin:
                rowData['EnableTools'] = member.EnableTools
                
            result.append(rowData)
            
        return json.dumps(result)
    
    @staticmethod
    def GetMember(account):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        result = [ member.Account, member.Job, member.Level, member.Date_Level if member.Date_Level is None else member.Date_Level.strftime("%Y-%m-%d %H:%M:%S") ]
        return json.dumps(result)
    
    @staticmethod
    def DelMember(account):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        member.delete()
        return status_code.DELETE_SUCCESS
    
    @staticmethod
    def SetMember(account, level, job):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        if member is not None:
            member.Account = account
            member.Level = int(level)
            member.Job = job
            member.Date_Level = datetime.now() + timedelta(hours=8)
            member.put()
            return status_code.UPDATE_SUCCESS
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def SetMemberValidation(account, validation):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        if member is not None:
            member.Validation = validation
            member.put()
            return status_code.UPDATE_SUCCESS
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def SetMemberEnableTools(account, enbleTools):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        if member is not None:
            member.EnableTools = enbleTools
            member.put()
            return status_code.UPDATE_SUCCESS
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def SetMemberMac(account, mac = ''):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        if member is not None:
            member.MacAddress = mac
            member.put()
            return status_code.UPDATE_SUCCESS
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def GetMemberMac(account):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        if member is not None:
            return member.MacAddress
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def GetPersonalInfo(account):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        if member is not None:
            result = { 
                      'a': member.ForumAccount, 
                      'p': member.ForumPassword, 
                      'pc': member.PostContent 
            }
            return json.dumps(result)
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def SetPersonalInfo(account, oldPassword, newPassword, forumAccount, forumPassword, postContent):
        member_key = db.Key.from_path('Member', account)
        member = db.get(member_key)
        if member is not None:
            if member.Password == oldPassword:
                member.Password = newPassword if newPassword != "" else oldPassword
                member.ForumAccount = forumAccount
                member.ForumPassword = forumPassword
                member.PostContent = json.loads(postContent)
                member.put()
                return status_code.UPDATE_SUCCESS
            else:
                return status_code.WRONG_PASSWORD
        return status_code.CANNOT_FIND_ITEM