import hashlib
import status_code
from member import MemberOperation
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from gaesessions import get_current_session

class Login(webapp.RequestHandler):
    ADMIN_ACT = "cat740227"
    ADMIN_PWD = "catcat0227"
    SYSTEM_ACT = "root"
    SYSTEM_PWD = "0911619511"
    
    def encode(self, mstr):
        md5 = hashlib.md5()
        md5.update(mstr)
        return md5.hexdigest()
    
    def post(self):
        session = get_current_session()
        
        if session.get('isLogin', False) == False:
            account = self.request.get('a')
            password = self.request.get('p')
            
            session['isLogin'] = True
            if account == self.ADMIN_ACT and password == self.encode(self.ADMIN_PWD):
                session['isAdmin'] = True
                session['memberName'] = "血盟管理員"
                self.response.out.write(status_code.LOGIN_SUCCESS)
            elif account == self.SYSTEM_ACT and password == self.encode(self.SYSTEM_PWD):
                session['isSystemAdmin'] = True
                session['memberName'] = "系統管理員"
                self.response.out.write(status_code.LOGIN_SUCCESS)
            elif MemberOperation.IsMember(account, password):
                if MemberOperation.IsValidation(account):
                    session['isMember'] = True
                    session['memberName'] = account
                    self.response.out.write(status_code.LOGIN_SUCCESS)
                else:
                    session['isLogin'] = False
                    self.response.out.write(status_code.ACCOUNT_IS_NOT_VALID)
            else:
                session['isLogin'] = False
                self.response.out.write(status_code.ACCOUNT_OR_PASSWORD_WRONG)
        else:
            self.response.out.write(status_code.ALREADY_LOGIN)
            
class Logout(webapp.RequestHandler):
    def post(self):
        session = get_current_session()
        if session.is_active():
            session.terminate()
            
class Register(webapp.RequestHandler):
    def post(self):
        account = self.request.get('a')
        password = self.request.get('p')
        
        self.response.out.write(MemberOperation.CreateMember(account, password))
        

application = webapp.WSGIApplication([('/Authentication/Login', Login),
                                      ('/Authentication/Logout', Logout),
                                      ('/Authentication/Register', Register)], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
