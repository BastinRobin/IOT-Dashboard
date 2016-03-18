#!/usr/bin/env python

import os
import os.path
import stat
import json
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.auth
import logging
import random, string
from torndb import Connection
from tornado.options import define, options
from tornado.escape import json_encode
from tornado.template import Template


define("port", default=8000, help="run on the given port", type=int)

class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
        	(r"/", BaseHandler),
        ]

        settings = dict(
            cookie_secret="43oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=False,
            autoreload=True,
            debug=True
        )
        tornado.web.Application.__init__(self, handlers, **settings)

# Basic server initialization
class BaseHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('index.html', page_title="Metrics Dashboard")



# Main Server Initialization
def main():
	tornado.options.parse_command_line()
	app = Application()
	app.listen(options.port)
	tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
	main()
