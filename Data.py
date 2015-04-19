import status_code
from member import MemberOperation
from announcement import AnnouncementOperation
from clan_info import ClanInfoOperation
from my_file import MyFileOperation
from post import PostOperation
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from gaesessions import get_current_session

class MemberMGR(webapp.RequestHandler):
    def post(self):
        session = get_current_session()
        
        isLogin = session.get('isLogin', False)
        isAdmin = session.get('isAdmin', False)
        isSystemAdmin = session.get('isSystemAdmin', False)
        
        auth = 1 if isLogin else 0
        auth = 2 if isAdmin else auth
        auth = 3 if isSystemAdmin else auth 
        
        if auth > 0:
            reqType = self.request.get('r')
            if reqType == "list":
                job = self.request.get('job', '')
                self.response.out.write(MemberOperation.GetMemberList(job, isAdmin, isSystemAdmin))
            elif reqType == "info":
                if auth > 1:
                    account = self.request.get('a', '')
                    self.response.out.write(MemberOperation.GetMember(account))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "update":
                if auth > 1:
                    account = self.request.get('a', '')
                    level = self.request.get('level', '')
                    job = self.request.get('job', '')
                    self.response.out.write(MemberOperation.SetMember(account, level, job))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "validation":
                if auth > 1:
                    account = self.request.get('a', '')
                    checked = False if self.request.get('value') == "false" else True
                    self.response.out.write(MemberOperation.SetMemberValidation(account, checked))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "enabletools":
                if auth > 2:
                    account = self.request.get('a', '')
                    checked = False if self.request.get('value') == "false" else True
                    self.response.out.write(MemberOperation.SetMemberEnableTools(account, checked))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "del":
                if auth > 1:
                    account = self.request.get('a', '')
                    self.response.out.write(MemberOperation.DelMember(account))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "clearMac":
                if auth > 2:
                    account = self.request.get('a', '')
                    self.response.out.write(MemberOperation.SetMemberMac(account))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "pinfo":
                if auth > 0:
                    account = session.get('memberName', '')
                    self.response.out.write(MemberOperation.GetPersonalInfo(account))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "uinfo":
                if auth > 0:
                    account = session.get('memberName', '')
                    oldpassword = self.request.get('op', '')
                    newpassword = self.request.get('np', '')
                    forumAccount = self.request.get('fa', '')
                    forumPassword = self.request.get('fp', '')
                    postContent = self.request.get('plist', [])
                    self.response.out.write(MemberOperation.SetPersonalInfo(account, oldpassword, newpassword, forumAccount, forumPassword, postContent))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
        else:
            self.response.out.write(status_code.ACCESS_DENY)
            self.response.out.write("L:%s A:%s R:%s" % (isLogin, isAdmin, isSystemAdmin))
            
class AnnouncementMGR(webapp.RequestHandler):
    def post(self):
        session = get_current_session()
        
        isLogin = session.get('isLogin', False)
        isAdmin = session.get('isAdmin', False)
        isSystemAdmin = session.get('isSystemAdmin', False)
        
        auth = 1 if isLogin else 0
        auth = 2 if isAdmin else auth
        auth = 3 if isSystemAdmin else auth 
        
        if auth > 0:
            reqType = self.request.get('r')
            if reqType == "list":
                self.response.out.write(AnnouncementOperation.GetAnnouncementList())
            elif reqType == "new":
                if auth > 1:
                    title = self.request.get('t')
                    content = self.request.get('c')
                    self.response.out.write(AnnouncementOperation.CreateAnnouncement(title, content))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)                    
            elif reqType == "info":
                if auth > 1:
                    time = self.request.get('t', '')
                    self.response.out.write(AnnouncementOperation.GetAnnouncement(time))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "update":
                if auth > 1:
                    title = self.request.get('t', '')
                    content = self.request.get('c', '')
                    date = self.request.get('d', '')
                    self.response.out.write(AnnouncementOperation.SetAnnouncement(title, content, date))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "del":
                if auth > 1:
                    date = self.request.get('d', '')
                    self.response.out.write(AnnouncementOperation.DelAnnouncement(date))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
        else:
            self.response.out.write(status_code.ACCESS_DENY)
            self.response.out.write("L:%s A:%s R:%s" % (isLogin, isAdmin, isSystemAdmin))
            
class ClanInfo(webapp.RequestHandler):
    def post(self):
        session = get_current_session()
        
        isLogin = session.get('isLogin', False)
        isAdmin = session.get('isAdmin', False)
        isSystemAdmin = session.get('isSystemAdmin', False)
        
        auth = 1 if isLogin else 0
        auth = 2 if isAdmin else auth
        auth = 3 if isSystemAdmin else auth 
        
        if auth > 0:
            reqType = self.request.get('r')
            if reqType == "update":
                if auth > 1:
                    content = self.request.get('c')
                    self.response.out.write(ClanInfoOperation.UpdateClanInfo(content))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)                    
            elif reqType == "info":
                if auth > 0:
                    self.response.out.write(ClanInfoOperation.GetClanInfo())
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
        else:
            self.response.out.write(status_code.ACCESS_DENY)
            self.response.out.write("L:%s A:%s R:%s" % (isLogin, isAdmin, isSystemAdmin))
            
