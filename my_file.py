import status_code
from google.appengine.ext import db
import json

class MyFile(db.Model):
    Name = db.StringProperty(required=True)
    Link = db.StringProperty(required=True)
    DESC = db.StringProperty(required=True)
    MD5 = db.StringProperty(required=True)
    Date = db.DateTimeProperty(auto_now_add=True)
    
class MyFileOperation(object):
    @staticmethod
    def CreateFile(name, link, md5, oldname, desc):
        if oldname != "":
            myFile_key = db.Key.from_path('MyFile', oldname)
            myFile = db.get(myFile_key)
        
            if myFile is not None:
                myFile.delete()

        myFile = MyFile(key_name = name, Name = name, Link = link, MD5 = md5, DESC = desc)
        myFile.put()
        return status_code.CREATE_FILE_SUCCESS
        
    @staticmethod
    def GetFileList():
        myFiles = db.GqlQuery("SELECT * FROM MyFile ORDER BY Date DESC")
        result = []
        for myFile in myFiles:
            result.append({
                           'name': myFile.Name,
                           'link': myFile.Link,
                           'md5': myFile.MD5,
                           'desc': myFile.DESC,
                           'date': myFile.Date.strftime("%Y-%m-%d %H:%M:%S")
            })
            
        return json.dumps(result)
    
    @staticmethod
    def GetFile(name):
        myFile_key = db.Key.from_path('MyFile', name)
        myFile = db.get(myFile_key)
        
        if myFile is not None:
            result = [ myFile.Name, myFile.Link, myFile.MD5, myFile.DESC]
            return json.dumps(result)
        return status_code.CANNOT_FIND_ITEM
    
    @staticmethod
    def DelFile(name):
        myFile_key = db.Key.from_path('MyFile', name)
        myFile = db.get(myFile_key)
        myFile.delete()
        return status_code.DELETE_SUCCESS
    