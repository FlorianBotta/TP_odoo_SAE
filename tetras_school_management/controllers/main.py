from odoo import http
from odoo.http import request


class TetrasController(http.Controller):

    @http.route(["/tetras/web", "/tetras/ui"], type="http", auth="user")
    def tetras_web(self, **k):
        session_info = request.env["ir.http"].session_info()
        context = {
            "session_info": session_info
        }
        response = request.render("tetras_school_management.index", context)
        response.headers["Cache-Control"] = "no-store"
        return response