class FileMGR(webapp.RequestHandler):
    def post(self):
        session = get_current_session()
        
        isLogin = session.get('isLogin', False)
        isAdmin = session.get('isAdmin', False)
        isSystemAdmin = session.get('isSystemAdmin', False)
    
        auth = 1 if isLogin else 0
        auth = 2 if isAdmin else auth
        auth = 3 if isSystemAdmin else auth 
        
        if auth > 0:
            reqType = self.request.get('r')
            if reqType == "update":
                if auth > 2:
                    name = self.request.get('n')
                    link = self.request.get('l')
                    md5 = self.request.get('m')
                    desc = self.request.get('d')
                    oldname = self.request.get('o', '')
                    self.response.out.write(MyFileOperation.CreateFile(name, link, md5, oldname, desc))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)                    
            elif reqType == "info":
                if auth > 2:
                    name = self.request.get('n')
                    self.response.out.write(MyFileOperation.GetFile(name))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "list":
                if auth > 0:
                    self.response.out.write(MyFileOperation.GetFileList())
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "del":
                if auth > 2:
                    name = self.request.get('n')
                    self.response.out.write(MyFileOperation.DelFile(name))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
        else:
            self.response.out.write(status_code.ACCESS_DENY)
            self.response.out.write("L:%s A:%s R:%s" % (isLogin, isAdmin, isSystemAdmin))

class PostMGR(webapp.RequestHandler):
    def post(self):
        session = get_current_session()
        
        isLogin = session.get('isLogin', False)
        isAdmin = session.get('isAdmin', False)
        isSystemAdmin = session.get('isSystemAdmin', False)
    
        auth = 1 if isLogin else 0
        auth = 2 if isAdmin else auth
        auth = 3 if isSystemAdmin else auth 
        
        if auth > 0:
            reqType = self.request.get('r')
            if reqType == "postlist":
                if auth > 0:
                    self.response.out.write(PostOperation.GetPostList())
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "new":
                if auth > 0:
                    title = self.request.get('t')
                    content = self.request.get('c')
                    hide = True if self.request.get('h') == "true" else False
                    author = session.get('memberName', '')
                    self.response.out.write(PostOperation.CreatePost(title, content, author, hide))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "update":
                if auth > 0:
                    content = self.request.get('c')
                    date = self.request.get('d')
                    author = session.get('memberName', '')
                    self.response.out.write(PostOperation.SetPost(content, date, author))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "del":
                if auth > 1:
                    date = self.request.get('d')
                    self.response.out.write(PostOperation.DelPost(date))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "newreply":
                if auth > 0:
                    content = self.request.get('c')
                    fk = self.request.get('d')
                    author = session.get('memberName', '')
                    self.response.out.write(PostOperation.CreateReply(content, author, fk))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "updatereply":
                if auth > 0:
                    content = self.request.get('c')
                    date = self.request.get('d')
                    author = session.get('memberName', '')
                    self.response.out.write(PostOperation.SetReply(content, date, author))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "delreply":
                if auth > 1:
                    date = self.request.get('d')
                    self.response.out.write(PostOperation.DelReply(date))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "postinfo":
                if auth > 0:
                    date = self.request.get('d')
                    admin = True if auth > 1 else False
                    author = session.get('memberName', '')
                    self.response.out.write(PostOperation.GetPostInfo(date, admin, author))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "post":
                if auth > 0:
                    date = self.request.get('d')
                    author = session.get('memberName', '')
                    self.response.out.write(PostOperation.GetPost(date, author))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
            elif reqType == "reply":
                if auth > 0:
                    date = self.request.get('d')
                    author = session.get('memberName', '')
                    self.response.out.write(PostOperation.GetReply(date, author))
                else:
                    self.response.out.write(status_code.ACCESS_DENY)
        else:
            self.response.out.write(status_code.ACCESS_DENY)
            self.response.out.write("L:%s A:%s R:%s" % (isLogin, isAdmin, isSystemAdmin))
        
class ToolsAgent(webapp.RequestHandler):
    def post(self):
        req = self.request.get('r')
        if req == "auth":
            account = self.request.get('a')
            password = self.request.get('p')
            mac = self.request.get('m')
            
            if MemberOperation.IsMember(account, password) and MemberOperation.IsEnableTools(account):
                mac_serv_rec = MemberOperation.GetMemberMac(account)
                if mac_serv_rec is None or mac_serv_rec == "":
                    MemberOperation.SetMemberMac(account, mac)
                    self.response.out.write(MemberOperation.GetPersonalInfo(account))
                elif mac_serv_rec is not None:
                    if mac_serv_rec == mac:
                        self.response.out.write(MemberOperation.GetPersonalInfo(account))
                    else:
                        self.response.out.write(status_code.HOST_DENY)
            else:
                self.response.out.write(status_code.ACCESS_DENY)
        elif req == "ver":
            toolName = self.request.get('tn')
            self.response.out.write(MyFileOperation.GetFile(toolName))
            
      
application = webapp.WSGIApplication([('/Data/MemberMGR', MemberMGR),
                                      ('/Data/AnnouncementMGR', AnnouncementMGR),
                                      ('/Data/ClanInfo', ClanInfo),
                                      ('/Data/FileMGR', FileMGR),
                                      ('/Data/TAgent', ToolsAgent),
                                      ('/Data/PostMGR', PostMGR)], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()