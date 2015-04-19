import os
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
from gaesessions import get_current_session

class MainPage(webapp.RequestHandler):
    def get(self):
        session = get_current_session()
        
        isLogin = session.get('isLogin', False)
        isAdmin = session.get('isAdmin', False)
        isSystemAdmin = session.get('isSystemAdmin', False)
        isMember = session.get('isMember', False)
        memberName = session.get('memberName', False)
        
        template_value = { }
        
        if isLogin:
            if isAdmin:
                template_value['isAdmin'] = True
            elif isSystemAdmin:
                template_value['isSystemAdmin'] = True
            elif isMember:
                template_value['isMember'] = True
            template_value['memberName'] = memberName 
            
            path = os.path.join(os.path.dirname(__file__), 'templates', 'index.html')
        else:
            path = os.path.join(os.path.dirname(__file__), 'templates', 'login.html')
            
        self.response.out.write(template.render(path, template_value))


application = webapp.WSGIApplication([('/', MainPage)], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()