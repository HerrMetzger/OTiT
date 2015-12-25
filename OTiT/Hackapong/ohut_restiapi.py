import web
import json
import os
import ast

urls = (
        '/', 'index', 
        '/blanko', 'ilmo',
        '/otit', 'ilmo',
        '/sigma', 'ilmo'
        )

class index(object):
    def GET(self):
        all_attendees = {'blanko': {'names': list()},
                         'otit':   {'names': list()},
                         'sigma':  {'names': list()}}

        for x in ['blanko', 'otit', 'sigma']:
            try:
                with open('%s.txt' % x, 'r') as f:
                    for line in f.readlines():
                        all_attendees[x]['names'].append(ast.literal_eval(line)['name'])
            except IOError,e:
                print 'ERROR: File %s.txt not found' % x

        web.header('Content-Type', 'application/json')
        return json.dumps(all_attendees)

    def POST(self):
        raise web.NotFound()


class ilmo(object):
    def _get_guild_file(self):
        guild_file = '%s.txt' % web.ctx.env.get('REQUEST_URI').split('/')[-1]
        return guild_file

    def GET(self):
        guild_file = self._get_guild_file()
        all_names = {'names': list()}
        try:
            with open('%s' % guild_file, 'r') as f:
                for x in f.readlines():
                    all_names['names'].append(ast.literal_eval(x)['name'])
        except IOError, e:
            print 'ERROR: File %s.txt not found' % guild_file

        web.header('Content-Type', 'application/json')
        return json.dumps(all_names)

    def POST(self):
        guild_file = self._get_guild_file()

        with open('%s' % guild_file, 'a') as f:
            f.write('%s\n' % web.data())
        return web.Accepted()


#web.application(urls, globals()).wsgifunc()

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()
