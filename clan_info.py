import status_code
from google.appengine.ext import db
import json

class ClanInfo(db.Model):
    Content = db.TextProperty(required=True)
    Date = db.DateTimeProperty(auto_now_add=True)
    
class ClanInfoOperation(object):
    @staticmethod
    def UpdateClanInfo(content):
        ClanInfo_key = db.Key.from_path('ClanInfo', 'ClanInfo')
        clanInfo = db.get(ClanInfo_key)
        
        if clanInfo is not None:
            clanInfo.Content = content
        else:
            clanInfo = ClanInfo(key_name = 'ClanInfo', Content = content)
            
        clanInfo.put()
        return status_code.UPDATE_SUCCESS
    
    @staticmethod
    def GetClanInfo():
        ClanInfo_key = db.Key.from_path('ClanInfo', 'ClanInfo')
        clanInfo = db.get(ClanInfo_key)
        
        result = [ clanInfo.Content if clanInfo is not None else "" ]
        
        return json.dumps(result)