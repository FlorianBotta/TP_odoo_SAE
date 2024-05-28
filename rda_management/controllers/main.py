from odoo import http
from odoo.http import request


class RDAController(http.Controller):

    @http.route(["/rda/web", "/rda/ui"], type="http", auth="user")
    def rda_web(self, **k):
        session_info = request.env["ir.http"].session_info()
        context = {
            "session_info": session_info
        }
        response = request.render("rda_management.index", context)
        response.headers["Cache-Control"] = "no-store"
        return response
